import { REGISTER_START, SET_USER_INFO, AUTH_FAILED, lOGIN_START, LOGOUT_USER } from '../type';
import axios from 'axios';
import setAuthHeader from '../../Utils/setAuthHeader';

export const startRegisterUser = (userInfo) => ({
  type: REGISTER_START,
  payload: userInfo,
});

export const registerSuccess = (userInfo) => async (dispatch) => {
  try {
    console.log(userInfo);
    const registerResponse = await axios.post('/auth/register', userInfo);
    const { token } = registerResponse.data;

    localStorage.setItem('jwt_token', token);
    setAuthHeader(token);
    dispatch(getUserInfo(token));
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data,
    });
  }
};

export const startLogin = (userInfo) => ({
  type: lOGIN_START,
  payload: userInfo,
});

export const loginSuccess = (userInfo) => async (dispatch) => {
  try {
    console.log(userInfo);
    const registerResponse = await axios.post('/auth/login', userInfo);
    const { token } = registerResponse.data;

    localStorage.setItem('jwt_token', token);
    setAuthHeader(token);
    dispatch(getUserInfo(token));
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwt_token');
  setAuthHeader(false);
  dispatch({
    type: LOGOUT_USER,
  });
};

export const getUserInfo = (token = async (dispatch) => {
  try {
    const userInfo = await axios.get('/auth/userInfo');
    dispatch({
      type: SET_USER_INFO,
      payload: userInfo.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data,
    });
  }
});
