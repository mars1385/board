// ------------imports---------------
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import setAuthHeader from './Utils/setAuthHeader';
import { Provider } from 'react-redux';
import store from './Redux/store';
import jwt_decode from 'jwt-decode';
import { getUserInfo, logoutUser } from './Redux/user/userActions';
import Header from './Components/header/Header';
import PrivateRoute from './Components/private-route/PrivateRoute';
// ------------end imports-----------

// code splitting with react lazy (our pages)
const Home = lazy(() => import('./Pages/Home/Home'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Register = lazy(() => import('./Pages/Register/Register'));
const Projects = lazy(() => import('./Pages/Projects/Projects'));
const Project = lazy(() => import('./Pages/Project/Project'));
// end

function App() {
  // check login
  React.useEffect(() => {
    if (localStorage.jwt_token) {
      setAuthHeader(localStorage.jwt_token);

      store.dispatch(getUserInfo());
      const decodedToken = jwt_decode(localStorage.jwt_token);

      const now = Date.now() / 1000;
      if (decodedToken.exp < now) {
        store.dispatch(logoutUser());

        window.location.href = '/login';
      }
    }
  }, []);

  // jsx
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Suspense fallback={'loading...'}>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/projects' component={Projects} />
            <PrivateRoute exact path='/projects/:projectId' component={Project} />
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
