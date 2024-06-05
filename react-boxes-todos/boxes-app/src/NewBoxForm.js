import React, { useState } from "react";
import { v4 as uuid } from 'uuid';


function NewBoxForm({ createBox }) {
  const INITIAL_STATE = 
  {height: "",
  width: "",
  backgroundColor: ""};

  const [formData, setFormData] = useState({INITIAL_STATE});

  const handleChange = (evt) => {
    setFormData(formData => ({
      ...formData,
      [evt.target.name]: evt.target.value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData(INITIAL_STATE);
  };

  //render form

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="height">Height</label>
          <input
            id="height"
            name="height"
            value={formData.height}
            type="text"
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="width">Width</label>
          <input
            id="width"
            name="width"
            value={formData.width}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color</label>
          <input
            id="backgroundColor"
            name="backgroundColor"
            value={formData.backgroundColor}
            type="text"
            onChange={handleChange}
          />
        </div>
        <button id="newBoxButton">Add a new box</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
