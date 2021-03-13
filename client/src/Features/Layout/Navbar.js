import { NavLink } from 'react-router-dom';
import useLogout from '../Auth/hooks/useLogout.js'

const Navbar = () => {

  const [ logoutUser, isAuthenticated, loading ] = useLogout();

  const authLinks = (
    <ul>
      <li>
        <NavLink to='/profiles'>
          <span>Professionals</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard'>
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <a onClick={logoutUser} href="/">logout</a>
      </li>
    </ul>   
  )

  const guestLinks = (
    <ul>
      <li>
        <NavLink to="/profiles">Professionals</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  )

  return (
      <nav className="navbar bg-dark">
        <h1>
          <NavLink to="/"><i className="fas fa-code"></i> SkillBook</NavLink>
        </h1>
        { !loading && <div>{ isAuthenticated ? authLinks : guestLinks }</div>}
      </nav>
  )
}

export default Navbar;