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
const SalarySleep = () => {
  const [{ loading, error, employee }, dispatch] = useReducer(reducer, {
    employee: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [employeeData, setEmployeeData] = useState(null);
  const pdfPreviewRef = useRef(null);

  useEffect(() => {
    // Fetch employee data from the API
    axios
      .get(`/api/employees/details/${userInfo._id}`) // Replace '/api/employees' with your API endpoint
      .then((response) => {
        setEmployeeData(response.data); // Assuming the API returns an object with employee data
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo._id]);

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

      setTimeout(() => {
        // setEmployees(result.data);
        // setLoading(false);
      }, 2000); // Simulating a 2-second delay
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

  const generatePdf = (employeeData) => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40; // Width of the logo (adjust as needed)
    const logoX = pageWidth - logoWidth - 10; // 10 units padding from the right margin
    doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.getHeight() - 10, 'S');

    // Add company logo to the PDF, moved to the right-most corner
    doc.addImage(logo, 'PNG', logoX, 10, 30, 10);
    doc.text(`TAYPRO PRIVATE LIMITED`, 70, 30);
    doc.setFontSize(10);
    doc.text(`Payslip for the month June -2023`, 80, 35);
    doc.text(`Financial Period 2023-2024`, 84, 40);
    doc.text(`Private & Confidential*`, 152, 49);

    // Data for the four columns
    const columnData = [
      [
        { content: 'Employee ID', fontStyle: 'bold' },
        employee.employee_id,
        'Location',
        'Pune',
      ],
      [
        { content: 'Designation', fontStyle: 'bold' },
        employee.designation,
        'PAN',
        '111111',
      ],
      [
        { content: 'Gender', fontStyle: 'bold' },
        'Male',
        { content: 'Bank A/C', fontStyle: 'bold' },
        'QWE23000',
      ],

      [
        { content: 'PF A/C', fontStyle: 'bold' },
        '1223345trff54433',
        { content: 'Status', fontStyle: 'bold' },
        'Salary Credited',
      ],
      [
        { content: 'UAN', fontStyle: 'bold' },
        '12334445',
        { content: 'Available Calender Days', fontStyle: 'bold' },
        '30',
      ],
      [
        { content: 'UAN', fontStyle: 'bold' },
        '12334445',
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
        fillColor: [211, 211, 211],
        textColor: '#000',
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
      ['Allowance', '12445'],
      ['Conveyance Allowance', '12445'],
      ['Medical Allowance', '12445'],
      ['Special Allowance', '12445'],
      ['Deputation Allowance-payout', '12445'],
      [{ content: '', fontStyle: 'bold' }, ''],
      [
        { content: '(A) Total Earnings', fontStyle: 'bold' },
        { content: '12445', halign: 'right' },
      ],
      // Add other salary components here
    ];

    // Generate the "Earning" table
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10, // Start the table below the first table
      startX: 30,
      head: [['Earning', 'Amount']],
      theme: 'grid', // 'striped', 'grid', 'plain'
      columnStyles: {
        0: { cellWidth: 65 },
        1: { cellWidth: 25 },
      },
      body: salaryData,
      headStyles: {
        fillColor: [211, 211, 211],
        textColor: '#000',
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
      [{ content: '(B) Total Deduction', fontStyle: 'bold' }, '12445'],

      // Add other salary components here
    ];

    // Generate the "Deduction" table
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 5, // Start the table at the same vertical position as the "Earning" table
      startX: doc.internal.pageSize.getWidth() / 5 + 5, // Start the table at the right-half of the page
      theme: 'grid', // 'striped', 'grid', 'plain'
      head: [['Deduction', 'Amount']],
      body: deductionData,
      headStyles: {
        fillColor: [211, 211, 211],
        textColor: '#000',
        fontStyle: 'bold',
        halign: 'start', // Center the heading text horizontally
      },
      columnStyles: {
        0: { cellWidth: 65 },
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
      [{ content: 'Net Salary = (A)-(B)', fontStyle: 'bold' }, '22445'],

      // Add other salary components here
    ];

    // Generate the "Deduction" table
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 5, // Start the table at the same vertical position as the "Earning" table
      theme: 'grid', // 'striped', 'grid', 'plain'
      //   head: [['Deduction', 'Amount']],
      body: netSalaryDate,
      headStyles: {
        fillColor: [211, 211, 211],
        textColor: '#000',
        fontStyle: 'bold',
        halign: 'start', // Center the heading text horizontally
      },
      columnStyles: {
        0: { cellWidth: 65 },
        1: { cellWidth: 25 },
      },
      didParseCell: function (data) {
        if (
          (data.cell.section === 'body' && data.column.index === 0) ||
          data.column.index === 1
          //   data.row.index === 0
        ) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = '#FF0000';
          data.cell.styles.halign = 'right';
        }
      },
    });

    return doc;
  };

  const generateAndPreviewPdf = () => {
    const employeeId = employeeData._id; // Assuming 'id' is the property in employeeData containing the employee ID
    const salarySlipPdf = generatePdf(employeeData);
    const pdfBlob = salarySlipPdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    if (pdfPreviewRef.current) {
      pdfPreviewRef.current.src = pdfUrl;
      pdfPreviewRef.current.id = `employee-${employeeId}`;
    }
  };

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container1  d-flex  flex-column justify-content-center p-1">
      {/* Your existing salary slip content */}
      <h1>Employee Salary Slip</h1>
      {/* ... (other salary slip components) */}

      {/* Add a button to trigger PDF generation and preview */}
      <button className="historyBtn" onClick={generateAndPreviewPdf}>
        Preview PDF
      </button>

      {/* Add the PDF preview */}
      <div>
        <iframe
          ref={pdfPreviewRef}
          title="PDF Preview"
          width="100%"
          height="500px"
          //   style={{ border: '1px solid black' }}
        />
      </div>
    </div>
  );
};

export default SalarySleep;
