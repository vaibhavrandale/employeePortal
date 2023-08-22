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

      toast.success(data.message, {
        position: 'bottom-right',
      });
      console.log(data);
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
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
      <section>
        <title>Forgot Password ! </title>

        <div className="taypro-card ">
          <div className="taypro-logo">
            {
              <img
                src={logo}
                alt=""
                height={85}
                width={300}
                // className="border rounded"
              />
            }
          </div>

          <form onSubmit={submitHandler}>
            {' '}
            <h2 className="text-center fw-bolder tayproHeading">
              Forget Password
            </h2>
            <div className="taypro-from">
              <label>Enter you Email </label>
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                className="input"
              />
              <br />

              <button className="signin-button" type="submit">
                {loading ? 'Sending...' : 'Continue'}
              </button>
              <Link to={`/signin`} className="mt-2  forgotLink">
                continue signin?
              </Link>
            </div>
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
