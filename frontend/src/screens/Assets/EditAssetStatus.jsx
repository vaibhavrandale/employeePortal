import React, { useContext, useEffect, useReducer, useState } from 'react';

import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import LoadingBox1 from '../../components/LoadingBox1';
import axios from 'axios';
import { getError } from '../../utils';
import toast from 'react-hot-toast';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ASSET_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_ASSET_SUCCESS':
      return { ...state, asset: action.payload, loading: false };

    case 'FETCH_ASSET_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, createloading: true };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        asset: action.payload,
        createloading: false,
      };

    case 'UPDATE_FAIL':
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

const EditAssetStatus = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loadingUpload, createloading }, dispatch] = useReducer(reducer, {
    asset: {},
    employees: [],
    loading: true,
    error: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageA, setImageA] = useState('');
  const [imageB, setImageB] = useState('');
  const [return_date, setReturn_date] = useState('');
  const [remark, setRemark] = useState('');
  // const [description, setDescription] = useState('');

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/assets/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.asset });
        console.log(result.data.asset);
        setImageA(result.data.asset.imageA);
        setImageB(result.data.asset.imageB);
        setReturn_date(result.data.asset.return_date);
        setRemark(result.data.asset.remark);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [id]);

  // create
  const createAsset = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!imageB) {
      missingFields.push('Please upload Image for Asset');
    }
    if (!remark) {
      missingFields.push('Please upload Image for Asset');
    }
    if (!return_date) {
      missingFields.push('Please select Date Of Asset');
    }

    // if (!description) {
    //   missingFields.push('Please Enter Description Of Asset');
    // }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }
    dispatch({
      type: 'UPDATE_REQUEST',
    });

    try {
      const { data } = await axios.put(
        `/api/assets/${id}`,
        {
          return_date,
          imageB,
          status: 1,
          remark,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data.assets,
      });
      toast.success('Asset Updated successfully', {
        position: 'top-right',
      });
      navigate('/assets-home');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'UPDATE_FAIL' });
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
        setImageB([...imageB, data.secure_url]);
      } else {
        setImageB(data.secure_url);
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
      <Helmet>
        <title>Edit Asset-{id}</title>
      </Helmet>
      <div
        className="card p-2"
        style={{ minHeight: '500px', width: '500px', margin: 'Auto' }}
      >
        <h4 className="text-center fw-bold">Update Asset </h4>
        <form onSubmit={createAsset}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label text-dark fw-bold">
              Asset Return Date to Employee
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={return_date}
              required
              onChange={(e) => setReturn_date(e.target.value)}
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

          <div className="d-flex my-2">
            {imageA ? (
              <img
                src={imageA}
                height={100}
                width={100}
                alt="profileA"
                className="mx-1"
              />
            ) : (
              ''
            )}
            {imageB ? (
              <img
                src={imageB}
                height={100}
                width={100}
                alt="profileB"
                className="mx-1"
              />
            ) : (
              ''
            )}
          </div>

          <div className="mb-3">
            <label htmlFor={`img`} className="form-label text-dark fw-bold">
              Upload Image B
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

export default EditAssetStatus;
