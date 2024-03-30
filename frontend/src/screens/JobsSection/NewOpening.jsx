// import React from 'react';

// const NewOpening = () => {
//   return <div className="container">

//   </div>;
// };

// export default NewOpening;

// import React from 'react';

// const NewOpening = () => {

import React, { useContext, useEffect, useReducer, useState } from 'react';

import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import LoadingBox1 from '../../components/LoadingBox1';
import axios from 'axios';
import { getError } from '../../utils';
import toast from 'react-hot-toast';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, createloading: true };

    case 'CREATE_SUCCESS':
      return {
        ...state,
        jobopening: [...state.jobopening, action.payload],
        createloading: false,
      };

    case 'CREATE_FAIL':
      return { ...state, createloading: false, error: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

const NewOpening = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, loadingUpload, jobopening, createloading, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    jobopening: [],
    loading: true,
    error: '',
  });

  const currentDate = new Date();

  // Extract day, month, and year
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const year = currentDate.getFullYear();

  // Format day and month to have leading zero if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Construct the final date string in DD/MM/YYYY format
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  const navigate = useNavigate();
  const [JobID, setJobID] = useState();
  const [JobDescription, setJobDescription] = useState();
  const [EndDate, setEndDate] = useState();
  const [submittedBy, setsubmittedBy] = useState(userInfo.NAME);
  const [submittedAt, setsubmittedAt] = useState(formattedDate);
  // const [description, setDescription] = useState('');

  // create
  const NewOpening = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    const missingFields = [];

    if (!JobID) {
      missingFields.push('Please Enter Description Of Holiday');
    }

    if (!JobDescription) {
      missingFields.push('Please Enter Description Of Holiday');
    }

    if (!EndDate) {
      missingFields.push('Please Enter Description Of Holiday');
    }

    if (!submittedBy) {
      missingFields.push('Please Enter Description Of Holiday');
    }
    if (!submittedAt) {
      missingFields.push('Please Enter Description Of Holiday');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/jobs/jobopening`,
        {
          JobID,
          JobDescription,
          EndDate,
          submittedBy,
          submittedAt,
          // description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
        payload: data.jobopening,
      });
      toast.success(data.message, {
        position: 'top-right',
      });
      navigate('/jobopenings');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="container">
      <div className="card p-2" style={{ width: '500px', margin: 'Auto' }}>
        <h4 className="text-center fw-bold">Add New Opening</h4>
        <form onSubmit={NewOpening}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              JOB ID
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={JobID}
              required
              onChange={(e) => setJobID(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label text-dark fw-bold">
              Job Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="date"
              value={JobDescription}
              required
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label text-dark fw-bold">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={EndDate}
              required
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <input
            type="hidden"
            className="form-control"
            id="date"
            value={submittedBy}
            required
            onChange={(e) => setsubmittedBy(e.target.value)}
          />
          <input
            type="hidden"
            className="form-control"
            id="date"
            value={submittedAt}
            required
            onChange={(e) => setsubmittedAt(e.target.value)}
          />

          <div className="d-flex justify-content-end">
            {createloading ? (
              <>
                <button
                  type="submit"
                  className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
                >
                  Creating.. <LoadingBox4 />
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOpening;
