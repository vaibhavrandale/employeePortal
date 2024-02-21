// import React, { useReducer, useEffect, useContext, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Store } from '../../Store';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_ATTENDANCE_REQUEST':
//       return { ...state, loadingAttendance: true };

//     case 'FETCH_ATTENDANCE_SUCCESS':
//       return { ...state, attendance: action.payload, loadingAttendance: false };

//     case 'FETCH_ATTENDANCE_FAIL':
//       return {
//         ...state,
//         loadingAttendance: false,
//         errorAttendance: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// const IndividualAttendance = () => {
//   const [{ loadingAttendance, errorAttendance, attendance }, dispatch] =
//     useReducer(reducer, {
//       attendance: [],
//       loadingAttendance: true,
//       errorAttendance: '',
//     });

//   const { id } = useParams();
//   const { state } = useContext(Store);
//   const { userInfo } = state;

//   const [selectedYear, setSelectedYear] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;
//   const currentDay = new Date().getDate();
//   const [searchTerm, setSearchTerm] = useState('');

//   // const currentYear = 2023;
//   // const currentMonth = 9;

//   const [Year, setYear] = useState(currentYear);
//   const [Month, setMonth] = useState(currentMonth);

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_ATTENDANCE_REQUEST' });

//       try {
//         const result = await axios.get(`/api/employees/attendance/${id}`);
//         console.log(result);
//         dispatch({
//           type: 'FETCH_ATTENDANCE_SUCCESS',
//           payload: result.data.attendance,
//         });
//       } catch (err) {
//         dispatch({ type: 'FETCH_ATTENDANCE_FAIL', payload: err.message });
//       }
//     };

//     fetchData();
//   }, [id, Year, Month]);

//   const filteredData = attendance.filter((entry) => {
//     if (searchTerm) {
//       return (
//         entry.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.employee_id.toString().includes(searchTerm)
//       );
//     }
//     return (
//       (!selectedYear || entry.year === selectedYear) &&
//       (!selectedMonth || entry.month === selectedMonth)
//     );
//   });

//   const renderTableHeader = () => {
//     if (attendance.length === 0) {
//       return null;
//     }

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
//     const uniqueEmployees = [
//       ...new Set(filteredData.map((entry) => entry.Name)),
//     ];

//     const daysInMonth = new Set(filteredData.map((entry) => entry.day)).size;

//     return (
//       <tbody className="text-center col-1">
//         {uniqueEmployees.map((Name) => {
//           const employeeEntries = filteredData.filter(
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
//               <button type="button" className="btn brn-sm btn-warning ">
//                 Edit &nbsp;<i className="fas fa-edit"></i>
//               </button>
//             </td> */}
//             </tr>
//           );
//         })}
//       </tbody>
//     );
//   };

//   return (
//     <div className="" style={{ margin: '59px 0px 0px 52px' }}>
//       <div className="filter">
//         <div>
//           <label htmlFor="yearFilter">Year:</label>
//           <select
//             className="select-dropdown"
//             id="yearFilter"
//             value={selectedYear || Year}
//             onChange={(e) =>
//               setSelectedYear(e.target.value ? parseInt(e.target.value) : null)
//             }
//           >
//             <option value="">All</option>
//             {Array.from(new Set(attendance.map((entry) => entry.year))).map(
//               (year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               )
//             )}
//           </select>

//           <label htmlFor="monthFilter">Month:</label>
//           <select
//             className="select-dropdown"
//             id="monthFilter"
//             value={selectedMonth || Month}
//             onChange={(e) =>
//               setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)
//             }
//           >
//             <option value="">All</option>
//             {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="row bg-white table-container ">
//         <table className="table table-bordered">
//           {renderTableHeader()}
//           {renderTableBody()}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default IndividualAttendance;

import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderDays from './HeaderDays';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { CSVLink } from 'react-csv';
import { Helmet } from 'react-helmet';
import { Store } from '../../Store';

