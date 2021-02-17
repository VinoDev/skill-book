import './App.css';
import { Fragment } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from "./store.js";
import Navbar from './Features/Layout/Navbar.js';
import Landing from './Features/Layout/Landing.js';
import Register from './Features/Auth/Register.js';
import Login from './Features/Auth/Login.js';
import AlertGroup from './Features/Alert/AlertGroup.js';

function App() {
  return (
    <Router>
      <Provider store={store}>
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
      </Provider>
    </Router>
  );
}

export default App;
