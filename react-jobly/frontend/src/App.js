import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from "./UserContext"; 
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Companies from "./components/Companies.js";
import Jobs from "./pages/JobPages.js";
import Profile from "./pages/Profile.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import CompanyDetail from "./components/CompanyDetail.js";

import "./style/style.css";
import CompanyList from "./components/CompanyList.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute exact path="/companies" component={CompanyList} />
            <ProtectedRoute path="/companies/:handle" component={CompanyDetail} />
            <ProtectedRoute exact path="/jobs" component={Jobs} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

