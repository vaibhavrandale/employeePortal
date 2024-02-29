// import React from 'react'

// const UpdateExpense = () => {
//   return (
//     <div>UpdateExpense</div>
//   )
// }

// export default UpdateExpense

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

const UpdateExpense = () => {
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

  const [showModal, setShowModal] = useState(false);

  const [activeModal, setActiveModal] = useState(null);

  // Function to set the active modal ID
  const openModal = (id) => {
    setActiveModal(id);
  };

  // Function to close the active modal
  const closeModal = () => {
    setActiveModal(null);
  };

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
        `/api/expenses/update-expense/${id}`,
        {
          sitename,
          siteLocation,
          startDate,
          endDate,

          AdvanceAmount,
          AdvanceAmountDate,

          daywiseExpenses: daywiseExpenses,
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
      {fetchLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <LoadingBox4 />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" d-flex flex-column justify-content-center align-items-center p-2  my-1"
        >
          <div className="form-header">
            <h2>Update Expense</h2>
          </div>

          <div className="container ">
            <div className="row">
              <div className="col-md-5 mb-3">
                <label>Site Name:</label>
                <input
                  type="text"
                  name="siteName"
                  placeholder="Enter Site Name"
                  className="form-control"
                  value={sitename}
                  onChange={(e) => setSitename(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label>Site Location:</label>
                <input
                  type="text"
                  name="siteLocation"
                  placeholder="Enter Site Location"
                  className="form-control"
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label>End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label>Advance Amount:</label>
                <input
                  type="number"
                  name="advanceAmount"
                  className="form-control"
                  value={AdvanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label>Advance Amount Date:</label>
                <input
                  type="date"
                  name="advanceAmountDate"
                  className="form-control"
                  value={AdvanceAmountDate}
                  onChange={(e) => setAdvanceAmountDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="container">
            <h3 className="my-3">Daywise Expenses</h3>
            <div className="table-responsive row">
              <table className="table table-bordered col-md-8">
                <thead>
                  <tr>
                    <th className="text-center">Date</th>
                    <th className="text-center">Expense</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Upload Bill image</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {daywiseExpenses.map((dayExpense, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          value={dayExpense.date}
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        />
                      </td>
                      <td>
                        <textarea
                          type="text"
                          name="expense"
                          style={{ margin: 'auto', width: '200px' }}
                          className="form-control"
                          value={dayExpense.expense}
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        ></textarea>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="price"
                          style={{ margin: 'auto', minWidth: '100px' }}
                          className="form-control"
                          value={dayExpense.price}
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        />
                      </td>
                      <td className=" ">
                        <div className="d-flex justify-content-center align-items-center ">
                          {dayExpense.img ? (
                            <>
                              {/* --------------------bill modal---------------------------------- */}
                              <Link
                                className="mx-1 text-danger"
                                // onClick={() => setShowModal(true)}
                                onClick={() => openModal(`modal-${index}`)}
                              >
                                <IoEyeOutline />
                              </Link>
                              <div
                                // className={`modal fade ${showModal ? 'show' : ''}`}
                                // style={{ display: showModal ? 'block' : 'none' }}
                                className={`modal fade ${
                                  activeModal === `modal-${index}` ? 'show' : ''
                                }`}
                                style={{
                                  display:
                                    activeModal === `modal-${index}`
                                      ? 'block'
                                      : 'none',
                                }}
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby="deleteModal"
                                aria-hidden={!showModal}
                              >
                                <div className="modal-dialog modal-dialog-centered ">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title text-dark "
                                        id="deleteModalLabel"
                                      >
                                        {dayExpense.expense}
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        // onClick={() => setShowModal(false)}
                                        onClick={closeModal}
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
                              {/* --------------------bill modal---------------------------------- */}
                            </>
                          ) : (
                            ''
                          )}

                          {loadingDocumentUpload ? (
                            <>
                              {' '}
                              <input
                                type="file"
                                id={`profile-${index}`}
                                placeholder="profile"
                                onChange={(e) => UploadBillImage(e, index)}
                                className="my-2 mx-2"
                              />
                              &nbsp;
                              <LoadingBox4 />
                            </>
                          ) : (
                            <input
                              // style={{ margin: 'auto', width: '200px' }}
                              type="file"
                              id={`profile-${index}`}
                              placeholder="profile"
                              onChange={(e) => UploadBillImage(e, index)}
                              className="my-2 mx-2"
                            />
                          )}
                        </div>
                      </td>
                      <td>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex justify-content-end w-100">
            Total -&nbsp;
            <span className="badge bg-success p-2">
              {calculateTotal('price')}
            </span>
          </div>
          <hr />
          <div className="form-footer d-flex justify-content-end w-100">
            {fetchLoading ? (
              <button
                type="submit"
                className="submit-expense-btn btn btn-sm btn-warning m-1 fs-6 w-40 px-5 fw-bold"
              >
                Updating..{<LoadingBox4 />}
              </button>
            ) : (
              <button
                type="submit"
                className="submit-expense-btn btn btn-sm btn-warning m-1 fs-6 w-40 px-5 fw-bold"
              >
                Update
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateExpense;
