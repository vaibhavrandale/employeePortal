import React, { useState, useEffect, useReducer, useContext } from 'react';
// import data from './data';
import './Employee.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import LoadingBox from '../../components/LoadingBox';
// import AlertBox from '../../components/MessageBox/AlertBox';
import axios from 'axios';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import { Store } from '../../Store';
// import { Cursor } from 'mongoose';
import { MdVerified } from 'react-icons/md';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, employees: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};
const EmployeeDetails = () => {
  const { id } = useParams();
  const [{ loading, error, employees, loadingUpdate }, dispatch] = useReducer(
    reducer,
    {
      employees: {},
      loading: true,
      error: '',
    }
  );
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/details/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employee });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      setTimeout(() => {
        // setEmployees(result.data);
        // setLoading(false);
      }, 2000); // Simulating a 2-second delay
    };

    // setLoading(true);
    fetchData();
  }, [id]);

  const DeactivateHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axios.put(
        `/api/employees/activate/${id}`,
        {
          activate: false,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.employee });
      const customMessage = data.message;

      toast.success(customMessage);
      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const ActivateHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axios.put(
        `/api/employees/activate/${id}`,
        {
          activate: true,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.employee });
      const customMessage = data.message;

      toast.success(customMessage, {
        position: 'top-right',
      });
      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className="container">
      {/* {id} */}
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/employees" className="text-decoration-none">
              Employees
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Employees Details
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span className="text-success">{employees.name}</span>
          </li>
        </ol>
      </nav>{' '}
      {loading ? (
        <LoadingBox3 />
      ) : (
        <>
          <h2>
            <div className="d-flex justify-content-lg-between">
              <div className="">
                <span className="fw-bolder">{employees.name}</span> -
                <span>{employees.employee_id}</span>
              </div>

              <div className="">
                {' '}
                {employees.activate === 'true' ? (
                  <>
                    <span
                      className={`badge bg-success `}
                      style={{ fontSize: '15px' }}
                    >
                      activated
                    </span>
                    <MdVerified
                      className="fa fa-ban fs-5 ms-1 text-success "
                      style={{ cursor: 'pointer' }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="click here to activate"
                      onClick={DeactivateHandler}
                    />
                    {loadingUpdate && <LoadingBox4 />}
                  </>
                ) : (
                  <>
                    <span
                      className={`badge bg-danger`}
                      style={{ fontSize: '15px' }}
                    >
                      deactivated
                    </span>
                    <i
                      className="fa fa-ban fs-5 ms-1 text-danger "
                      style={{ cursor: 'pointer' }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="click here to deactivate"
                      onClick={ActivateHandler}
                    ></i>
                    {loadingUpdate && <LoadingBox4 />}
                  </>
                )}
              </div>
            </div>
          </h2>
          <div>
            <div className="d-flex flex-column justify-content-end align-items-end">
              <img
                id="profileImg"
                src={employees.image}
                alt={employees.name}
                className="rounded"
                height={200}
                width={200}
              />
              {/* <div className="form-group col-2">
                <label htmlFor="" className="ms-2 mt-1">
                  Update Image
                </label>
                <input
                  type="file"
                  placeholder="update image"
                  className="form-control border "
                />
              </div> */}
            </div>
            <p>
              <strong>Name:</strong> {employees.name}
            </p>
            <p>
              <strong>Email:</strong> {employees.email}
            </p>
            <p>
              <strong>Phone:</strong> {employees.mobile_no}
            </p>
            <p>
              <strong>joining Date:</strong> {employees.joiningDate}
            </p>
            <p>
              <strong>Birth Date:</strong> {employees.birth_date}
            </p>
            <p>
              <strong>Designation:</strong> {employees.designation}
            </p>

            <p>
              <strong>Address:</strong> {employees.address}
            </p>
            <p>
              <strong>State:</strong> {employees.state}
            </p>
            <p>
              <strong>Age:</strong> {employees.age}
            </p>
            <p>
              <strong>experience:</strong> {employees.experience}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
