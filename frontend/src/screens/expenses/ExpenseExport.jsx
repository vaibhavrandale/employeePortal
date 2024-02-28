import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { Store } from '../../Store';
import { Helmet } from 'react-helmet';
import LoadingBox1 from '../../components/LoadingBox1';
import { useParams } from 'react-router-dom';

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

const ExpenseExport = () => {
  const [{ loading, error, expense }, dispatch] = useReducer(reducer, {
    expense: {},
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const pdfPreviewRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/expenses/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.expense });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    return () => {
      if (pdfPreviewRef.current) {
        URL.revokeObjectURL(pdfPreviewRef.current.src);
      }
    };
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF('portrait');

    doc.setProperties({
      title: 'Employee List',
      subject: 'Employee List',
    });

    doc.setFontSize(18);
    doc.text('Employee List', 20, 20);

    const tableData = [[expense.employeeName, expense.employee_id]];
    doc.autoTable({
      startY: 30,
      head: [['Employee Name', 'Employee ID']],
      body: tableData,
    });

    return doc.output('datauristring');
  };

  const pdfSrc = generatePdf();

  return (
    <div className="container1 d-flex flex-column justify-content-center p-1">
      <Helmet>
        <title>Export Expense</title>
      </Helmet>
      <h3 className="text-center">Download Expense</h3>

      {loading ? (
        <LoadingBox1 />
      ) : (
        <div>
          <iframe
            ref={pdfPreviewRef}
            title="PDF Preview"
            width="100%"
            height="700px"
            src={pdfSrc}
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseExport;
