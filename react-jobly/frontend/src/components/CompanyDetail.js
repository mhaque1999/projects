import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import JobCard from '../components/JobCard';
import { UserContext } from '../UserContext';

const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [applications, setApplications] = useState(new Set());
  const { currentUser } = useContext(UserContext); // Access the current user

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const result = await JoblyApi.getCompany(handle);
        setCompany(result);

        // Fetch user applications when the company is fetched
        if (currentUser) {
          const userDetails = await JoblyApi.getUserDetails(currentUser.username);
          const userApplications = new Set(userDetails.applications);
          setApplications(userApplications);
          console.log("Im from company details to list applications", userApplications)
        }
      } catch (error) {
        console.error("Error fetching company details", error);
      }
    };
    fetchCompany();
  }, [handle, currentUser]);

  const applyToJob = async (jobId) => {
    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setApplications(prevApplications => new Set([...prevApplications, jobId])); // Update the applications set
    } catch (error) {
      console.error("Error applying to job", error);
    }
  };

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h3>Jobs at {company.name}</h3>
      <div className="JobPages-list">
        {company.jobs.length ? (
          company.jobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={company.name}
              hasApplied={applications.has(job.id)} 
              applyToJob={applyToJob} 
            />
          ))
        ) : (
          <p>No jobs available for this company.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;

