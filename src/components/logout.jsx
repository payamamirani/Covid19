import { Component } from "react";
import { logout } from "../services/sessionService";

class Logout extends Component {
  componentDidMount() {
    logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
