import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { format } from 'date-fns';
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
      return { ...state, expense: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function ExpenseExport() {
  const { id } = useParams();

  const [{ loading, error, expense, payslip }, dispatch] = useReducer(reducer, {
    expense: {},
    payslip: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const pdfPreviewRef = useRef(null);
  const [name, setName] = useState('');
  const [daysInMonth, setDaysInMonth] = useState('');

  useEffect(() => {
    console.log('Fetching data...');

    const fetchData2 = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/expenses/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.expense });

        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData2();
  }, [id]);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709106310/bhyfvfixfscmawtlhg1s.png';
  const generatePdf = (expense) => {
    const doc = new jsPDF('portrait');

    // Set font style
    doc.setFont('Helvetica', 'normal');

    // Set up logo positioning
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 35; // Adjust as needed
    const paddingFromRight = 10; // Adjust as needed
    const logoX = pageWidth - logoWidth - paddingFromRight;
    // Adjust the rectangle dimensions
    const rectangleWidth = pageWidth - 15;

    const rectangleHeight = 288; // Adjust as needed

    doc.rect(7, 5, rectangleWidth, rectangleHeight, 'S');
    // Add logo to the top right corner
    doc.addImage(logo, 'PNG', logoX, 10, logoWidth, 10);
    doc.setFontSize(12);
    doc.text(`ID: ${expense.id}`, 186, 25);

    // Header
    doc.setFontSize(24);
    doc.text('Expenses', 20, 20);

    // Employee Information
    doc.setFontSize(12);
    doc.text(`Employee Name `, 20, 40);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${expense.employeeName}`, 55, 40);
    // Add a row after the table

    doc.setFont('Helvetica', 'normal');
    doc.text(`Employee ID`, 20, 52);

    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${expense.employee_id}`, 55, 52);

    // Add a row after the table
    doc.setFont('Helvetica', 'normal');
    doc.text(`Email: `, 20, 64);
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${expense.email}`, 55, 64);
    // Add a row after the table
    doc.setFont('Helvetica', 'normal');

    doc.text(`Advance Amount  : `, 20, 76);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 0, 0);
    doc.text(` ${expense.AdvanceAmount}`, 56, 76);

    doc.text(`(${formatDate(expense.AdvanceAmountDate)})`, 73, 76);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Helvetica', 'normal');

    // Site Information
    doc.text(`Site`, 125, 40);
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${expense.sitename}`, 143, 40);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Location`, 125, 52);
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${expense.siteLocation}`, 143, 52);
    doc.setFont('Helvetica', 'normal');
    // Date Information
    doc.text(`From`, 125, 64);
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${expense.startDate}`, 143, 64);
    doc.setFont('Helvetica', 'normal');
    doc.text(`To `, 125, 76);
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${expense.endDate}`, 143, 76);
    doc.setFont('Helvetica', 'mormal');

    // Daywise Expenses
    // doc.text('Daywise Expenses:', 20, 110);
    const tableColumns = ['id', 'Date', 'Expense', 'Amount', 'Bill id'];
    const tableData = expense.DaywiseExpenses
      ? expense.DaywiseExpenses.map((e) => [
          e.id,
          formatDate(e.date),
          e.expense,
          `${e.price.toFixed(2)}`,
          e.img ? `${e.id}` : 'no',
        ])
      : [];

    // Calculate total
    const total = expense.DaywiseExpenses
      ? expense.DaywiseExpenses.reduce((acc, e) => acc + e.price, 0).toFixed(2)
      : '0.00';

    // Add total row to tableData
    tableData.push(['', '', 'Total', `${total}`, '']);

    // Render the table
    doc.autoTable({
      startY: 85,
      head: [tableColumns],
      body: tableData,
      theme: 'plain',
      headStyles: {
        halign: 'center', // Center align the thead
      },
      bodyStyles: {
        halign: 'center', // Center align the tbody
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 40 },
        2: { cellWidth: 79 },
        3: { cellWidth: 30 },
        4: { cellWidth: 20 },
      },
      styles: {
        fontSize: 10,
        lineWidth: 0.2, // Set the border width
        fontStyle: 'bold', // Make the text bold
        lineColor: [0, 0, 0], // Set the border color to dark (black)
      },
    });

    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(
      `${
        total > expense.AdvanceAmount
          ? `TFC - ${total - expense.AdvanceAmount}`
          : `RTC - ${expense.AdvanceAmount - total}`
      }`,
      170,
      doc.autoTable.previous.finalY + 8
    );

    // const settledStatus = expense.Settled === 3;

    doc.text(`${expense.ApprovedBy}`, 20, doc.autoTable.previous.finalY + 30);
    doc.setFont('Helvetica', 'normal');

    if (expense.status === 1 || expense.status === 2 || expense.status === 3) {
      doc.text('Director Approved', 20, doc.autoTable.previous.finalY + 40);
    } else if (expense.status === 0) {
      doc.text('Pending', 27, doc.autoTable.previous.finalY + 40);
    }

    doc.setFont('Helvetica', 'bold');
    doc.text(`${expense.ApprovedBy2}`, 80, doc.autoTable.previous.finalY + 30);
    doc.setFont('Helvetica', 'normal');

    if (expense.status === 1 || expense.status >= 2) {
      doc.text('HR Approved', 84, doc.autoTable.previous.finalY + 40);
    } else {
      doc.text('Pending', 87, doc.autoTable.previous.finalY + 40);
    }

    doc.setFont('Helvetica', 'bold');
    doc.text(`${expense.SettledBy}`, 140, doc.autoTable.previous.finalY + 30);
    doc.setFont('Helvetica', 'normal');

    if (expense.Settled === 1 || expense.status === 3) {
      doc.text('Settled', 150, doc.autoTable.previous.finalY + 40);
    } else {
      doc.text('Pending', 150, doc.autoTable.previous.finalY + 40);
    }

    // Footer
    doc.setFont('italic');
    doc.text('Thank you!', 90, doc.autoTable.previous.finalY + 60);

    // Map images associated with expenses to an array
    const images = expense.DaywiseExpenses
      ? expense.DaywiseExpenses.filter((e) => e.img).map((e, index) => {
          const imageX = 10;
          const imageY = 10 + index * 80;
          const imageWidth = 100;
          const imageHeight = 150;

          return {
            src: e.img,
            x: imageX,
            y: imageY,
            width: imageWidth,
            height: imageHeight,
            billId: e.id,
          };
        })
      : [];

    // Display images associated with expenses
    // Display images associated with expenses
    images.forEach((image) => {
      doc.addPage();
      // Display Bill ID at the top
      doc.setFontSize(24);

      doc.text(`Bill ID :${image.billId}`, 90, 10);
      doc.setFontSize(12);

      // doc.text(`Bill ID: ${image.billId}`, 10, 10);

      // Display the image below the Bill ID
      doc.addImage(image.src, 'PNG', 50, 40, image.width, image.height);
    });

    return doc;
  };
  const generateAndPreviewPdf = () => {
    const expenseId = id;
    const salarySlipPdf = generatePdf(expense);
    if (salarySlipPdf) {
      const pdfBlob = salarySlipPdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      if (pdfPreviewRef.current) {
        pdfPreviewRef.current.src = pdfUrl;
        pdfPreviewRef.current.id = `expense-${expenseId}`;
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
    generateAndPreviewPdf(expense);
  });

  const generateAndDownloadPdf = () => {
    const salarySlipPdf = generatePdf(expense);
    if (salarySlipPdf) {
      salarySlipPdf.save(`Expense_${id}.pdf`);
    } else {
      console.log('PDF generation failed.');
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Expense Report</title>
      </Helmet>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="d-flex justify-content-end align-items-end">
            <div
              className="button downloadBtn"
              onClick={generateAndDownloadPdf}
            >
              <div className="button-wrapper">
                <div className="text1">Download</div>
                <span className="icon1">{/* ... (unchanged) */}</span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center w-100">
            <iframe
              ref={pdfPreviewRef}
              title="PDF Preview"
              width="100%"
              height="700px"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ExpenseExport;
