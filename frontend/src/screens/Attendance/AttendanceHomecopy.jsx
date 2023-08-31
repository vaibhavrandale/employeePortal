// import attendanceData from './attendence.js';
// import axios from 'axios';
// import React, { useEffect, useReducer, useState } from 'react';
// import LoadingBox5 from '../../components/LoadingBox/LoadingBox5.jsx';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };

//     case 'FETCH_SUCCESS':
//       return { ...state, attendance: action.payload, loading: false };

//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// const AttendanceHomecopy = () => {
//   const [{ loading, error, attendance }, dispatch] = useReducer(reducer, {
//     attendance: [],
//     loading: true,
//     error: '',
//   });
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth();

//   const [viewYear, setViewYear] = useState(currentYear);
//   const [viewMonth, setViewMonth] = useState(currentMonth);
//   const [searchQuery, setSearchQuery] = useState('');

//   const getTotalHours = (loginTime, logoutTime) => {
//     const login = new Date(loginTime);
//     const logout = new Date(logoutTime);
//     const diff = (logout - login) / (1000 * 60 * 60); // Convert milliseconds to hours
//     return Math.round(diff * 100) / 100; // Round to two decimal places
//   };

//   const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

//   useEffect(() => {
//     // Simulate API call or data fetching
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });

//       try {
//         const result = await axios.get(`/api/employees/attendance`);
//         console.log(result.data.attendance);

//         dispatch({
//           type: 'FETCH_SUCCESS',
//           payload: result.data.attendance,
//         });

//         // Calculate remaining leaves based on fetched leave counts
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: err.message });
//       }

//       // Simulating a 2-second delay
//     };

//     fetchData();
//   }, []);

//   const groupedData = attendance.reduce((acc, record) => {
//     const recordDate = new Date(record.loginTime); // Extracting the date from loginTime
//     if (
//       recordDate.getFullYear() !== viewYear ||
//       recordDate.getMonth() !== viewMonth
//     )
//       return acc;

//     const day = recordDate.getDate();
//     const employeeKey = record.employee_id;

//     if (!acc[employeeKey]) {
//       acc[employeeKey] = {
//         name: record.userName,
//         email: record.userEmail,
//         days: {},
//         employee_id: record.employee_id,
//       };
//     }

//     acc[employeeKey].days[day] = {
//       totalHours: record.totalHours,
//       checkin: record.checkin,
//       loginTime: record.loginTime,
//       logoutTime: record.logoutTime,
//     };

//     return acc;
//   }, {});

//   const filteredData = Object.values(groupedData).filter(
//     (entry) =>
//       entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       entry.employee_id.includes(searchQuery)
//   );

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-between">
//         <div className="d-flex">
//           <div className="m-1">
//             <select
//               class="form-select"
//               value={viewYear}
//               onChange={(e) => setViewYear(Number(e.target.value))}
//             >
//               {/* Display year options (for simplicity, showing last 10 years) */}
//               {Array.from({ length: 10 }).map((_, index) => (
//                 <option key={currentYear - index} value={currentYear - index}>
//                   {currentYear - index}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="m-1">
//             <select
//               class="form-select"
//               value={viewMonth}
//               onChange={(e) => setViewMonth(Number(e.target.value))}
//             >
//               {/* Display month options */}
//               {Array.from({ length: 12 }).map((_, index) => (
//                 <option key={index} value={index}>
//                   {new Date(viewYear, index).toLocaleString('default', {
//                     month: 'long',
//                   })}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="m-1">
//           <input
//             className="form-control"
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by Name or ID..."
//           />
//         </div>
//       </div>

