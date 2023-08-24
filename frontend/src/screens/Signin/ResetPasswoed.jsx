import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from './Taypro.png';
import './Signin.css';
import '../../App.css';
import { toast } from 'react-hot-toast';
// import data from '../Employee/data';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';

const ResetPasswoed = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axios.post('/api/employees/reset-password', {
        password,
        token,
      });
      navigate('/signin');
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
    }
  };

  useEffect(() => {
    if (userInfo || !token) {
      navigate('/', { replace: true }); // Use "replace: true" to avoid adding a new entry to the history
    }
  }, [navigate, userInfo, token]);

  return (
    <>
      <section>
        <title>Forgot Password ! </title>

        <div className="taypro-card ">
          <form action="" class="form_main" onSubmit={submitHandler}>
            <div className="taypro-logo">
              {
                <img
                  src={logo}
                  alt=""
                  height={85}
                  width={150}
                  style={{ objectFit: 'contain' }}
                  // className="border rounded"
                />
              }
            </div>
            <p class="" style={{ zIndex: '5', fontWeight: 'bold' }}>
              Reset Password
            </p>
            <div class="inputContainer">
              <svg
                class="inputIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#2e2e2e"
                viewBox="0 0 16 16"
              >
                <path d="M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11zm.5-.5A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 13.5 2h-11z" />
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2z" />
              </svg>

              <input
                class="inputField"
                id="username"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Enter new Password"
              />
            </div>
            <div class="inputContainer">
              <svg
                class="inputIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#2e2e2e"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <div className="password-wrapper">
                <input
                  className="inputField"
                  id="password"
                  placeholder="Confirm new Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  type={showPassword ? 'text' : 'password'}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fas fa-eye"></i>
                  ) : (
                    <i className="fas fa-eye-slash"></i>
                  )}

                  {/* You can replace these emojis with your preferred icons */}
                </span>
              </div>
            </div>{' '}
            <button id="button" type="submit">
              Reset
            </button>
          </form>{' '}
        </div>
      </section>
    </>
  );
};

export default ResetPasswoed;
