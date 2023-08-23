/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Document, Page } from 'react-pdf';
// import plantLayout from './plantA.pdf';
import { toast } from 'react-hot-toast';
import LoadingBox1 from '../../components/LoadingBox1';
import AlertBox from '../../components/MessageBox/AlertBox';
import LoadingBox from '../../components/LoadingBox';
import MsgBox from '../../components/MessageBox/MsgBox';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, site: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function PlantLayout() {
  const [{ loading, error, site }, dispatch] = useReducer(reducer, {
    site: {},
    loading: true,
    error: '',
  });
  const { id: _id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/survey/sites/${_id}`);

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });

        setNumPages(1); // Reset to 1 page initially
        setPageNumber(1);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
        toast.error(err.message);
      }
    };

    fetchData();
  }, [_id]);

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };

  const handlePdfLoad = ({ numPages }) => {
    setPdfLoaded(true);
    setNumPages(numPages);
  };

  return (
    <div className="container1  d-flex  flex-column justify-content-center p-1">
      <h3 className="text-center mt-2 fw-bold">
        Plant Layout of {site.customerName}
      </h3>
      {loading ? (
        <LoadingBox5 />
      ) : error ? (
        <MsgBox className="alert alert-danger">{error}</MsgBox>
      ) : (
        <div>
          {pdfLoaded ? null : <LoadingBox1 />} {/* Display loading indicator */}
          <object
            onLoad={handlePdfLoad} // Set the onLoad event handler
            width="100%"
            style={{ minHeight: '100vh' }}
            data={site.plantLayout}
            type="application/pdf"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default PlantLayout;
