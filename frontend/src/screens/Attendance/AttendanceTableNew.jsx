import React, { useEffect, useReducer, useState } from 'react';
import attendanceData from './attendence.js';
import './attendence.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import AlertBox from '../../components/MessageBox/AlertBox.js';
import { Helmet } from 'react-helmet';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ATTEDANCE_REQUEST':
      return { ...state, loadingAttedance: true };

    case 'FETCH_ATTEDANCE_SUCCESS':
      return { ...state, attendance: action.payload, loadingAttedance: false };

    case 'FETCH_ATTEDANCE_FAIL':
      return { ...state, loadingAttedance: false, error: action.payload };
    default:
      return state;
  }
};
function AttendanceTableNew() {
  const [{ loading, error, attendance, loadingAttedance }, dispatch] =
    useReducer(reducer, {
      attendance: [],
      loading: true,
      error: '',
    });

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const [Year, setYear] = useState(currentYear);
  const [Month, setMonth] = useState(currentMonth);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('Fetching data...');
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ATTEDANCE_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/attendance`);

        console.log('Data received:', result.data.attendance); // Add this line
        dispatch({
          type: 'FETCH_ATTEDANCE_SUCCESS',
          payload: result.data.attendance,
        });
      } catch (err) {
        console.error('Error fetching data:', err); // Add this line
        dispatch({ type: 'FETCH_ATTEDANCE_FAIL', payload: err.message });
      }
    };
    fetchData();

    // ... (previous code)
  }, [Year, Month]);

  const filteredData = attendance.filter((entry) => {
    if (searchTerm) {
      return (
        entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.employee_id.toString().includes(searchTerm)
      );
    }
    return (
      (!selectedYear || entry.year === selectedYear) &&
      (!selectedMonth || entry.month === selectedMonth)
    );
  });

  const isEmployeeOnLeave = (employee, day, month, year) => {
    return employee.allLeaves.some((leave) => {
      const leaveDate = new Date(leave.expectedDateOfLeave);
      return (
        leaveDate.getDate() === day &&
        leaveDate.getMonth() + 1 === month &&
        leaveDate.getFullYear() === year
      );
    });
  };

  return (
    <div className="container">
      <Helmet>
        <title>Attendance</title>
      </Helmet>
      <div className="filter">
        <div>
          <label htmlFor="yearFilter">Year:</label>
          <select
            class="select-dropdown"
            id="yearFilter"
            value={selectedYear || Year}
            onChange={(e) =>
              setSelectedYear(e.target.value ? parseInt(e.target.value) : null)
            }
          >
            <option value="">All</option>
            {Array.from(new Set(attendanceData.map((entry) => entry.year))).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>

          <label htmlFor="monthFilter">Month:</label>
          <select
            class="select-dropdown"
            id="monthFilter"
            value={selectedMonth || Month}
            onChange={(e) =>
              setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)
            }
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          class="search-input "
        />
      </div>
    </div>
  );
}

export default AttendanceTableNew;
