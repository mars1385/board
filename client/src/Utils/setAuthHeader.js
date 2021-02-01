// ------------imports---------------
import axios from 'axios';
// ------------end imports-----------

const setAuthHeader = (jwtToken) => {
  if (jwtToken) {
    axios.defaults.headers.common['Authorization'] = jwtToken;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthHeader;
