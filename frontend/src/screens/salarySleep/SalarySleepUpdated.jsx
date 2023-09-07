import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Import your company logo as a data URI or URL
import axios from 'axios';
import { Store } from '../../Store';
import './salarySleep.css';
import toast from 'react-hot-toast';
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
const SalarySleepUpdated = ({ onClose, onSubmit }) => {
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
      if (pdfPreviewRef) {
        URL.revokeObjectURL(pdfPreviewRef.src);
      }
    };
  }, []);
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';
  const generatePdf = (employeeData, selectedYear, selectedMonth) => {
    const doc = new jsPDF('landscape'); // Set landscape orientation
    // const doc = new jsPDF();

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
    doc.addImage(logo, 'PNG', logoX, 10, 35, 10);
    doc.text(`TAYPRO PRIVATE LIMITED`, 15, 15);
    doc.setFontSize(10);
    doc.text(
      `Payslip for the month ${selectedMonth.toUpperCase()} - ${selectedYear}`,
      16,
      21
    );

    doc.text(
      `Financial Period ${selectedYear}-${parseInt(selectedYear, 10) + 1}`,
      16,
      26
    );

    doc.line(5, 28, doc.internal.pageSize.getWidth() - 5, 28);

    //  ----------------------------------- 1st table------------------------------
    doc.setDrawColor(0, 128, 255);
    doc.line(15, 35, 105, 35);
    //vertical line
    doc.line(15, 35, 15, 49);
    doc.setTextColor(0, 128, 255); // Set text color to blue
    doc.text(`Name`, 17, 40);

    //vertical line
    doc.line(45, 35, 45, 49);

    doc.setTextColor(0); // Reset text color to black
    doc.text(`Vaibhav Randale`, 47, 40);

    doc.line(15, 42, 105, 42);

    doc.setTextColor(0, 128, 255); // Set text color to blue

    doc.text(`Salary Group`, 16, 47);

    doc.line(15, 49, 105, 49);
    //vertical line
    doc.setTextColor(0, 128, 255); // Set text color to blue

    doc.setTextColor(0); // Reset text color to black

    doc.text(`5`, 47, 47);
    //last vertical line
    doc.line(105, 35, 105, 49);

    //  ----------------------------------- 1st table end------------------------------

    //  ----------------------------------- 2nd table------------------------------
    doc.line(120, 35, 286, 35);
    //vertical line
    doc.line(120, 35, 120, 49);
    doc.setTextColor(0, 128, 255); // Set text color to blue
    doc.text(`Designation`, 122, 40);

    doc.setTextColor(0); // Reset text color to black
    doc.text(`Web Developer`, 152, 40);

    doc.setTextColor(0, 128, 255); // Set text color to blue
    doc.text(`Location`, 122, 47);

    doc.setTextColor(0); // Reset text color to black
    doc.text(`Pune`, 152, 47);
    //vertical line
    doc.line(286, 35, 286, 49);

    doc.line(150, 35, 150, 49);

    doc.line(120, 42, 286, 42);
    doc.line(120, 49, 286, 49);

    //  ----------------------------------- 2nd table end ------------------------------

    // ----------------info text table-----------------------------------------
    //vertical line
    doc.line(120, 54, 120, 145);
    doc.setFillColor(0, 0, 255); // Blue color
    doc.setTextColor(50, 153, 255); // White color
    doc.setFontSize(11);
    doc.text(`Description`, 122, 59);
    doc.line(120, 54.1, 286, 54.1);
    doc.setTextColor(0); // White color
    // Add the text with the specified colors
    doc.setFontSize(9);
    doc.text(
      `Basic pay - HRA, performance bonus and Retirement benefits calculated on base pay. Monthly payout. Fully taxable`,
      122,
      66
    );
    doc.line(120, 61.5, 286, 61.5);
    doc.text(
      `Monthly payout. Tax exemption based on Income Tax rules`,
      122,
      74
    );
    doc.line(120, 69.2, 286, 69.2);
    doc.text(
      `Allowance paid for travelling to any place in India: either on leave, after retirement or termination of his service`,
      122,
      81
    );
    doc.line(120, 76.8, 286, 76.8);
    doc.text(
      `Fixed payment that employers provide to employees to cover their medical expenses`,
      122,
      89
    );
    doc.line(120, 84.3, 286, 84.3);
    doc.text(`Special Allowance paid (Taxable)`, 122, 96.3);
    doc.line(120, 92, 286, 92);
    doc.text(`Total Gross Salary of the entire year`, 122, 104.3);
    doc.line(120, 99.6, 286, 99.6);

    doc.line(120, 107.1, 286, 107.1);
    doc.text(`Employee contribution of 12% of Base Pay`, 122, 112);
    doc.line(120, 114.7, 286, 114.7);
    doc.text(`Employee contribution of 1.75% of Gross Salary`, 122, 119.8);
    doc.line(120, 122.3, 286, 122.3);
    doc.text(
      `As per Article 276 of the Indian Constitution, professional tax as per the applicable rate`,
      122,
      127.5
    );
    doc.line(120, 129.9, 286, 129.9);
    doc.text(`Total Deduction`, 122, 135);
    doc.line(120, 137.5, 286, 137.5);
    doc.text(`Net Salaty of the Month`, 122, 142.5);
    doc.line(120, 145, 286, 145);

    // doc.line(120, 145, 286, 145);

    //vertical line
    doc.line(286, 54, 286, 145);
    doc.setFont('helvetica', 'bold'); // Set font family to "helvetica" and style to "bold"
    doc.text(`Checked By`, 135, 195);
    doc.text(`Approved By`, 190, 195);

    doc.text(`Seal`, 245, 195);
    //14
    // ----------------info text table-----------------------------------------

    // ---------------------------3rd table--------------------------------------

    // Data for the four columns
    const columnData = [
      [
        { content: 'Basic Pay', fontStyle: 'bold', halign: 'left' },
        { content: `250.00`, halign: 'right' },
      ],
      [
        { content: 'House Rent Allowance', fontStyle: 'bold', halign: 'left' },
        { content: '4,500.00', halign: 'right' },
      ],
      [
        { content: 'Conveyance Allowances', fontStyle: 'bold', halign: 'left' },
        { content: '1,600.00', halign: 'right' },
      ],
      [
        { content: 'Medical Allowances', fontStyle: 'bold', halign: 'left' },
        { content: '1,250.00', halign: 'right' },
      ],
      [
        { content: 'Special Allowance', fontStyle: 'bold', halign: 'left' },
        { content: '6,400.00', halign: 'right' },
      ],
      [
        {
          content: 'Total Gross Salary',
          fontStyle: 'bold',
          fillColor: '#3299FF', // Background color for the first cell
          halign: 'left',
        },
        {
          content: 'INR 25,000.00',
          halign: 'right',
          fillColor: '#3299FF', // Background color for the second cell
        },
      ],
      [
        {
          content: 'Deductions',

          halign: 'left',
        },
        {
          content: '',
          halign: 'right',
        },
      ],
      [
        {
          content: 'PF contribution by employee',

          halign: 'left',
        },
        {
          content: '1,350.00',
          halign: 'right',
        },
      ],
      [
        {
          content: 'ESI contribution by employee',

          halign: 'left',
        },
        {
          content: '-',
          halign: 'right',
        },
      ],
      [
        {
          content: 'Professional Tax (PT)',

          halign: 'left',
        },
        {
          content: '200.00',
          halign: 'right',
        },
      ],
      [
        {
          content: 'Total deductions (PF+ESI+PT) ',

          halign: 'left',
        },
        {
          content: 'INR 1550',
          halign: 'right',
        },
      ],
      [
        {
          content: 'Net Salary',

          halign: 'left',
        },

        { content: 'INR 23450.00', halign: 'right' },
      ],
      // Add more rows as needed
    ];

    doc.setDrawColor(0, 0, 0);
    // Generate the table for the four columns
    doc.autoTable({
      startY: 54,
      startX: 0,
      head: [['Salary Components', 'Amount']],
      body: columnData,
      theme: 'grid', // 'striped', 'grid', 'plain'
      headStyles: {
        fillColor: [50, 153, 255],
        textColor: '#fff',
        fontStyle: 'bold',
        // halign: 'start', // Center the heading text horizontally
      },

      columnStyles: {
        0: { cellWidth: 55 },
        1: { cellWidth: 36 },
      },
      didParseCell: function (data) {
        if (data.column.index !== 0) {
          // Right-align cells in the body (excluding the header row)
          data.cell.styles.halign = 'right';
        }

        if (data.row.index === columnData.length - 7) {
          // Make text in the last row bold
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [50, 50, 50];
          data.cell.styles.fillColor = [50, 153, 255];
        }
        // if (data.row.index === columnData.length - 7) {
        //   // Make text in the last row bold
        //   data.cell.styles.fontStyle = 'bold';
        //   data.cell.styles.textColor = [255, 255, 255];
        //   data.cell.styles.fillColor = [50, 153, 255];
        // }

        if (data.row.index === columnData.length - 6) {
          // Make text in the last row bold
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fillColor = [50, 153, 255];
        }
        if (data.row.index === columnData.length - 2) {
          // Make text in the last row bold
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [50, 50, 50];
          data.cell.styles.fillColor = [50, 153, 255];
        }
        if (data.row.index === columnData.length - 1) {
          // Make text in the last row bold
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fillColor = [50, 153, 255];
        }
      },
    });
    // With this code, the alignment of cells in the body will be maintained, and the text in the last row of both columns will be bold with the specified background color.

    // const calculateTotalEarnings = () => {
    //   let totalEarnings = 0;

    //   // Check if payslipData.salary is a valid number
    //   if (!isNaN(parseInt(payslipData.salary, 10))) {
    //     totalEarnings += parseInt(payslipData.salary, 10);
    //   }

    //   // Check if payslipData.bonuses is a valid number
    //   if (!isNaN(parseInt(payslipData.bonuses, 10))) {
    //     totalEarnings += parseInt(payslipData.bonuses, 10);
    //   }

    //   // Check if payslipData.deductions is a valid number
    //   if (!isNaN(parseInt(payslipData.deductions, 10))) {
    //     totalEarnings -= parseInt(payslipData.deductions, 10);
    //   }

    //   return totalEarnings;
    // };

    const salaryData = [
      [{ content: 'Total Days', fontStyle: 'bold' }, '31'],
      [{ content: 'Present Days', fontStyle: 'bold' }, '31'],

      ['Absent Days', '0'],
      ['Paid Leave Taken', '0'],

      // Add other salary components here
    ];

    // Generate the "Earning" table
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 5, // Start the table below the first table
      startX: 10,
      head: [['Description', 'Count']],
      theme: 'grid', // 'striped', 'grid', 'plain'
      columnStyles: {
        0: { cellWidth: 55 },
        1: { cellWidth: 36 },
      },
      body: salaryData,
      headStyles: {
        fillColor: [50, 153, 255],
        // textColor: '#fff',
        fontStyle: 'bold',
        // halign: 'right', // Center the heading text horizontally
      },
      didParseCell: function (data) {
        if (data.column.index !== 0) {
          // Right-align cells in the body (excluding the header row)
          data.cell.styles.halign = 'right';
        }

        if (data.row.index === columnData.length - 4) {
          // Make text in the last row bold
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [0, 0, 0];
          data.cell.styles.fillColor = [50, 153, 255];
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
      toast.error('No payslips found for the selected month and year.');
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

  const generateAndDownloadPdf = () => {
    const filteredPayslips = employeeData.payslips.filter(
      (payslip) =>
        payslip.year.toString() === selectedYear &&
        payslip.month.toLowerCase() === selectedMonth.toLowerCase()
    );

    // Check if payslips are available for the selected month and year
    if (filteredPayslips.length === 0) {
      toast.error('No payslips found for the selected month and year.');
      return;
    }

    // Generate the PDF
    const salarySlipPdf = generatePdf(
      employeeData,
      selectedYear,
      selectedMonth
    );

    // Check if the PDF generation is successful before proceeding
    if (salarySlipPdf) {
      // Save the PDF to the user's device
      salarySlipPdf.save(
        `${employee.name}_${selectedMonth}_${selectedYear}.pdf`
      );
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
        <div
          className=" m-auto d-flex flex-row form-group justify-content-center  flex-wrap "
          // style={{ maxWidth: '200px' }}
        >
          <div className="year m-1 ">
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
                    View
                  </button>
                </>
              )}
          </div>
          {/* <hr /> */}
          <div className="preview m-1 d-flex flex-column">
            {selectedYear &&
              selectedMonth && ( // Check if both options are selected
                <>
                  <label htmlFor="" className="headingOfPopup m-1">
                    Export
                  </label>
                  <button
                    className="btn btn-success"
                    onClick={generateAndDownloadPdf}
                  >
                    Export PDF
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
            height="700px"
          />
        </div>
      )}
    </div>
  );
};

export default SalarySleepUpdated;
