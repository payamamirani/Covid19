import React from "react";
import auth from "../../services/authservice";
import { Redirect, Route } from "react-router-dom";
import BaseRoute from "./baseRoute";

class NotLoginRoute extends BaseRoute {
  render() {
    const user = auth.getCurrentUser();
    const { component, layout, render, ...rest } = this.props;

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
          else
            return this.getComponentLayout({
              component,
              render,
              layout,
              props
            });
        }}
      />
    );
  }
}

export default NotLoginRoute;
