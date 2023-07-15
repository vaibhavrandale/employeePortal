import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Signin = () => {
  const [{ loading, error, loadingSignin }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   // Check if the entered email and password match any employee
    //   const employee = data.employees.find(
    //     (emp) => emp.email === email && emp.employee_id === password
    //   );
    //   if (employee) {
    //     if (employee.activate === true) {
    //       // Check if the account is active
    //       toast.success('Sign in successful', {
    //         position: 'bottom-right',
    //       });
    //       navigate('/');
    //       localStorage.setItem('userInfo', JSON.stringify(data));
    //     } else {
    //       toast.error(
    //         'your account has been blocked or yet to activate. Please contact to admin',
    //         {
    //           position: 'bottom-right',
    //         }
    //       );
    //     }
    //   } else {
    //     toast.error('Invalid credentials', {
    //       position: 'bottom-right',
    //     });
    //   }
    // } catch (err) {
    //   alert(err);
    // }

    //   try {
    //     const { data } = await axios.post('/api/employees/signin', {
    //       email,
    //       password,
    //     });
    //     ctxDispatch({ type: 'EMP_SIGNIN', payload: data });
    //     localStorage.setItem('userInfo', JSON.stringify(data));
    //     navigate('/');
    //     toast.success('Sign in Successfully', {
    //       position: 'bottom-right',
    //     });
    //     console.log(data);
    //   } catch (err) {
    //     toast.error(getError(err), {
    //       position: 'bottom-right',
    //     });
    //   }
    // };

    try {
      const { data } = await axios.post('/api/employees/signin', {
        email,
        password,
      });

      if (data.activate === 'true') {
        ctxDispatch({ type: 'EMP_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
        toast.success('Sign in Successfully', {
          position: 'bottom-right',
        });
        console.log(data);
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
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

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
                width={300}
                // className="border rounded"
              />
            }
          </div>

          <form onSubmit={submitHandler}>
            {' '}
            <h1 className="text-center">L O G I N</h1>
            <div className="taypro-from">
              <label>Email </label>
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
              <br />
              <label>Password</label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
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

export default Signin;
