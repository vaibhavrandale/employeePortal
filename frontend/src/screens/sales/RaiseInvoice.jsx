// import React from 'react';
// import { useParams } from 'react-router-dom';

// const RaiseInvoice = () => {
//   const { po_number } = useParams();
//   return <div className="container">RaiseInvoice -{po_number}</div>;
// };

// export default RaiseInvoice;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../utils';

import { Helmet } from 'react-helmet';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, scopeofwork: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_REQUEST':
      return { ...state, loadingCreate: true };

    case 'ADD_SUCCESS':
      return { ...state, scopeofwork: action.payload, loadingCreate: false };

    case 'ADD_FAIL':
      return { ...state, loadingCreate: false, error: action.payload };

    default:
      return state;
  }
};

const RaiseInvoice = () => {
  const { po_number } = useParams();
  const [{ loading, loadingCreate }, dispatch] = useReducer(reducer, {
    scopeofwork: {},
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();
  const [invoice_number, setinvoice_number] = useState('');
  const [invoice_value, setinvoice_value] = useState('');
  const [invoice_date, setinvoice_date] = useState('');
  const [committed_dispatch_date, setcommitted_dispatch_date] = useState('');
  const [expected_commisioning_date, setexpected_commisioning_date] =
    useState('');
  const [submittedBy, setSubmittedBy] = useState(userInfo.NAME);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = [];

    // if (!client_name) {
    //   missingFields.push('Please enter client Name');
    // }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(',\n ')}`);

      return;
    }
    dispatch({
      type: 'ADD_REQUEST',
    });
    try {
      const { data } = await axios.post(
        `/api/sales/raise-invoice/${po_number}`,
        {
          invoice_number,
          invoice_value,
          invoice_date,
          committed_dispatch_date,
          expected_commisioning_date,
          submittedBy,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'ADD_SUCCESS',
        payload: data,
      });
      // toast.success('Leave Approved Successfully', {
      //   position: 'bottom-right',
      // });
      toast.success('New invoice raised successfully');
      navigate(`/po-status`);
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'ADD_FAIL' });
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Raise Invoice Against PO-{po_number} </title>
      </Helmet>
      <h3 className="text-center fw-bold">
        Raise Invoice Against PO-
        <span className="text-danger">{po_number}</span>
      </h3>
      <div className=" p-2" style={{ maxWidth: '550px', margin: 'auto' }}>
        <form>
          <div className="mb-3">
            <label htmlFor="invoice_number" className="form-label">
              Invoice Number
            </label>
            <input
              type="text"
              className="inputField3 "
              id="invoice_number"
              name="invoice_number"
              value={invoice_number}
              onChange={(e) => setinvoice_number(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="invoice_value" className="form-label">
              Invoice Value
            </label>
            <input
              type="text"
              className="inputField3 "
              id="invoice_value"
              name="invoice_value"
              value={invoice_value}
              onChange={(e) => setinvoice_value(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="invoice_date" className="form-label">
              Invoice Date
            </label>
            <input
              type="date"
              className="inputField3 "
              id="invoice_date"
              name="invoice_date"
              value={invoice_date}
              onChange={(e) => setinvoice_date(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="committed_dispatch_date" className="form-label">
              committed Dispatch Date
            </label>
            <input
              type="date"
              className="inputField3 "
              id="committed_dispatch_date"
              name="committed_dispatch_date"
              value={committed_dispatch_date}
              onChange={(e) => setcommitted_dispatch_date(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expected_commisioning_date" className="form-label">
              expected commisioning Date
            </label>
            <input
              type="date"
              className="inputField3 "
              id="expected_commisioning_date"
              name="expected_commisioning_date"
              value={expected_commisioning_date}
              onChange={(e) => setexpected_commisioning_date(e.target.value)}
            />
          </div>

          <div className="mb-3 d-flex justify-content-end fw-bold">
            <Link
              type="submit"
              onClick={handleSubmit}
              className="btn btn-sm btn-warning"
            >
              {loadingCreate ? (
                <>
                  submitting...
                  <LoadingBox4 />
                </>
              ) : (
                'Submit'
              )}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseInvoice;
