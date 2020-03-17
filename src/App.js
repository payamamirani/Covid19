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

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        {user && <Navbar />}
        <div className="container">
          <Switch>
            <ProtectedRoute path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route
              path="/verify"
              render={props => {
                if (localStorage.getItem("Token"))
                  return <Verify cellNo={user.cellNo} {...props} />;
                else return <Redirect to="/login" />;
              }}
            />
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
