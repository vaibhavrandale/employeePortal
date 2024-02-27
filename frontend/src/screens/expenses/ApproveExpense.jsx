import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../../Store';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { GrAddCircle } from 'react-icons/gr';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, fetchLoading: true };

    case 'FETCH_SUCCESS':
      return { ...state, expenses: action.payload, fetchLoading: false };

    case 'FETCH_FAIL':
      return { ...state, fetchLoading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, fetchLoading: true };

    case 'UPDATE_SUCCESS':
      return { ...state, expenses: action.payload, fetchLoading: false };

    case 'UPDATE_FAIL':
      return { ...state, fetchLoading: false, error: action.payload };

    case 'UPLOAD_DOCUMENT_REQUEST':
      return { ...state, loadingDocumentUpload: true, errorDocumentUpload: '' };
    case 'UPLOAD_DOCUMENT_SUCCESS':
      return {
        ...state,
        loadingDocumentUpload: false,
        errorDocumentUpload: '',
      };
    case 'UPLOAD_DOCUMENT_FAIL':
      return {
        ...state,
        loadingDocumentUpload: false,
        errorDocumentUpload: action.payload,
      };

    default:
      return state;
  }
};

const ApproveExpense = () => {
  // Employee Details
  const { id } = useParams();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, loadingUpload, expenses, loadingDocumentUpload, fetchLoading },
    dispatch,
  ] = useReducer(reducer, {
    expenses: {},
    loading: true,
    error: '',
  });
  const navigate = useNavigate();

  const [employeeName, setEmployeeName] = useState(userInfo.NAME);
  const [employee_id, setEmployeeId] = useState(userInfo.employee_id);
  const [email, setEmail] = useState(userInfo.email);

  // Site Information
  const [sitename, setSitename] = useState('');
  const [siteLocation, setSiteLocation] = useState('');

  // Dates and Status
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState(0);

  // Approval Information
  const [ApprovedBy, setApprovedBy] = useState('');
  const [ApprovedBy2, setApprovedBy2] = useState('');
  const [ApprovedAt, setApprovedAt] = useState('');

  // Advance Amount
  const [AdvanceAmount, setAdvanceAmount] = useState(0);
  const [AdvanceAmountDate, setAdvanceAmountDate] = useState('');
  const [img, setImg] = useState('');

  // Settled Information
  const [Settled, setSettled] = useState(0);
  const [SettledBy, setSettledBy] = useState('');

  // Day-wise Expenses
  const [daywiseExpenses, setDaywiseExpenses] = useState([
    {
      date: '',
      expense: '',
      price: 0,
      img: '',
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newExpenses = [...daywiseExpenses];
    newExpenses[index] = {
      ...newExpenses[index],
      [name]: value,
    };
    setDaywiseExpenses(newExpenses);
  };

  const handleAddExpense = () => {
    setDaywiseExpenses([
      ...daywiseExpenses,
      {
        date: '',
        expense: '',
        price: 0,
        img: '',
      },
    ]);
  };

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/expenses/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.expense });
        console.log(result.data);
        setSitename(result.data.expense.sitename);
        setSiteLocation(result.data.expense.siteLocation);
        setStartDate(result.data.expense.startDate);
        setEndDate(result.data.expense.endDate);
        setAdvanceAmount(result.data.expense.AdvanceAmount);
        setAdvanceAmountDate(result.data.expense.AdvanceAmountDate);
        setDaywiseExpenses(result.data.expense.DaywiseExpenses);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    dispatch({
      type: 'FETCH_REQUEST',
    });
    e.preventDefault();
    const missingFields = [];

    if (!employeeName) {
      missingFields.push('employee Name ');
    }
    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${missingFields.join(', ')}`
      );
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/expenses/approve-expense-1/${id}`,
        {
          status: 1,
          ApprovedBy: userInfo.NAME,
          ApprovedAt: new Date(),
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: data.expenses,
      });
      toast.success('Expenses Updated successfully', {
        position: 'top-right',
      });

      navigate(
        userInfo.isSuperAdmin === 1
          ? '/expenses-home'
          : `/my-expenses-home/${userInfo.employee_id}`
      );

      // '/expenses-home');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'FETCH_FAIL' });
    }
  };

  const handleSubmit2 = async (e) => {
    dispatch({
      type: 'FETCH_REQUEST',
    });
    e.preventDefault();
    const missingFields = [];

    if (!employeeName) {
      missingFields.push('employee Name ');
    }
    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${missingFields.join(', ')}`
      );
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/expenses/approve-expense-2/${id}`,
        {
          status: 2,
          ApprovedBy2: userInfo.NAME,
          ApprovedAt: new Date(),
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: data.expenses,
      });
      toast.success('Expenses Approved  successfully', {
        position: 'top-right',
      });

      navigate(
        userInfo.isSuperAdmin === 1
          ? '/expenses-home'
          : `/my-expenses-home/${userInfo.employee_id}`
      );

      // '/expenses-home');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'FETCH_FAIL' });
    }
  };

  const handleDeleteExpense = (index) => {
    const newExpenses = [...daywiseExpenses];
    newExpenses.splice(index, 1);
    setDaywiseExpenses(newExpenses);
  };

  const calculateTotal = (expenseType) => {
    return daywiseExpenses.reduce(
      (total, expense) => total + parseFloat(expense[expenseType] || 0),
      0
    );
  };

  const UploadBillImage = async (e, index) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/expensebills',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      setDaywiseExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[index] = {
          ...updatedExpenses[index],
          img: data.secure_url,
        };
        return updatedExpenses;
      });

      toast.success('Bill uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.error(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className=" d-flex flex-column justify-content-center align-items-center p-2  my-1"
      >
        <div className="form-header">
          <h2>Approve Expense</h2>
        </div>
        <div
          className="my-2 form-group "
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div className=" mx-1" style={{ width: '300px' }}>
            <label>Site Name:</label>
            <input
              disabled
              type="text"
              name="siteName"
              placeholder="Enter Site Name"
              className="form-control"
              value={sitename}
              onChange={(e) => setSitename(e.target.value)}
              required
            />
          </div>

          <div className=" mx-1" style={{ width: '300px' }}>
            <label>Site Location:</label>
            <input
              disabled
              type="text"
              name="siteLocation"
              placeholder="Enter Site Location"
              className="form-control "
              value={siteLocation}
              onChange={(e) => setSiteLocation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group d-flex flex-wrap ">
          <div className=" mx-1" style={{ width: '300px' }}>
            <label>Start Date:</label>
            <input
              disabled
              type="date"
              name="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className=" mx-1" style={{ width: '300px' }}>
            <label>End Date:</label>
            <input
              disabled
              type="date"
              name="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="my-2 form-group d-flex flex-wrap">
          <div className=" mx-1" style={{ width: '300px' }}>
            <label>Advance Amount:</label>
            <input
              disabled
              type="number"
              name="advanceAmount"
              className="form-control"
              value={AdvanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
              required
            />
          </div>
          <div className=" mx-1" style={{ width: '300px' }}>
            <label>Advance Amount Date:</label>
            <input
              disabled
              type="date"
              name="advanceAmountDate"
              className="form-control"
              value={AdvanceAmountDate}
              onChange={(e) => setAdvanceAmountDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="daywise-expense-section mb-3">
          <h3 className="my-3">Daywise Expenses</h3>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Date</th>
                  <th className="text-center">Expense</th>
                  <th className="text-center">Price</th>
                  <th className="text-center"> Bill image</th>
                </tr>
              </thead>
              <tbody>
                {daywiseExpenses.map((dayExpense, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        disabled
                        type="date"
                        name="date"
                        className="form-control"
                        value={dayExpense.date}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        type="text"
                        name="expense"
                        className="form-control"
                        value={dayExpense.expense}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        disabled
                        type="number"
                        name="price"
                        className="form-control"
                        value={dayExpense.price}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                    </td>
                    <td className=" ">
                      <div className="d-flex justify-content-center align-items-center w-50 m-auto ">
                        {dayExpense.img ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-success p-1"
                              data-bs-toggle="modal"
                              data-bs-target={`#exampleModal_${index}`}
                            >
                              <IoEyeOutline />
                            </button>
                            <div
                              className="modal fade"
                              id={`exampleModal_${index}`}
                              tabIndex="-1"
                              aria-labelledby={`exampleModal_${index}`}
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id={`exampleModal_${index}`}
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
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    </td>
                    {/* <td>
                      <div className="d-flex">
                        <button
                          type="button"
                          onClick={handleAddExpense}
                          className="btn btn-sm btn-primary text-light m-1"
                        >
                          <GrAddCircle />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger m-1"
                          onClick={() => handleDeleteExpense(index)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              Total -&nbsp;
              <span className="badge bg-success p-2">
                {calculateTotal('price')}
              </span>
            </div>
          </div>
        </div>
        <hr />

        <div className="d-flex justify-content-between">
          {expenses.ApprovedBy !== '' ? (
            <span className=" d-flex flex-column m-2 justify-content-center">
              <span>{expenses.ApprovedBy}</span>
              <span className="badge px-2 py-2 bg-success">Approved 1</span>
            </span>
          ) : (
            <span className=" d-flex flex-column m-2 justify-content-center">
              <span className="badge bg-warning p-2 m-1">Pending</span>
              <span className="badge  bg-warning p-2 m-1">Pending</span>
            </span>
          )}
          {expenses.ApprovedBy2 !== '' ? (
            <span className=" d-flex flex-column m-2 justify-content-center">
              <span>{expenses.ApprovedBy2}</span>
              <span className="badge px-3 py-2 bg-success">
                Approved 2
              </span>{' '}
            </span>
          ) : (
            <span className=" d-flex flex-column m-2 justify-content-center">
              <span className="badge bg-warning p-2 m-1">Pending</span>
              <span className="badge  bg-warning p-2 m-1">Pending</span>
            </span>
          )}

          {expenses.Settled === 1 ? (
            <span className=" d-flex flex-column m-2 justify-content-center">
              <span>{expenses.SettledBy}</span>
              <span className="badge p-2 bg-success">settled</span>
            </span>
          ) : (
            <span className=" d-flex flex-column m-2 justify-content-center">
              <span className="badge  bg-warning m-1 p-2">Pending</span>
              <span className="badge  bg-warning p-2 m-1">Pending</span>
            </span>
          )}
        </div>
        <br />
        <div className="form-footer d-flex justify-content-end w-100">
          {fetchLoading ? (
            <button
              type="submit"
              className="submit-expense-btn btn btn-sm btn-warning m-1"
              disabled
            >
              Approving..{<LoadingBox4 />}
            </button>
          ) : (
            <>
              {expenses.status === 0 && (
                <button
                  type="submit"
                  className="submit-expense-btn btn btn-sm btn-warning m-1"
                  onClick={handleSubmit}
                >
                  Approve 1
                </button>
              )}
              {expenses.status === 1 && (
                <button
                  type="submit"
                  className="submit-expense-btn btn btn-sm btn-warning m-1"
                  onClick={handleSubmit2}
                >
                  Approve 2
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApproveExpense;
