import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../Signin/Taypro.png'; // Import your company logo as a data URI or URL
import axios from 'axios';
import { Store } from '../../Store';
import './salarySleep.css';
import toast from 'react-hot-toast';
import LoadingBox from '../../components/LoadingBox';
import MsgBox from '../../components/MessageBox/MsgBox';
import LoadingBox1 from '../../components/LoadingBox1';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employee: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
const SalarySleep = ({ onClose, onSubmit }) => {
  const [{ loading, error, employee }, dispatch] = useReducer(reducer, {
    employee: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [employeeData, setEmployeeData] = useState(null);
  const pdfPreviewRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const totalDeduction = '3000';

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/employees/details/${userInfo._id}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employee });
        console.log(result.data);
        setEmployeeData(result.data.employee);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    // setLoading(true);
    fetchData();
  }, [userInfo._id]);

  useEffect(() => {
    // Clean up the PDF URL when the component is unmounted
    return () => {
      if (pdfPreviewRef.current) {
        URL.revokeObjectURL(pdfPreviewRef.current.src);
      }
    };
  }, []);

  const generatePdf = (employeeData, selectedYear, selectedMonth) => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40; // Width of the logo (adjust as needed)
    const logoX = pageWidth - logoWidth - 10; // 10 units padding from the right margin
    doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.getHeight() - 10, 'S');
    const filteredPayslips = employeeData.payslips.filter(
      (payslip) =>
        payslip.year.toString() === selectedYear &&
        payslip.month.toLowerCase() === selectedMonth.toLowerCase()
    );

    // If no payslips are found for the selected month and year, you can handle it accordingly
    if (filteredPayslips.length === 0) {
      // Display an error message or handle the scenario as per your requirement
      console.log('No payslips found for the selected month and year.');
      return;
    }

    const payslipData = filteredPayslips[0];

    // // Display the payslip data in the PDF
    // doc.text(`Month: ${payslipData.month}, ${payslipData.year}`, 84, 45);
    // doc.text(`Salary: ${payslipData.salary}`, 84, 50);
    // doc.text(`Deductions: ${payslipData.deductions}`, 84, 55);
    // doc.text(`Deduction Reason: ${payslipData.deductionReason}`, 84, 60);
    // Add company logo to the PDF, moved to the right-most corner
    doc.addImage(logo, 'PNG', logoX, 10, 30, 10);
    doc.text(`TAYPRO PRIVATE LIMITED`, 70, 30);
    doc.setFontSize(10);
    doc.text(
      `Payslip for the month ${selectedMonth.toUpperCase()} - ${selectedYear}`,
      80,
      35
    );

    doc.text(
      `Financial Period ${selectedYear}-${parseInt(selectedYear, 10) + 1}`,
      84,
      40
    );

    doc.text(`Private & Confidential*`, 152, 49);

    // Data for the four columns
    const columnData = [
      [
        { content: 'Employee Name', fontStyle: 'bold' },
        employee.name,

        'Location',
        'Pune',
      ],
      [
        { content: 'Employee ID', fontStyle: 'bold' },
        employee.employee_id,
        'PAN',
        '111111',
      ],
      [
        { content: 'Designation', fontStyle: 'bold' },
        employee.designation,
        { content: 'Bank A/C', fontStyle: 'bold' },
        'QWE23000',
      ],

      [
        { content: 'Gender', fontStyle: 'bold' },
        employee.gender,

        { content: 'Status', fontStyle: 'bold' },
        filteredPayslips.length > 0 ? 'Salary Credited' : 'Salary Not Credited',
      ],
      [
        { content: 'PF A/C', fontStyle: 'bold' },
        employee.pf_account_no,
        { content: 'Available Calender Days', fontStyle: 'bold' },
        '30',
      ],
      [
        { content: 'UAN', fontStyle: 'bold' },
        employee.uan_number,

        { content: ' Paid Days', fontStyle: 'bold' },
        '30 ',
      ],
      // Add more rows as needed
    ];

    // Generate the table for the four columns
    doc.autoTable({
      startY: 50,
      startX: 0,
      head: [
        ['', '                        Employee', 'Information', '           '],
      ],
      body: columnData,
      theme: 'grid', // 'striped', 'grid', 'plain'
      headStyles: {
        fillColor: [115, 115, 115],
        textColor: '#fff',
        fontStyle: 'bold',
        halign: 'start', // Center the heading text horizontally
      },

      columnStyles: {
        0: { cellWidth: 44 },
        1: { cellWidth: 44 },
        2: { cellWidth: 44 },
        3: { cellWidth: 44 },
      },
      didParseCell: function (data) {
        if (
          (data.cell.section === 'body' && data.column.index === 0) ||
          data.column.index === 2
          //   data.row.index === 0
        ) {
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });

    const salaryData = [
      [{ content: 'Basic', fontStyle: 'bold' }, '12445'],
      [{ content: 'House Rent Allowance', fontStyle: 'bold' }, '12445'],

      ['Conveyance Allowance', '12445'],
      ['Medical Allowance', '12445'],
      ['Special Allowance', '12445'],
      ['Deputation Allowance-payout', '12445'],
      [{ content: '', fontStyle: 'bold' }, ''],
      [
        { content: '(A) Total Earnings', fontStyle: 'bold' },
        { content: payslipData.salary, halign: 'right' },
      ],
      // Add other salary components here
    ];

    // Generate the "Earning" table
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 5, // Start the table below the first table
      startX: 10,
      head: [['Earning', 'Amount']],
      theme: 'grid', // 'striped', 'grid', 'plain'
      columnStyles: {
        0: { cellWidth: 85 },
        1: { cellWidth: 25 },
      },
      body: salaryData,
      headStyles: {
        fillColor: [115, 115, 115],
        textColor: '#fff',
        fontStyle: 'bold',
        halign: 'start', // Center the heading text horizontally
      },
      didParseCell: function (data) {
        if (
          (data.cell.section === 'body' && data.column.index === 0) ||
          data.column.index === 2
          //   data.row.index === 0
        ) {
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });

    const deductionData = [
      [{ content: 'Professional Tax', fontStyle: 'bold' }, '12445'],
      [
        { content: 'Provident Fund-Employee Contribution', fontStyle: 'bold' },
        '12445',
      ],
      ['TDS', '1111'],
      [{ content: '', fontStyle: 'bold' }, ''],
      [{ content: '(B) Total Deduction', fontStyle: 'bold' }, totalDeduction],

      // Add other salary components here
    ];

    // Generate the "Deduction" table
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 5, // Start the table at the same vertical position as the "Earning" table
      startX: 15, // Start the table at the right-half of the page
      theme: 'grid', // 'striped', 'grid', 'plain'
      head: [['Deduction', 'Amount']],
      body: deductionData,
      headStyles: {
        fillColor: [115, 115, 115],
        textColor: '#fff',
        fontStyle: 'bold',
        halign: 'start', // Center the heading text horizontally
      },
      columnStyles: {
        0: { cellWidth: 85 },
        1: { cellWidth: 25 },
      },
      didParseCell: function (data) {
        if (
          (data.cell.section === 'body' && data.column.index === 0) ||
          data.column.index === 2
          //   data.row.index === 0
        ) {
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });

    const netSalaryDate = [
      [
        { content: 'Net Salary = (A) - (B)', fontStyle: 'bold' },
        `${parseInt(payslipData.salary, 10) - parseInt(totalDeduction, 10)}`,
      ],

      // Add other salary components here
    ];

    // Generate the "Deduction" table
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 5, // Start the table at the same vertical position as the "Earning" table
      theme: 'grid', // 'striped', 'grid', 'plain'
      //   head: [['Deduction', 'Amount']],
      body: netSalaryDate,
      headStyles: {
        fillColor: [115, 115, 115],
        textColor: '#fff',
        fontStyle: 'bold',
        halign: 'start', // Center the heading text horizontally
      },
      columnStyles: {
        0: { cellWidth: 85 },
        1: { cellWidth: 25 },
      },
      didParseCell: function (data) {
        if (
          (data.cell.section === 'body' && data.column.index === 0) ||
          data.column.index === 1
          //   data.row.index === 0
        ) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = '#000';
          data.cell.styles.halign = 'right';
        }
      },
    });

    return doc;
  };

  const generateAndPreviewPdf = () => {
    const filteredPayslips = employeeData.payslips.filter(
      (payslip) =>
        payslip.year.toString() === selectedYear &&
        payslip.month.toLowerCase() === selectedMonth.toLowerCase()
    );

    // If no payslips are found for the selected month and year, you can handle it accordingly
    if (filteredPayslips.length === 0) {
      // Display an error message or handle the scenario as per your requirement
      toast.error('No payslips found for the selected month and year.', {
        position: 'bottom-right',
      });
      return;
    }

    // Proceed with generating the PDF
    const employeeId = employeeData._id;
    const salarySlipPdf = generatePdf(
      employeeData,
      selectedYear,
      selectedMonth
    );

    // Check if the PDF generation is successful before proceeding
    if (salarySlipPdf) {
      const pdfBlob = salarySlipPdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      if (pdfPreviewRef.current) {
        pdfPreviewRef.current.src = pdfUrl;
        pdfPreviewRef.current.id = `employee-${employeeId}`;
      }
    } else {
      // Handle the scenario when PDF generation fails
      console.log('PDF generation failed.');
    }
  };

  return (
    <div className="container1  d-flex  flex-column justify-content-center  p-1">
      {/* Your existing salary slip content */}
      <h3 className="text-center">Download Pay Slip</h3>
      {loading ? (
        <LoadingBox3 />
      ) : error ? (
        <MsgBox className="alert alert-danger">{error}</MsgBox>
      ) : (
        <div className="d-flex form-group justify-content-center">
          <div className="year m-1">
            <label className="headingOfPopup m-1 " htmlFor="year">
              Select Year:
            </label>
            <select
              className=" form-control "
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">select</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>

              {/* Add more years if needed */}
            </select>
          </div>
          <div className="month m-1">
            <label className="headingOfPopup m-1 " htmlFor="year">
              Select Month:
            </label>
            <select
              className=" form-control "
              id="year"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">select</option>
              <option value="january">January</option>
              <option value="febraury">Febraury</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>

              {/* Add more years if needed */}
            </select>
          </div>

          <div className="preview m-1 d-flex flex-column">
            {selectedYear &&
              selectedMonth && ( // Check if both options are selected
                <>
                  <label htmlFor="" className="headingOfPopup m-1">
                    Perview
                  </label>
                  <button
                    className="btn btn-dark"
                    onClick={generateAndPreviewPdf}
                  >
                    Download Slip
                  </button>
                </>
              )}
          </div>
        </div>
      )}
      {<LoadingBox1 /> && (
        <div>
          <iframe
            ref={pdfPreviewRef}
            title="PDF Preview"
            width="100%"
            height="500px"
            //   style={{ border: '1px solid black' }}
          />
        </div>
      )}
    </div>
  );
};

export default SalarySleep;
