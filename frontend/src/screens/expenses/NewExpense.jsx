import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../../Store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };

    case 'CREATE_SUCCESS':
      return { ...state, expenses: action.payload, loading: false };

    case 'CREATE_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const NewExpense = () => {
  // Employee Details

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, loadingUpload, expenses, successDelete }, dispatch] =
    useReducer(reducer, {
      expenses: [],
      loading: true,
      error: '',
    });
  const navigate = useNavigate();

  const [employeeName, setEmployeeName] = useState('');
  const [employee_id, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');

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

  const handleSubmit = async (e) => {
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
        `api/expenses`,
        {
          employeeName,
          employee_id,
          email,
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
          DaywiseExpenses: daywiseExpenses,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Expenses Created successfully', {
        position: 'top-right',
      });
      navigate('/expenses-home');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee Name:</label>
          <input
            type="text"
            name="employeeName "
            placeholder="Enter your Name"
            classname="form-control"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeid "
            placeholder="Enter your Employee ID"
            classname="form-control"
            value={employee_id}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Employee email:</label>
          <input
            type="email"
            name="employeeid "
            placeholder="Enter your Email ID"
            classname="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Site Name:</label>
          <input
            type="text"
            name="employeeid "
            placeholder="Enter Site Name"
            classname="form-control"
            value={sitename}
            onChange={(e) => setSitename(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Site Location:</label>
          <input
            type="text"
            name="sitelocation "
            placeholder="Enter Site Location"
            classname="form-control"
            value={siteLocation}
            onChange={(e) => setSiteLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startdate"
            classname="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="enddate"
            classname="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {/* Advance Amount */}
        <div>
          <label>Advance Amount:</label>
          <input
            type="number"
            name="AdvanceAmount"
            classname="form-control"
            value={AdvanceAmount}
            onChange={(e) => setAdvanceAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Advance Amount Date:</label>
          <input
            type="date"
            name="AdvanceAmount"
            classname="form-control"
            value={AdvanceAmountDate}
            onChange={(e) => setAdvanceAmountDate(e.target.value)}
            required
          />
        </div>

        {daywiseExpenses.map((dayExpense, index) => (
          <div key={index}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              classname="form-control"
              value={dayExpense.date}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <label>Expense:</label>
            <input
              type="text"
              name="expense"
              classname="form-control"
              value={dayExpense.expense}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              classname="form-control"
              value={dayExpense.price}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <label>Bill:</label>
            <input
              type="text"
              name="img"
              classname="form-control"
              value={dayExpense.img}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            {/* Add more fields as needed */}
          </div>
        ))}
        <button type="button" onClick={handleAddExpense}>
          Add Expense
        </button>

        <button type="submit">Submit Expense</button>
      </form>
    </div>
  );
};

export default NewExpense;
