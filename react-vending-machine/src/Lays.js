import React from "react";
import { Link } from "react-router-dom";

const Lays = () => {
  return (
    <div>
      <img
        src="https://www.lays.com/sites/lays.com/files/2020-11/lays-Classic-small.jpg"
        alt="lays"
      />
      <h1>
        <Link to="/">go back</Link>
      </h1>
    </div>
  );
};
export default Lays;
