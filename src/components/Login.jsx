import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import LoginImage from "../assets/login.svg";
import '../css/login.css'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      navigate('/profile');
    }
    catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card-header">
            
            <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
            
            <h3>Enter details to login/sign-up</h3>
          </div>
          <div className="card-body mt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                
                <input
                  type="email"
                  className="form-control underline-input"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                />
              </div>
              <div className="mb-3">
                
                <input
                  type="password"
                  className="form-control underline-input"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
      <img src={LoginImage} className="login-image" alt="Login" />
    </div>
  );
};

export default Login;
