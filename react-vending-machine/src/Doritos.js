import React from "react";
import { Link } from "react-router-dom";

const Doritos = () => {
  return (
    <div>
      <img
        src="https://www.doritos.com/sites/doritos.com/files/2023-11/Doritos%20XXL%20FOP%2000028400688765_C1C1_1_v3.png"
        alt="doritos"
      />
      <h1>
        <Link to="/">go back</Link>
      </h1>
    </div>
  );
};
export default Doritos;