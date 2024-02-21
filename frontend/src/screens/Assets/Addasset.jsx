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
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, createloading: true };

    case 'CREATE_SUCCESS':
      return {
        ...state,
        assets: [...state.assets, action.payload],
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

const Addasset = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, loadingUpload, assets, employees, createloading, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    assets: [],
    employees: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();

  // name,
  //     employee_id,
  //     email,
  //     imageA,
  //     imageB,
  //     status,
  //     given_date,
  //     return_date,
  //     remark,

  const [imageA, setImageA] = useState('');
  const [imageB, setImageB] = useState('');
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(0);
  const [given_date, setGiven_date] = useState('');
  const [return_date, seReturn_date] = useState('');
  const [remark, setRemark] = useState('');
  // const [description, setDescription] = useState('');

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/assets');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.assets });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    const EmployeeData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/employees');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employees });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
    EmployeeData();
  }, []);

  // create
  const createAsset = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    const missingFields = [];

    if (!name) {
      missingFields.push('Please select Name Of Asset');
    }
    if (!email) {
      missingFields.push('Please select Email Of Asset');
    }
    if (!imageA) {
      missingFields.push('Please upload Image for Asset');
    }
    if (!given_date) {
      missingFields.push('Please select Date Of Asset');
    }

    // if (!description) {
    //   missingFields.push('Please Enter Description Of Asset');
    // }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/assets/create`,
        {
          name,
          email,
          employee_id: employeeId,
          given_date,
          return_date: '',
          imageA,
          imageB: '',
          status: 0,
          remark,
          // description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
        payload: data.assets,
      });
      toast.success('Asset Created successfully', {
        position: 'top-right',
      });
      navigate('/assets-home');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/profileImages',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImageA([...imageA, data.secure_url]);
      } else {
        setImageA(data.secure_url);
      }

      toast.success('Image uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <div className="container">
      <div
        className="card p-2"
        style={{ minHeight: '500px', width: '500px', margin: 'Auto' }}
      >
        <h4 className="text-center fw-bold">Add Asset to employee</h4>
        <form onSubmit={createAsset}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Select Employee Employee ID
            </label>
            <select
              className="form-select"
              id="employeeSelect"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.employee_id}>
                  {employee.employee_id}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Select Employee name
            </label>
            <select
              className="form-select"
              id="employeeSelect"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.NAME}>
                  {employee.NAME}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Select Employee Email
            </label>
            <select
              className="form-select"
              id="employeeSelect"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.email} value={employee.email}>
                  {employee.email}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label text-dark fw-bold">
              Asset Given Date to Employee
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={given_date}
              required
              onChange={(e) => setGiven_date(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label text-dark fw-bold"
            >
              Remark
            </label>
            <textarea
              className="form-control"
              id="remark"
              name="remark"
              rows="3"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            ></textarea>
          </div>

          {loadingUpload ? (
            <div>
              <LoadingBox1 />
            </div>
          ) : imageA ? (
            <>
              <label htmlFor="image">Image A</label>{' '}
              <img src={imageA} height={100} width={100} alt="profile" />
            </>
          ) : (
            ''
          )}
          <div className="mb-3">
            <label htmlFor={`img`} className="form-label text-dark fw-bold">
              Upload Image
            </label>
            <br />
            {loadingUpload ? (
              <div>
                <LoadingBox1 />
              </div>
            ) : (
              <input
                className=""
                type="file"
                alt="profile"
                onChange={uploadFileHandler}
              />
            )}
          </div>

          <div className="d-flex justify-content-end">
            {createloading ? (
              <>
                <button
                  type="submit"
                  className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
                >
                  Submiting..
                  <LoadingBox4 />
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addasset;
