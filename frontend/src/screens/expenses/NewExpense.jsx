import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../../Store';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { IoEyeOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { GrAddCircle } from 'react-icons/gr';
import './expense.css';
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, createloading: true };

    case 'CREATE_SUCCESS':
      return { ...state, expenses: action.payload, createloading: false };

    case 'CREATE_FAIL':
      return { ...state, createloading: false, error: action.payload };

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

const NewExpense = () => {
  // Employee Details

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, loadingUpload, expenses, loadingDocumentUpload, createloading },
    dispatch,
  ] = useReducer(reducer, {
    expenses: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
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
      type: '',
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
        type: '',
        expense: '',
        price: 0,
        img: '',
      },
    ]);
  };

  const handleSubmit = async (e) => {
    dispatch({
      type: 'CREATE_REQUEST',
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
      const { data } = await axios.post(
        `api/expenses/new-expense`,
        {
          employeeName: userInfo.NAME,
          employee_id: userInfo.employee_id,
          email: userInfo.email,
          sitename,
          siteLocation,
          startDate,
          endDate,
          status,
          ApprovedBy,
          ApprovedBy2,
          ApprovedAt,
          AdvanceAmount,
          AdvanceAmountDate,
          Settled,
          SettledBy,
          daywiseExpenses: daywiseExpenses,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
        payload: data.expenses,
      });
      toast.success('Expenses Created successfully', {
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
      dispatch({ type: 'CREATE_FAIL' });
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
          <h2>Expense Form</h2>
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
                  <th className="text-center">Type</th>
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
                      <select
                        id="type"
                        className="form-control"
                        name="type"
                        value={dayExpense.type}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Stay">Stay</option>
                        <option value="other">other</option>
                      </select>
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
                        type="text"
                        name="price"
                        style={{ margin: 'auto', width: '80px' }}
                        className="form-control"
                        value={dayExpense.price}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                    </td>
                    <td className=" ">
                      {/* <div className="d-flex justify-content-center align-items-center  m-auto "> */}
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
                            className={`modal fade  ${
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
                            <div className=" modal-dialog modal-dialog-centered modal-dialog-sm">
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
                                <div className="modal-body w-80 m-auto p-2">
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

                          {/* <button
                              type="button"
                              className="btn btn-sm btn-success p-1 m-1"
                              // data-bs-toggle="modal"
                              // data-bs-target={`#exampleModal_${index}`}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              <IoEyeOutline />
                            </button> */}

                          {/* <div
                              className="modal fade"
                              style={{ zIndex: '2', backdropFilter: 'none' }}
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
                            </div> */}
                        </>
                      ) : (
                        ''
                      )}

                      {loadingDocumentUpload ? (
                        <>
                          <input
                            type="file"
                            id={`profile-${index}`}
                            placeholder="profile"
                            onChange={(e) => UploadBillImage(e, index)}
                            className=""
                          />
                          &nbsp;
                          <LoadingBox4 />
                        </>
                      ) : (
                        <>
                          &nbsp;&nbsp;
                          <input
                            type="file"
                            id={`profile-${index}`}
                            placeholder="profile"
                            onChange={(e) => UploadBillImage(e, index)}
                            className=""
                          />
                        </>
                      )}
                      {/* </div> */}
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
          {createloading ? (
            <button
              type="submit"
              className="submit-expense-btn btn btn-sm btn-warning m-1"
            >
              Submitting..{<LoadingBox4 />}
            </button>
          ) : (
            <button
              type="submit"
              className="submit-expense-btn btn btn-sm btn-warning m-1"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewExpense;
