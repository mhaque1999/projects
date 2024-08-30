// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import JoblyApi from '../api';

// function Login() {
//   const history = useHistory();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: ""
//   });

//   async function handleSubmit(evt) {
//     evt.preventDefault();
//     try {
//       let result = await JoblyApi.login(formData);
//       if (result.success) {
//         history.push("/companies");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   }

//   function handleChange(evt) {
//     const { name, value } = evt.target;
//     setFormData(form => ({
//       ...form,
//       [name]: value
//     }));
//   }

//   return (
//     <div className="Login">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username</label>
//         <input
//           id="username"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext"; // Adjust path as necessary

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    history.push("/companies"); // Redirect after successful login
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
