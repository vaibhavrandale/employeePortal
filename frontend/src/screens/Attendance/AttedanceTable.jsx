import React, { useEffect, useReducer, useState } from 'react';
import attendanceData from './attendence.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
function AttendanceTable() {
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

  // const currentYear = 2023;
  // const currentMonth = 9;

  const [Year, setYear] = useState(currentYear);
  const [Month, setMonth] = useState(currentMonth);

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

  // Filter the attendance data based on the selected year and month
  const filteredData = attendance.filter((entry) => {
    if (selectedYear !== null && selectedMonth !== null) {
      return entry.year === selectedYear && entry.month === selectedMonth;
    } else if (selectedYear !== null) {
      return entry.year === selectedYear;
    } else if (selectedMonth !== null) {
      return entry.month === selectedMonth;
    }
    return true; // No filters applied
  });

  // Generate an array of unique dates based on the filtered data
  const uniqueDates = Array.from(
    new Set(filteredData.map((entry) => entry.day))
  );

  // Create an object to store attendance data by user ID
  const attendanceByUserId = {};

  // Initialize the object with empty strings ('') for each date
  filteredData.forEach((entry) => {
    if (!attendanceByUserId[entry.user_id]) {
      attendanceByUserId[entry.user_id] = {
        user_id: entry.user_id,
        username: entry.username,
        employee_id: entry.employee_id,
        dates: uniqueDates.map(() => ''),
      };
    }
    const dateIndex = uniqueDates.indexOf(entry.day);
    attendanceByUserId[entry.user_id].dates[dateIndex] = 'p'; // Set 'p' for login and logout times
  });
  const calculateTotalDaysPresent = (userAttendance) => {
    return userAttendance.dates.filter((status) => status === 'p').length;
  };
  return (
    <div className="container">
      <div className="filter">
        <label htmlFor="yearFilter">Year:</label>
        <select
          id="yearFilter"
          value={selectedYear || Year}
          onChange={(e) =>
            setSelectedYear(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">All</option>
          {/* Generate options for available years */}
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
          id="monthFilter"
          value={selectedMonth || Month}
          onChange={(e) =>
            setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">All</option>
          {/* Generate options for months (1-12) */}
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {filteredData.length > 0 && (
        <div className="table-responsive m-1">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="col-md-1">User ID</th>
                <th className="col-md-2">Name</th>
                {uniqueDates.map((date) => (
                  <th key={date}>{date}</th>
                ))}
                <th className="col-md-1">Total</th>
                <th className="col-md-1">Payslip</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(attendanceByUserId).map((userAttendance) => (
                <tr key={userAttendance.employee_id}>
                  <td>{userAttendance.employee_id}</td>
                  <td>{userAttendance.username}</td>
                  {userAttendance.dates.map((status, index) => (
                    <td key={index}>{status}</td>
                  ))}
                  <td>{calculateTotalDaysPresent(userAttendance)}</td>
                  <td>
                    <Link
                      to={`/pay-slip/${userAttendance.user_id}/${
                        selectedYear || Year
                      }/${selectedMonth || Month}/${calculateTotalDaysPresent(
                        userAttendance
                      )}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttendanceTable;
