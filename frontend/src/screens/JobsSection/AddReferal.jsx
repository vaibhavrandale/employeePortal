import React, { useContext, useEffect, useReducer, useState } from 'react';

import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, jobopening: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

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

const AddReferal = () => {
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
  const { jobid } = useParams();
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
  const [JobID, setJobID] = useState(jobid);
  const [refer_employee_name, setReferEmployeeName] = useState('');
  const [refer_employee_mobileno, setReferEmployeeMobileNo] = useState('');
  const [refer_employee_email, setReferEmployeeEmail] = useState('');
  const [refer_employee_adhaar_no, setReferEmployeeAdhaarNo] = useState('');
  const [refer_employee_resume, setReferEmployeeResume] = useState('');
  const [profile_screened, setProfileScreened] = useState('NO');
  const [profile_screenedBy, setProfileScreenedBy] = useState('NO');
  const [interview_scheduled, setInterviewScheduled] = useState('NO');
  const [interview_completed, setInterviewCompleted] = useState('NO');
  const [refer_employee_joined, setReferEmployeeJoined] = useState('NO');
  const [refer_by_employee_name, setReferByEmployeeName] = useState(
    userInfo.NAME
  );
  const [refer_by_employee_email, setReferByEmployeeEmail] = useState(
    userInfo.email
  );
  const [refer_by_employee_employee_id, setReferByEmployeeId] = useState(
    userInfo.employee_id
  );
  // const [description, setDescription] = useState('');

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/jobs/jobopening', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.jobopening });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [userInfo.token]);

  // create
  const AddReferalHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (
      !JobID ||
      !refer_employee_name ||
      !refer_employee_mobileno ||
      !refer_employee_email ||
      !refer_employee_adhaar_no ||
      !refer_employee_resume ||
      !refer_by_employee_name ||
      !refer_by_employee_email ||
      !refer_by_employee_employee_id
    ) {
      missingFields.push('Please Enter all the fields');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/jobs/jobreferral`,
        {
          JobID: jobid,
          refer_employee_name,
          refer_employee_mobileno,
          refer_employee_email,
          refer_employee_adhaar_no,
          refer_employee_resume,
          refer_by_employee_name,
          refer_by_employee_email,
          refer_by_employee_employee_id,
          profile_screened,
          profile_screenedBy,
          interview_scheduled,
          interview_completed,
          refer_employee_joined,
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
      <div
        className="card p-2"
        style={{ minHeight: '500px', width: '500px', margin: 'Auto' }}
      >
        <h4 className="text-center fw-bold">Refer a Friend</h4>
        <form onSubmit={AddReferalHandler}>
          <div className="mb-3">
            <label htmlFor="jobID" className="form-label text-dark fw-bold">
              Job ID
            </label>
            <input
              type="text"
              className="form-control"
              id="jobID"
              value={JobID}
              disabled
              onChange={(e) => setJobID(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="refer_employee_name"
              className="form-label text-dark fw-bold"
            >
              Refer Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              id="refer_employee_name"
              value={refer_employee_name}
              onChange={(e) => setReferEmployeeName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="refer_employee_mobileno"
              className="form-label text-dark fw-bold"
            >
              Refer Employee Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="refer_employee_mobileno"
              value={refer_employee_mobileno}
              onChange={(e) => setReferEmployeeMobileNo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="refer_employee_email"
              className="form-label text-dark fw-bold"
            >
              Refer Employee Email
            </label>
            <input
              type="email"
              className="form-control"
              id="refer_employee_email"
              value={refer_employee_email}
              onChange={(e) => setReferEmployeeEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="refer_employee_adhaar_no"
              className="form-label text-dark fw-bold"
            >
              Refer Employee Aadhaar Number
            </label>
            <input
              type="text"
              className="form-control"
              id="refer_employee_adhaar_no"
              value={refer_employee_adhaar_no}
              onChange={(e) => setReferEmployeeAdhaarNo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="refer_employee_resume"
              className="form-label text-dark fw-bold"
            >
              Refer Employee Resume <br />
              <span className="text-muted">
                (Please upload resume to G-drive and paste the link here)
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              id="refer_employee_resume"
              value={refer_employee_resume}
              onChange={(e) => setReferEmployeeResume(e.target.value)}
            />
          </div>

          <input
            type="hidden"
            className="form-control"
            id="refer_by_employee_name"
            value={refer_by_employee_name}
            onChange={(e) => setReferByEmployeeName(e.target.value)}
          />

          <input
            type="hidden"
            className="form-control"
            id="refer_by_employee_email"
            value={refer_by_employee_email}
            onChange={(e) => setReferByEmployeeEmail(e.target.value)}
          />

          <input
            type="hidden"
            className="form-control"
            id="refer_by_employee_employee_id"
            value={refer_by_employee_employee_id}
            onChange={(e) => setReferByEmployeeId(e.target.value)}
          />

          <div className="d-flex justify-content-end">
            {createloading ? (
              <>
                <button
                  type="submit"
                  className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
                >
                  Referring.. <LoadingBox4 />
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
              >
                Refer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReferal;
