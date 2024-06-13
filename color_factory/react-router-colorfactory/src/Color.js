import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';

function Color({ colors }) {
  const { color } = useParams();
  const foundColor = colors.find(c => c.name === color);

  if (!foundColor) {
    return <Navigate to="/colors" />;
  }

  return (
    <div style={{ backgroundColor: foundColor.value, height: '50vh', color: 'white' }}>
      <h1>This is {foundColor.name}</h1>
      <Link to="/colors">Go Back</Link>
    </div>
  );
}

export default Color;
