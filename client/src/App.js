// ------------imports---------------
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import setAuthHeader from './Utils/setAuthHeader';
// ------------end imports-----------

// code splitting with react lazy (our pages)
const Home = lazy(() => import('./Pages/Home/Home'));
const Login = lazy(() => import('./Pages/Login/Login'));
// end

function App() {
  // jsx
  return (
    <Router>
      <div className='App'>
        <Suspense fallback={'loading...'}>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
