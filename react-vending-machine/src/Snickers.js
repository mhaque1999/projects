import React from "react";
import { Link } from "react-router-dom";

const Snickers = () => {
  return (
    <div>
      <img
        src="https://www.snickers.com/sites/g/files/fnmzdf616/files/migrate-product-files/dryeqrv2efldaaoyceat.png"
        alt="snickers"
      />
      <h1>
        <Link to="/">go back</Link>
      </h1>
    </div>
  );
};
export default Snickers;
