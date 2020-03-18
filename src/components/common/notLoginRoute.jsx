import React from "react";
import auth from "../../services/authservice";
import { Redirect, Route } from "react-router-dom";

const NotLoginRoute = ({ component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (user && user.ID) return <Redirect to="/" />;
        else if (
          !localStorage.getItem("Token") &&
          props.match.path !== "/login"
        )
          return <Redirect to="/login" />;
        else return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default NotLoginRoute;
