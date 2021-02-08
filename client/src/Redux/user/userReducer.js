import { REGISTER_START, SET_USER_INFO, AUTH_FAILED, lOGIN_START, LOGOUT_USER } from '../type';

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_START:
    case lOGIN_START:
      return { ...state, currentUser: null, error: null, loading: true };
    case SET_USER_INFO:
      return { ...state, currentUser: action.payload, error: null, loading: false };
    case AUTH_FAILED:
      return { ...state, currentUser: null, error: action.payload, loading: false };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: null, loading: false };
    default:
      return state;
  }
}
