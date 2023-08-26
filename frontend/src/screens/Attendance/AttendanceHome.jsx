import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../../Store';
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
  const [{ loading, error, attendanceDetails }, dispatch] = useReducer(
    reducer,
    {
      attendanceDetails: [],
      loading: true,
      error: '',
    }
  );
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/employees/attendance/${userInfo._id}`
        );
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
  }, [userInfo._id]);

  function transformAttendanceData(attendance) {
    const transformed = {};

    attendance.forEach((entry) => {
      if (!transformed[entry.userName]) {
        transformed[entry.userName] = {};
      }

      const day = new Date(entry.loginTime).getDate();
      transformed[entry.userName][day] = entry.checkin ? 'P' : 'A';
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

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(transformedData).map(([employeeName, days]) => (
            <tr key={employeeName}>
              <td>{employeeName}</td>
              {Array.from({ length: daysInMonth }).map((_, i) => (
                <td key={i}>{days[i + 1] || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceHome;
