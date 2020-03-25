import React, { Component } from "react";
import Drawer from "../drawer";
import Navbar from "../navbar";
import authservice from "../../services/authservice";

class LoginTemplate extends Component {
  state = {
    privileges: []
  };

  componentDidMount() {
    this.setState({ privileges: authservice.getCurrentUserPrivileges() });
  }

  render() {
    const { privileges } = this.state;
    return (
      <React.Fragment>
        <div className="fixed-top">
          <Navbar />
          {privileges.length > 0 && window.innerWidth <= 760 && (
            <Drawer privileges={privileges} />
          )}
        </div>
        <div className="container-fluid rtl mt-6">
          <div className="row">
            {privileges.length > 0 && window.innerWidth > 760 && (
              <Drawer privileges={privileges} />
            )}
            <div
              style={{ minHeight: "80vh" }}
              className={
                "ml-sm-auto px-4 " +
                (privileges.length > 0 ? "col-md-9 col-lg-10" : "col-md-12")
              }
            >
              <h3 className="text-center">{this.props.title}</h3>
              {this.props.children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginTemplate;
