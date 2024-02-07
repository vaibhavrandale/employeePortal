// import React, { useReducer } from 'react';
// import { Helmet } from 'react-helmet';
// import { useState, useEffect } from 'react';
// // import attendance from './attendence'; // Import your attendance data
// import './attendence.css'; // Import your attendance data
// import axios from 'axios';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_ATTEDANCE_REQUEST':
//       return { ...state, loadingAttedance: true };

//     case 'FETCH_ATTEDANCE_SUCCESS':
//       return { ...state, attendance: action.payload, loadingAttedance: false };

//     case 'FETCH_ATTEDANCE_FAIL':
//       return { ...state, loadingAttedance: false, error: action.payload };
//     default:
//       return state;
//   }
// };
// const AttendanceTableUpdated = () => {
//   const [empImg, setEmpImg] = useState('');

//   // useEffect(() => {
//   //   setEmployeeData(attendance);
//   // }, []);

//   const [{ loading, error, attendance, loadingAttedance }, dispatch] =
//     useReducer(reducer, {
//       attendance: [],
//       loading: true,
//       error: '',
//     });

//   const [selectedYear, setSelectedYear] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;

//   // const currentYear = 2023;
//   // const currentMonth = 9;

//   const [Year, setYear] = useState(currentYear);
//   const [Month, setMonth] = useState(currentMonth);

//   useEffect(() => {
//     console.log('Fetching data...');
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_ATTEDANCE_REQUEST' });

//       try {
//         const result = await axios.get(`/api/employees/attendance`);

//         console.log('Data received:', result.data.attendance); // Add this line
//         dispatch({
//           type: 'FETCH_ATTEDANCE_SUCCESS',
//           payload: result.data.attendance,
//         });
//       } catch (err) {
//         console.error('Error fetching data:', err); // Add this line
//         dispatch({ type: 'FETCH_ATTEDANCE_FAIL', payload: err.message });
//       }
//     };
//     fetchData();

//     // ... (previous code)
//   }, [Year, Month]);

//   const renderTableHeader = () => {
//     if (attendance.length === 0) {
//       return null;
//     }

//     const firstEmployee = attendance[0];
//     const daysInMonth = new Set(attendance.map((entry) => entry.day)).size;

//     const headers = ['Employee ID', 'Name'];

//     for (let day = 1; day <= daysInMonth; day++) {
//       headers.push(String(day));
//     }

//     // headers.push('Action');
//     return (
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th className="text-center col-1" key={index}>
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//     );
//   };

//   const renderTableBody = () => {
//     const uniqueEmployees = [...new Set(attendance.map((entry) => entry.Name))];
//     const daysInMonth = new Set(attendance.map((entry) => entry.day)).size;

//     return (
//       <tbody className="text-center col-1">
//         {uniqueEmployees.map((Name) => {
//           const employeeEntries = attendance.filter(
//             (entry) => entry.Name === Name
//           );

//           return (
//             <tr key={Name}>
//               <td>{employeeEntries[0].employee_id}</td>
//               <td>{Name}</td>
//               {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
//                 (day) => {
//                   const entry = employeeEntries.find((e) => e.day === day);

//                   return (
//                     <td key={day}>
//                       {entry ? (
//                         entry.isLeave ? ( // Check if it's a leave entry
//                           <span
//                             className="badge bg-primary custom-tooltip"
//                             data-toggle="tooltip"
//                             data-placement="top"
//                             title={`Leave: ${entry.LeaveType}`}
//                           >
//                             L
//                           </span>
//                         ) : entry.IN_TIME && entry.OUT_TIME !== null ? (
//                           <span
//                             className="badge bg-success custom-tooltip"
//                             data-toggle="tooltip"
//                             data-placement="top"
//                             title={`Login: ${entry.IN_TIME}, Logout: ${entry.OUT_TIME}`}
//                           >
//                             P
//                           </span>
//                         ) : (
//                           <span
//                             className="badge bg-warning "
//                             data-toggle="tooltip"
//                             data-placement="top"
//                             title={`Login: ${entry.IN_TIME}, Logout: ${
//                               entry.OUT_TIME === null
//                                 ? 'Work is going on'
//                                 : 'false'
//                             }`}
//                           >
//                             P*
//                           </span>
//                         )
//                       ) : (
//                         <span className="badge bg-danger">A</span>
//                       )}
//                     </td>
//                   );
//                 }
//               )}

//               {/* <td className="text-center">
//                 <button type="button" className="btn brn-sm btn-warning ">
//                   Edit &nbsp;<i className="fas fa-edit"></i>
//                 </button>
//               </td> */}
//             </tr>
//           );
//         })}
//       </tbody>
//     );
//   };

//   return (
//     <div className="" style={{ margin: '59px 0px 0px 52px' }}>
//       <div className="row bg-white table-container ">
//         <table className="table table-bordered">
//           {renderTableHeader()}
//           {renderTableBody()}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceTableUpdated;

