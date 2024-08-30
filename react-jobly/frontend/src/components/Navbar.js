// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../style/NavBar.css";

// function Navbar() {
//   return (
//     <nav className="Navbar">
//       <NavLink exact to="/">Home</NavLink>
//       <NavLink to="/companies">Companies</NavLink>
//       <NavLink to="/jobs">Jobs</NavLink>
//       <NavLink to="/profile">Profile</NavLink>
//       <NavLink to="/login">Login</NavLink>
//       <NavLink to="/signup">Signup</NavLink>
//     </nav>
//   );
// }

// export default Navbar;

// import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
// import { UserContext } from "../UserContext"; 
// import "../style/NavBar.css";

// function Navbar() {
//   const { logout, isLoggedIn } = useContext(UserContext);

//   return (
//     <nav className="Navbar">
//       <NavLink exact to="/">Home</NavLink>
//       <NavLink to="/companies">Companies</NavLink>
//       <NavLink to="/jobs">Jobs</NavLink>
//       <NavLink to="/profile">Profile</NavLink>
//       {isLoggedIn() ? (
//         <>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <NavLink to="/login">Login</NavLink>
//           <NavLink to="/signup">Signup</NavLink>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../UserContext"; 
import "../style/NavBar.css";

function Navbar() {
  const { currentUser, logout, isLoggedIn } = useContext(UserContext);

  return (
    <nav className="Navbar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      
      {isLoggedIn() ? (
        <>
          <span>Welcome, {currentUser.username}!</span> 
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;

