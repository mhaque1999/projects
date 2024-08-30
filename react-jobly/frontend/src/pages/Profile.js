import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext"; 
import JoblyApi from "../api"; 

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser?.username) { 
        try {
          if (currentUser.token) {
            JoblyApi.token = currentUser.token;
        }
          const details = await JoblyApi.getUserDetails(currentUser.username);
          console.log(details)
          setFormData({
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await JoblyApi.updateUser(currentUser.username, formData);
      setCurrentUser({
        ...user,
        token: token 
    });
     
     localStorage.setItem('token', token);

     JoblyApi.token = token; 
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div>
      <h1>{currentUser.username}'s Profile</h1>
      <p>Username: {currentUser.username}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;

