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
      return { ...state, raisinvoice: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_REQUEST':
      return { ...state, loadingCreate: true };

    case 'ADD_SUCCESS':
      return { ...state, raisinvoice: action.payload, loadingCreate: false };

    case 'ADD_FAIL':
      return { ...state, loadingCreate: false, error: action.payload };

    default:
      return state;
  }
};

const UpdateRaisedInvoice = () => {
  const { invoicenumber } = useParams();
  const [{ loading, loadingCreate, raisinvoice }, dispatch] = useReducer(
    reducer,
    {
      raisinvoice: {},
      loading: true,
      error: '',
    }
  );

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

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/sales/raise-invoice/${invoicenumber}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.raisinvoice });
        console.log(result.data);

        setinvoice_number(result.data.raisinvoice.invoice_number);
        setinvoice_value(result.data.raisinvoice.invoice_value);
        setinvoice_date(result.data.raisinvoice.invoice_date);
        setcommitted_dispatch_date(
          result.data.raisinvoice.committed_dispatch_date
        );
        setexpected_commisioning_date(
          result.data.raisinvoice.expected_commisioning_date
        );

        // setClientName(result.data.scopeofwork.client_name);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [invoicenumber, userInfo.token]);

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
      const { data } = await axios.put(
        `/api/sales/raise-invoice/${invoicenumber}`,
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
      toast.success(`invoice - ${invoice_number} successfully`);
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
        <title>{`Update Invoice Against PO ${raisinvoice.purchase_order_no}`}</title>
      </Helmet>
      <h3 className="text-center fw-bold">
        Update Invoice Against PO-
        <span className="text-danger">{raisinvoice.purchase_order_no}</span>
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
                  Updating...
                  <LoadingBox4 />
                </>
              ) : (
                'Update'
              )}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRaisedInvoice;
