// import React from 'react';

// const ExportProject = () => {
//   return <div className="container">ExportProject</div>;
// };

// export default ExportProject;

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
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, projectapproval: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };

    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };

    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };

    default:
      return state;
  }
};

function ExportProject() {
  const { id } = useParams();

  const [{ loading, error, projectapproval }, dispatch] = useReducer(reducer, {
    projectapproval: {},
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
        const result = await axios.get(`/api/sales/project-approval/${id}`);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.projectapproval,
        });

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
  const generatePdf = (projectapproval) => {
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

    // Header
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'bold');
    doc.text('REQUEST FOR PROJECT APPROVAL', 20, 20);
    doc.line(19, 22, 123, 22);
    doc.setFont('Helvetica', 'noraml');

    // Employee Information
    doc.setFontSize(12);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Date of Approval `, 130, 30);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.date_of_approval}`, 175, 30);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Date of Project Closure `, 130, 40);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.date_of_project_closure}`, 175, 40);

    doc.setFont('Helvetica', 'normal');
    doc.text(`BU `, 20, 30);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.BU}`, 74, 30);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Customer `, 20, 40);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.customer}`, 74, 40);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Project capacity `, 20, 50);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.project_capacity}`, 74, 50);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Site Location `, 20, 60);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.site_location}`, 74, 60);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Module Mounting Type `, 20, 70);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.project_capacity}`, 74, 70);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Distance to nearest city`, 20, 80);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.distance_to_nearest_city}`, 74, 80);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Is Project Feasible at Cost`, 20, 90);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.is_feasible_at_cost}`, 74, 90);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Final Quote Date`, 20, 100);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.final_quote_date}`, 74, 100);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Final Quote Cost`, 20, 110);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.final_quote}`, 74, 110);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Project State`, 20, 120);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.project_state}`, 74, 120);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Project Approval Status`, 20, 130);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.project_approval_status}`, 74, 130);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Created By`, 20, 140);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.created_by}`, 74, 140);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Sales Director`, 20, 150);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.sales_director}`, 74, 150);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Signature`, 20, 165);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.signature}`, 74, 165);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Remark`, 20, 185);
    // Add a row after the table
    doc.setFont('Helvetica', 'bold');
    doc.text(`: ${projectapproval.remark}`, 74, 185);

    return doc;
  };
  const generateAndPreviewPdf = () => {
    const expenseId = id;
    const salarySlipPdf = generatePdf(projectapproval);
    if (salarySlipPdf) {
      const pdfBlob = salarySlipPdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      if (pdfPreviewRef.current) {
        pdfPreviewRef.current.src = pdfUrl;
        pdfPreviewRef.current.id = `projectapproval-${expenseId}`;
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
    generateAndPreviewPdf(projectapproval);
  });

  const generateAndDownloadPdf = () => {
    const salarySlipPdf = generatePdf(projectapproval);
    if (salarySlipPdf) {
      salarySlipPdf.save(`Expense_${id}.pdf`);
    } else {
      console.log('PDF generation failed.');
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Export Project Approval</title>
      </Helmet>

      {loading ? (
        <div>
          <LoadingBox4 />
        </div>
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

export default ExportProject;
