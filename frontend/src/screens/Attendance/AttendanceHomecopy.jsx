import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5.jsx';
// import MsgBox from '../../components/MessageBox/MsgBox.js';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, attendance: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AttendanceHomecopy = () => {
  const [{ loading, error, attendance }, dispatch] = useReducer(reducer, {
    attendance: [],
    loading: true,
    error: '',
  });

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // const currentYear = 2023;
  // const currentMonth = 9;

  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalDaysPresent, setTotalDaysPresent] = useState({});

  // const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();

  // useEffect(() => {
  //   console.log('Fetching data...');
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });

  //     try {
  //       const result = await axios.get(
  //         `/api/employees/calculateattendance/${currentYear}/${currentMonth}`
  //       );
  //       const totalDaysPresentResult = await axios.get(
  //         `/api/employees/calculateTotalDaysPresent/${currentYear}/${currentMonth}`
  //       );

  //       setTotalDaysPresent(totalDaysPresentResult.data.totalDaysPresent);
  //       console.log('total days', totalDaysPresentResult.data.totalDaysPresent);

  //       console.log('Data received:', result.data.attendance); // Add this line
  //       dispatch({
  //         type: 'FETCH_SUCCESS',
  //         payload: result.data.attendance,
  //       });
  //     } catch (err) {
  //       console.error('Error fetching data:', err); // Add this line
  //       dispatch({ type: 'FETCH_FAIL', payload: err.message });
  //     }
  //   };
  //   fetchData();
  // }, [currentYear, currentMonth]);

  useEffect(() => {
    console.log('Fetching data...');
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/employees/calculateattendance/${currentYear}/${currentMonth}`
        );

        // Fetch the total days present data
        const totalDaysPresentResult = await axios.get(
          `/api/employees/calculateTotalDaysPresent/${currentYear}/${currentMonth}`
        );

        // Convert the array of objects into an object with employee_id as keys
        const totalDaysPresentObject =
          totalDaysPresentResult.data.totalDaysPresent.reduce((acc, item) => {
            acc[item._id] = item.totalDaysPresent;
            return acc;
          }, {});

        setTotalDaysPresent(totalDaysPresentObject);
        console.log(totalDaysPresentResult);
        console.log(currentYear, currentMonth);
        console.log('Data received:', result.data.attendance); // Add this line
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.attendance,
        });
      } catch (err) {
        console.error('Error fetching data:', err); // Add this line
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();

    // ... (previous code)
  }, [currentYear, currentMonth]);

  const filteredData = attendance.filter(
    (entry) =>
      entry.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.employee_id.includes(searchQuery)
  );

  // const filteredData = attendance;

  const firstLoginDates = attendance.reduce((acc, record) => {
    if (
      !acc[record.employee_id] ||
      new Date(record.loginTime) < new Date(acc[record.employee_id])
    ) {
      acc[record.employee_id] = record.loginTime;
    }
    return acc;
  }, {});

  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const getAttendanceForDay = (employeeId, day) => {
    return attendance.find(
      (entry) =>
        entry.employee_id === employeeId &&
        new Date(entry.loginTime).getFullYear() === viewYear &&
        new Date(entry.loginTime).getMonth() + 1 === viewMonth &&
        new Date(entry.loginTime).getDate() === day
    );
  };

  return (
    <div className="container">
      {loading ? (
        <LoadingBox5 />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {' '}
          <div>
            <h2>Attendance Table</h2>

            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="m-1">
                  <select
                    className="form-select"
                    value={viewYear}
                    onChange={(e) => setViewYear(Number(e.target.value))}
                  >
                    {/* Display year options (for simplicity, showing last 10 years) */}
                    {Array.from({ length: 10 }).map((_, index) => (
                      <option key={viewYear - index} value={viewYear - index}>
                        {viewYear - index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="m-1">
                  <select
                    className="form-select"
                    value={viewMonth}
                    onChange={(e) => setViewMonth(Number(e.target.value))}
                  >
                    {/* Display month options */}
                    {Array.from({ length: 12 }).map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {new Date(viewYear, index).toLocaleString('default', {
                          month: 'long',
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="m-1">
                <input
                  className="form-control"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  {daysArray.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                  <th>Total</th>
                  <th>Pay Slip</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry) => (
                  <tr key={entry._id}>
                    <td>{entry.employee_id}</td>
                    <td>{entry.userName}</td>
                    {daysArray.map((day) => (
                      // <td key={day}>
                      //   {getAttendanceForDay(entry.employee_id, day)
                      //     ? 'P'
                      //     : 'A'}
                      // </td>

                      <td key={day}>
                        {getAttendanceForDay(entry.employee_id, day) ? (
                          <span className="badge bg-success">P</span>
                        ) : (
                          <span className="badge bg-danger">A</span>
                        )}
                      </td>
                    ))}
                    <td>{totalDaysPresent[entry.employee_id] || 0}</td>
                    <td>
                      <Link
                        to={`/pay-slip/${entry.employee_id}/${currentYear}/${currentMonth}`}
                      >
                        Pay
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
};

export default AttendanceHomecopy;
