import React from "react";

function Box({
  id,
  handleRemove,
  width = 5,
  height = 5,
  backgroundColor = "black"
}) 
{
  return (
    <div>
      <div
        style={{
          height: `${height}px`,
          width: `${width}px`,
          backgroundColor
        }}
      />
      <button onClick={() => handleRemove(id)}>X</button>
    </div>
  );
}

export default Box;
