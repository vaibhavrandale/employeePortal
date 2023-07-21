import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Taypro.png';
import './Signin.css';
import '../../App.css';
import { toast } from 'react-hot-toast';
// import data from '../Employee/data';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import LoadingBox1 from '../../components/LoadingBox1';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingSignin: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingSignin: false };
    case 'CREATE_FAIL':
      return { ...state, loadingSignin: false };

    default:
      return state;
  }
};

const ForgetPasswordScreen = () => {
  const [{ loading, error, loadingSignin }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();

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
              />
              <br />

              <button className="signin-button" type="submit">
                Continue {loadingSignin && <LoadingBox1 />}
              </button>
              <Link to={`/signin`} className="mt-2  text-decoration-none">
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
