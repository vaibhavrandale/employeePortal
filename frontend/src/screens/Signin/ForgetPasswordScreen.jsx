import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Taypro.png';
import './Signin.css';
import '../../App.css';
import { toast } from 'react-hot-toast';
// import data from '../Employee/data';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';

const ForgetPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // 1. Add a Loading State

  const { state } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before sending the email

    try {
      const { data } = await axios.post('/api/employees/forget-password', {
        email,
      });

      toast.success(data.message);
      console.log(data);
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setLoading(false); // Set loading to false once the email is sent
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/', { replace: true }); // Use "replace: true" to avoid adding a new entry to the history
    }
  }, [navigate, userInfo]);

  return (
    <>
      <section className="signin">
        {' '}
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
            <h5
              className="text-decoration-none"
              style={{ zIndex: '5', fontWeight: 'bold' }}
            >
              Forget Password
            </h5>
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
                required
                type="email"
                class="inputField"
                id="username"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button id="button" type="submit">
              {' '}
              {loading ? 'Sending...' : 'Continue'}
            </button>
            <Link to={`/signin`} class="forgotLink">
              continue signin?
            </Link>
          </form>

          {/* <div className="break"></div>
          <Link to={`/signin`}>
            {' '}
            <div>
              <button
                type="button"
                className="mt-2 newacc btn btn-sm btn-light"
              >
                {' '}
                create new account
              </button>
            </div>
          </Link> */}
        </div>
      </section>
    </>
  );
};

export default ForgetPasswordScreen;
