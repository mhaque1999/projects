import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Snacks from "./FoodItem";
import NewItem from "./NewItem";
import NotFound from "./NotFound";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getItems() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      let drinks = await SnackOrBoozeApi.getDrinks();
      setSnacks(snacks);
      setDrinks(drinks);
      setIsLoading(false);
    }
    getItems();
  }, []);

  const addItem = async (type, item) => {
    let newItem = await SnackOrBoozeApi.addItem(type, item);
    if (type === "snacks") {
      setSnacks(snacks => [...snacks, newItem]);
    } else {
      setDrinks(drinks => [...drinks, newItem]);
    }
  };

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} drinks={drinks} />
            </Route>
            <Route exact path="/snacks">
              <Menu items={snacks} title="Snacks" type="snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Snacks items={snacks} cantFind="/snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu items={drinks} title="Drinks" type="drinks" />
            </Route>
            <Route path="/drinks/:id">
              <Snacks items={drinks} cantFind="/drinks" />
            </Route>
            <Route path="/add-item">
              <NewItem addItem={addItem} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;

