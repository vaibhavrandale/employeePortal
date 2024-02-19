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

    case 'FETCH_PAYSLIP_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_PAYSLIP_SUCCESS':
      return { ...state, payslip: action.payload, loading: false };

    case 'FETCH_PAYSLIP_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function SlipFinal() {
  const { id, month, year, token, totaldays, token2 } = useParams();

  const [{ loading, error, employees, payslip }, dispatch] = useReducer(
    reducer,
    {
      employees: {},
      payslip: {},
      loading: true,
      error: '',
    }
  );
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const pdfPreviewRef = useRef(null);
  const [name, setName] = useState('');
  const [daysInMonth, setDaysInMonth] = useState('');

  useEffect(() => {
    console.log('Fetching data...');

    const fetchData2 = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      dispatch({ type: 'FETCH_PAYSLIP_REQUEST' });
      try {
        const result = await axios.get(`/api/employees/details/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employee });
        setName(result.data.employee.NAME);
        console.log(result.data);

        const Payslipresult = await axios.get(
          `/api/payslip/${id}/${year}/${month}`
        );
        dispatch({
          type: 'FETCH_PAYSLIP_SUCCESS',
          payload: Payslipresult.data.payslip,
        });
        // setName(result.data.Payslipresult.NAME);
        console.log(Payslipresult.data);

        // Update the number of days in the month
        const daysResponse = await axios.get(
          `/api/attendence/getDaysInMonth/${month}/${year}`
        );
        const daysData = daysResponse.data.daysInMonth;
        setDaysInMonth(daysData);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
        dispatch({ type: 'FETCH_PAYSLIP_FAIL', payload: err.message });
      }
    };
    fetchData2();
  }, [month, year, totaldays, id]);

  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1813812425/wzdesp1oce9ndc5yipep.png';

  const generatePdf = (employee, year, month) => {
    const doc = new jsPDF('potrait'); // Set landscape orientation

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40; // Width of the logo (adjust as needed)
    const paddingFromRight = 155; // Adjust as needed
    const logoX = pageWidth - logoWidth - paddingFromRight;

    // doc.rect(7, 5, pageWidth - 10, doc.internal.pageSize.getHeight() - 10, 'S');
    doc.rect(7, 5, pageWidth - 10, 180 - 10, 'S');
    doc.addImage(logo, 'PNG', logoX, 10, 35, 10);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 128);
    doc.text(`TAYPRO PRIVATE LIMITED`, 74, 13);
    doc.setTextColor(0, 0, 0);

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

    function numberToWords(number) {
      const units = [
        '',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
      ];
      const teens = [
        '',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen',
      ];
      const tens = [
        '',
        'Ten',
        'Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety',
      ];

      function convertChunk(chunk) {
        const chunkArr = Array.from(String(chunk)).map(Number).reverse();
        const [unit, ten, hundred] = chunkArr;

        let result = '';
        if (hundred) {
          result += units[hundred] + ' Hundred ';
        }

        if (ten === 1) {
          result += teens[unit] || '';
        } else {
          result += tens[ten] + ' ' + units[unit];
        }

        return result.trim();
      }

      if (number === 0) {
        return 'Zero';
      }

      const billion = Math.floor(number / 1000000000);
      const million = Math.floor((number % 1000000000) / 1000000);
      const thousand = Math.floor((number % 1000000) / 1000);
      const remainder = number % 1000;

      let result = '';
      if (billion) {
        result += convertChunk(billion) + ' Billion ';
      }
      if (million) {
        result += convertChunk(million) + ' Million ';
      }
      if (thousand) {
        result += convertChunk(thousand) + ' Thousand ';
      }
      if (remainder) {
        result += convertChunk(remainder);
      }

      return result.trim();
    }

    // Example usage:
    // const number = 123456789;
    // const words = numberToWords(number);
    // console.log(`${number} in words: ${words}`);

    // Reset the font style to normal for subsequent text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Payslip For Month ${cuMonth} - ${year}`, 83, 19);
    doc.setFontSize(7);

    doc.text(
      `Address : Plot No 87, Gat No 286/2, Chakan - Nanekarwadi - Pune, near Saint Gobain, Chakan, Maharashtra 410501`,
      49,
      24
    );

    // doc.text(`Financial Period ${year}-${parseInt(year, 10) + 1}`, 16, 26);
    doc.setFontSize(10);
    doc.line(7, 26, doc.internal.pageSize.getWidth() - 3, 26);

    let department;

    if (employees.isSales === 1) {
      department = 'Sales';
    } else if (employees.isScm === 1) {
      department = 'Supply Chain Management';
    } else if (employees.isDesign === 1) {
      department = 'Design';
    } else if (employees.isProject === 1) {
      department = 'Project';
    } else if (employees.isVisitor === 1) {
      department = 'Visitor';
    } else if (employees.isProduction === 1) {
      department = 'Production';
    } else if (employees.isAccountant === 1) {
      department = 'Accountant';
    } else if (employees.isHr === 1) {
      department = 'Human Resources';
    } else if (employees.isSoftwareDevlopment === 1) {
      department = 'Software Development';
    } else if (employees.isHardwareDevlopment === 1) {
      department = 'Hardware Development';
    } else {
      department = 'Unknown Department';
    }
    //  ----------------------------------- 1st table------------------------------
    doc.setDrawColor(0, 0, 0);
    doc.line(15, 35, 95, 35);

    //left vertical line
    doc.line(15, 35, 15, 92);
    doc.setTextColor(0, 0, 0); // Set text color to blue
    doc.text(`Employee Id`, 16, 40);

    //middle vertical line
    doc.line(56, 35, 56, 92);

    doc.setTextColor(0); // Reset text color to black
    doc.text(` ${employees.employee_id}`, 57, 40);

    doc.line(15, 42, 95, 42);

    doc.setTextColor(0, 0, 0); // Set text color to blue

    doc.text(`Employee Name`, 16, 47);

    doc.line(15, 49, 95, 49);

    doc.setTextColor(0, 128, 255); // Set text color to blue

    doc.setTextColor(0); // Reset text color to black

    doc.text(`${name}`, 58, 47);
    //right vertical line
    // doc.line(85, 35, 85, 84);

    //horizantal
    doc.line(15, 56, 95, 56);

    doc.setTextColor(0, 0, 0);
    doc.text(`Department`, 16, 54);

    doc.text(`${department}`, 58, 54);

    doc.text(`Designation`, 16, 61);
    doc.text(`${employees.designation}`, 58, 61);

    doc.line(15, 63, 95, 63);

    doc.text(`Location`, 16, 67.5);

    doc.text(`Pune`, 58, 67.5);
    doc.line(15, 70, 95, 70);

    doc.text(`Adhar No`, 16, 74.5);
    doc.text(`${employees.aadhar_no}`, 58, 74.5);
    doc.line(15, 77, 95, 77);

    doc.text(`Bank IFSC`, 16, 81.5);
    doc.text(`${employees.ifsc_code}`, 58, 81.5);

    doc.line(15, 84, 95, 84);

    //  ----------------------------------- 1st table end------------------------------

    //  ----------------------------------- 2nd table start ------------------------------

    doc.setDrawColor(0, 0, 0);
    doc.line(45, 35, 85, 35);

    //left vertical line
    doc.line(100, 35, 100, 84);

    //middle vertical line
    doc.line(150, 35, 150, 84);

    doc.setTextColor(0, 0, 0); // Set text color to blue

    doc.line(95, 35, 181, 35);
    doc.text(`UAN (PF)`, 102, 40);

    doc.text(`${employees.pf_account_no}`, 152, 40);

    doc.line(95, 42, 181, 42);

    doc.text(`IP NO (ESIC)`, 102, 47);

    doc.text(`${payslip.esi}`, 152, 47);
    doc.line(95, 49, 181, 49);

    doc.text(`Joining Date`, 102, 54);
    doc.text(`${employees.joiningDate}`, 152, 54);

    doc.line(95, 56, 181, 56);

    doc.text(`Birth Date`, 102, 61);
    doc.text(`${employees.birth_date}`, 152, 61);

    doc.line(95, 63, 181, 63);

    doc.text(`Gender`, 102, 68);
    doc.text(`${employees.gender}`, 152, 68);

    doc.line(95, 70, 181, 70);

    doc.text(`PAN`, 102, 75);
    doc.text(`${employees.pan_number}`, 152, 75);

    doc.line(95, 77, 181, 77);

    doc.text(`BANK A/C`, 102, 82);

    doc.text(`${employees.bank_account_no}`, 152, 82);

    doc.line(95, 84, 181, 84);

    //right vertical line
    doc.line(181, 35, 181, 92);

    // doc.line(85, 84, 95, 84);
    doc.line(15, 92, 181, 92);

    doc.text(`Attendance`, 16, 89);

    doc.text(`Total Day :  ${daysInMonth}`, 58, 89);

    doc.text(`Paid Day : 25`, 152, 89);

    //  ----------------------------------- 2nd table end------------------------------

    // ------------------------------3rd table start------------------------------------------
    //top
    doc.line(15, 100, 181, 100);

    //left vertical line
    doc.line(15, 100, 15, 157);

    //right vertical line
    doc.line(181, 100, 181, 157);

    doc.setFont('helvetica', 'bold');

    doc.text(`EARNINGS`, 26, 105);

    doc.line(15, 107, 181, 107);

    doc.text(`AMOUNT`, 67, 105);

    // doc.line(15, 107, 181, 107);

    //2nd vertical line
    doc.line(56, 100, 56, 150);

    //3rd vertical line
    doc.line(100, 100, 100, 150);

    doc.setFont('helvetica', 'normal');

    doc.text(`Base Pay`, 16, 112);
    doc.text(`${payslip.basic}.00`, 71, 112);
    doc.line(15, 114, 181, 114);

    doc.text(`House Rent Allowance`, 16, 119);
    doc.text(`${payslip.hra}.00`, 71, 119);
    doc.line(15, 121, 181, 121);

    doc.text(`Conveyance allowances`, 16, 126);
    doc.text(`${payslip.conveyance}.00`, 73, 126);
    doc.line(15, 128, 181, 128);

    doc.text(`Medical allowances`, 16, 133);
    doc.text(`${payslip.medical}.00`, 73, 133);
    doc.line(15, 135, 181, 135);

    doc.text(`Special allowances`, 16, 139);
    doc.text(`${payslip.special}.00`, 71, 139);
    doc.line(15, 142, 181, 142);

    doc.setFont('helvetica', 'bold');
    doc.text(`Total Gross Salary`, 16, 147);
    doc.text(`${payslip.gross}.00`, 71, 147);
    doc.setFont('helvetica', 'normal');
    doc.line(15, 150, 181, 150);

    // bottom
    doc.line(15, 157, 181, 157);

    // doc.line(15, 107, 181, 107);
    // ------------------------------3rd table end--------------------------------------------

    // ------------------------------4th table start------------------------------------------

    doc.setFont('helvetica', 'bold');

    doc.text(`DEDUCTIONS`, 110, 105);

    // doc.line(15, 107, 181, 107);

    doc.text(`AMOUNT`, 157, 105);

    //3rd  vertical line
    doc.line(150, 100, 150, 150);

    doc.setFont('helvetica', 'normal');

    doc.text(`PF contribution by employee`, 102, 112);
    doc.text(`${payslip.pf}.00`, 156, 112);

    doc.text(`ESI contribution by employee`, 102, 119);
    doc.text(`${payslip.esi}.00`, 162, 119);

    doc.text(`Professional Tax (PT)`, 102, 126);
    doc.text(`${payslip.pt}.00`, 158, 126);

    doc.setFont('helvetica', 'bold');
    doc.text(`Total Deductions`, 102, 147);
    doc.text(`${payslip.total_deduction}.00`, 156, 147);

    doc.setFont('helvetica', 'bold');
    doc.text(`Net Pay :`, 16, 155);
    doc.text(
      `${payslip.netsalary}.00 INR  (${numberToWords(payslip.netsalary)})`,
      33,
      155
    );
    // doc.line(15, 114, 181, 114);

    // ------------------------------4th table end------------------------------------------

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
      salarySlipPdf.save(`${employees.NAME}_${month}_${year}.pdf`);
    } else {
      console.log('PDF generation failed.');
    }
  };

  return (
    <div className="container ">
      <Helmet>
        <title>Payslip</title>
      </Helmet>

      <Link to={'/salary-calculator'}>Salary Calculator</Link>
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

export default SlipFinal;
