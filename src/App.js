import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authservice";
import Navbar from "./components/navbar";
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
    let user = auth.getCurrentUser();
    console.log(user);
    return (
      <React.Fragment>
        <ToastContainer />
        {user && user.ID && <Navbar />}
        <div className="container mt-4">
          <Switch>
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/complete" component={Complete} />
            <ProtectedRoute path="/request" component={Request} />
            <NotLoginRoute path="/login" component={Login} />
            <NotLoginRoute path="/verify" component={Verify} />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute exact path="/" component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
