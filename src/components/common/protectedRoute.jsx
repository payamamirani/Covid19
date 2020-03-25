import React from "react";
import auth from "../../services/authservice";
import { Redirect, Route } from "react-router-dom";
import BaseRoute from "./baseRoute";

class ProtectedRoute extends BaseRoute {
  render() {
    const user = auth.getCurrentUser();
    const { component, render, layout, ...rest } = this.props;
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
            return this.getComponentLayout({
              component,
              render,
              layout,
              props
            });
          } else {
            return <Redirect to="/complete" />;
          }
        }}
      />
    );
  }
}

export default ProtectedRoute;