import React, { useReducer, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import attendance from './attendence'; // Import your attendance data
import './attendence.css'; // Import your attendance data
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { RxEyeOpen } from 'react-icons/rx';

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
const AttendanceTableUpdated = () => {
  // useEffect(() => {
  //   setEmployeeData(attendance);
  // }, []);

  const [{ loading, error, attendance, loadingAttedance }, dispatch] =
    useReducer(reducer, {
      attendance: [],
      loading: true,
      error: '',
    });
  const csvRef = useRef(); // Create a ref for CSVLink
  const [newCsvData, setNewCsvData] = useState([]); // Define newCsvData state
  const csvHeaders = [];

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredData = attendance.filter((entry) => {
    if (searchTerm) {
      return (
        entry.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.employee_id.toString().includes(searchTerm)
      );
    }
    return (
      (!selectedYear || entry.year === selectedYear) &&
      (!selectedMonth || entry.month === selectedMonth)
    );
  });

  const renderTableHeader = () => {
    if (attendance.length === 0) {
      return null;
    }

    const firstEmployee = attendance[0];
    const daysInMonth = new Set(attendance.map((entry) => entry.day)).size;

    const headers = ['Employee ID', 'Name'];

    for (let day = 1; day <= daysInMonth; day++) {
      headers.push(String(day));
    }

    csvHeaders.length = 0;
    csvHeaders.push(
      'Employee ID',
      'Name',
      ...Array.from({ length: daysInMonth }, (_, index) => String(index + 1))
    );

    return (
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th className="text-center col-1" key={index}>
              {header}
            </th>
          ))}
          <th className="text-center col-1">Total</th>
          <th className="text-center col-1">Payslip</th>
        </tr>
      </thead>
    );
  };

  // const renderExportButton = () => (
  //   <div>
  //     <CSVLink
  //       ref={csvRef}
  //       data={[csvHeaders, ...newCsvData]}
  //       filename={`attendance_${Year}_${Month}.csv`}
  //       className="btn btn-primary"
  //       target="_blank"
  //     >
  //       Export as CSV
  //     </CSVLink>
  //   </div>
  // );

  const renderTableBody = () => {
    const uniqueEmployees = [
      ...new Set(filteredData.map((entry) => entry.Name)),
    ];
    const daysInMonth = new Set(filteredData.map((entry) => entry.day)).size;

    return (
      <tbody className="text-center col-1">
        {uniqueEmployees.map((Name) => {
          const employeeEntries = filteredData.filter(
            (entry) => entry.Name === Name
          );

          return (
            <tr key={Name}>
              <td>{employeeEntries[0].employee_id}</td>
              <td>{Name}</td>
              {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
                (day) => {
                  const entry = employeeEntries.find((e) => e.day === day);

                  return (
                    <td
                      key={day}
                      style={{
                        maxWidth: '30px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {entry ? (
                        entry.isLeave ? (
                          // Check if it's a leave entry
                          <span
                            className="badge bg-primary custom-tooltip leave-tooltip"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Leave: ${entry.LeaveType}`}
                          >
                            L
                          </span>
                        ) : entry.IN_TIME && entry.OUT_TIME !== null ? (
                          <span
                            className="badge bg-success custom-tooltip login-tooltip"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Login: ${new Date(entry.IN_TIME)
                              .toISOString()
                              .replace('T', ' ')
                              .substring(0, 19)}, Logout: ${new Date(
                              entry.OUT_TIME
                            )
                              .toISOString()
                              .replace('T', ' ')
                              .substring(0, 19)}`}
                          >
                            P
                          </span>
                        ) : (
                          <span
                            className="badge bg-warning custom-tooltip work-ongoing-tooltip"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Login:  ${new Date(entry.IN_TIME)
                              .toISOString()
                              .replace('T', ' ')
                              .substring(0, 19)}, Logout: ${
                              entry.OUT_TIME === null
                                ? 'Work is going on'
                                : 'false'
                            }`}
                          >
                            P*
                          </span>
                        )
                      ) : (
                        <span className="badge bg-danger custom-tooltip absent-tooltip">
                          A
                        </span>
                      )}
                    </td>
                  );
                }
              )}

              <td>{employeeEntries.length}</td>
              <td>
                <Link
                  to={`/pay-slip/${employeeEntries[0].employee_id}/${Year}/${Month}/${employeeEntries.length}`}
                  className="p-2 text-decoration-none badge bg-success"
                  target="blank"
                >
                  View&nbsp; <RxEyeOpen />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className="" style={{ margin: '59px 0px 0px 52px' }}>
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
            {Array.from(new Set(attendance.map((entry) => entry.year))).map(
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
      </div>
      <div className="row bg-white table-container ">
        {/* {renderExportButton()} */}
        <table className="table table-bordered">
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      </div>
    </div>
  );
};

export default AttendanceTableUpdated;
