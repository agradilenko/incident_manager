import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, GET_USERS } from "./types";
import { History } from "history";

interface JWTDeCode {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

interface registerUserData {
  email: string;
  name: string;
  password: string;
  password2: string;
  position: string;
}

interface loginUserData {
  email: string;
  password: string;
}

// Register User
export const registerUser = (userData: registerUserData, history: History) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData: loginUserData) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
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
        payload: err.response.data,
      })
    );
};

// Get users list
export const getUsersList = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data.map((item: any) => ({
          title: item.name,
          value: item.name,
        })),
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USERS,
        payload: null,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded: object) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  window.location.href = "./login";
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
