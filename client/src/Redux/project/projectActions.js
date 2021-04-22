import {
  ADD_PROJECT_FAILED,
  ADD_PROJECT_SUCCESS,
  GET_PROJECTS_FAILED,
  GET_PROJECTS_SUCCESS,
  UPDATE_PROJECT_FAILED,
  UPDATE_PROJECT_SUCCESS,
  CLEAR_PROJECT,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAILED,
} from '../type';
import axios from 'axios';

export const addProject = ({ title, description, history }) => async (dispatch) => {
  try {
    const project = await axios.post('/projects', { title, description });

    dispatch({
      type: ADD_PROJECT_SUCCESS,
      payload: project.data.data,
    });

    history.push(`/projects/${project.data.data._id}`);
  } catch (error) {
    dispatch({
      type: ADD_PROJECT_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const projects = await axios.get('/projects');

    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: projects.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECTS_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const getProject = ({ history, projectId }) => async (dispatch) => {
  try {
    const project = await axios.get(`/projects/${projectId}`);

    dispatch({
      type: ADD_PROJECT_SUCCESS,
      payload: project.data.data,
    });
    history.push(`/projects/${project.data.data._id}`);
  } catch (error) {
    dispatch({
      type: ADD_PROJECT_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const updateProject = ({ data, projectId }) => async (dispatch) => {
  try {
    const project = await axios.patch(`/projects/${projectId}`, data);

    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: project.data.project,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const removeProject = ({ history, projectId }) => async (dispatch) => {
  try {
    await axios.delete(`/projects/${projectId}`);

    history.push(`/projects`);
    dispatch(getProjects());
  } catch (error) {
    dispatch({
      type: GET_PROJECTS_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const getActivities = ({ projectId }) => async (dispatch) => {
  try {
    const activities = await axios.get(`/projects/${projectId}/activities`);

    dispatch({
      type: GET_ACTIVITIES_SUCCESS,
      payload: activities.data.activities,
    });
  } catch (error) {
    dispatch({
      type: GET_ACTIVITIES_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const clearProject = () => ({
  type: CLEAR_PROJECT,
});
