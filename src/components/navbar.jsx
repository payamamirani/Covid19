import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import authservice from "../services/authservice";

class Navbar extends Component {
  render() {
    const user = authservice.getCurrentUser();
    if (!user) return null;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark rtl">
        <div className="container-fluid">
          <Link className="navbar-brand bg-light" to="/">
            <img src={"logo192.png"} alt="Logo" style={{ width: 29 }} />
          </Link>
          <Link className="navbar-brand" to="/">
            کوید 19
          </Link>

          <button
            type="button"
            className="navbar-toggler collapsed"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {user.Name ? `${user.Name} ${user.Family}` : user.CellNumber}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  خروج
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
