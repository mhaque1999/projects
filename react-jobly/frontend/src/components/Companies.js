import React, { useState, useEffect } from "react";
import JoblyApi from '../api';
import { Link } from "react-router-dom";
import '../style/Companies.css'; 


function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    getCompanies();
  }, []);

  return (
    <div className="Companies">
      <h1>Companies</h1>
      {companies.map(c => (
        <div key={c.handle}>
          <Link to={`/companies/${c.handle}`}>
            <h2>{c.name}</h2>
          </Link>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Companies;
