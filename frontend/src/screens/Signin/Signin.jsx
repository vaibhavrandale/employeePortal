import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from '../../../public/images/';
import './Signin.css';
import '../../App.css';
import { toast } from 'react-hot-toast';
import data from '../Employee/data';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Check if the entered email and password match any employee
      const employee = data.employees.find(
        (emp) => emp.email === email && emp.employee_id === password
      );
      if (employee) {
        if (employee.activate === true) {
          // Check if the account is active
          toast.success('Sign in successful', {
            position: 'bottom-right',
          });
          navigate('/');
          localStorage.setItem('userInfo', JSON.stringify(data));
        } else {
          toast.error(
            'your account has been blocked or yet to activate. Please contact to admin',
            {
              position: 'bottom-right',
            }
          );
        }
      } else {
        toast.error('Invalid credentials', {
          position: 'bottom-right',
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <section>
        <title>LogIn </title>
        <div className="amazon-logo">{/* <img src={logo} alt="" /> */}</div>
        <div className="amazon-card container">
          <form onSubmit={submitHandler}>
            {' '}
            <h1>Login</h1>
            <div className="amazon-from">
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
              <button className="amazon-button" type="submit">
                Continue
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
