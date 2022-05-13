import { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="resetpassword">
      <form onSubmit={resetPasswordHandler} className="resetpassword__form">
        <h3 className="resetpassword__title">Reset Password</h3>
        <div className="resetpassword__form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="resetpassword__form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="resetpassword__btn resetpassword__btn-primary"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
