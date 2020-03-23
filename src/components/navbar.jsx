import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import authservice from "../services/authservice";

class Navbar extends Component {
  render() {
    const user = authservice.getCurrentUser();
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={"logo192.png"} alt="Logo" style={{ width: 40 }} />
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  صفحه اصلی
                </NavLink>
              </li>
              {user.IsSuperVisor && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/request">
                    درخواست ها
                  </NavLink>
                </li>
              )}
            </ul>

            <ul className="navbar-nav mr-auto">
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