const NewAttendance = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const SlipMonth = new Date().getMonth;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exportData, setExportData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/attendence/${userInfo.employee_id}`
        );
        const data = response.data.attendance;
        console.log(`Attendance:${response}`);
        setAttendanceData(data);

        // Update the number of days in the month
        const daysResponse = await axios.get(
          `/api/attendence/getDaysInMonth/${month}/${year}`
        );
        const daysData = daysResponse.data.daysInMonth;
        setDaysInMonth(daysData);
      } catch (error) {
        console.error('Error fetching attendance data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  const filteredData = attendanceData.filter((entry) => {
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

  const handleExportData = (employeeId) => {
    // Filter data for the specific employee
    const employeeData = attendanceData.filter(
      (entry) => entry.employee_id === employeeId
    );

    // Check if there is data
    if (employeeData.length === 0) {
      return;
    }

    // Get the keys of the first entry to include all fields
    const fieldKeys = Object.keys(employeeData[0]);

    // Generate CSV data
    const csvData = employeeData.map((entry) => {
      const rowData = {};
      fieldKeys.forEach((key) => {
        rowData[key] = entry[key];
      });
      return rowData;
    });

    // Trigger CSV download
    setExportData(csvData);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Attendance</title>
      </Helmet>
      <h2 className="text-center mt-3">My Timeline</h2>
      {/* Add filters for month and year */}
      <div className="d-flex">
        <div className="mb-3 mx-2">
          <label htmlFor="month" className="form-label">
            Select Month:
          </label>
          <select
            id="month"
            className="form-select"
            style={{ width: '120px' }}
            value={selectedMonth || month}
            onChange={(e) =>
              setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)
            }
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="mb-3 mx-2">
          <label htmlFor="year" className="form-label">
            Select Year:
          </label>
          <select
            id="year"
            className="form-select "
            style={{ width: '120px' }}
            value={selectedYear || year}
            onChange={(e) =>
              setSelectedYear(e.target.value ? parseInt(e.target.value) : null)
            }
          >
            {/* Add options for years */}
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* ... Add options for other years ... */}
          </select>
        </div>
      </div>

      {/* Add other HTML elements and form for filtering */}
      <table className="table table-bordered">
        <HeaderDays daysInMonth={daysInMonth} month={month} />

        <tbody>
          {loading ? (
            <tr className="text-center">
              <LoadingBox4 />
            </tr>
          ) : (
            <>
              {(() => {
                // Preprocess the data to group it by employee_id
                const groupedData = [];
                filteredData.forEach((attendance) => {
                  const existingEmployee = groupedData.find(
                    (employee) =>
                      employee.employee_id === attendance.employee_id
                  );

                  if (existingEmployee) {
                    // Employee already exists, update days array
                    const day = attendance.day;
                    existingEmployee.days[day - 1] = attendance;
                  } else {
                    // Add new employee to the groupedData array
                    const newEmployee = {
                      ...attendance,
                      days: Array.from({ length: daysInMonth }).map(() => ({})),
                      totalPCount: 0, // Initialize totalPCount for each employee
                      totalHCount: 0, // Initialize totalPCount for each employee
                      totalPHCount: 0, // Move totalHCount inside the employee map loop
                    };

                    const day = new Date(attendance.IN_TIME_1).getDate();
                    newEmployee.days[day - 1] = attendance;

                    groupedData.push(newEmployee);
                  }
                });

                // Check if groupedData is empty
                if (groupedData.length === 0) {
                  return (
                    <tr>
                      <td colSpan={35} className="text-center">
                        No data found
                      </td>
                    </tr>
                  );
                }

                // Render the table using the grouped data
                return groupedData.map((employee) => {
                  let totalPCount = 0; // Move totalPCount inside the employee map loop
                  let totalHCount = 0; // Move totalHCount inside the employee map loop
                  let totalPHCount = 0; // Move totalHCount inside the employee map loop

                  return (
                    <tr key={employee.employee_id}>
                      <td className="text-center">{employee.UID}</td>
                      <td className="text-center">{employee.Name}</td>
                      <td className="text-center">{employee.employee_id}</td>

                      {employee.days.map((attendance, dayIndex) => {
                        const day = dayIndex + 1;

                        if (attendance.IN_TIME_1) {
                          const inTime = attendance.IN_TIME_1.split(' ')[1];
                          const total = attendance.totalHours / 60;
                          const status = attendance.isLeave
                            ? 'L'
                            : inTime > '09:15:00' && total >= 8
                            ? 'P*'
                            : inTime < '09:15:00' || total >= 8
                            ? 'P'
                            : attendance.totalHours < 4
                            ? 'P*'
                            : 'H';

                          // const bgClass =
                          //   status === 'L'
                          //     ? 'badge bg-danger text-white p-2'
                          //     : 'badge bg-success text-white p-2';

                          const bgClass =
                            status === 'L'
                              ? 'badge bg-danger text-white p-2'
                              : attendance.LeaveType === 'PH'
                              ? 'badge bg-danger text-white p-2' // Set background color to danger for 'PH'
                              : 'badge bg-success text-white p-2';

                          // Increment the totalPCount when status is 'P'
                          if (status === 'P') {
                            totalPCount++;
                            employee.totalPCount++; // Increment the employee's totalPCount
                          }

                          // Increment the totalPCount when status is 'P'
                          if (status === 'H') {
                            totalHCount++;
                            employee.totalHCount++; // Increment the employee's totalPCount
                          }
                          if (status === 'L' && employee.isProbation === 1) {
                            totalPCount++;
                            employee.totalPCount++; // Increment the employee's totalPCount
                          }
                          if (attendance.LeaveType === 'PH') {
                            totalPHCount++;
                            employee.totalPHCount++; // Increment the employee's totalPCount
                          }

                          return (
                            <td key={day}>
                              <span
                                className={bgClass}
                                data-bs-toggle="modal"
                                data-bs-target={`#viewOneDay_${employee.employee_id}_${day}`}
                                type="button"
                              >
                                {status}
                              </span>

                              {/* ------------------------------view oneDay -------------------------- */}
                              <div
                                className="modal fade"
                                id={`viewOneDay_${employee.employee_id}_${day}`}
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                                style={{}}
                              >
                                <div className="modal-dialog modal-md">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                      >
                                        <b className="text-dark">
                                          {' '}
                                          <span style={{ color: 'crimson' }}>
                                            Your
                                          </span>
                                          &nbsp; Day {day} Timeline
                                        </b>
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <table className="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th className="col-2 text-center">
                                              ON / OUT
                                            </th>
                                            <th className="col-3 text-center">
                                              IN TIME
                                            </th>
                                            <th className="col-3 text-center">
                                              OUT TIME
                                            </th>
                                            <th className="col-1 text-center">
                                              LOCATION
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td className="col">Tap 1</td>
                                            <td className="col-3 text-center">
                                              {attendance.IN_TIME_1
                                                ? attendance.IN_TIME_1.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-3 text-center">
                                              {attendance.OUT_TIME_1
                                                ? attendance.OUT_TIME_1.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-1">
                                              <span className="d-flex">
                                                {attendance.IN_LATTITUDE_1 &&
                                                attendance.IN_LONGITUDE_1 ? (
                                                  <Link
                                                    className="text-decoration-none badge bg-success mx-1 text-white"
                                                    to={`https://www.google.com/maps/search/?api=1&query=${attendance.IN_LATTITUDE_1},${attendance.IN_LONGITUDE_1}`}
                                                    target="_blank"
                                                  >
                                                    IN
                                                  </Link>
                                                ) : (
                                                  ''
                                                )}
                                                {attendance.OUT_LATTITUDE_1 &&
                                                attendance.OUT_LONGITUDE_1 ? (
                                                  <Link
                                                    className="text-decoration-none badge bg-success mx-1 text-white "
                                                    to={`https://www.google.com/maps/search/?api=1&query=${attendance.OUT_LATTITUDE_1},${attendance.OUT_LONGITUDE_1}`}
                                                    target="_blank"
                                                  >
                                                    OUT
                                                  </Link>
                                                ) : (
                                                  ''
                                                )}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td className="col">Tap 2</td>
                                            <td className="col-3 text-center">
                                              {attendance.IN_TIME_2
                                                ? attendance.IN_TIME_2.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-3 text-center">
                                              {attendance.OUT_TIME_2
                                                ? attendance.OUT_TIME_2.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-1">
                                              <span className="d-flex">
                                                {attendance.IN_LATTITUDE_2 &&
                                                attendance.IN_LONGITUDE_2 ? (
                                                  <Link
                                                    className="text-decoration-none badge bg-success mx-1 text-white"
                                                    to={`https://www.google.com/maps/search/?api=1&query=${attendance.IN_LATTITUDE_2},${attendance.IN_LONGITUDE_2}`}
                                                    target="_blank"
                                                  >
                                                    IN
                                                  </Link>
                                                ) : (
                                                  ''
                                                )}
                                                {attendance.OUT_LATTITUDE_2 &&
                                                attendance.OUT_LONGITUDE_2 ? (
                                                  <Link
                                                    className="text-decoration-none badge bg-success mx-1 text-white "
                                                    to={`https://www.google.com/maps/search/?api=1&query=${attendance.OUT_LATTITUDE_2},${attendance.OUT_LONGITUDE_2}`}
                                                    target="_blank"
                                                  >
                                                    OUT
                                                  </Link>
                                                ) : (
                                                  ''
                                                )}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td className="col">Tap 3</td>
                                            <td className="col-3 text-center">
                                              {attendance.IN_TIME_3
                                                ? attendance.IN_TIME_3.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-3 text-center">
                                              {attendance.OUT_TIME_3
                                                ? attendance.OUT_TIME_3.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-1">
                                              <span className="d-flex">
                                                {attendance.IN_LATTITUDE_3 &&
                                                attendance.IN_LONGITUDE_3 ? (
                                                  <Link
                                                    className="text-decoration-none badge bg-success mx-1 text-white"
                                                    to={`https://www.google.com/maps/search/?api=1&query=${attendance.IN_LATTITUDE_3},${attendance.IN_LONGITUDE_3}`}
                                                    target="_blank"
                                                  >
                                                    IN
                                                  </Link>
                                                ) : (
                                                  ''
                                                )}
                                                {attendance.OUT_LATTITUDE_3 &&
                                                attendance.OUT_LONGITUDE_3 ? (
                                                  <Link
                                                    className="text-decoration-none badge bg-success mx-1 text-white "
                                                    to={`https://www.google.com/maps/search/?api=1&query=${attendance.OUT_LATTITUDE_3},${attendance.OUT_LONGITUDE_3}`}
                                                    target="_blank"
                                                  >
                                                    OUT
                                                  </Link>
                                                ) : (
                                                  ''
                                                )}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td className="col-md-3">
                                              Total Hours
                                            </td>
                                            <td colspan="3">
                                              {(
                                                attendance.totalHours / 60
                                              ).toFixed(2)}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* ------------------------------view One Day-------------------------- */}
                            </td>
                          );
                        } else {
                          return <td key={day}></td>;
                        }
                      })}

                      <td className="text-center">{employee.totalPCount}</td>
                      <td className="text-center">{employee.totalHCount}</td>
                      <td className="text-center">{employee.totalPHCount}</td>

                      <td className="text-center">
                        {new Date().getDate() >= 28 ? (
                          <Link
                            to={`/pay-slip/${employee.employee_id}/${year}/${month}/${userInfo.token}/${totalPCount}/${userInfo.token}`}
                            target="_blank"
                            className="btn btn-success btn-sm"
                          >
                            Slip
                          </Link>
                        ) : (
                          <Link
                            className="btn btn-sm btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target={`#viewEmployee_${employee.employee_id}`}
                            type="button"
                          >
                            Pending
                          </Link>
                        )}

                        {/* -------------------pending modal-------------------------- */}
                        <div
                          className="modal fade"
                          id={`viewEmployee_${employee.employee_id}`}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          style={{}}
                        >
                          <div className="modal-dialog modal-md">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <h3 className="" style={{ color: 'crimson' }}>
                                  Salary slip for current month is Not yet
                                  generated
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* -------------------pending modal-------------------------- */}

                        {/* <Link
                          className="btn btn-sm btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target={`#viewEmployee_${employee.id}`}
                          type="button"
                        >
                          <i className="fas fa-edit"></i>
                        </Link> */}

                        {/* <div
                          className="modal fade"
                          id={`viewEmployee_${employee.id}`}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          style={{}}
                        >
                          <div className="modal-dialog modal-md">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  <b className="text-dark">
                                    {' '}
                                    <span style={{ color: 'crimson' }}>
                                      Employee {employee.Name}
                                    </span>
                                  </b>
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="text-center mt-3">
                                  {exportData.length > 0 && (
                                    <CSVLink
                                      data={exportData}
                                      filename={`employee_data_${employee.employee_id}.csv`}
                                      className="btn btn-secondary"
                                    >
                                      Download CSV
                                    </CSVLink>
                                  )}

                                 
                                  <Link
                                    // pay-slip/:id/:year/:month/:totaldays
                                    to={`/pay-slip/${employee.employee_id}/${year}/${month}/${userInfo.token}/${totalPCount}/${userInfo.token}`}
                                    target="_blank"
                                    className="btn btn-success"
                                  >
                                    Slip
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </td>
                    </tr>
                  );
                });
              })()}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <NewAttendance />
    </div>
  );
}

export default NewAttendance;
