import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Routes from "./common/routes";

class Drawer extends Component {
  getUrl = gid => {
    let url = "/test";
    const route = Routes.find(r => r.Gid === gid);
    if (route) url = route.path;
    return url;
  };

  getDrawer = children => {
    return (
      <nav className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">{children}</ul>
        </div>
      </nav>
    );
  };

  getNavbar = children => {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light p-0">
        <div className="container-fluid">
          <button
            type="button"
            className="navbar-toggler collapsed"
            data-toggle="collapse"
            data-target="#Drawer"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse rtl" id="Drawer">
            <ul className="navbar-nav ml-auto">{children}</ul>
          </div>
        </div>
      </nav>
    );
  };

  getChildren = () => {
    const { privileges } = this.props;

    return privileges.map(p => (
      <li key={p.ID} className="nav-item">
        <NavLink className="nav-link" to={this.getUrl(p.Gid)}>
          {p.Title}
        </NavLink>
      </li>
    ));
  };

  render() {
    return window.innerWidth <= 760
      ? this.getNavbar(this.getChildren())
      : this.getDrawer(this.getChildren());
  }
}

export default Drawer;
