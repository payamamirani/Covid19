import React, { Component } from "react";
import authservice from "../../services/authservice";
import Routes from "./routes";
import { Redirect } from "react-router-dom";

class BaseRoute extends Component {
  getComponent = ({ component: Comp, render, props }) => {
    return Comp ? <Comp {...props} /> : render(props);
  };

  getComponentLayout = ({ component, render, layout: Layout, props }) => {
    const privileges = authservice.getCurrentUserPrivileges();
    const route = Routes.find(r => r.path === props.match.path);
    if (route && route.Gid) {
      const privilege = privileges.find(p => p.Gid === route.Gid);
      if (!privilege) return <Redirect to="/" />;
    }

    if (Layout) {
      return <Layout>{this.getComponent({ component, render, props })}</Layout>;
    }

    return this.getComponent({ component, props });
  };
}

export default BaseRoute;
