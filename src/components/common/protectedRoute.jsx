import React from "react";
import auth from "../../services/authservice";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!user) return <Redirect to="/login" />;
        if (!user.ID) return <Redirect to="/login" />;
        if (
          user.Name ||
          props.match.path === "/complete" ||
          props.match.path === "/logout"
        ) {
          return Component ? <Component {...props} /> : render(props);
        } else {
          return <Redirect to="/complete" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
