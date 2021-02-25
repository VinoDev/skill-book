import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Features/Layout/Navbar.js';
import Landing from './Features/Layout/Landing.js';
import Register from './Features/Auth/Register.js';
import Login from './Features/Auth/Login.js';
import AlertGroup from './Features/Alert/AlertGroup.js';
import useLoadUser from './Features/Auth/useLoadUser.js';

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
        <div className="container">
          <AlertGroup/>
          <Switch>
            <Route path="/register" component={Register} exact={true}></Route>
            <Route path="/login" component={Login} exact={true}></Route>
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
