import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
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
              <Link to="/login"> Login</Link>
            </p>            
        </div>
    )
}

export default Login;