import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
          <h1>
            <a href="index.html"><i className="fas fa-code"></i> SkillBook</a>
          </h1>
          <ul>
            <li><NavLink to="/profiles">Professionals</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
        </nav>
    )
}

export default Navbar;