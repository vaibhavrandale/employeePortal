import React, { useContext, useEffect, useReducer } from 'react';
import investmentData from './investment.js';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import TaxFile from './TaxFile.jsx';
import { Store } from '../../Store.js';

// import pdf from 'https://drive.google.com/file/d/1sxdUCwjVu0J22k0qWc_uF7l39OvN248s/view';

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

const ViewInvestment = () => {
  const { id } = useParams();
  const [{ loading, error, investment }, dispatch] = useReducer(reducer, {
    investment: {},
    loading: true,
    error: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const SalaryData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          `/api/investment/${userInfo.employee_id}`
        );
        console.log(result);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.investment,
        });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    SalaryData();
  }, [userInfo.employee_id]);
  return (
    <div>
      {' '}
      <div className="container">
        <h3 className="text-center mt-4">
          View Investment Details -{' '}
          <span className="text-danger">{investment.Name}</span>
        </h3>
        <div className="card mt-4">
          <div className="card-body">
            <p className="card-text">Name : {investment.Name}</p>
            <p className="card-text">Employee ID: {investment.employee_id}</p>
            <p className="card-text">Email: {investment.email}</p>
            <p className="card-text">Regime: {investment.Regime}</p>
            <p className="card-text">Submitted At: {investment.submittedAt}</p>
            <hr />
            <h6>Investment Details:</h6>
            <ul className="list-group">
              <li className="list-group-item">A_80C: {investment.A_80C}</li>
              <li className="list-group-item">A_80CC: {investment.A_80CC}</li>

              <li className="list-group-item">B_80CCC: {investment.B_80CCC}</li>
              <li className="list-group-item">
                C_80CCD_1: {investment.C_80CCD_1}
              </li>
              <li className="list-group-item">D_80CCE: {investment.D_80CCE}</li>

              <li className="list-group-item">
                F_80CCD_2: {investment.F_80CCD_2}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvestment;
