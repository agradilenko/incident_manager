// React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter } from 'react-router-dom'

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/404/404";

interface JWTDeCode {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

// Check for token to keep user logged in
if (localStorage.jwtTokenTeams) {
  // Set auth token header auth
  const token = JSON.parse(localStorage.jwtTokenTeams);
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded: JWTDeCode = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    logoutUser()(store.dispatch);
    // Redirect to login
    window.location.href = "./";
  }
}

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact path="/dashboard" component={localStorage.jwtTokenTeams ? Dashboard : NotFound}
          />
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
