import React, { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import SearchBox from './SearchBox';
import JoblyApi from '../api';

const CompanyList = () => {
const [companies, setCompanies] = useState([]);
const [searchName, setSearchName] = useState('');
const [minEmployees, setMinEmployees] = useState('');
const [maxEmployees, setMaxEmployees] = useState('');

const fetchCompanies = async () => {
    try {
        const response = await JoblyApi.getCompanies( {
              name: searchName || undefined, 
              minEmployees: minEmployees || undefined, 
              maxEmployees: maxEmployees || undefined, 
        });
        setCompanies(response || []);
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};

useEffect(() => {
    fetchCompanies();
}, [searchName, minEmployees, maxEmployees]); 

return (
    <div>
        <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
        />
        <input
            type="number"
            placeholder="Min Employees"
            value={minEmployees}
            onChange={(e) => setMinEmployees(e.target.value)}
        />
        <input
            type="number"
            placeholder="Max Employees"
            value={maxEmployees}
            onChange={(e) => setMaxEmployees(e.target.value)}
        />
        <ul>
            {companies.map((company) => (
              <CompanyCard key={company.handle} company={company} />
            ))}
        </ul>
    </div>
);
};
export default CompanyList;