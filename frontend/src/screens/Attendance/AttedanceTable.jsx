import React, { useEffect, useReducer, useState } from 'react';
import attendanceData from './attendence.js';
import './attendence.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
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

  const getAttendanceStatus = (attendanceForDay) => {
    if (!attendanceForDay) return { status: 'A', style: {} };
    const hours = attendanceForDay.totalHours;
    const hasLoginTime = attendanceForDay.loginTime;
    const hasLogoutTime = attendanceForDay.logoutTime;

    if (!hasLoginTime) return { status: '', style: {} };
    if (hasLoginTime && !hasLogoutTime)
      return {
        status: 'P',

        className: 'badge bg-warning',
      };
    if (hours > 4.5 && hours < 8.5)
      return { status: 'H', style: {}, className: 'badge bg-info' };
    if (hours < 4.5)
      return { status: 'A', style: {}, className: 'badge bg-danger' };
    if (hours >= 8.5)
      return { status: 'P', style: {}, className: 'badge bg-success' };
    return { status: 'A', style: {} }; // default case
  };

  const getTotalDaysPresent = (attendanceEntries) => {
    let total = 0;
    attendanceEntries.forEach((entry) => {
      const status = getAttendanceStatus(entry).status;
      if (status === 'P') total += 1;
      else if (status === 'H') total += 0.5;
    });
    return total;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const noDataForSelectedMonthAndYear = filteredData.length === 0;

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
      {noDataForSelectedMonthAndYear ? (
        <AlertBox className="alert alert-danger" variant="danger">
          No data found for Year-{selectedYear || Year} and Month-
          {selectedMonth || Month}.
        </AlertBox>
      ) : (
        <>
          <div className="table-responsive m-1 table-container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th id="id-column" className="text-center id-column">
                    User ID
                  </th>
                  <th
                    id="name-column"
                    className="col-md-3 text-center name-column"
                  >
                    Name
                  </th>
                  {Array.from(
                    {
                      length: getDaysInMonth(
                        selectedMonth || Month,
                        selectedYear || Year
                      ),
                    },
                    (_, i) => (
                      <th className="col-md-1 text-center days" key={i + 1}>
                        {i + 1}
                      </th>
                    )
                  )}
                  <th className="col-md-1 text-center">Total</th>
                  <th className="col-md-1 text-center">Payslip</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td id="id-column" className="text-center">
                      {employee.employee_id}
                    </td>
                    <td id="name-column" className="text-center">
                      {employee.username}
                    </td>
                    {Array.from(
                      {
                        length: getDaysInMonth(
                          selectedMonth || Month,
                          selectedYear || Year
                        ),
                      },
                      (_, i) => {
                        const day = i + 1;
                        const attendanceForDay = attendance.find(
                          (entry) =>
                            entry.employee_id === employee.employee_id &&
                            entry.year === (selectedYear || Year) &&
                            entry.month === (selectedMonth || Month) &&
                            entry.day === day
                        );
                        const { status, className } =
                          getAttendanceStatus(attendanceForDay);
                        return (
                          <td
                            className={`col-md-1 text-center days ${className}`}
                            key={day}
                          >
                            {status}
                          </td>
                        );
                      }
                    )}
                    <td className="col-md-1 text-center">
                      {getTotalDaysPresent(
                        attendance.filter(
                          (entry) => entry.employee_id === employee.employee_id
                        )
                      )}
                    </td>
                    <td className="col-md-1 text-center">
                      <Link
                        target="blank"
                        to={`/pay-slip/${employee.user_id}/${
                          selectedYear || Year
                        }/${selectedMonth || Month}/${getTotalDaysPresent(
                          attendance.filter(
                            (entry) =>
                              entry.employee_id === employee.employee_id
                          )
                        )}`}
                      >
                        <HiOutlineDocumentSearch className="text-success fs-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default AttendanceTable;
