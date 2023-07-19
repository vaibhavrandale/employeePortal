import React, { useState, useEffect, useReducer } from 'react';
// import data from './data';
import './Employee.css';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
// import AlertBox from '../../components/MessageBox/AlertBox';
import axios from 'axios';
import { LuEdit } from 'react-icons/lu';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
const Profile = () => {
  const { id } = useParams();
  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    employees: {},
    loading: true,
    error: '',
  });

  // const [loading, setLoading] = useState(true);
  // const [employee, setEmployee] = useState(null);

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

  // useEffect(() => {
  //   const fetchData = () => {
  //     const foundEmployee = data.employees.find(
  //       (emp) => emp.employee_id === employee_id
  //     );
  //     setEmployee(foundEmployee);
  //     setLoading(false);
  //   };

  //   setLoading(true);
  //   setTimeout(fetchData, 1);

  //   fetchData();
  // }, [employee_id]);

  // if (isLoading) {
  //   return <LoadingBox />;
  // }

  // if (!employee) {
  //   return (
  //     <AlertBox className="container alert alert-danger">
  //       Employee Not Found / Blocked
  //     </AlertBox>
  //   );
  // }

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
            <Link to="#" className="text-decoration-none">
              Profile
            </Link>{' '}
          </li>
        </ol>
      </nav>{' '}
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <h2>
            <span className="fw-bolder">{employees.name}</span> -
            <span>{employees.employee_id}</span>
          </h2>
          <Link className="text-decoration-none">
            {' '}
            Edit Profile&nbsp;
            <LuEdit className="pb-1 fs-5" />
          </Link>
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

export default Profile;
