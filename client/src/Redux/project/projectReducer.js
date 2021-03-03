import {
  ADD_PROJECT_FAILED,
  ADD_PROJECT_SUCCESS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
  RESET_ALL,
} from '../type';

const initialState = {
  project: null,
  projects: null,
  error: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      return { ...state, project: action.payload, error: null };
    case GET_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, error: null };
    case ADD_PROJECT_FAILED:
    case GET_PROJECTS_FAILED:
      return { ...state, project: null, error: action.payload };
    case RESET_ALL:
      return { ...state, projects: null, project: null, error: null };
    default:
      return state;
  }
};

export default projectReducer;
