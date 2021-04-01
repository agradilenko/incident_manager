import { GET_ERRORS } from '../actions/types';

const initialState = {};

interface PayloadError {
    email?: string;
    password?: string;
    name?: string;
    position?: string;
    password2?: string;
    title?: string;
    value?: string;
}

export default function (
    state = initialState,
    action: { type: string; payload: PayloadError[] }
) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}
