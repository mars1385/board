import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { selectCurrentUser } from '../../Redux/user/userSelectors';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
    })
  );
  return (
    <Route
      {...rest}
      render={(props) => (currentUser ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
};

export default React.memo(PrivateRoute);
