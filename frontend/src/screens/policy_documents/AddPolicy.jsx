import React, { useReducer, useState } from 'react';

import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
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
        policies: [...state.policies, action.payload],
        createloading: false,
      };

    case 'CREATE_FAIL':
      return { ...state, createloading: false, error: action.payload };

    default:
      return state;
  }
};

const AddPolicy = () => {
  const [{ createloading }, dispatch] = useReducer(reducer, {
    policies: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();

  const [filename, setFilename] = useState([]);
  const [title, setTitle] = useState('');

  const submitImage = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', filename);
      console.log(title, filename);

      const result = await axios.post(
        'http://localhost:5000/uploadp',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(result);
      dispatch({
        type: 'CREATE_SUCCESS',
        payload: result.data.data,
      });
      toast.success('policy Created successfully', {
        position: 'top-right',
      });
      navigate('/policy-documents-home');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Add New Policy</title>
      </Helmet>

      <div
        className="card p-2"
        style={{ minHeight: '300px', width: '500px', margin: 'Auto' }}
      >
        <h4 className="text-center fw-bold">Add new Policy</h4>
        <form onSubmit={submitImage}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Policy Label
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Policy File
            </label>
            <input
              type="file"
              class="form-control"
              accept="application/pdf"
              required
              onChange={(e) => setFilename(e.target.files[0])}
            />
          </div>

          <div className="d-flex justify-content-end">
            {createloading ? (
              <>
                <button
                  type="submit"
                  className="w-50 py-1 m-auto fw-bold btn btn-warning btn-sm"
                >
                  submiting &nbsp;
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

export default AddPolicy;
