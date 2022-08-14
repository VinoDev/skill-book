import { Route, Switch } from 'react-router-dom';
import Landing from './Features/Layout/Landing.js';
import NotFound from './Features/Layout/NotFound.js';
import Register from './Features/Auth/Register.js';
import Login from './Features/Auth/Login.js';
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

const Routes = () => {
    return (
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
    )
}

export default Routes