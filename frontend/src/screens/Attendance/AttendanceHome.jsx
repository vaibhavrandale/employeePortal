import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../../Store';
import { Helmet } from 'react-helmet';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import { Link } from 'react-router-dom';
// import Carousel from 'react-bootstrap/Carousel';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, attendanceDetails: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function AttendanceHome() {
  const months = [
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
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );

  const prevMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
  };

  const [{ loading, error, attendanceDetails }, dispatch] = useReducer(
    reducer,
    {
      attendanceDetails: [],
      loading: true,
      error: '',
    }
  );
  const [searchQuery, setSearchQuery] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/attendance`);
        // setForceUpdate((prev) => prev + 1);
        console.log(result.data.attendance);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.attendance,
        });

        // Calculate remaining leaves based on fetched leave counts
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);

  function transformAttendanceData(attendance) {
    const transformed = [];

    attendance.forEach((entry) => {
      const existingEntry = transformed.find(
        (item) => item.userName === entry.userName
      );

      if (!existingEntry) {
        const newEntry = {
          userName: entry.userName,
          _id: entry._id,
          employee_id: entry.employee_id,
          totalHours: entry.totalHours,
          days: {},
        };

        transformed.push(newEntry);
      }

      const day = new Date(entry.loginTime).getDate();
      const targetEntry = existingEntry || transformed[transformed.length - 1];

      if (entry.checkin) {
        // Check if there's a logout time
        if (entry.logoutTime) {
          // Compute total hours worked
          const loginTime = new Date(entry.loginTime);
          const logoutTime = new Date(entry.logoutTime);
          const diffHours = (logoutTime - loginTime) / (1000 * 60 * 60);

          // Check if total hours are more than 8.50
          if (diffHours > 8.5) {
            targetEntry.days[day] = 'P';
          } else {
            targetEntry.days[day] = 'A';
          }
        } else {
          // No logout time
          targetEntry.days[day] = '🕒'; // Timer icon
        }
      } else {
        targetEntry.days[day] = 'A';
      }
    });

    return transformed;
  }

  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const transformedData = transformAttendanceData(attendanceDetails);
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

  const currentMonth = currentDate.getMonth(); // 0-based index
  const monthName = monthNames[currentMonth];

  const filteredData = transformedData.filter(
    (entry) =>
      entry.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry._id.includes(searchQuery)
  );

  return (
    <div className="container">
      <h4 className="month  w-100 d-flex justify-content-center">
        <span className="badge bg-success">
          <span className="badge bg-danger fs-5">{monthName}</span> Month
          Attendance
        </span>
      </h4>

      <Helmet>
        <title>{monthName} Attendance</title>
      </Helmet>
      {loading ? (
        <LoadingBox5 />
      ) : (
        <>
          <div className="d-flex d-flex justify-content-end align-items-end">
            <input
              type="text"
              placeholder="Search employee....."
              className="m-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th> Name/Date</th>
                {Array.from({ length: daysInMonth }).map((_, i) => (
                  <th key={i}>{i + 1}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(
                ({ userName, days, _id, employee_id, totalHours }) => (
                  <tr key={userName}>
                    <td>
                      <Link
                        className="text-decoration-none fw-bold"
                        to={`/attendenceDetails/${_id}`}
                      >
                        {employee_id}
                      </Link>
                    </td>
                    <td>{userName} </td>
                    {Array.from({ length: daysInMonth }).map((_, i) => (
                      <td key={i} className="text-center">
                        {days[i + 1] === 'P' ? (
                          <span className="badge bg-success p-2">P</span>
                        ) : days[i + 1] === 'A' ? (
                          <span className="badge bg-danger p-2">A</span>
                        ) : days[i + 1] === '🕒' ? ( // Handling the timer icon
                          <span className="badge bg-warning p-2">🕒 </span>
                        ) : (
                          '-'
                        )}
                      </td>
                    ))}

                    <td className="text-center">
                      {Object.values(days).filter((day) => day === 'P').length}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AttendanceHome;
