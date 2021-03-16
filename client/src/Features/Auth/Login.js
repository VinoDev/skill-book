import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import useLogin from "./hooks/useLogin.js";

const Login = () => {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const [ login ] = useLogin();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const { email, password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        login({ email, password });
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="container">
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><i className="fas fa-user"></i> Login To Your Account</p>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={email}
                        required
                        onChange={e => handleChange(e)}
                    />
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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
              Dont have an account? 
              <Link to="/register"> Register</Link>
            </p>            
        </div>
    )
}

export default Login;