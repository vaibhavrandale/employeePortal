import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingInvestment: true };

    case 'FETCH_SUCCESS':
      return { ...state, investment: action.payload, loadingInvestment: false };

    case 'FETCH_FAIL':
      return { ...state, loadingInvestment: false, error: action.payload };

    default:
      return state;
  }
};

const AllEmployeeInvestment = () => {
  const [{ loading, error, investment, loadingInvestment }, dispatch] =
    useReducer(reducer, {
      investment: [],
      loading: true,
      error: '',
    });

  useEffect(() => {
    const SalaryData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/investment`);
        console.log(result);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.investment,
        });
        // console.log(result.data.employee.address);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    SalaryData();
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>All Employee Investment</title>
      </Helmet>
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
              <th className="text-center">Employee ID</th>
              <th className="text-center">Employee Name</th>
              <th className="text-center">Employee Email</th>
              <th className="text-center">Regime</th>
              <th className="text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {loadingInvestment ? (
              <tr className="text-center">
                <LoadingBox4 />
              </tr>
            ) : (
              investment.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <Link
                      to={`/investment/${item.employee_id}`}
                      className=" fw-bold m-1"
                    >
                      {item.employee_id}
                    </Link>
                  </td>
                  <td className="text-center">{item.Name}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">{item.Regime}</td>
                  <td className="text-center">
                    <Link
                      className="btn btn-sm btn-warning fw-bold m-1"
                      to={`/update-investment/${item.employee_id}`}
                    >
                      UPDATE
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeInvestment;
