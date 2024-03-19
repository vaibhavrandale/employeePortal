import React, { useContext, useEffect, useReducer } from 'react';

import investmentData from './investment.js';
import { Store } from '../../Store.js';
import { Link } from 'react-router-dom';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, investment: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
const MyInvestment = () => {
  const [{ loading, error, investment }, dispatch] = useReducer(reducer, {
    investment: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        // Simulate fetching data from investment data based on the provided id
        const investmentFound = investmentData.find(
          (item) => item.employee_id === userInfo.employee_id
        );
        if (investmentFound) {
          dispatch({ type: 'FETCH_SUCCESS', payload: investmentFound });
        } else {
          // throw new Error('Investment not found');
          alert('not found');
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [investment, userInfo.employee_id]);
  console.log(investment);
  return (
    <div className="container">
      <h3 className="text-center mt-4">
        Investment Details -{' '}
        <span className="text-danger">{investment.Name}</span>
      </h3>
      <div className="card m-2 ">
        <div className="card-body">
          <p className="card-text">Name : {investment.Name}</p>
          <p className="card-text">Employee ID: {investment.employee_id}</p>
          <p className="card-text">Email: {investment.email}</p>
          <p className="card-text">Regime: {investment.Regime}</p>
          <p className="card-text">Submitted At: {investment.submittedAt}</p>
          <hr />
          <h6>Investment Details:</h6>
          <ul className="list-group">
            <li className="list-group-item">A_80CC: {investment.A_80CC}</li>

            <li className="list-group-item">B_80CCC: {investment.B_80CCC}</li>
            <li className="list-group-item">
              C_80CCD_1: {investment.C_80CCD_1}
            </li>
            <li className="list-group-item">D_80CCE: {investment.D_80CCE}</li>
            <li className="list-group-item">
              E_80CCD_1B: {investment.E_80CCD_1B}
            </li>
            <li className="list-group-item">
              F_80CCD_2: {investment.F_80CCD_2}
            </li>
          </ul>
          <div className="m-1 d-flex justify-content-end">
            <Link
              className="btn btn-sm btn-warning fw-bold "
              to={`/update-investment/${investment.id}`}
            >
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInvestment;
