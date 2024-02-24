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
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link
              className="text-decoration-none"
              to={'/expenses-home'}
              // onClick={historyHandler}
            >
              Expenses
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {expense.sitename}
          </li>
        </ol>
      </nav>
      <h2 className="text-center">Expense Bill</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <LoadingBox4 />
        </div>
      ) : (
        <div id="expense">
          <div className="invoice-details d-flex justify-content-between">
            <div>
              <div className="my-2">
                <strong>Employee Name&nbsp;:</strong> {expense.employeeName}
              </div>
              <div className="my-2">
                <strong>
                  Employee ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>
                &nbsp;{expense.employee_id}
              </div>
              <div className="my-2">
                <strong>
                  Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{' '}
                {expense.email}
              </div>
            </div>
            <div>
              {' '}
              <div className="my-1">
                <strong>Site Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>{' '}
                {expense.sitename}
              </div>
              <div className="my-1">
                <strong>Site Location&nbsp;:</strong> {expense.siteLocation}
              </div>
              <div className="my-1">
                <strong>Start Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>{' '}
                {expense.startDate}
              </div>
              <div className="my-1">
                <strong>
                  End
                  Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{' '}
                {expense.endDate}
              </div>
            </div>
          </div>

          <div className="my-1 d-flex flex-column">
            <span>
              <strong>
                Advance
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :
              </strong>{' '}
              {expense.AdvanceAmount}
            </span>
            <span>
              <strong>Advance Amount Date &nbsp; :</strong>{' '}
              {expense.AdvanceAmountDate}
            </span>
          </div>

          <div className="table-responsive my-3">
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
                  expense.DaywiseExpenses.map((dayExpense) => (
                    <tr key={dayExpense.id}>
                      <td className="text-center">{dayExpense.id}</td>
                      <td className="text-center">{dayExpense.date}</td>
                      <td className="text-center">{dayExpense.expense}</td>
                      <td className="text-center">{dayExpense.price}</td>
                      <td className="text-center">
                        <Link
                          type="button"
                          className="btn btn-sm btn-success p-1"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal_${dayExpense.id}`}
                        >
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
                  <span className="badge p-2 bg-success">Approved</span>
                </span>
              ) : (
                <span className=" d-flex flex-column">
                  <span className="badge bg-warning m-1">Pending</span>
                  <span className="badge  bg-warning m-1">Pending</span>
                </span>
              )}
              {expense.ApprovedBy2 !== '' ? (
                <span className=" d-flex flex-column">
                  <span>{expense.ApprovedBy2}</span>
                  <span className="badge p-2 bg-success">Approved</span>{' '}
                </span>
              ) : (
                <span className=" d-flex flex-column">
                  <span className="badge bg-warning m-1">Pending</span>
                  <span className="badge  bg-warning m-1">Pending</span>
                </span>
              )}

              {expense.Settled === 1 ? (
                <span className=" d-flex flex-column">
                  <span>{expense.SettledBy}</span>
                  <span className="badge p-2 bg-success">settled</span>
                </span>
              ) : (
                <span className=" d-flex flex-column">
                  <span className="badge  bg-warning m-1">pending</span>
                  <span className="badge  bg-warning m-1">Pending</span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewExpense;
