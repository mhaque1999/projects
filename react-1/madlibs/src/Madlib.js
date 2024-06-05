import React, { useState } from 'react';
import MadlibForm from './MadlibsForm';
import Story from './Story';

function Madlib() {
  const [story, setStory] = useState('');

  const generateStory = (noun, verb, adjective) => {
    const newStory = `Once upon a time, there was a ${adjective} ${noun} who loved to ${verb}. The end.`;
    setStory(newStory);
  };

  return (
    <div className="Madlib">
      <MadlibForm createMadlib={generateStory} />
      <Story story={story} />
    </div>
  );
}

export default Madlib;