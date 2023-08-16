import React, { useEffect, useReducer } from 'react';
// import data from './data';
import './Employee.css';
import { Link, useParams } from 'react-router-dom';
// import LoadingBox from '../../components/LoadingBox';
// import AlertBox from '../../components/MessageBox/AlertBox';
import axios from 'axios';
// import { LuEdit } from 'react-icons/lu';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
// import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

import { MdVerified } from 'react-icons/md';
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
    employee: {},
    loading: true,
    error: '',
  });

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
        <LoadingBox3 />
      ) : (
        <>
          <div className="d-flex justify-content-lg-between flex-wrap">
            <h2>
              {' '}
              <div className="m-1 p-1 text-center ">
                <span className="fw-bolder">{employees.name}</span>-
                <span>{employees.employee_id}</span>
              </div>
            </h2>

            <div className="m-1 p-1 text-center">
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
                  />
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
                  ></i>
                </>
              )}
            </div>
          </div>

          <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                id=""
                src={employees.image}
                alt={employees.name}
                className="rounded m-2"
                height={200}
                width={200}
              />
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div
                className="card m-1 p-1"
                style={{ width: '320px', maxHeight: '600px' }}
              >
                <h4 className="mt-2 d-flex justify-content-center align-items-center">
                  <b>Personal Details</b>
                </h4>
                <hr />
                <p className="ps-2">
                  <strong>Name:</strong>

                  {employees.name}
                </p>
                <p className="ps-2">
                  <strong>Email:</strong> {employees.email}
                </p>
                <p className="ps-2">
                  <strong>Phone:</strong>

                  {employees.mobile_no}
                </p>

                <p className="ps-2">
                  <strong>Birth Date:</strong>

                  {employees.birth_date}
                </p>
                <p className="ps-2">
                  <strong>Age:</strong>

                  {employees.age}
                </p>

                <p className="ps-2">
                  {' '}
                  <strong>Designation:</strong>
                  {employees.designation}
                </p>
                <p className="ps-2">
                  <strong>joining Date:</strong>

                  {employees.joiningDate}
                </p>
                <p className="ps-2">
                  <strong>experience:</strong> {employees.experience}
                </p>
              </div>
              <div
                className="card m-1 p-1"
                style={{ width: '300px', maxHeight: '300px' }}
              >
                <h4 className="mt-2 d-flex justify-content-center align-items-center">
                  <b>Address Details</b>
                </h4>
                <hr />
                <p className="ps-2">
                  {' '}
                  <span className="badge bg-success"></span>
                  <strong>Address:</strong> {employees.address}
                </p>
                <p className="ps-2">
                  {' '}
                  <span className="badge bg-success"></span>
                  <strong>State:</strong> {employees.state}
                </p>
              </div>
              <div
                className="card m-1 p-1"
                style={{ width: '300px', maxHeight: '360px' }}
              >
                <h4 className="mt-2 d-flex justify-content-center align-items-center">
                  <b>Identity Details</b>
                </h4>
                <hr />
                <div className="ps-2 mb-2">
                  <p>
                    <strong>Adhar No:</strong> {employees.aadhar_no}
                  </p>
                </div>
                <div className="ps-2 mb-2">
                  <p>
                    <strong>Pan No:</strong> {employees.pan_number}
                  </p>
                </div>
                <div className="ps-2 mb-2">
                  <p>
                    <strong>Bank A/C No:</strong> {employees.bank_account_no}
                  </p>
                </div>

                <div className="ps-2 mb-2">
                  <p>
                    <strong>PF no:</strong> {employees.pf_account_no}
                  </p>
                </div>

                <div className="ps-2 mb-2">
                  <p>
                    <strong>UAN:</strong> {employees.uan_number}
                  </p>
                </div>
              </div>
            </div>
            <hr />

            <div className=" p-1 m-1 ">
              <h4>
                <b>Available Pay-slips</b>
              </h4>
              <div className="table-responsive">
                <table
                  className="table table-bordered "
                  style={{ overflowX: 'auto' }}
                >
                  <thead>
                    <tr>
                      <th className="col-md-1 text-center">Month</th>
                      <th className="col-md-1 text-center">Salary</th>
                      <th className="col-md-1 text-center">Bonus</th>
                      <th className="col-md-1 text-center">Deduction</th>
                      <th className="col-md-1 text-center">Deduction Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.payslips
                      .slice() // Create a copy of the array to avoid mutating the original array
                      .reverse() // Reverse the array to show the latest payslips first
                      .map((item, index) => (
                        <tr key={index}>
                          <td className=" text-center">
                            <span className="badge bg-success">
                              {item.month.toUpperCase()}-{item.year}
                            </span>{' '}
                          </td>
                          <td className="text-center">{item.salary}</td>
                          <td className="text-center">
                            {item.bonuses === 0 ? `0` : `${item.bonuses}`}
                          </td>
                          <td className="text-center">{item.deductions}</td>
                          <td className="text-center">
                            {item.deductionReason}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
