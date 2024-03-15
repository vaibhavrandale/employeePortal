import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../../Store';
import { Link } from 'react-router-dom';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

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

const DetailedTimeline = () => {
  const [
    { loading, error, attendance, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    attendance: [],
    loading: true,
    error: '',
  });
  //new
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [searchTerm, setSearchTerm] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/attendence', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.attendance });
        console.log(result.data.attendance);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [userInfo.token, month, selectedMonth, selectedYear, year]);

  const filteredData = attendance.filter((entry) => {
    if (searchTerm) {
      return (
        entry.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.employee_id.includes(searchTerm)
      );
    }
    return (
      (!selectedYear || entry.year === selectedYear) &&
      (!selectedMonth || entry.month === selectedMonth)
    );
  });

  // Check if groupedData is empty

  return (
    <div className="container">
      <h3 className="text-center fw-bold">All Employee Detailed Timeline</h3>
      {/* Add filters for month and year */}
      <div className="d-flex justify-content-between flex-wrap">
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
        <div></div>
        <div className="mb-3 mx-2 d-flex justify-content-end">
          <input
            type="text"
            className="inputField search "
            style={{ width: '250px' }}
            placeholder="Search Employee.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        {loading ? (
          <LoadingBox4 />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">UID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">IN_LATTITUDE_1</th>
                <th scope="col">IN_LONGITUDE_1</th>
                <th scope="col">IN_TIME_1</th>
                <th scope="col">OUT_LATTITUDE_1</th>
                <th scope="col">OUT_LONGITUDE_1</th>
                <th scope="col">OUT_TIME_1</th>
                <th scope="col">IN_LATTITUDE_2</th>
                <th scope="col">IN_LONGITUDE_2</th>
                <th scope="col">IN_TIME_2</th>
                <th scope="col">OUT_LATTITUDE_2</th>
                <th scope="col">OUT_LONGITUDE_2</th>
                <th scope="col">OUT_TIME_2</th>
                <th scope="col">IN_LATTITUDE_3</th>
                <th scope="col">IN_LONGITUDE_3</th>
                <th scope="col">IN_TIME_3</th>
                <th scope="col">OUT_LATTITUDE_3</th>
                <th scope="col">OUT_LONGITUDE_3</th>
                <th scope="col">OUT_TIME_3</th>
                <th scope="col">totalHours</th>
                <th scope="col">year</th>
                <th scope="col">month</th>
                <th scope="col">day</th>
                <th scope="col">isLeave</th>
                <th scope="col">LeaveType</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length === 0 ? (
                <tr>
                  <td colSpan={35} className="text-start table-danger">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.UID}</td>
                    <td className="text-center">{item.employee_id}</td>
                    <td className="text-center">
                      {item.IN_LATTITUDE_1 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.IN_LONGITUDE_1 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      <td colSpan="3">
                        {item.IN_TIME_1 || (
                          <span className="badge bg-secondary">No record</span>
                        )}
                      </td>
                    </td>
                    <td className="text-center">
                      {item.OUT_LATTITUDE_1 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_LONGITUDE_1 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_TIME_1 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.IN_LATTITUDE_2 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.IN_LONGITUDE_2 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.IN_TIME_2 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_LATTITUDE_2 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_LONGITUDE_2 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_TIME_2 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.IN_LATTITUDE_3 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.IN_LONGITUDE_3 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.IN_TIME_3 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_LATTITUDE_3 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_LONGITUDE_3 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.OUT_TIME_3 || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">{item.totalHours}</td>
                    <td className="text-center">{item.year}</td>
                    <td className="text-center">{item.month}</td>
                    <td className="text-center">{item.day}</td>
                    <td className="text-center">{item.isLeave.toString()}</td>
                    <td className="text-center">
                      {' '}
                      {item.LeaveType || (
                        <span className="badge bg-secondary">No record</span>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="d-flex">
                        <Link
                          to={`/edit-timeline/${item.year}/${item.month}/${item.day}/${item.employee_id}/${item.id}`}
                          className="btn btn-sm bg-warning fw-bold"
                        >
                          update
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DetailedTimeline;
