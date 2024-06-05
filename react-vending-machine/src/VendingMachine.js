import React from "react";
import { Link } from "react-router-dom";

const VendingMachine = () => {
  return (
    <div className="VendingMachine">
      <h1>
        <Link to="/doritos">Doritos</Link>
      </h1>
      <h1>
        <Link to="/lays">Lays</Link>
      </h1>
      <h1>
        <Link to="/snickers">Snickers</Link>
      </h1>
    </div>
  );
};

export default VendingMachine;