import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import expenses from './expenses';
import { IoEyeOutline } from 'react-icons/io5';
import { Store } from '../../Store';
import axios from 'axios';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, expense: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const ViewExpense = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, loadingUpload, expense }, dispatch] = useReducer(reducer, {
    expense: {
      DaywiseExpenses: [], // Initialize DaywiseExpenses as an empty array
    },
    loading: true,
    error: '',
  });

  const { id } = useParams();

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/expenses/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.expense });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [id]);

  //   const expense = expenses.find((e) => e.id === parseInt(id, 10));

  if (!expense) {
    return <div className="container">Expense not found</div>;
  }

  // Calculate the total amount
  const totalAmount = expense.DaywiseExpenses.reduce(
    (total, dayExpense) => total + parseFloat(dayExpense.price),
    0
  );

  //   const totalAmount = 1000;

  return (
    <div className="container">
      {/* <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link
              className="text-decoration-none"
              to={
                userInfo.isSuperAdmin === 1
                  ? '/expenses-home'
                  : `/my-expenses-home/${userInfo.employee_id}`
              }
            >
              Expenses
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {expense.sitename}
          </li>
        </ol>
      </nav> */}
      <h2 className="text-center">Expense Bill</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <LoadingBox4 />
        </div>
      ) : (
        <div id="expense">
          {/* <Link
            className="btn btn-sm btn-success p-2"
            to={`/export-expense/${id}`}
          >
            Export
          </Link> */}
          <div
            className=" container"
            style={{
              maxWidth: '70vw',
              margin: 'auto',
              boxShadow:
                '0 3px 7px 0 rgba(0, 0, 0, 0.13), 0 1px 2px 0 rgba(0, 0, 0, 0.11)',
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="mb-2 p-2">
                  <strong>Employee Name :</strong> {expense.employeeName}
                </div>
                <div className="mb-2 p-2">
                  <strong>Employee ID :</strong> {expense.employee_id}
                </div>
                <div className="mb-2 p-2">
                  <strong>Email :</strong> {expense.email}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-2 p-2">
                  <strong>Site Name :</strong> {expense.sitename}
                </div>
                <div className="mb-2 p-2">
                  <strong>Site Location :</strong> {expense.siteLocation}
                </div>
                <div className="mb-2 p-2">
                  <strong>Start Date :</strong>{' '}
                  {new Date(expense.startDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
                <div className="mb-2 p-2">
                  <strong>End Date :</strong>{' '}
                  {new Date(expense.endDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-md-6">
                <div className="mb-2 p-2">
                  <strong>Advance :</strong> {expense.AdvanceAmount}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-2 p-2">
                  <strong>Advance Amount Date :</strong>{' '}
                  {new Date(expense.AdvanceAmountDate).toLocaleDateString(
                    'en-GB',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="table-responsive ">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center">Serial</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Expense</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Bill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expense.DaywiseExpenses &&
                        expense.DaywiseExpenses.map((dayExpense, index) => (
                          <tr key={dayExpense.id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">
                              {dayExpense.date && (
                                <>
                                  {new Date(dayExpense.date).toLocaleDateString(
                                    'en-GB',
                                    {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                    }
                                  )}
                                </>
                              )}
                            </td>
                            <td className="text-center">
                              {dayExpense.expense}
                            </td>
                            <td className="text-center">{dayExpense.price}</td>
                            <td className="text-center">
                              <Link
                                type="button"
                                className="btn btn-sm btn-success p-1"
                                data-bs-toggle="modal"
                                data-bs-target={`#exampleModal_${dayExpense.id}`}
                              >
                                view
                                <IoEyeOutline />
                              </Link>

                              <div
                                className="modal fade"
                                id={`exampleModal_${dayExpense.id}`}
                                tabIndex="-1"
                                aria-labelledby={`exampleModal_${dayExpense.id}`}
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id={`exampleModal_${dayExpense.id}`}
                                      >
                                        {dayExpense.expense} Bill
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <img
                                        src={dayExpense.img}
                                        alt={`${dayExpense.expense} Bill`}
                                        style={{ maxWidth: '300px' }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}

                      {/* Total row */}
                      <tr>
                        <td className="text-center" colSpan="2"></td>
                        <td className="text-center fw-bold">Total</td>
                        <td className="text-center fw-bold">{totalAmount}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>

                  {totalAmount > expense.AdvanceAmount ? (
                    <div className="d-flex justify-content-end ">
                      <span className="badge bg-success p-2">
                        TFC - {totalAmount - expense.AdvanceAmount}
                      </span>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end ">
                      <span className="badge bg-danger p-2">
                        RTC - {expense.AdvanceAmount - totalAmount}
                      </span>
                    </div>
                  )}

                  <hr />

                  <div className="d-flex justify-content-between">
                    {expense.ApprovedBy !== '' ? (
                      <span className=" d-flex flex-column">
                        <span>{expense.ApprovedBy}</span>
                        <span className="badge px-2 py-2 bg-success">
                          Approved 1
                        </span>
                      </span>
                    ) : (
                      <span className=" d-flex flex-column">
                        <span className="badge bg-warning p-2 m-1">
                          Pending
                        </span>
                        <span className="badge  bg-warning p-2 m-1">
                          Pending
                        </span>
                      </span>
                    )}
                    {expense.ApprovedBy2 !== '' ? (
                      <span className=" d-flex flex-column">
                        <span>{expense.ApprovedBy2}</span>
                        <span className="badge px-3 py-2 bg-success">
                          Approved 2
                        </span>{' '}
                      </span>
                    ) : (
                      <span className=" d-flex flex-column">
                        <span className="badge bg-warning p-2 m-1">
                          Pending
                        </span>
                        <span className="badge  bg-warning p-2 m-1">
                          Pending
                        </span>
                      </span>
                    )}

                    {expense.Settled === 1 ? (
                      <span className=" d-flex flex-column">
                        <span>{expense.SettledBy}</span>
                        <span className="badge p-2 bg-success">settled</span>
                      </span>
                    ) : (
                      <span className=" d-flex flex-column">
                        <span className="badge  bg-warning m-1 p-2">
                          Pending
                        </span>
                        <span className="badge  bg-warning p-2 m-1">
                          Pending
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewExpense;
