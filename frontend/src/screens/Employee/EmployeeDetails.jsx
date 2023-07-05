import React, { useState, useEffect } from 'react';
import data from './data';
import './Employee.css';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import AlertBox from '../../components/MessageBox/AlertBox';

const EmployeeDetails = () => {
  const { id: employee_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const foundEmployee = data.employees.find(
        (emp) => emp.employee_id === employee_id
      );
      setEmployee(foundEmployee);
      setLoading(false);
    };

    setLoading(true);
    setTimeout(fetchData, 1);

    fetchData();
  }, [employee_id]);

  // if (isLoading) {
  //   return <LoadingBox />;
  // }

  if (!employee) {
    return (
      <AlertBox className="alert alert-danger">
        Employee Not Found / Blocked
      </AlertBox>
    );
  }

  return (
    <div className="container">
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
            <span className="text-success">{employee.name}</span>
          </li>
        </ol>
      </nav>{' '}
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <h2>
            <span className="fw-bolder">{employee.name}</span> -
            <span>{employee.employee_id}</span>
          </h2>
          <div>
            <div className="d-flex flex-column justify-content-end align-items-end">
              <img
                src={employee.image}
                alt={employee.name}
                className="rounded"
                height={200}
                width={200}
              />
              <div className="form-group col-2">
                <label htmlFor="" className="ms-2 mt-1">
                  Update Image
                </label>
                <input
                  type="file"
                  placeholder="update image"
                  className="form-control border "
                />
              </div>
            </div>
            <p>
              <strong>Name:</strong> {employee.name}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.mobile_no}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
