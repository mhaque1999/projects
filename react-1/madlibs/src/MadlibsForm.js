import React, { useState } from 'react';

function MadlibForm({ createMadlib }) {
  const INITIAL_STATE = {noun:"", verb:"", adjective:""};
  const [formData, setFormData] = useState({INITIAL_STATE});
  
  const handleSubmit = (event) => {
    event.preventDefault();
    createMadlib(formData.noun, formData.verb, formData.adjective);
    setFormData(INITIAL_STATE);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Noun">Noun</label>
          <input
            id="noun"
            name="noun"
            value={formData.noun}
            type="text"
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="verb">Verb</label>
          <input
            id="verb"
            name="verb"
            value={formData.verb}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="adjective">Adjective</label>
          <input
            id="adjective"
            name="adjective"
            value={formData.adjective}
            type="text"
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Generate Story</button>
      </form>
    </div>
  );

}

export default MadlibForm;