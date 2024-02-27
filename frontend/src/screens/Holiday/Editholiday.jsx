import React, { useContext, useEffect, useReducer, useState } from 'react';
// import holidays from './holiday';
import './holiday.css';
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
    case 'CREATE_REQUEST':
      return { ...state, createloading: true };

    case 'CREATE_SUCCESS':
      return {
        ...state,
        holidays: [...state.holiday, action.payload],
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

const Editholiday = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, loadingUpload, holiday, createloading, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    holiday: {},
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const [img, setImage] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  // const [description, setDescription] = useState('');

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/holidays/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.holiday });
        console.log(result.data);
        setImage(result.data.holiday.img);
        setName(result.data.holiday.name);
        // setDescription(result.data.holiday.description);
        setDate(result.data.holiday.date);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    // if (successDelete) {
    //   dispatch({ type: 'DELETE_RESET' });
    // } else {
    fetchData();
    // }
    // fetchData();
  }, [id]);

  // create
  const Editholiday = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    const missingFields = [];

    if (!name) {
      missingFields.push('Please Enter Name Of Holiday');
    }
    if (!img) {
      missingFields.push('Please upload Image for holiday');
    }
    if (!date) {
      missingFields.push('Please Enter Date Of Holiday');
    }
    // if (!description) {
    //   missingFields.push('Please Enter Description Of Holiday');
    // }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/holidays/${id}`,
        {
          name,
          date,
          img,
          // description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
        payload: data.holiday,
      });
      toast.success('Holiday updated successfully', {
        position: 'top-right',
      });
      navigate('/calender');
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
        setImage([...img, data.secure_url]);
      } else {
        setImage(data.secure_url);
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
        <h4 className="text-center fw-bold">
          Edit holiday - <b className="text-primary">{name}</b>{' '}
        </h4>
        <form onSubmit={Editholiday}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Holiday Label
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label text-dark fw-bold">
              Holiday Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label text-dark fw-bold"
            >
              Holiday Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div> */}

          {loadingUpload ? (
            <div>
              <LoadingBox1 />
            </div>
          ) : img ? (
            <>
              <label htmlFor="image">Image</label>{' '}
              <img
                src={img}
                height={100}
                width={100}
                style={{ objectFit: 'contain' }}
                alt="profile"
              />
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
                <LoadingBox4 />
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
                  Updating..
                  <LoadingBox4 />
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editholiday;
