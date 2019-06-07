import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ClubsPage from "./ClubsPage";
import ClubPage from "./ClubPage";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CustomLayout from "./components/layout/CustomLayout";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Link } from "react-router-dom";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

const LoginContainer = () => (
  //don't show CustomLayout
  <div className="container">
    <Route exact path="/" render={() => <Link to="/login" />} />
    <Route path="/login" component={Login} />
  </div>
);

const RegisterContainer = () => (
  //don't show CustomLayout
  <div className="container">
    <Route exact path="/" render={() => <Link to="/register" />} />
    <Route path="/register" component={Register} />
  </div>
);

const DefaultContainer = () => (
  <div>
    <CustomLayout>
      <Route exact path="/" component={Landing} />
      <Route exact path="/clubspage" component={ClubsPage} />
      <Route exact path="/clubpage" component={ClubPage} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </CustomLayout>
  </div>
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/(login)" component={LoginContainer} />
              <Route exact path="/(register)" component={RegisterContainer} />
              <Route component={DefaultContainer} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
export default App;
