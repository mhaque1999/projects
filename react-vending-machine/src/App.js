import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VendingMachine from "./VendingMachine";

import Doritos from "./Doritos";
import Lays from "./Lays";
import Snickers from "./Snickers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<VendingMachine />} />
        <Route path="/doritos" exact element={<Doritos />} />
        <Route path="/lays" exact element={<Lays />} />
        <Route path="/snickers" exact element={<Snickers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;