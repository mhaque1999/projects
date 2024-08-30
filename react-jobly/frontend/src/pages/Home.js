import React, { useContext } from "react";
import { UserContext } from '../UserContext'; 

function Home() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser); 

  return (
    <div>
      <h1>Welcome to the Jobly App!</h1>
      {currentUser ? (
        <p>You are logged in as {currentUser.username}.</p>
      ) : (
        <p>Please log in or sign up to access the companies.</p>
      )}
    </div>
  );
}

export default Home;
