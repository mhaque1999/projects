import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const add = newTodo => {
    setTodos(todos => [...todos, newTodo]);
  };
  const remove = id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const todoComponents = todos.map(todo => (
    <Todo 
      id={todo.id}
      task={todo.task}
      remove={remove}
    />
  ));

  return (
    <div>
      <NewTodoForm createTodo={add} />
      <ul>{todoComponents}</ul>
    </div>
  );
}

export default TodoList;
