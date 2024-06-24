import React, { useState } from "react";

function NewItem({ addItem }) {
  const [type, setType] = useState("snacks");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState("");
  const [serve, setServe] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(type, { name, description, recipe, serve });
    setName("");
    setDescription("");
    setRecipe("");
    setServe("");
  };

  return (
    <section>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="snacks">Snack</option>
            <option value="drinks">Drink</option>
          </select>
        </label>
        <br />
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </label>
        <br />
        <label>
          Description:
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Recipe:
          <input value={recipe} onChange={(e) => setRecipe(e.target.value)}></input>
        </label>
        <br />
        <label>
          Serve:
          <input value={serve} onChange={(e) => setServe(e.target.value)}></input>
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </section>
  );
}

export default NewItem;