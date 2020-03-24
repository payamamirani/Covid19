import React, { Component } from "react";
import { getPrivileges } from "../../services/privilegeService";
import Navbar from "../navbar";
import { toast } from "react-toastify";

class LoginTemplate extends Component {
  state = {
    privileges: []
  };

  async componentDidMount() {
    const { data: privilage } = await getPrivileges();
    if (privilage.success) this.setState({ privileges: privilage.payload });
  }

  render() {
    const { privileges } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="container-fluid rtl mt-4">
          <div className="row">
            {privileges.length > 0 && (
              <div className="col-2 sidebar">
                <div className="sidebar-sticky">
                  <ul className="nav flex-column">
                    {privileges.map(p => (
                      <li key={p.ID} className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href={`#Tab${p.Gid}`}
                        >
                          {p.Title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="col">{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginTemplate;
