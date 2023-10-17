// import React from 'react'

// function IndividualAttedance() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default IndividualAttedance

import React, { useContext, useEffect, useReducer, useState } from 'react';
import attendanceData from './attendence.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LiaReceiptSolid } from 'react-icons/lia';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5.jsx';
import AlertBox from '../../components/MessageBox/AlertBox.js';
import MsgBox from '../../components/MessageBox/MsgBox.js';
import { Helmet } from 'react-helmet';
import { Store } from '../../Store.js';
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
function IndividualAttedance() {
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

  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    console.log('Fetching data...');
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ATTEDANCE_REQUEST' });

      try {
        const result = await axios.get(
          `/api/employees/attendance/${userInfo._id}`
        );

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
  }, [Year, Month, userInfo._id]);

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
  const currentDay = new Date().getDate();

  return (
    <div className="container">
      <Helmet>
        <title>Attendance</title>
      </Helmet>
      <div className="">
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

      {loadingAttedance ? (
        <LoadingBox5 />
      ) : error ? (
        <MsgBox className="alert alert-danger">{error}</MsgBox>
      ) : (
        <>
          {filteredData.length > 0 ? (
            <div className="table-responsive m-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="col-md-1 text-center">User ID</th>
                    <th className="col-md-2 text-center">Name</th>
                    {uniqueDates.map((date) => (
                      <th className="col-md-1 text-center" key={date}>
                        {date}
                      </th>
                    ))}
                    <th className="col-md-1 text-center">Total</th>
                    {currentDay > 27 ? (
                      <th className="col-md-1 text-center">Payslip</th>
                    ) : (
                      ''
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Object.values(attendanceByUserId).map((userAttendance) => (
                    <tr key={userAttendance.employee_id}>
                      <td className="col-md-1 text-center">
                        {userAttendance.employee_id}
                      </td>
                      <td className="col-md-1 text-center">
                        {userAttendance.username}
                      </td>
                      {userAttendance.dates.map((status, index) => (
                        <td className="col-md-1 text-center" key={index}>
                          {status}
                        </td>
                      ))}
                      <td className="col-md-1 text-center">
                        {calculateTotalDaysPresent(userAttendance)}
                      </td>
                      {currentDay > 27 ? (
                        <td className="col-md-1 text-center">
                          <Link
                            target="blank"
                            to={`/pay-slip/${userAttendance.user_id}/${
                              selectedYear || Year
                            }/${
                              selectedMonth || Month
                            }/${calculateTotalDaysPresent(userAttendance)}`}
                          >
                            <LiaReceiptSolid className="text-success fs-4" />
                          </Link>
                        </td>
                      ) : (
                        ''
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data-found-message">
              {selectedYear && selectedMonth ? (
                <AlertBox className="alert alert-danger w-50">
                  No data found for Year ${selectedYear} and Month $
                  {selectedMonth}
                </AlertBox>
              ) : (
                <AlertBox className="alert alert-danger w-50">
                  No data found
                </AlertBox>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default IndividualAttedance;
