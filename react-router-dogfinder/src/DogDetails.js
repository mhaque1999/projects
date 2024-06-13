
import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function DogDetails({ dogs }) {

  const { name } = useParams();
  const dog = dogs.find(d => d.name.toLowerCase() === name.toLowerCase());

  if (!dog) return <Navigate to="/dogs" />

  return (
    <div>
      <div>
        <img src={`/${dog.src}`} />
        <h3>{dog.name}</h3>
        <h3>{dog.age} years old</h3>
        <ul>
          {dog.facts.map((fact, info) => (
            <li key={info}>{fact}</li>
          ))}
        </ul>
        <Link to="/dogs">Back</Link>
      </div>
    </div>
  );
}

export default DogDetails;
