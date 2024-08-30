import React, { useState, useEffect, useContext } from 'react';
import JobCard from '../components/JobCard';
import JoblyApi from '../api';
import { UserContext } from '../UserContext'; 

function JobPages() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState(new Set());
  const { currentUser } = useContext(UserContext); 

  useEffect(function getJobsAndApplicationsOnMount() {
    console.debug("JobPages");

    async function fetchJobsAndApplications() {
      try {
        let jobs = await JoblyApi.getJobs();
        let user = await JoblyApi.getUserDetails(currentUser.username);
        console.log(user)
        let userApplications = new Set(user.applications);
        setJobs(jobs);
        setApplications(userApplications);
      } catch (error) {
        console.error("Error fetching jobs or applications", error);
      }
    }

    if (currentUser) {
      fetchJobsAndApplications();
    }
  }, [currentUser]);

  async function applyToJob(id) {
    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      setApplications(new Set([...applications, id])); 
    } catch (error) {
      console.error("Error applying to job", error);
    }
  }

  return (
    <div className="JobPages col-md-8 offset-md-2">
      {jobs.length ? (
        <div className="JobPages-list">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
              hasApplied={applications.has(job.id)} 
              applyToJob={applyToJob}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default JobPages;
