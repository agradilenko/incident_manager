import {
  GET_USERS,
  SET_CURRENT_USER,
} from "../actions/types";

import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  loading: false,
};

export default function (
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        usersNames: action.payload,
      };
    default:
      return state;
  }
}
