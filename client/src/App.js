import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Features/layout/Navbar.js';
import AlertGroup from './Features/alert/AlertGroup.js';
import useLoadUser from './Features/auth/hooks/useLoadUser.js';
import Routes from "./Routes.js";

function App() {
  const loadUser = useLoadUser();
  useEffect(() => {
    loadUser()
  }, [loadUser]);

  return (
    <Router>
      <Fragment>
        <Navbar/>
        <AlertGroup/>    
        <Routes/>  
      </Fragment>
    </Router>
  );
}

export default App;
