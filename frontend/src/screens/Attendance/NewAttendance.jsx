import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeaderDays from './HeaderDays';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { Helmet } from 'react-helmet';
import { Store } from '../../Store';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import MonthlySalaryReport from './MonthlySalaryReport';

const NewAttendance = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exportData, setExportData] = useState(true);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/attendence`);
        const data = response.data.attendance;
        setAttendanceData(data);
        console.log(`data ${data}`);

        // const Employeeresponse = await axios.get(`/api/employees/`);
        // console.log(Employeeresponse.data.employees);

        // const Employeedata = Employeeresponse.data.employees;
        // setEmployeeData(Employeedata);
        // console.log(`Employee data ${Employeedata}`);

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

  return (
    <div className="container">
      <Helmet>
        <title> All Employee Timeline</title>
      </Helmet>
      <h2 className="text-center mt-3">All Employee Timeline</h2>
      {/* Add filters for month and year */}
      <div className="d-flex justify-content-between">
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
                setSelectedMonth(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
            >
              {/* Add options for months */}
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

              {/* ... Add options for other months ... */}
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
                setSelectedYear(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              {/* ... Add options for other years ... */}
            </select>
          </div>
        </div>
        <div>
          {filteredData.length === 0 ? (
            ''
          ) : (
            <div className="d-flex ">
              <DownloadTableExcel
                filename={`AttendanceData_${month}-${year}`}
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button className="btn btn-sm btn-success mx-1">
                  {' '}
                  Export{' '}
                </button>
              </DownloadTableExcel>
              <Link
                className="btn btn-sm btn-info text-light"
                to={`/Salary-Report/${month}/${year}`}
              >
                Report
              </Link>
            </div>
          )}
        </div>
      </div>

      <table className="table table-bordered" ref={tableRef}>
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
                    const day = new Date(attendance.day);
                    existingEmployee.days[day.getDate() - 1] = attendance;
                  } else {
                    // Add new employee to the groupedData array
                    const newEmployee = {
                      ...attendance,
                      days: Array.from({ length: daysInMonth }).map(() => ({})),
                      totalPCount: 0, // Initialize totalPCount for each employee
                      totalHCount: 0, // Initialize totalPCount for each employee
                      totalPHCount: 0, // Initialize totalPCount for each employee
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

                          const status = attendance.isLeave
                            ? 'L'
                            : inTime < '09:15:00' && attendance.totalHours >= 8
                            ? 'P'
                            : inTime < '09:15:00'
                            ? 'P'
                            : attendance.totalHours < 4
                            ? 'P*'
                            : 'H';

                          // const status = attendance.isLeave
                          //   ? 'L'
                          //   : inTime < '09:15:00'
                          //   ? 'P'
                          //   : attendance.totalHours < 4
                          //   ? 'P*'
                          //   : 'H';

                          // const status =
                          //   attendance.LeaveType === 'PH' &&
                          //   attendance.isLeave === 0
                          //     ? 'PH'
                          //     : attendance.isLeave === 1
                          //     ? 'L'
                          //     : inTime < '09:15:00'
                          //     ? 'P'
                          //     : attendance.totalHours < 4
                          //     ? 'H'
                          //     : 'P';

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
                          if (status === 'P*') {
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
                                            {employee.Name}
                                          </span>
                                          's Day {day} Attendance
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
                                            <th className="col-2">ON / OUT</th>
                                            <th className="col-3">IN TIME</th>
                                            <th className="col-3">OUT TIME</th>
                                            <th className="col-1">LOCATION</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td className="col">Punch 1</td>
                                            <td className="col-3">
                                              {attendance.IN_TIME_1
                                                ? attendance.IN_TIME_1.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-3">
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
                                            <td className="col">Punch 2</td>
                                            <td className="col-3">
                                              {attendance.IN_TIME_2
                                                ? attendance.IN_TIME_2.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-3">
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
                                                  <Link
                                                    className="text-decoration-none badge bg-light mx-1 text-dark"
                                                    disabled
                                                  >
                                                    IN
                                                  </Link>
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
                                                  <Link
                                                    className="text-decoration-none badge bg-light mx-1 text-dark"
                                                    disabled
                                                  >
                                                    OUT
                                                  </Link>
                                                )}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td className="col">Punch 3</td>
                                            <td className="col-3">
                                              {attendance.IN_TIME_3
                                                ? attendance.IN_TIME_3.split(
                                                    ' '
                                                  )[1]
                                                : ''}
                                            </td>
                                            <td className="col-3">
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
                                            <td colSpan="3">
                                              {attendance.totalHours}
                                              &nbsp;&nbsp;
                                              <span className="text-danger ">
                                                {/* {status === 'L' ? (
                                                  <>
                                                    <span className="text-success fw-bold">
                                                      {attendance.Name}{' '}
                                                    </span>
                                                    is on Leave -(
                                                    {attendance.LeaveType})
                                                  </>
                                                ) : (
                                                  ''
                                                )}{' '} */}
                                                {status === 'L' ? (
                                                  <>
                                                    <span className="text-success fw-bold">
                                                      {attendance.Name}{' '}
                                                    </span>
                                                    is on Leave -(
                                                    {attendance.LeaveType})
                                                  </>
                                                ) : (
                                                  ''
                                                )}{' '}
                                              </span>
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
                        <Link
                          // pay-slip/:id/:year/:month/:totaldays
                          to={`/pay-slip/${employee.employee_id}/${year}/${month}/${userInfo.token}/${totalPCount}/${userInfo.token}`}
                          target="_blank"
                          className="btn btn-success"
                        >
                          Slip
                        </Link>
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

      {/* <MonthlySalaryReport /> */}
    </div>
  );
}

export default NewAttendance;
