import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { History } from 'history';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, GET_USERS } from './types';

interface JWTDeCode {
    id?: string;
    email?: string;
    iat?: number;
    exp?: number;
    _id?: string;
}

interface RegisterUserData {
    email: string;
    name: string;
    password: string;
    password2: string;
    position: string;
}

interface LoginUserData {
    email: string;
    password: string;
}

// Set logged in user
export const setCurrentUser = (decoded: JWTDeCode) => ({
    type: SET_CURRENT_USER,
    payload: decoded
});

// Register User
export const registerUser = (userData: RegisterUserData, history: History) => (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    axios
        .post('/api/users/register', userData)
        .then(() => history.push('/'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = (userData: LoginUserData) => (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    axios
        .post('/api/users/login', userData)
        .then((res) => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', JSON.stringify(token));
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded: JWTDeCode = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

interface UsersList {
    name: string;
}

// Get users list
export const getUsersList = () => (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    axios
        .get('/api/users')
        .then((res) =>
            dispatch({
                type: GET_USERS,
                payload: res.data.map((item: UsersList) => ({
                    title: item.name,
                    value: item.name
                }))
            })
        )
        .catch(() =>
            dispatch({
                type: GET_USERS,
                payload: null
            })
        );
};

// Log user out
export const logoutUser = () => (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.href = './';
    // Set current user to empty object {} which will set isAuthenticated to false
};
