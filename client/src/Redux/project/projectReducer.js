import {
  ADD_PROJECT_FAILED,
  ADD_PROJECT_SUCCESS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
  RESET_ALL,
  UPDATE_PROJECT_FAILED,
  UPDATE_PROJECT_SUCCESS,
  CLEAR_PROJECT,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAILED,
} from '../type';

const initialState = {
  project: null,
  projectActivity: null,
  projects: null,
  error: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
      return { ...state, project: action.payload, error: null };
    case GET_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, error: null };
    case ADD_PROJECT_FAILED:
    case GET_PROJECTS_FAILED:
    case UPDATE_PROJECT_FAILED:
    case GET_ACTIVITIES_FAILED:
      return { ...state, project: null, projectActivity: null, error: action.payload };
    case GET_ACTIVITIES_SUCCESS:
      return { ...state, projectActivity: action.payload, error: null };
    case CLEAR_PROJECT:
      return { ...state, project: null, projectActivity: null, error: null };
    case RESET_ALL:
      return { ...state, projects: null, project: null, projectActivity: null, error: null };
    default:
      return state;
  }
};

export default projectReducer;
