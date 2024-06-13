import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Nav';
import ColorList from './ColorList';
import Color from './Color';
import ColorForm from './ColorForm';

function App() {
  const [colors, setColors] = useState([
    { name: 'red', value: '#FF0000' },
    { name: 'green', value: '#00FF00' },
    { name: 'blue', value: '#0000FF' }
  ]);

  const addColor = (newColor) => {
    setColors(colors => [newColor, ...colors]);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/colors" element={<ColorList colors={colors} />} />
        <Route path="/colors/new" element={<ColorForm addColor={addColor} />} />
        <Route path="/colors/:color" element={<Color colors={colors} />} />
        <Route path="*" element={<Navigate to="/colors" />} />
      </Routes>
    </Router>
  );
}

export default App;
