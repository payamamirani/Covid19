import React, { Component } from "react";
import Navbar from "../navbar";
import { NavLink } from "react-router-dom";
import authservice from "../../services/authservice";
import Routes from "../common/routes";

class LoginTemplate extends Component {
  state = {
    privileges: []
  };

  componentDidMount() {
    this.setState({ privileges: authservice.getCurrentUserPrivileges() });
  }

  getUrl = gid => {
    let url = "#";
    const route = Routes.find(r => r.Gid === gid);
    if (route) url = route.path;
    return url;
  };

  render() {
    const { privileges } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="container-fluid rtl mt-6">
          <div className="row">
            {privileges.length > 0 && (
              <div className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                  <ul className="nav flex-column">
                    {privileges.map(p => (
                      <li key={p.ID} className="nav-item">
                        <NavLink className="nav-link" to={this.getUrl(p.Gid)}>
                          {p.Title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div
              style={{ minHeight: "80vh" }}
              className={
                "ml-sm-auto px-4 " +
                (privileges.length > 0 ? "col-md-9 col-lg-10" : "col-md-12")
              }
            >
              {this.props.children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginTemplate;
