import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import useAlert from '../Alert/useAlert.js';
import useRegister from "../Auth/useRegister.js";

const Register = () => {

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const createAlert = useAlert();
    const register = useRegister();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const { name, email, password, password2 } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            createAlert('Password do not match', 'danger');
            console.log('Passwords do not match');
        } else {
            register({ name, email, password })
            console.log("Registration complete");
        }
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name}
                        onChange={e => handleChange(e)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      minLength="6"
                      value={password}
                      onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="password2"
                      minLength="6"
                      value={password2}
                      onChange={e => handleChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
              Already have an account? 
              <Link to="/register"> Sign In</Link>
            </p>            
        </div>
    )
}

export default Register;