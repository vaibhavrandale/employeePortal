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
  const [SundaysInMonth, setSunDaysInMonth] = useState(0);
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
          `/api/attendence/getDaysInMonth/${selectedMonth || month}/${
            year || selectedYear
          }`
        );
        const daysData = daysResponse.data.daysInMonth;
        setDaysInMonth(daysData);

        // Update the number of days in the month
        const SundaysResponse = await axios.get(
          `/api/attendence/getSundaysInMonth/${selectedMonth || month}/${
            year || selectedYear
          }`
        );
        console.log(SundaysResponse);
        const SundaysData = SundaysResponse.data.totalSundays;
        setSunDaysInMonth(SundaysData);
      } catch (error) {
        console.error('Error fetching attendance data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, selectedMonth, selectedYear, userInfo.employee_id, year]);

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
      <div class="table-responsive">
        <table className="table table-bordered">
          <HeaderDays
            daysInMonth={daysInMonth}
            month={selectedMonth || month}
          />

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
                        days: Array.from({ length: daysInMonth }).map(
                          () => ({})
                        ),
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
                        <td colSpan={36} className="text-center">
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
                              : inTime >= '09:15:00' || total > 8
                              ? 'P*'
                              : inTime > '09:15:00' && total > 0 && total <= 5
                              ? 'H'
                              : 'P';

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
                                              <td colSpan="3">
                                                {attendance.totalHours > 20
                                                  ? (
                                                      attendance.totalHours / 60
                                                    ).toFixed(2)
                                                  : attendance.totalHours}
                                                &nbsp;&nbsp;
                                                <span className="text-danger ">
                                                  {status === 'L' ? (
                                                    <>
                                                      <span className="text-success fw-bold">
                                                        You &nbsp;
                                                      </span>
                                                      are on Leave -(
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
                        <td className="text-center">{SundaysInMonth}</td>
                        <td className="text-center">{employee.totalHCount}</td>
                        <td className="text-center">{employee.totalPHCount}</td>

                        <td className="text-center">
                          {new Date().getDate() >= 28 ? (
                            <Link
                              to={`/pay-slip/${
                                employee.employee_id
                              }/${year}/${month}/${userInfo.token}/${
                                employee.totalPCount +
                                SundaysInMonth +
                                employee.totalHCount / 2
                              }/${userInfo.token}`}
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
