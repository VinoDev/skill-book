import { NavLink } from 'react-router-dom';
import useLogout from '../Auth/useLogout.js'

const Navbar = () => {

  const [ logoutUser, isAuthenticated, loading ] = useLogout();

  const authLinks = (
    <ul>
      <li><a onClick={logoutUser} href="/#!">logout</a></li>
    </ul>   
  )

  const guestLinks = (
    <ul>
      <li><NavLink to="/profiles">Professionals</NavLink></li>
      <li><NavLink to="/register">Register</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
    </ul>
  )

  return (
      <nav className="navbar bg-dark">
        <h1>
          <a href="index.html"><i className="fas fa-code"></i> SkillBook</a>
        </h1>
        { !loading && <div>{ isAuthenticated ? authLinks : guestLinks }</div>}
      </nav>
  )
}

export default Navbar;