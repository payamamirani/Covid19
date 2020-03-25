import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginTemplate from "./components/templates/loginTemplate";
import NotFound from "./components/notFound";
import Home from "./components/home";
import ProtectedRoute from "./components/common/protectedRoute";
import Login from "./components/login";
import Footer from "./components/footer";
import Verify from "./components/verify";
import NotLoginRoute from "./components/common/notLoginRoute";
import Complete from "./components/complete";
import Routes from "./components/common/routes";

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
          {Routes.map((r, i) => {
            return (
              <ProtectedRoute
                key={i}
                path={r.path}
                layout={LoginTemplate}
                component={r.component}
                title={r.title}
              />
            );
          })}
          <ProtectedRoute
            exact
            path="/"
            layout={LoginTemplate}
            component={Home}
          />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
