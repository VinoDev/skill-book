import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Features/Layout/Navbar.js';
import Landing from './Features/Layout/Landing.js';
import Register from './Features/Auth/Register.js';
import Login from './Features/Auth/Login.js';
import AlertGroup from './Features/Alert/AlertGroup.js';
import useLoadUser from './Features/Auth/useLoadUser.js';
import Dashboard from './Features/Dashboard/Dashboard.js';
import CreateProfile from './Features/profile/forms/CreateProfile.js'
import PrivateRoute from './utils/PrivateRoute.js';

function App() {
  const loadUser = useLoadUser();
  useEffect(() => {
    loadUser()
  }, [loadUser]);

  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route path='/' component={Landing} exact={true}></Route>
        <AlertGroup/>      
        <Switch>
          <Route path="/register" component={Register} exact={true}></Route>
          <Route path="/login" component={Login} exact={true}></Route>
          <PrivateRoute path="/dashboard" component={Dashboard} exact={true}></PrivateRoute>
          <PrivateRoute path="/create-profile" component={CreateProfile} exact={true}></PrivateRoute>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
