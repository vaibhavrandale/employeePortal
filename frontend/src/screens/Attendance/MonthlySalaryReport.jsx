import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Store } from '../../Store';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, fetchloading: true };

    case 'FETCH_SUCCESS':
      return { ...state, payslip: action.payload, fetchloading: false };

    case 'FETCH_FAIL':
      return { ...state, fetchloading: false, error: action.payload };

    case 'FETCH_EMPLOYEE_REQUEST':
      return { ...state, fetchloading: true };

    case 'FETCH_EMPLOYEE_SUCCESS':
      return { ...state, employees: action.payload, fetchloading: false };

    case 'FETCH_EMPLOYEE_FAIL':
      return { ...state, fetchloading: false, error: action.payload };

    default:
      return state;
  }
};

const MonthlySalaryReport = () => {
  const { month, year } = useParams();
  const [{ fetchloading, error, payslip, employees }, dispatch] = useReducer(
    reducer,
    {
      payslip: [],
      employees: [],
      loading: true,
      error: '',
    }
  );
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [totalSunday, setTotalSunday] = useState(0);

  const [attendanceData, setAttendanceData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        setLoading(true);

        const response = await axios.get(`/api/payslip`);
        console.log(`response ` + response);
        const data = response.data;
        console.log(`data ` + data);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data', error);
      } finally {
        setLoading(false);
      }
    };

    const daysData = async () => {
      try {
        setLoading(true);

        // Update the number of days in the month
        const daysResponse = await axios.get(
          `/api/attendence/getDaysInMonth/${month}/${year}`
        );
        const daysData = daysResponse.data.daysInMonth;
        setDaysInMonth(daysData);

        // Calculate total Sundays
        const firstDay = new Date(`${year}-${month}-01`);
        const lastDay = new Date(`${year}-${month}-${daysData}`);
        let totalSundays = 0;

        for (
          let currentDay = firstDay;
          currentDay <= lastDay;
          currentDay.setDate(currentDay.getDate() + 1)
        ) {
          if (currentDay.getDay() === 0) {
            // 0 corresponds to Sunday
            totalSundays++;
          }
        }

        setTotalSunday(totalSundays);
      } catch (error) {
        console.error('Error fetching days Data', error);
      } finally {
        setLoading(false);
      }
    };

    const EmployeeData = async () => {
      dispatch({ type: 'FETCH_EMPLOYEE_REQUEST' });

      try {
        const result = await axios.get('/api/employees');
        dispatch({
          type: 'FETCH_EMPLOYEE_SUCCESS',
          payload: result.data.employees,
        });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_EMPLOYEE_FAIL', payload: err.message });
      }
    };

    daysData();
    EmployeeData();
    fetchData();
  }, [month, totalSunday, year]);

  const applyStylesAndHeadingForExport = () => {
    const table = tableRef.current;
    if (table) {
      // Create a new row for the heading
      const headingRow = table.insertRow(0);

      // Create a cell in the heading row
      const headingCell = headingRow.insertCell(0);
      headingCell.colSpan = payslip.length; // Set the colspan based on the number of columns

      // Set the heading content
      headingCell.innerHTML = `Salary Report for Month ${month}`;

      // Apply your desired styles to the heading cell
      headingCell.style.textAlign = 'center';

      // Apply styles to the rest of the table
      const rows = table.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
          // Apply your desired styles here
          cells[j].style.textAlign = 'center';
        }
      }
    }
  };

  const getMonthName = (monthNumber) => {
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
    return months[monthNumber - 1];
  };

  const styles = {
    input: {
      width: '120px',

      fontSize: '1rem',

      borderRadius: '4px',

      transition: 'border-color 0.3s ease-in-out',
    },

    input2: {
      width: '120px',
      padding: '8px',
      fontSize: '1rem',

      borderRadius: '4px',
      margin: '1px',
      transition: 'border-color 0.3s ease-in-out',
      disabled: true,
    },
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between my-3">
          <h3 className="m-1">
            {' '}
            Salary Report Of{' '}
            <span className="text-success fw-bold">
              {getMonthName(month)}
            </span>{' '}
          </h3>

          <DownloadTableExcel
            filename={`Salary-Report-${month}-${year}`}
            sheet="users"
            currentTableRef={tableRef.current}
            beforeExport={applyStylesAndHeadingForExport}
          >
            <button className="btn btn-sm btn-success mx-1"> Export</button>
          </DownloadTableExcel>
        </div>
        <table className="table table-bordered" ref={tableRef}>
          <thead>
            <tr>
              <th className="text-center">Employee id </th>
              <th className="text-center">Name </th>
              <th className="text-center">BASIC</th>
              <th className="text-center">HRA</th>
              <th className="text-center">medical</th>
              <th className="text-center">Conveyance</th>
              <th className="text-center">Net Salary</th>
              <th className="text-center">Monthly Days</th>
              <th className="text-center">Present Days</th>
              <th className="text-center">W/OFF</th>

              <th className="text-center">Leave</th>
              <th className="text-center">PH</th>
              <th className="text-center">Paid Days</th>
              <th className="text-center">Can Days</th>

              <th className="text-center">Basic</th>
              <th className="text-center">HRA</th>
              <th className="text-center">medical</th>
              <th className="text-center">Conveyance</th>
              <th className="text-center">Incentive</th>
              <th className="text-center">Gross</th>
              <th className="text-center">PF</th>
              <th className="text-center">Esic</th>
              <th className="text-center">PT 12%</th>
              <th className="text-center">Canteen Deduction</th>
              <th className="text-center">MLWF</th>
              <th className="text-center">Total Deduction</th>
              <th className="text-center">Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {payslip.map((item, index) => {
              console.log('item.employee_id:', item.employee_id);
              console.log('Employees:', employees);
              const correspondingEmployee = employees.find(
                (employee) => employee.employee_id === item.employee_id
              );
              console.log('correspondingEmployee:', correspondingEmployee);
              return (
                <tr key={index}>
                  <td className="text-center">
                    <span style={styles.input}>{item.employee_id}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.NAME}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.basic}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.hra}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.medical}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.conveyance}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.netsalary}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{daysInMonth}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>PRESENT</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{totalSunday}</span>
                  </td>
                  {/* Render Leaves information once for each employee */}
                  <td className="text-center">
                    <span style={styles.input}>
                      {correspondingEmployee
                        ? `${correspondingEmployee.leaves}`
                        : 'N/A'}
                    </span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}></span>
                  </td>

                  <td className="text-center">
                    <span style={styles.input}>
                      {daysInMonth - totalSunday}
                    </span>
                  </td>

                  <td className="text-center">
                    <span style={styles.input}></span>
                  </td>

                  <td className="text-center">
                    <span style={styles.input}>{item.basic}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.hra}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.medical}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.conveyance}</span>
                  </td>

                  <td className="text-center">
                    <span style={styles.input}></span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.gross}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.pf}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.esic}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.pt}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}></span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}></span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.total_deduction}</span>
                  </td>
                  <td className="text-center">
                    <span style={styles.input}>{item.netsalary}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonthlySalaryReport;
