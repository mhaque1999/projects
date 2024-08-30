import React from 'react';
import { Link } from 'react-router-dom';
import "../style/CompanyCard.css";

const CompanyCard = ({ company }) => {
  return (
    <div className="company-card">
      <Link to={`/companies/${company.handle}`}>
        <h2>{company.name}</h2>
        {<p>{company.handle}</p>}
        <p>{company.description}</p>
        <p>{company.numEmployees}</p>
        <img src={company.logoUrl}/>
      </Link>
    </div>
  );
};

export default CompanyCard;
