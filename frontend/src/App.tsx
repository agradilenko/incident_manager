// React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
import CollectionsPage
  from "./components/modal-create-incident/ModalCreateIncidentWrapper";



interface JWTDeCode {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/test" component={CollectionsPage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
