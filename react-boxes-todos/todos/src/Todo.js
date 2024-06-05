import React from "react";

function Todo({ task = "todo", id = "1", remove }) {

  return (
    <div>
      <li>{task}</li>
      <button onClick={() => remove(id)}>X</button>
    </div>
  );
}

export default Todo;
