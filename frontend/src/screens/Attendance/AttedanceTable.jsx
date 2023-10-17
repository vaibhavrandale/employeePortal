import React, { useEffect, useReducer, useState } from 'react';
import attendanceData from './attendence.js';
import './attendence.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LiaReceiptSolid } from 'react-icons/lia';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5.jsx';
import AlertBox from '../../components/MessageBox/AlertBox.js';
import MsgBox from '../../components/MessageBox/MsgBox.js';
import { Helmet } from 'react-helmet';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
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

  // Filter the attendance data based on the selected year and month
  const filteredData = attendance
    .filter((entry) => {
      if (searchTerm) {
        return (
          entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.employee_id.toString().includes(searchTerm)
        );
      }
      return true;
    })
    .filter((entry) => {
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
        loginTime: entry.loginTime,
        logoutTime: entry.logoutTime,
        dates: uniqueDates.map(() => ''),
      };
    }
    const dateIndex = uniqueDates.indexOf(entry.day);
    attendanceByUserId[entry.user_id].dates[dateIndex] = 'p'; // Set 'p' for login and logout times
  });
  const calculateTotalDaysPresent = (userAttendance) => {
    return userAttendance.dates.filter((status) => status === 'p').length;
  };

  function getMonthName(monthNumber) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthNumber - 1];
  }

  function exportToExcel(data) {
    const formattedData = data.map((item) => {
      const userAttendance = attendanceByUserId[item.user_id] || {};
      const attendanceRecord = uniqueDates.map((date) => {
        const loginTime = new Date(item.loginTime).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const logoutTime = new Date(item.logoutTime).toLocaleTimeString(
          'en-US',
          { hour: '2-digit', minute: '2-digit' }
        );
        return `Login: ${loginTime}, Logout: ${logoutTime}`;
      });

      return [
        item.employee_id,
        item.username,
        ...attendanceRecord,
        calculateTotalDaysPresent(userAttendance),
      ];
    });

    const header = [
      'Employee ID',
      'Name',
      ...uniqueDates,
      'Total Days Present',
    ];
    const ws = XLSX.utils.aoa_to_sheet([header, ...formattedData]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Data');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    // saveAs(blob, `attendanceData-${selectedMonth}.xlsx`);

    const monthName = getMonthName(selectedMonth || Month);
    const year = selectedYear || Year;
    saveAs(blob, `attendanceData-${monthName}(${year}).xlsx`);
  }

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
            class="select-dropdown"
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
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          class="search-input "
        />
        <div>
          <button
            className="exportBtn"
            onClick={() => exportToExcel(filteredData)}
          >
            Export
          </button>
        </div>
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

                    <th className="col-md-1 text-center">Payslip</th>
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
                          {status === null ? (
                            'A'
                          ) : (
                            <div id="tooltip-container">
                              P
                              <span id="tooltip-text">
                                Login:{' '}
                                {userAttendance.loginTime
                                  ? new Date(
                                      userAttendance.loginTime
                                    ).toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })
                                  : 'N/A'}
                                <br />
                                Logout:{' '}
                                {userAttendance.logoutTime
                                  ? new Date(
                                      userAttendance.logoutTime
                                    ).toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })
                                  : 'N/A'}
                              </span>
                            </div>
                          )}
                        </td>
                      ))}

                      <td className="col-md-1 text-center">
                        {calculateTotalDaysPresent(userAttendance)}
                      </td>
                      {/* <td className="col-md-1 text-center">
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
                      </td> */}

                      {/* {currentDay > 27 ? ( */}
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
                      {/* ) : (
                        ''
                      )} */}
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

export default AttendanceTable;
