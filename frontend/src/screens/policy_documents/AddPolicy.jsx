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
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, policies, createloading }, dispatch] = useReducer(reducer, {
    policies: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();

  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  // const [description, setDescription] = useState('');

  // create
  const CreatePolicy = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    const missingFields = [];

    if (!name) {
      missingFields.push('Please Enter Name Of policy');
    }
    if (!link) {
      missingFields.push('Please Enter link for policy');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/policy/create`,
        {
          name,

          link,
          // description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
        payload: data.policies,
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
      <div
        className="card p-2"
        style={{ minHeight: '300px', width: '500px', margin: 'Auto' }}
      >
        <h4 className="text-center fw-bold">Add new Policy</h4>
        <form onSubmit={CreatePolicy}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Policy Label
            </label>
            <input
              placeholder="Enter label here"
              type="text"
              className="form-control"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark fw-bold">
              Policy Link
            </label>
            <textarea
              type="text"
              className="form-control"
              id="name"
              value={link}
              required
              onChange={(e) => setLink(e.target.value)}
              placeholder="paste link here"
            ></textarea>
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
