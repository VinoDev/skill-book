import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Features/Layout/Navbar.js';
import Landing from './Features/Layout/Landing.js';
import Register from './Features/Auth/Register.js';
import Login from './Features/Auth/Login.js';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar/>
          <Switch>
            <Route path='/' component={Landing} exact={true}></Route>
            <Route path="/register" component={Register} exact={true}></Route>
            <Route path="/login" component={Login} exact={true}></Route>
          </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
