import { SET_USER_INFO, AUTH_FAILED, AUTH_START, LOGOUT_USER, RESET_ALL } from '../type';
import axios from 'axios';
import setAuthHeader from '../../Utils/setAuthHeader';

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    dispatch(startAuth());
    const registerResponse = await axios.post('/auth/register', userInfo);
    const { token } = registerResponse.data;

    localStorage.setItem('jwt_token', token);
    setAuthHeader(token);
    dispatch(getUserInfo(token));
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const loginUser = (userInfo) => async (dispatch) => {
  try {
    const registerResponse = await axios.post('/auth/login', userInfo);
    const { token } = registerResponse.data;

    localStorage.setItem('jwt_token', token);
    setAuthHeader(token);
    dispatch(getUserInfo(token));
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const startAuth = () => ({
  type: AUTH_START,
});

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwt_token');
  setAuthHeader(false);
  dispatch({
    type: LOGOUT_USER,
  });
  dispatch({
    type: RESET_ALL,
  });
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await axios.get('/auth/userInfo');
    dispatch({
      type: SET_USER_INFO,
      payload: userInfo.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data.error,
    });
  }
};
