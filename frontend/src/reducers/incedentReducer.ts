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

export default function (
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
            let index = state.incidents.findIndex(
                (incident: Incident) => incident._id === action.payload._id
            );

            state.incidents.splice(index, 1);

            return {
                ...state,
                incidents: [action.payload, ...state.incidents]
            };
        case DELETE_INCIDENT:
            return {
                ...state,
                incidents: state.incidents.filter((incident) => {
                    return incident._id !== action.payload._id;
                })
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
