import React, { createContext, useState, useEffect } from "react";
import JoblyApi from "./api"; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  
  useEffect(() => {
    if (currentUser) {
      JoblyApi.token = currentUser.token; 
    } else {
      delete JoblyApi.token; 
    }
  }, [currentUser]);

  const login = async (userData) => {
    try {
      const { token, user } = await JoblyApi.login(userData); 
      setCurrentUser({ ...user, token }); 
      localStorage.setItem("currentUser", JSON.stringify({ ...user, token })); 
    } catch (error) {
      console.error("Login failed:", error); 
    }
  };

  const signup = async (userData) => {
    try {
      const { token, user } = await JoblyApi.signup(userData); 
      setCurrentUser({ ...user, token }); 
      localStorage.setItem("currentUser", JSON.stringify({ ...user, token })); 
    } catch (error) {
      console.error("Signup failed:", error); 
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser"); 
    delete JoblyApi.token; 
  };

  const isLoggedIn = () => {
    return currentUser !== null; 
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, login, signup, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
