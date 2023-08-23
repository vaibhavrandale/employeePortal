import React from 'react';
import './Employee.css';
import Table from './Table';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function Employee() {
  return (
    <>
      <div className="heading d-flex justify-content-between navlinks">
        <nav
          style={{ '--bs-breadcrumb-divider': "'>'" }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                Home
              </Link>{' '}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Employees
            </li>
          </ol>
        </nav>{' '}
      </div>
      <div className="container">
        <Helmet>
          <title>Employees</title>
        </Helmet>
        <Table />
      </div>
    </>
  );
}

export default Employee;
