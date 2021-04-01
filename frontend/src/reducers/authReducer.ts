import isEmpty from 'is-empty';
import { Moment } from 'moment';
import { GET_USERS, SET_CURRENT_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    users: [],
    loading: false
};

interface PayloadIncident {
    area: string;
    assignee: string;
    dateCreated: string;
    dateDue: Moment | string;
    description: string;
    name: string;
    priority: string;
    status: string;
    __v: number;
    id: string;
}

interface JWTDeCode {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

interface PayloadUser {
    id: string;
    name: string;
    iat: number;
    exp: number;
}

interface PayloadUserNames {
    title: string;
    value: string;
}

type SomeType =
    | PayloadUserNames[]
    | PayloadUser
    | PayloadIncident[]
    | JWTDeCode;

export default function authReducer(
    state = initialState,
    action: { type: string; payload: SomeType }
) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_USERS:
            return {
                ...state,
                usersNames: action.payload
            };
        default:
            return state;
    }
}
