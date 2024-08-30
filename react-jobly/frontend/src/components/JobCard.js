import React, { useState, useEffect } from 'react';
import "../style/JobCard.css";

function JobCard({ id, title, salary, equity, companyName, hasApplied, applyToJob }) {
  const [applied, setApplied] = useState(hasApplied);

  
  useEffect(() => {
    setApplied(hasApplied);
  }, [hasApplied]);

  const handleApply = async () => {
    if (applied) return; //Prevents from applying to a job already applIEd
    await applyToJob(id); 
    setApplied(true); 
  };

  return (
    <div className="JobCard">
      <div className="JobCard-title">
        <b>{title}</b>
      </div>
      <div className="JobCard-company">
        <small>at {companyName}</small>
      </div>
      <div className="JobCard-salary">
        <small>Salary: {salary ? `$${salary}` : "N/A"}</small>
      </div>
      <div className="JobCard-equity">
        <small>Equity: {equity ? equity : "N/A"}</small>
      </div>
      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;



