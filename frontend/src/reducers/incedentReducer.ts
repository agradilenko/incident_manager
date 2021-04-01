import {
    CREATE_INCIDENT,
    UPDATE_INCIDENT,
    DELETE_INCIDENT,
    GET_INCIDENT,
    GET_INCIDENTS
} from '../actions/types';

interface IncidentState {
    incidents: Incident[];
    incident: Incident[];
}

interface Incident {
    area: string;
    assignee?: string;
    dateCreated: string;
    dateDue: string;
    description: string;
    name: string;
    priority: string;
    status: string;
    __v: number;
    _id: string;
}

const initialState: IncidentState = {
    incidents: [],
    incident: []
};

export default function incedentReducer(
    state: IncidentState = initialState,
    action: { type: string; payload: { _id: string } }
) {
    switch (action.type) {
        case CREATE_INCIDENT:
            return {
                ...state,
                incidents: [action.payload, ...state.incidents]
            };
        case UPDATE_INCIDENT:
            state.incidents.splice(
                state.incidents.findIndex(
                    (incident: Incident) => incident._id === action.payload._id
                ),
                1
            );

            return {
                ...state,
                incidents: [action.payload, ...state.incidents]
            };
        case DELETE_INCIDENT:
            return {
                ...state,
                incidents: state.incidents.filter(
                    (incident) => incident._id !== action.payload._id
                )
            };
        case GET_INCIDENT:
            return {
                ...state,
                incident: action.payload
            };
        case GET_INCIDENTS:
            return {
                ...state,
                incidents: action.payload
            };
        default:
            return state;
    }
}
