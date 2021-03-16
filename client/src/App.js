import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Features/layout/Navbar.js';
import Landing from './Features/layout/Landing.js';
import NotFound from './Features/layout/NotFound.js';
import Register from './Features/Auth/Register.js';
import Login from './Features/Auth/Login.js';
import AlertGroup from './Features/Alert/AlertGroup.js';
import useLoadUser from './Features/Auth/hooks/useLoadUser.js';
import Dashboard from './Features/Dashboard/Dashboard.js';
import CreateProfile from './Features/profile/forms/CreateProfile.js'
import EditProfile from './Features/profile/forms/EditProfile.js'
import AddExperience from './Features/profile/forms/AddExperience.js'
import AddEducation from './Features/profile/forms/AddEducation.js'
import Profiles from './Features/profiles/Profiles.js';
import Profile from './Features/profile/Profile.js'
import Posts from './Features/posts/Posts.js'
import Post from './Features/post/Post.js';
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
        <AlertGroup/>      
        <Switch>
          <Route path='/' component={Landing} exact={true}></Route>
          <Route path="/register" component={Register} exact={true}></Route>
          <Route path="/login" component={Login} exact={true}></Route>
          <Route path='/profiles' component={Profiles} exact={true}/>
          <Route path='/Profile/:id' component={Profile} exact={true}/>
          <PrivateRoute path="/dashboard" component={Dashboard} exact={true}></PrivateRoute>
          <PrivateRoute path="/create-profile" component={CreateProfile} exact={true}></PrivateRoute>
          <PrivateRoute path="/edit-profile" component={EditProfile} exact={true}></PrivateRoute>
          <PrivateRoute path="/add-experience" component={AddExperience} exact={true}></PrivateRoute>
          <PrivateRoute path="/add-education" component={AddEducation} exact={true}></PrivateRoute>
          <PrivateRoute path="/posts" component={Posts} exact={true}></PrivateRoute>
          <PrivateRoute path="/posts/:id" component={Post} exact={true}></PrivateRoute>
          <Route component={NotFound}></Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
