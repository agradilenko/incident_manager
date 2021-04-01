// React
import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from './store';

// Utils
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/404/404';

interface JWTDeCode {
    id: string;
    email: string;
    iat: number;
    exp: number;
    _id?: string;
}

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = JSON.parse(localStorage.jwtToken);
    setAuthToken(token);

    // Decode token and get user info and exp
    const decoded: JWTDeCode = jwt_decode(token);

    // Set user and isAuthenticated
    store.dispatch(
        setCurrentUser(decoded) as { type: string; payload: JWTDeCode }
    );

    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        logoutUser()(store.dispatch);
        // Redirect to login
        window.location.href = './';
    }
}

function Temp() {
    return <>{localStorage.jwtToken ? <Dashboard /> : <NotFound />}</>;
}

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <div>
                    <Switch>
                        <Route path="/register" component={Register} />
                        <Route path="/dashboard" component={Temp} />
                        <Route exact path="/" component={Login} />
                    </Switch>
                </div>
            </HashRouter>
        </Provider>
    );
}

export default App;
