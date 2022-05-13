import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/auth.action';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Register.css';

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { authenticated, loading } = useSelector((state) => state.auth);

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(email, password,confirmPassword,role))
  };
  if (authenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="register">
      <form onSubmit={registerHandler} className="register__form">
        <h3 className="register__title">Register</h3>
        <div className="register__form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register__form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="register__form-group">
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Enter Password Again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register__btn register__btn-primary">
          Register As Admin
        </button>
        {loading && <CircularProgress className="loader" size={20} />}

        <span className="register__subtext">
          Already have an account?<Link to="/">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
