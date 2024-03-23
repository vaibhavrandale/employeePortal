import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Store } from '../../Store.js';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4.js';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, scopeofwork: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_INVOICE_REQUEST':
      return { ...state, loadingInvoice: true };

    case 'FETCH_INVOICE_SUCCESS':
      return { ...state, raisinvoice: action.payload, loadingInvoice: false };

    case 'FETCH_INVOICE_FAIL':
      return { ...state, loadingInvoice: false, error: action.payload };

    default:
      return state;
  }
};

const PoStatus = () => {
  const [{ loading, loadingInvoice, scopeofwork, raisinvoice }, dispatch] =
    useReducer(reducer, {
      scopeofwork: [],
      raisinvoice: [],
      loading: true,
      loadingInvoice: false,
      error: '',
    });
  const [selectedPO, setSelectedPO] = useState('');
  const [PO_value, setPOValue] = useState(0);
  const [totalInvoiceValue, setTotalInvoiceValue] = useState(0);
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/sales/scopeofwork', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.scopeofwork });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [userInfo.token]);

  const handlePOSelect = async (event) => {
    const selectedPO = event.target.value;
    setSelectedPO(selectedPO);

    if (selectedPO) {
      dispatch({ type: 'FETCH_INVOICE_REQUEST' });

      try {
        const result = await axios.get(
          `/api/sales/raise-invoice-all/${selectedPO}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: 'FETCH_INVOICE_SUCCESS',
          payload: result.data.raisinvoice,
        });

        // Calculate PO value
        const povalue = scopeofwork
          .filter((work) => work.purchase_order_no === selectedPO)
          .reduce((total, work) => total + parseFloat(work.PO_value), 0);

        // Calculate total invoice value raised
        // const totalInvoice = result.data.raisinvoice.reduce(
        //   (total, invoice) => total + parseFloat(invoice.invoice_value),
        //   0
        // );

        const totalInvoice = result.data.raisinvoice
          .filter((work) => work.purchase_order_no === selectedPO)
          .reduce((total, work) => total + parseFloat(work.invoice_value), 0);

        console.log('PO Value:', povalue);
        console.log('Total Invoice Value Raised:', totalInvoice);

        setPOValue(povalue);
        setTotalInvoiceValue(totalInvoice);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          dispatch({ type: 'FETCH_INVOICE_SUCCESS', payload: [] });
        } else {
          dispatch({ type: 'FETCH_INVOICE_FAIL', payload: err.message });
        }
      }
    }
  };

  return (
    <div className="container">
      <h3 className="text-center fw-bold">PO status</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Select PO Number
            </label>
            <select
              className="inputField3"
              id="employeeSelect"
              onChange={handlePOSelect}
              value={selectedPO}
            >
              <option value="">Select</option>
              {scopeofwork.map((work) => (
                <option key={work.id} value={work.purchase_order_no}>
                  {work.purchase_order_no}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {loadingInvoice ? (
        <div>
          <LoadingBox4 />
        </div>
      ) : selectedPO && raisinvoice.length === 0 ? (
        <div>
          <h4 className="text-center">
            No invoices associated with this PO-{' '}
            <span className="text-danger fw-bold">{selectedPO}</span>
          </h4>
          <div className="d-flex justify-content-end">
            {' '}
            <Link
              className="btn btn-sm btn-warning m-1"
              to={`/raise-invoice/${selectedPO}`}
            >
              Raise Invoice
            </Link>{' '}
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th className="col-md-3">PO Number</th>
                  <th className="col-md-3">Client Name</th>
                  <th className="col-md-3">PO date</th>
                  {/* Add other PO fields here */}
                </tr>
              </thead>
              <tbody>
                {scopeofwork.map((work) => {
                  if (work.purchase_order_no === selectedPO) {
                    return (
                      <tr key={work.id}>
                        <td>{work.purchase_order_no}</td>
                        <td>{work.client_name}</td>
                        <td>{work.purchase_order_date}</td>
                        {/* Render other PO fields here */}
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : selectedPO ? (
        <>
          <div className="d-flex justify-content-between flex-wrap m-1">
            <span>
              PO Value - <span className="badge bg-success">{PO_value}</span>
            </span>
            <span>
              Total Invoice Raised -{' '}
              <span className="badge bg-warning">{totalInvoiceValue}</span>
            </span>
            <span>
              Remaining value -{' '}
              <span className="badge bg-danger">
                {PO_value - totalInvoiceValue}
              </span>
            </span>
          </div>

          <div className="d-flex justify-content-end">
            <Link
              className="btn btn-sm btn-warning m-1"
              to={`/raise-invoice/${selectedPO}`}
            >
              Raise Invoice
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th className="col-md-1 text-center">PO Number</th>
                  <th className="col-md-1 text-center">Client Name</th>
                  <th className="col-md-1 text-center">PO date</th>
                  <th className="col-md-1 text-center">Invoice Number</th>
                  <th className="col-md-1 text-center">Invoice Date</th>
                  <th className="col-md-1 text-center">Invoice Value</th>
                  <th className="col-md-1 text-center">
                    commited dispatch date
                  </th>
                  <th className="col-md-1 text-center">
                    expected commisioning date
                  </th>
                  <th className="col-md-1 text-center">last Update</th>
                  <th className="col-md-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {raisinvoice.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <span className="badge bg-success p-2">
                        {invoice.purchase_order_no}
                      </span>
                    </td>
                    <td>{invoice.client_name}</td>
                    <td>{invoice.purchase_order_date}</td>
                    <td>{invoice.invoice_number}</td>
                    <td>{invoice.invoice_date}</td>
                    <td>{invoice.invoice_value}</td>
                    <td>{invoice.committed_dispatch_date}</td>
                    <td>{invoice.expected_commisioning_date}</td>
                    <td>{invoice.submittedBy}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-warning m-1"
                        to={`/update-invoice/${invoice.invoice_number}`}
                      >
                        Update
                      </Link>
                      <Link className="btn btn-sm btn-danger m-1">Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default PoStatus;
