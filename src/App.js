import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginTemplate from "./components/templates/loginTemplate";
import NotFound from "./components/notFound";
import Home from "./components/home";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import Login from "./components/login";
import Footer from "./components/footer";
import Verify from "./components/verify";
import NotLoginRoute from "./components/common/notLoginRoute";
import Profile from "./components/profile";
import Complete from "./components/complete";
import Request from "./components/request";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <NotLoginRoute path="/login" component={Login} />
          <NotLoginRoute path="/verify" component={Verify} />
          <ProtectedRoute path="/complete" component={Complete} />
          <Route path="/not-found" component={NotFound} />
          <LoginTemplate>
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/request" component={Request} />
            <ProtectedRoute exact path="/" component={Home} />
          </LoginTemplate>
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
