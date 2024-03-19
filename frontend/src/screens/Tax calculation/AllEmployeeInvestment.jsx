import React from 'react';
import investment from './investment.js';
import { Link } from 'react-router-dom';
const AllEmployeeInvestment = () => {
  return (
    <div className="container">
      <h3 className="text-center fw-bold">All Employee Investment</h3>
      <div className="d-flex justify-content-end">
        <Link
          className="btn btn-sm btn-warning"
          to="/investment-declaration-form"
        >
          Add
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Submited On</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {investment.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/investment/${item.id}`} className=" fw-bold m-1">
                    {item.employee_id}
                  </Link>
                </td>
                <td>{item.Name}</td>
                <td>{item.email}</td>
                <td>{item.submittedAt}</td>
                <td>
                  <Link
                    className="btn btn-sm btn-warning fw-bold m-1"
                    to={`/update-investment/${item.id}`}
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeInvestment;
