import React, { useContext, useEffect, useReducer, useState } from 'react';
// import holidays from './holiday';
import './holiday.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
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
      return { ...state, holidays: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, createloading: true };

    case 'CREATE_SUCCESS':
      return {
        ...state,
        holidays: [...state.holidays, action.payload],
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

    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };

    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};

const Holidayhome = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, loadingUpload, holidays, createloading, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    holidays: [],
    loading: true,
    error: '',
  });

  const [img, setImage] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/holidays');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.holidays });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
    // fetchData();
  }, [successDelete]);

  const [deleteModalId, setDeleteModalId] = useState(null);

  const deleteHandler = async (id) => {
    setDeleteModalId(id);

    try {
      await axios.delete(`/api/holidays/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success(`holiday deleted successfully`);
      dispatch({
        type: 'DELETE_SUCCESS',
      });
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'DELETE_FAIL',
      });
    } finally {
      setShowModal(false);
    }
  };
  const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div className="container element">
      <Helmet>
        <title>Holiday Calender</title>
      </Helmet>{' '}
      <h3 className="fw-bold text-center my-3">
        <span className="fw-bold text-success">Taypro</span> Holiday Calender
        2024
      </h3>
      {userInfo && userInfo.isSuperAdmin === 1 && (
        <div className="d-flex justify-content-end my-2 align-items-center">
          <Link
            className="btn btn-sm btn-warning text-decoration-none fw-bold "
            to="/new-holiday"
          >
            ADD
          </Link>
        </div>
      )}
      <div className="d-flex flex-wrap justify-content-center my-2">
        {loading ? (
          <LoadingBox4 />
        ) : (
          <>
            {holidays.map((holiday, index) => (
              <div
                key={index}
                className={`card   mb-3 mx-1 `}
                id="element"
                style={{
                  maxWidth: '14.5rem',
                }}
              >
                <div className="card-header fw-bold d-flex justify-content-between ">
                  {holiday.name}

                  {userInfo && userInfo.isSuperAdmin === 1 && (
                    <div>
                      <Link
                        className="mx-1 text-primary"
                        to={`/edit-holiday/${holiday.id}`}
                      >
                        <FaRegEdit />
                      </Link>

                      <Link
                        className="mx-1 text-danger"
                        onClick={() => setShowModal(true)}
                      >
                        <RiDeleteBinLine />
                      </Link>
                      {/* <Link
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => setShowModal(true)}
                      >
                        <RiDeleteBinLine />
                      </Link> */}
                      {/* --------------------delete modal---------------------------------- */}

                      <div
                        className={`modal fade ${showModal ? 'show' : ''}`}
                        style={{ display: showModal ? 'block' : 'none' }}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="deleteModal"
                        aria-hidden={!showModal}
                      >
                        <div className="modal-dialog modal-dialog-centered modal-sm">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="deleteModalLabel">
                                Confirmation
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                              ></button>
                            </div>
                            <div className="modal-body">
                              Are you sure to delete{' '}
                              <span className="text-danger">
                                {holiday.name}
                              </span>{' '}
                              Holiday ?
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={(e) => deleteHandler(holiday.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* --------------------delete modal---------------------------------- */}
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <img className="holidayImage" src={holiday.img} alt="" />
                  </div>
                  <p className="card-text my-2 text-center">
                    <b>
                      {' '}
                      <b>{formatDate(holiday.date)}</b>
                    </b>
                  </p>
                  <p className="card-text  fs-6 text-justify">
                    {holiday.description}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Holidayhome;