//       {loading ? (
//         <LoadingBox5 />
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Employee ID</th>
//               <th>Employee Name</th>
//               {Array.from({ length: daysInMonth }).map((_, index) => (
//                 <th key={index + 1}>{index + 1}</th>
//               ))}
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length ? (
//               filteredData.map((data) => (
//                 <tr key={data.employee_id}>
//                   <td>{data.employee_id}</td>
//                   <td>{data.name}</td>
//                   {/* {Array.from({ length: daysInMonth }).map((_, index) => {
//                     const dayData = data.days[index + 1];
//                     return (
//                       <td key={index + 1}>
//                         {dayData ? (
//                           dayData.totalHours >= 8.5 ? (
//                             <span className="badge bg-success">P</span>
//                           ) : (
//                             <span className="badge bg-warning">P</span> // If they've checked in but totalHours is less than 8.5
//                           )
//                         ) : (
//                           <span className="badge bg-danger">A</span>
//                         )}
//                       </td>
//                     );
//                   })} */}

//                   {Array.from({ length: daysInMonth }).map((_, index) => {
//                     const dayData = data.days[index + 1];
//                     if (!dayData || !dayData.loginTime)
//                       return <td key={index + 1}>-</td>;
//                     if (dayData.totalHours >= 8.5)
//                       return (
//                         <td key={index + 1}>
//                           <span className="badge bg-success">P</span>
//                         </td>
//                       );
//                     if (dayData.loginTime)
//                       return (
//                         <td key={index + 1}>
//                           <span className="badge bg-warning">P</span>
//                         </td>
//                       );
//                     return <td key={index + 1}>-</td>;
//                   })}
//                   <td></td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={daysInMonth + 2}>
//                   No data available for this month or search query
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AttendanceHomecopy;

import attendanceData from './attendence.js';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5.jsx';
import MsgBox from '../../components/MessageBox/MsgBox.js';

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
  const currentMonth = new Date().getMonth();

  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [searchQuery, setSearchQuery] = useState('');

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/employees/attendance`);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.attendance,
        });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const groupedData = attendance.reduce((acc, record) => {
    const recordDate = new Date(record.loginTime);
    if (
      recordDate.getFullYear() !== viewYear ||
      recordDate.getMonth() !== viewMonth
    )
      return acc;

    const day = recordDate.getDate();
    const employeeKey = record.employee_id;

    if (!acc[employeeKey]) {
      acc[employeeKey] = {
        name: record.userName,
        email: record.userEmail,
        days: {},
        employee_id: record.employee_id,
        joiningDate: record.joiningDate,
      };
    }

    acc[employeeKey].days[day] = {
      totalHours: record.totalHours,
      checkin: record.checkin,
      loginTime: record.loginTime,
      logoutTime: record.logoutTime,
    };

    return acc;
  }, {});

  const filteredData = Object.values(groupedData).filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.employee_id.includes(searchQuery)
  );

  const firstLoginDates = attendance.reduce((acc, record) => {
    if (
      !acc[record.employee_id] ||
      new Date(record.loginTime) < new Date(acc[record.employee_id])
    ) {
      acc[record.employee_id] = record.loginTime;
    }
    return acc;
  }, {});

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="m-1">
            <select
              class="form-select"
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
            >
              {/* Display year options (for simplicity, showing last 10 years) */}
              {Array.from({ length: 10 }).map((_, index) => (
                <option key={currentYear - index} value={currentYear - index}>
                  {currentYear - index}
                </option>
              ))}
            </select>
          </div>
          <div className="m-1">
            <select
              class="form-select"
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
            >
              {/* Display month options */}
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
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
            placeholder="Search by Name or ID..."
          />
        </div>
      </div>

      {loading ? (
        <LoadingBox5 />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              {Array.from({ length: daysInMonth }).map((_, index) => (
                <th key={index + 1}>{index + 1}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length ? (
              filteredData.map((data) => {
                let pCount = 0;
                const firstLoginDate = firstLoginDates[data.employee_id];
                return (
                  <tr key={data.employee_id}>
                    <td>{data.employee_id}</td>
                    <td>{data.name}</td>
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const dayData = data.days[index + 1];
                      const currentDate = new Date(
                        viewYear,
                        viewMonth,
                        index + 1
                      );
                      if (
                        currentDate < new Date(firstLoginDate) &&
                        currentDate.toDateString() !==
                          new Date(firstLoginDate).toDateString()
                      ) {
                        return (
                          <td key={index + 1}>
                            <span className="badge bg-secondary">NA</span>
                          </td>
                        );
                      } else if (dayData && dayData.loginTime) {
                        pCount++;
                        if (dayData.totalHours >= 8.5) {
                          return (
                            <td key={index + 1}>
                              <span className="badge bg-success">P</span>
                            </td>
                          );
                        } else {
                          return (
                            <td key={index + 1}>
                              <span className="badge bg-warning">P</span>
                            </td>
                          );
                        }
                      } else {
                        return (
                          <td key={index + 1}>
                            <span className="badge bg-danger">A</span>
                          </td>
                        );
                      }
                    })}
                    <td>{pCount}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={daysInMonth + 3}
                  className="text-center alert bg-info"
                >
                  {' '}
                  No data available for this month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceHomecopy;
