import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Store } from '../../Store';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import LoadingBox2 from '../../components/LoadingBox/LoadingBox2';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

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

    case 'FETCH_HOLIDAY_REQUEST':
      return { ...state, fetchloading: true };

    case 'FETCH_HOLIDAY_SUCCESS':
      return { ...state, holidays: action.payload, fetchloading: false };

    case 'FETCH_HOLIDAY_FAIL':
      return { ...state, fetchloading: false, error: action.payload };

    default:
      return state;
  }
};

const MonthlySalaryReport = () => {
  const { month, year } = useParams();
  const [{ fetchloading, error, payslip, employees, holidays }, dispatch] =
    useReducer(reducer, {
      payslip: [],
      employees: [],
      holidays: null,
      loading: true,
      error: '',
    });
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
        //console.log(`response ` + response);
        const data = response.data;
        //console.log(`data ` + data);
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

    const HolidayCount = async () => {
      dispatch({ type: 'FETCH_HOLIDAY_REQUEST' });

      try {
        const result = await axios.get(`/api/holidays/total/${month}/${year}`);
        dispatch({
          type: 'FETCH_HOLIDAY_SUCCESS',
          payload: result.data,
        });
        console.log('holidaycount ' + result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_HOLIDAY_FAIL', payload: err.message });
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
        //console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_EMPLOYEE_FAIL', payload: err.message });
      }
    };

    daysData();
    EmployeeData();
    fetchData();
    HolidayCount();
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

  const filteredData = payslip.filter((entry) => {});

  console.log(holidays);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between my-3">
          <div></div>
          <DownloadTableExcel
            filename={`Salary-Report-${month}-${year}`}
            sheet="users"
            currentTableRef={tableRef.current}
            beforeExport={applyStylesAndHeadingForExport}
          >
            <button className="btn btn-sm btn-success mx-1"> Export</button>
          </DownloadTableExcel>
        </div>
        {fetchloading ? (
          <LoadingBox4 />
        ) : (
          <div class="table-responsive">
            <table className="table table-bordered" ref={tableRef}>
              <thead>
                <tr>
                  <th colSpan={14} className="text-center">
                    <h3 className="m-1">
                      Salary Report of Month&nbsp;-&nbsp;
                      <span className="text-success fw-bold">
                        {getMonthName(month)}
                      </span>
                    </h3>
                  </th>
                  <th colSpan={14} className="text-center">
                    <h3 className="m-1 text-dark fw-bold">TAYPRO - PUNE</h3>
                  </th>
                </tr>
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
                  <th className="text-center">UAN No</th>
                </tr>
              </thead>

              <tbody>
                {payslip.map((item, index) => {
                  ////console.log('item.employee_id:', item.employee_id);
                  ////console.log('Employees:', employees);
                  const correspondingEmployee = employees.find(
                    (employee) => employee.employee_id === item.employee_id
                  );
                  ////console.log('correspondingEmployee:', correspondingEmployee);

                  // Add the logic for parsed values here
                  let parsedMonth = parseInt(month, 10);
                  let parsedYear = parseInt(year, 10);
                  let parsedTotalDays = parseInt(
                    correspondingEmployee.isProbation === 1
                      ? daysInMonth - totalSunday
                      : [daysInMonth - totalSunday] -
                          [18 - correspondingEmployee.leaves],
                    10
                  );

                  let parsedCtc = parseInt(item.ctc, 10);

                  let averagedays = 31;

                  if (parsedMonth === 2) {
                    if (
                      (parsedYear % 4 === 0 && parsedYear % 100 !== 0) ||
                      parsedYear % 400 === 0
                    ) {
                      averagedays = 29;
                    } else {
                      averagedays = 28;
                    }
                  } else if ([4, 6, 9, 11].includes(parsedMonth)) {
                    averagedays = 30;
                  }

                  //console.log(`average days ${averagedays}`);

                  const netSalary = Math.floor(
                    correspondingEmployee.isProbation === 1
                      ? parsedCtc / 12 - item.total_deduction
                      : [
                          ([parsedTotalDays + totalSunday] * (parsedCtc / 12)) /
                            averagedays,
                        ] - item.total_deduction
                  );

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
                        <span style={styles.input}></span>
                      </td>
                      <td className="text-center">
                        <span style={styles.input}>{totalSunday}</span>
                      </td>
                      {/* Render Leaves information once for each employee */}
                      <td className="text-center">
                        <span style={styles.input}>
                          {correspondingEmployee
                            ? `${18 - correspondingEmployee.leaves}`
                            : 'N/A'}
                        </span>
                      </td>
                      <td className="text-center">
                        <span style={styles.input}>{holidays}</span>
                      </td>

                      <td className="text-center">
                        <span style={styles.input}></span>
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
                        <span style={styles.input}></span>
                      </td>
                      <td className="text-center">
                        <span style={styles.input}>
                          {correspondingEmployee
                            ? `${correspondingEmployee.pf_account_no}`
                            : 'N/A'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MonthlySalaryReport;
