import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Store } from '../../Store';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, fetchloading: true };

    case 'FETCH_SUCCESS':
      return { ...state, payslip: action.payload, fetchloading: false };

    case 'FETCH_FAIL':
      return { ...state, fetchloading: false, error: action.payload };

    default:
      return state;
  }
};

const MonthlySalaryReport = () => {
  const [{ fetchloading, error, payslip }, dispatch] = useReducer(reducer, {
    payslip: [],
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

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
      } catch (error) {
        console.error('Error fetching days Data', error);
      }
    };

    daysData();
    fetchData();
  }, [month, year]);

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

  return (
    <>
      <div className="container">
        <h3 className="m-1"> Salary Report for month {currentMonth}</h3>

        <DownloadTableExcel
          filename={`Salary-Report-${month}-${year}`}
          sheet="users"
          currentTableRef={tableRef.current}
          beforeExport={applyStylesAndHeadingForExport}
        >
          <button className="btn btn-sm btn-success mx-1"> Export</button>
        </DownloadTableExcel>
        <table className="table table-bordered" ref={tableRef}>
          <thead>
            <tr>
              <th className="text-center">Employee id </th>
              <th className="text-center">Name </th>

              <th className="text-center">CTC</th>
              <th className="text-center">BASIC</th>
              <th className="text-center">HRA</th>
              <th className="text-center">Conveyance</th>
              <th className="text-center">medical</th>
              <th className="text-center">special</th>
              <th className="text-center">BASIC</th>
              <th className="text-center">BASIC</th>
              <th className="text-center">BASIC</th>
            </tr>
          </thead>

          <tbody>
            {payslip.map((item, index) => (
              <tr key={index}>
                <>
                  <td className="text-center">{item.employee_id}</td>
                  <td className="text-center">{item.NAME}</td>
                  <td className="text-center">{item.ctc}</td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonthlySalaryReport;
