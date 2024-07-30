import React, { useState, useContext } from 'react';
import { HosterContext } from '../context/HosterContext';
import { useNavigate } from 'react-router-dom';

const HosterRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(HosterContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/hoster_login');
    } catch (error) {
      console.error('Error registering hoster:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card-header">
          <i className="fa-solid fa-arrow-left me-2" onClick={() => navigate('/hoster_login')}></i>
            <h3>Register as a Hoster</h3>
          </div>
          <div className="card-body mt-5">
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <input
                    type="text"
                    className="form-control underline-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control underline-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control underline-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HosterRegister;
