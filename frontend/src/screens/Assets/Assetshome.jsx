// import React from 'react';

// const Assetshome = () => {
//   return <div className="container">Assetshome</div>;
// };

// export default Assetshome;

import React, { useContext, useEffect, useReducer, useState } from 'react';
// import assets from './holiday';
import './assets.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import { FaRegEye } from 'react-icons/fa6';
import axios from 'axios';
import { getError } from '../../utils';
import toast from 'react-hot-toast';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { TiEdit } from 'react-icons/ti';
import { AiTwotoneDelete } from 'react-icons/ai';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, assets: action.payload, loading: false };

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

const Assetshome = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, assets, successDelete }, dispatch] = useReducer(reducer, {
    assets: [],
    loading: true,
    error: '',
  });

  const [showModal, setShowModal] = useState(false);

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
      await axios.delete(`/api/assets/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success(`asset deleted successfully`);
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

  return (
    <div className="container element">
      <Helmet>
        <title>Assets</title>
      </Helmet>{' '}
      <h3 className="fw-bold text-center my-3">All Employee Assets</h3>
      {userInfo && userInfo.isHr === 1 && (
        <div className="d-flex justify-content-end my-2 align-items-center">
          <Link
            className="btn btn-sm btn-warning text-decoration-none fw-bold "
            to="/add-asset"
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
            {assets.length === 0 ? (
              <div className="text-center mt-3">
                <span className="badge  bg-danger p-3 fs-6">
                  No assets found
                </span>
              </div>
            ) : (
              <div class="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col " className="text-center">
                        Employee ID
                      </th>
                      <th scope="col " className="text-center">
                        Email
                      </th>
                      <th scope="col-3" className="text-center">
                        Name
                      </th>
                      <th scope="col " className="text-center">
                        Form A
                      </th>
                      <th scope="col " className="text-center">
                        Form B
                      </th>
                      <th scope="col " className="text-center">
                        Given Date
                      </th>
                      <th scope="col " className="text-center">
                        Return Date
                      </th>
                      <th scope="col " className="text-center">
                        Remark
                      </th>
                      <th scope="col " className="text-center">
                        Status
                      </th>

                      <th scope="col " className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{item.employee_id}</td>
                        <td className="text-center">{item.email}</td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">
                          <span
                            className="badge  bg-success p-2"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalImageA"
                          >
                            <FaRegEye />
                          </span>
                        </td>
                        <td className="text-center">
                          {item.imageB !== '' ? (
                            <span
                              className="badge  bg-success p-2"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalImageB"
                            >
                              <FaRegEye />
                            </span>
                          ) : (
                            <span
                              className="badge  bg-light text-dark p-2"
                              disabled
                              type="button"
                            >
                              <FaRegEye />
                            </span>
                          )}
                        </td>
                        {/* -------------image A---------------- */}
                        <div
                          className="modal fade"
                          id="exampleModalImageA"
                          tabindex="-1"
                          aria-labelledby="exampleModalImageA"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalImageA"
                                >
                                  Image A
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <img
                                  src={item.imageA}
                                  style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'contain',
                                  }}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* ---------------image A-------------- */}

                        {/* -------------image B---------------- */}
                        <div
                          className="modal fade"
                          id="exampleModalImageB"
                          tabindex="-1"
                          aria-labelledby="exampleModalImageB"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalImageB"
                                >
                                  Image B
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <img
                                  src={item.imageB}
                                  style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'contain',
                                  }}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* ---------------image B-------------- */}
                        <td className="text-center">
                          {' '}
                          <span class="badge bg-success p-2">
                            {new Date(item.given_date).toLocaleDateString(
                              'en-GB'
                            )}
                          </span>
                        </td>
                        <td className="text-center">
                          {item.return_date === '' ? (
                            <span class="badge  bg-danger p-2">
                              Asset still with employee
                            </span>
                          ) : (
                            <span class="badge bg-success p-2">
                              {new Date(item.return_date).toLocaleDateString(
                                'en-GB'
                              )}
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          {item.remark === '' ? (
                            <span class="badge  bg-warning p-2">None</span>
                          ) : (
                            <span class="badge  bg-success p-2">
                              {item.remark}
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          {item.status === 0 ? (
                            <span class="badge  bg-danger p-2">
                              Asset still with employee
                            </span>
                          ) : (
                            <span class="badge  bg-success p-2">
                              Asset Received
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          <Link
                            className="btn btn-sm btn-primary m-1"
                            to={`/edit-asset/${item.id}`}
                          >
                            <TiEdit />
                          </Link>
                          <Link
                            className="btn btn-sm btn-danger m-1"
                            onClick={() => setShowModal(true)}
                          >
                            <AiTwotoneDelete />
                          </Link>
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
                                  <h5
                                    className="modal-title"
                                    id="deleteModalLabel"
                                  >
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
                                    {item.name}
                                  </span>{' '}
                                  Assets ?
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
                                    onClick={(e) => deleteHandler(item.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* --------------------delete modal---------------------------------- */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Assetshome;
