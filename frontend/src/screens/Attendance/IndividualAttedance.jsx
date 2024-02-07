import React, { useReducer, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Store } from '../../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ATTENDANCE_REQUEST':
      return { ...state, loadingAttendance: true };

    case 'FETCH_ATTENDANCE_SUCCESS':
      return { ...state, attendance: action.payload, loadingAttendance: false };

    case 'FETCH_ATTENDANCE_FAIL':
      return {
        ...state,
        loadingAttendance: false,
        errorAttendance: action.payload,
      };

    default:
      return state;
  }
};

const IndividualAttendance = () => {
  const [{ loadingAttendance, errorAttendance, attendance }, dispatch] =
    useReducer(reducer, {
      attendance: [],
      loadingAttendance: true,
      errorAttendance: '',
    });

  const { id } = useParams();
  const { state } = useContext(Store);
  const { userInfo } = state;

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
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ATTENDANCE_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/attendance/${id}`);
        console.log(result);
        dispatch({
          type: 'FETCH_ATTENDANCE_SUCCESS',
          payload: result.data.attendance,
        });
      } catch (err) {
        dispatch({ type: 'FETCH_ATTENDANCE_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [id, Year, Month]);

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

    const daysInMonth = new Set(attendance.map((entry) => entry.day)).size;

    const headers = ['Employee ID', 'Name'];

    for (let day = 1; day <= daysInMonth; day++) {
      headers.push(String(day));
    }

    // headers.push('Action');
    return (
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th className="text-center col-1" key={index}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

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
                    <td key={day}>
                      {entry ? (
                        entry.isLeave ? ( // Check if it's a leave entry
                          <span
                            className="badge bg-primary custom-tooltip"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Leave: ${entry.LeaveType}`}
                          >
                            L
                          </span>
                        ) : entry.IN_TIME && entry.OUT_TIME !== null ? (
                          <span
                            className="badge bg-success custom-tooltip"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Login: ${entry.IN_TIME}, Logout: ${entry.OUT_TIME}`}
                          >
                            P
                          </span>
                        ) : (
                          <span
                            className="badge bg-warning "
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Login: ${entry.IN_TIME}, Logout: ${
                              entry.OUT_TIME === null
                                ? 'Work is going on'
                                : 'false'
                            }`}
                          >
                            P*
                          </span>
                        )
                      ) : (
                        <span className="badge bg-danger">A</span>
                      )}
                    </td>
                  );
                }
              )}

              {/* <td className="text-center">
              <button type="button" className="btn brn-sm btn-warning ">
                Edit &nbsp;<i className="fas fa-edit"></i>
              </button>
            </td> */}
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
            className="select-dropdown"
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
            className="select-dropdown"
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
        <table className="table table-bordered">
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      </div>
    </div>
  );
};

export default IndividualAttendance;
