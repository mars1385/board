import { SET_USER_INFO, AUTH_FAILED, LOGOUT_USER, AUTH_START, CLEAR_ERROR } from '../type';

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, currentUser: null, error: null, loading: true };
    case SET_USER_INFO:
      return { ...state, currentUser: action.payload, error: null, loading: false };
    case AUTH_FAILED:
      return { ...state, currentUser: null, error: action.payload, loading: false };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: null, loading: false };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default userReducer;
