import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Import your company logo as a data URI or URL
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Store } from '../../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function SalarySleepNew() {
  const { id, month, year, totaldays } = useParams();

  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    employees: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const pdfPreviewRef = useRef(null);
  const [name, setName] = useState('');
  useEffect(() => {
    console.log('Fetching data...');

    const fetchData2 = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/employees/details/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employee });
        setName(result.data.employee.name);
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData2();
  }, [month, year, totaldays, id]);

  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';

  const generatePdf = (employee, year, month) => {
    const doc = new jsPDF('landscape'); // Set landscape orientation

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40; // Width of the logo (adjust as needed)
    const logoX = pageWidth - logoWidth - 10; // 10 units padding from the right margin
    doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.getHeight() - 10, 'S');

    doc.addImage(logo, 'PNG', logoX, 10, 35, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`TAYPRO PRIVATE LIMITED`, 15, 15);

    const monthNames = [
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

    const cuMonth = monthNames[new Date().getMonth()];

    // Reset the font style to normal for subsequent text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Payslip for the month ${cuMonth} - ${year}`, 16, 21);

    doc.text(`Financial Period ${year}-${parseInt(year, 10) + 1}`, 16, 26);

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
    doc.text(`${name}`, 47, 40);

    doc.line(15, 42, 105, 42);

    doc.setTextColor(0, 128, 255); // Set text color to blue

    doc.text(`Employee id`, 16, 47);

    doc.line(15, 49, 105, 49);
    //vertical line
    doc.setTextColor(0, 128, 255); // Set text color to blue

    doc.setTextColor(0); // Reset text color to black

    doc.text(`${employees.employee_id}`, 47, 47);
    //last vertical line
    doc.line(105, 35, 105, 49);

    //  ----------------------------------- 1st table end------------------------------

    //  ----------------------------------- 2nd table------------------------------
    doc.line(120, 35, 190, 35);
    //vertical line
    doc.line(120, 35, 120, 49);
    doc.setTextColor(0, 128, 255); // Set text color to blue
    doc.text(`Designation`, 122, 40);

    doc.setTextColor(0); // Reset text color to black
    doc.text(`${employees.designation}`, 152, 40);

    doc.setTextColor(0, 128, 255); // Set text color to blue
    doc.text(`Location`, 122, 47);

    doc.setTextColor(0); // Reset text color to black
    doc.text(`Pune`, 152, 47);
    //vertical line
    doc.line(190, 35, 190, 49);

    doc.line(193, 35, 286, 35);
    doc.line(193, 42, 286, 42);
    doc.line(193, 49, 286, 49);
    //vertical line
    doc.line(193, 35, 193, 49);
    doc.setTextColor(0, 135, 255); // Set text color to blue
    doc.text(`PF No.`, 196, 40);
    //vertical line
    doc.line(225, 35, 225, 49);
    doc.setTextColor(0); // Reset text color to black
    doc.text(`${employees.pf_account_no}`, 228, 40);

    doc.setTextColor(0, 135, 255); // Set text color to blue
    doc.text(`UAN No.`, 196, 47);

    doc.setTextColor(0); // Reset text color to black
    doc.text(`${employees.uan_number}`, 228, 47);
    //vertical line
    doc.line(286, 35, 286, 49);
    doc.line(150, 35, 150, 49);

    doc.line(120, 42, 190, 42);
    doc.line(120, 49, 190, 49);

    //  ----------------------------------- 2nd table end ------------------------------

    // ----------------info text table-----------------------------------------
    //vertical line
    doc.line(120, 54, 120, 152.5);
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
    doc.text(`Employee contribution of 12% of Base Pay`, 122, 119.8);
    doc.line(120, 114.7, 286, 114.7);
    doc.text(`Employee contribution of 1.75% of Gross Salary`, 122, 127.5);
    doc.line(120, 122.3, 286, 122.3);
    doc.text(
      `As per Article 276 of the Indian Constitution, professional tax as per the applicable rate`,
      122,
      135
    );
    doc.line(120, 129.9, 286, 129.9);
    doc.text(`Total Deduction`, 122, 142.5);
    doc.line(120, 137.5, 286, 137.5);
    doc.text(`Net Salaty of the Month`, 122, 150);
    doc.line(120, 145, 286, 145);
    doc.line(120, 152.5, 286, 152.5);

    //vertical line
    doc.line(286, 54, 286, 152.5);
    doc.setFont('helvetica', 'bold'); // Set font family to "helvetica" and style to "bold"
    doc.text(`Checked By`, 135, 195);
    doc.text(`Approved By`, 190, 195);

    doc.text(`Seal`, 245, 195);
    //14
    // ----------------info text table-----------------------------------------

    // ---------------------------3rd table--------------------------------------
    // Create a new Date object for the current date
    const currentDate = new Date();

    // Get the current month (0-11, where 0 is January)
    const currentMonth = currentDate.getMonth();

    // Create a new Date object for the first day of the next month
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentMonth + 1,
      1
    );

    // Subtract 1 day from the next month's date to get the last day of the current month
    const lastDayOfCurrentMonth = new Date(nextMonthDate - 1);

    // Get the day of the month (1-30) for the last day of the current month
    const numberOfDaysInCurrentMonth = lastDayOfCurrentMonth.getDate();
    // const total = 30;
    console.log(employees.ctc);
    console.log(employees.total_deduction);
    console.log(numberOfDaysInCurrentMonth);
    console.log(totaldays);

    const netSalary =
      (totaldays * (employees.ctc / 12)) / numberOfDaysInCurrentMonth -
      employees.total_deduction;

    console.log(netSalary);

    const PF = employees.pf;
    const TOTAL_DEDUCTION = employees.total_deduction;
    const PT = employees.pt;
    const SPECIAL = employees.special;
    const MEDICAL = employees.medical;
    const HRA = employees.hra;
    const GROSS = employees.gross;
    const CONVEYANCE = employees.conveyance;
    const BASIC = employees.ctc / 12;

    const columnData = [
      [
        { content: 'Basic Pay', fontStyle: 'bold', halign: 'left' },
        { content: `${BASIC}.00`, halign: 'right' },
      ],
      [
        { content: 'House Rent Allowance', fontStyle: 'bold', halign: 'left' },
        { content: `${HRA}.00`, halign: 'right' },
      ],
      [
        { content: 'Conveyance Allowances', fontStyle: 'bold', halign: 'left' },
        { content: `${CONVEYANCE}.00`, halign: 'right' },
      ],
      [
        { content: 'Medical Allowances', fontStyle: 'bold', halign: 'left' },
        { content: `${MEDICAL}.00`, halign: 'right' },
      ],
      [
        { content: 'Special Allowance', fontStyle: 'bold', halign: 'left' },
        { content: `${SPECIAL}.00`, halign: 'right' },
      ],
      [
        {
          content: 'Total Gross Salary',
          fontStyle: 'bold',
          fillColor: '#3299FF', // Background color for the first cell
          halign: 'left',
        },
        {
          content: `${GROSS}.00`,
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
          content: `${PF}.00`,
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
          content: `${PT}.00`,
          halign: 'right',
        },
      ],
      [
        {
          content: 'Total deductions (PF+ESI+PT) ',

          halign: 'left',
        },
        {
          content: `${TOTAL_DEDUCTION}.00`,
          halign: 'right',
        },
      ],
      [
        {
          content: 'Net Salary',

          halign: 'left',
        },

        { content: netSalary.toFixed(2), halign: 'right' },
      ],
      // Add more rows as needed
    ];

    doc.setTextColor(0); // Reset text color to black
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
    const totalPaidLeaveEntitlement = employees.leaves;

    // Assuming totalLeavesTaken is the number of paid leave days taken by the employee
    const totalLeavesAvailable = 18; // You should replace this with the actual calculation

    const PaidLeaveTaken = totalLeavesAvailable - totalPaidLeaveEntitlement;

    const remainingLeave = totalLeavesAvailable - PaidLeaveTaken;

    const salaryData = [
      [
        { content: 'Total Days', fontStyle: 'bold' },
        numberOfDaysInCurrentMonth,
      ],
      [{ content: 'Present Days', fontStyle: 'bold' }, totaldays],

      ['Paid Leave Taken', `${PaidLeaveTaken}`],
      ['Remaining Paid Leave', `${remainingLeave}`],
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
        fontStyle: 'bold',
      },
      didParseCell: function (data) {
        if (data.column.index !== 0) {
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
    const employeeId = id;
    const salarySlipPdf = generatePdf(employees, year, month, totaldays);
    if (salarySlipPdf) {
      const pdfBlob = salarySlipPdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      if (pdfPreviewRef.current) {
        pdfPreviewRef.current.src = pdfUrl;
        pdfPreviewRef.current.id = `employee-${employeeId}`;
      }
    } else {
      console.log('PDF generation failed.');
    }
  };

  useEffect(() => {
    // Clean up the PDF URL when the component is unmounted
    return () => {
      if (pdfPreviewRef) {
        URL.revokeObjectURL(pdfPreviewRef.src);
      }
    };
  }, []);

  useEffect(() => {
    // Call generateAndPreviewPdf when the component mounts
    generateAndPreviewPdf(employees, month, name, totaldays);
  });

  const generateAndDownloadPdf = () => {
    const salarySlipPdf = generatePdf(employees, year, month);
    if (salarySlipPdf) {
      salarySlipPdf.save(`${employees.name}_${month}_${year}.pdf`);
    } else {
      console.log('PDF generation failed.');
    }
  };

  return (
    <div className="container ">
      <Helmet>
        <title>Payslip</title>
      </Helmet>
      <div className="d-flex justify-content-end align-items-end">
        <div class="button downloadBtn " onClick={generateAndDownloadPdf}>
          <div class="button-wrapper">
            <div class="text1">Download</div>
            <span class="icon1">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="2em"
                height="2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center w-100 ">
        <iframe
          ref={pdfPreviewRef}
          title="PDF Preview"
          width="100%"
          height="700px"
        />
      </div>
    </div>
  );
}

export default SalarySleepNew;
