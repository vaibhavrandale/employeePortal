import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderDays from './HeaderDays';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { CSVLink } from 'react-csv';

const NewAttendance = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exportData, setExportData] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true); // Set loading to true before making the request

  //       const response = await axios.get(`/api/attendence`);
  //       const data = response.data.attendance;
  //       setAttendanceData(data);
  //     } catch (error) {
  //       console.error('Error fetching attendance data', error);
  //     } finally {
  //       setLoading(false); // Set loading to false regardless of success or failure
  //     }
  //   };

  //   const fetchDays = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await axios.get(
  //         `/api/attendence/getDaysInMonth/${month}/${year}`
  //       );
  //       const data = response.data.daysInMonth;
  //       setDaysInMonth(data);
  //     } catch (error) {
  //       console.error('Error fetching attendance data', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  //   fetchDays();
  // }, [month, year]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/attendence`);
        const data = response.data.attendance;
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
      <h2 className="text-center mt-3">All Employee Attendance</h2>
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
            {/* Add options for months */}
            <option value="1">January</option>
            <option value="2">February</option>
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
        <HeaderDays daysInMonth={daysInMonth} />

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
                    // const day = new Date(attendance.IN_TIME_1).getDate();
                    const day = new Date(attendance.day);
                    existingEmployee.days[day - 1] = attendance;
                  } else {
                    // Add new employee to the groupedData array
                    const newEmployee = {
                      ...attendance,
                      days: Array.from({ length: daysInMonth }).map(() => ({})),
                    };

                    const day = new Date(attendance.IN_TIME_1).getDate();
                    newEmployee.days[day - 1] = attendance;

                    groupedData.push(newEmployee);
                  }
                });
                let totalPCount = 0;

                // Render the table using the grouped data
                return groupedData.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td className="text-center">{employee.UID}</td>
                    <td className="text-center">{employee.Name}</td>
                    <td className="text-center">{employee.employee_id}</td>

                    {employee.days.map((attendance, dayIndex) => {
                      const day = dayIndex + 1;

                      if (attendance.IN_TIME_1) {
                        // const status = attendance.isLeave ? 'L' : 'P';
                        const inTime = attendance.IN_TIME_1.split(' ')[1]; // Extracts the time part
                        const status = attendance.isLeave
                          ? 'L' // Leave
                          : inTime > '09:15:00'
                          ? 'H' // Greater than 9:15
                          : 'P'; // Regular attendance
                        const bgClass =
                          status === 'L'
                            ? 'badge bg-warning text-dark p-2'
                            : 'badge bg-success text-white p-2';

                        // Increment the totalPCount when status is 'P'
                        if (status === 'P') {
                          totalPCount++;
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
                                            {attendance.IN_TIME_1}
                                          </td>
                                          <td className="col-3">
                                            {attendance.OUT_TIME_1}
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
                                                <Link
                                                  className="text-decoration-none badge bg-success mx-1 text-white"
                                                  disabled
                                                >
                                                  IN
                                                </Link>
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
                                          <td className="col">Punch 2</td>
                                          <td className="col-3">
                                            {attendance.IN_TIME_2}
                                          </td>
                                          <td className="col-3">
                                            {attendance.OUT_TIME_2}
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
                                            {attendance.IN_TIME_3}
                                          </td>
                                          <td className="col-3">
                                            {attendance.OUT_TIME_3}
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
                                                <Link
                                                  className="text-decoration-none badge bg-light mx-1 text-dark"
                                                  disabled
                                                >
                                                  IN
                                                </Link>
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
                                          <td className="col-md-3">
                                            Total Hours
                                          </td>
                                          <td colspan="3">
                                            {attendance.totalHours}
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

                    <td className="text-center">{totalPCount}</td>
                    <td className="text-center">
                      <Link
                        className="btn btn-sm btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target={`#viewEmployee_${employee.id}`}
                        type="button"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>

                      <div
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

                                {/* Link to view salary slip */}
                                <Link
                                  // pay-slip/:id/:year/:month/:totaldays
                                  to={`/pay-slip/${employee.employee_id}/${year}/${month}/${totalPCount}`}
                                  target="_blank"
                                  className="btn btn-success"
                                >
                                  Slip
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ));
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
