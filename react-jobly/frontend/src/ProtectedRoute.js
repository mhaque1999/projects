import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext"; 

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" /> 
        )
      }
    />
  );
};

export default ProtectedRoute;
