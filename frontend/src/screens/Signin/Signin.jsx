import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from './Taypro.png';
import './Signin.css';
import '../../App.css';
import { toast } from 'react-hot-toast';
// import data from '../Employee/data';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/employees/signin', {
        email,
        password,
      });

      if (data.activate === 'true') {
        ctxDispatch({ type: 'EMP_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        // navigate('/');
        toast.success('Sign in Successfully', {
          position: 'top-right',
        });
        console.log(data);
        navigate(redirect || '/');
      } else {
        toast.error(
          'Your account has been blocked or is not yet activated. Please contact the admin.',
          {
            position: 'bottom-right',
          }
        );
      }
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  const ShowPasswordHanfler = async (e) => {
    setShowPassword(e.target.checked);
  };

  return (
    <>
      <section>
        <title>LogIn </title>

        <div className="taypro-card ">
          <div className="taypro-logo">
            {
              <img
                src={logo}
                alt=""
                height={85}
                width={200}
                style={{ objectFit: 'contain' }}
                // className="border rounded"
              />
            }
          </div>

          <form onSubmit={submitHandler}>
            {' '}
            <h5 className="text-center fw-bolder tayproHeading">
              Welcome back, <br />
              Please Login to continue
            </h5>
            <div className="taypro-from">
              <label>Email </label>
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                className="input"
              />
              <br />
              <label>Password</label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                // type="password"
                type={showPassword ? 'text' : 'password'}
                className="input"
              />
              <br />
              <div
                className="d-flex justify-content-end align-items-center"
                style={{ width: '270px' }}
              >
                <input
                  type="checkbox"
                  className="input3"
                  onChange={ShowPasswordHanfler}
                />
                <span className="ms-1 text-light">show</span>{' '}
              </div>
              <button className="signin-button" type="submit">
                {loading ? <LoadingBox4 /> : 'Continue'}
              </button>
              <Link to={`/forget-password`} className="mt-2  forgotLink">
                Forgot Password?
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

export default Signin;
