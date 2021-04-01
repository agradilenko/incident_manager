import axios from 'axios';

import {
  CREATE_INCIDENT,
  UPDATE_INCIDENT,
  DELETE_INCIDENT,
  GET_INCIDENT,
  GET_INCIDENTS,
} from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { History } from 'history';

type Incident = {
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
};

// Create Incident
export const createIncident = (incidentData: Incident) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .post('/api/incidents/create', incidentData)
    .then((res) =>
      dispatch({
        type: CREATE_INCIDENT,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Update Incident
export const updateIncident = (incidentData: Incident) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .patch('/api/incidents/update', incidentData)
    .then((res) =>
      dispatch({
        type: UPDATE_INCIDENT,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Delete Incident
export const deleteIncident = (_id: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .delete(`/api/incidents/delete/${_id}`)
    .then((res) =>
      dispatch({
        type: DELETE_INCIDENT,
        payload: {
          _id: _id
        },
      })
    )
    .catch((err) => console.log(err));
};

// Get specific incident by id
export const getIncident = (id: number | string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .get(`/api/incidents/${id}`)
    .then((res) =>
      dispatch({
        type: GET_INCIDENT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_INCIDENT,
        payload: null,
      })
    );
};

// Get all incidents
export const getIncidents = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  axios
    .get('/api/incidents')
    .then((res) =>
      dispatch({
        type: GET_INCIDENTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_INCIDENTS,
        payload: null,
      })
    );
};
