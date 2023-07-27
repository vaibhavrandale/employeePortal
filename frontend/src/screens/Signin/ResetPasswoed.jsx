import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

const ResetPasswoed = () => {
  const [{ loading, error, loadingSignin }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
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
      toast.success('Password updated successfully', {
        position: 'bottom-right',
      });
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

  const ShowPasswordHanfler = async (e) => {
    setShowPassword(e.target.checked);
  };

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
            <h2 className="text-center fw-bolder tayproHeading">L O G I N</h2>
            <div className="taypro-from">
              <label>Enter new password </label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                className="input"
              />
              <br />

              <label>Confirm new password </label>
              <br />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type={showPassword ? 'text' : 'password'}
                className="input"
              />
              <br />
              <div
                className="d-flex justify-content-end"
                style={{ width: '270px' }}
              >
                {' '}
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={ShowPasswordHanfler}
                  style={{}}
                />
                <span className="ms-1 text-light">show</span>{' '}
              </div>

              <button className="signin-button" type="submit">
                Continue {loadingSignin && <LoadingBox1 />}
              </button>
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

export default ResetPasswoed;
