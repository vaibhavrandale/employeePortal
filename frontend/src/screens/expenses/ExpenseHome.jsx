import React, { useContext, useEffect, useReducer, useState } from 'react';
// import expenses from './expenses';
import { Link } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { Store } from '../../Store';
import axios from 'axios';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import toast from 'react-hot-toast';
import { getError } from '../../utils';

import { FaFileExport } from 'react-icons/fa6';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, expenses: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

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

const ExpenseHome = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, loadingUpload, expenses, successDelete }, dispatch] =
    useReducer(reducer, {
      expenses: [],
      loading: true,
      error: '',
    });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle modal opening
  const openModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/expenses');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.expenses });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
      setShowModal(false);
    } else {
      fetchData();
    }
    // fetchData();
  }, [successDelete]);

  const deleteHandler = async (e, id) => {
    try {
      await axios.delete(`/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success(`Expense ${id} deleted successfully`);
      dispatch({
        type: 'DELETE_SUCCESS',
      });
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'DELETE_FAIL',
      });
    }
  };

  const filteredData = expenses.filter(
    (item) =>
      item.sitename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.SettledBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ApprovedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ApprovedBy2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.siteLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_id.includes(searchTerm) ||
      item.employeeName.includes(searchTerm)
  );
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <h3 className="text-center my-3">All Employee Site Expenses</h3>
      <div className="d-flex justify-content-end align-items-end my-2 flex-wrap">
        <input
          type="text"
          className="form-control search mx-1"
          style={{ width: '180px' }}
          placeholder="Search Expenses.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/new-expense" className="btn btn-sm btn-warning w-0 ">
          ADD
        </Link>
      </div>
      <div className="table-responsive">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <LoadingBox4 />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="d-flex justify-content-center">
            <div className="badge bg-danger p-3 fs-5">No Expense Found</div>
          </div>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  ID
                </th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Employee ID
                </th>
                <th scope="col" className="text-center ">
                  Site Name
                </th>
                <th scope="col" className="text-center">
                  Location
                </th>
                <th scope="col" className="text-center">
                  Start Date
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>

                <th scope="col" className="text-center">
                  Approved By
                </th>
                <th scope="col" className="text-center">
                  Settled
                </th>
                <th scope="col" className="text-center">
                  Settled By
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
                {userInfo.isDirector === 1 || userInfo.isHr ? (
                  <th scope="col" className="text-center">
                    Approve
                  </th>
                ) : (
                  ''
                )}
                {userInfo.isAccountant === 1 || userInfo.isHr ? (
                  <th scope="col" className="text-center">
                    Settle
                  </th>
                ) : (
                  ''
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">
                    {' '}
                    <Link to={`/view-expense/${item.id}`}>{item.id}</Link>
                  </td>
                  <td className="text-center">{item.employeeName}</td>
                  <td className="text-center">{item.employee_id}</td>
                  <td className="text-center">{item.sitename}</td>
                  <td className="text-center">{item.siteLocation}</td>
                  <td className="text-center">
                    {item.startDate && (
                      <>
                        {new Date(item.startDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </>
                    )}
                  </td>
                  <td className="text-center">
                    {item.status === 0 ? (
                      <span className="badge bg-warning text-dark p-2">
                        Pending
                      </span>
                    ) : item.status === 1 ? (
                      <span className="badge bg-success p-2">Approved-1</span>
                    ) : item.status === 2 ? (
                      <span className="badge bg-success p-2">Approved-2</span>
                    ) : item.status === 3 ? (
                      <span className="badge bg-success p-2">Approved</span>
                    ) : (
                      <span className="badge bg-info p-2">No View</span>
                    )}
                  </td>

                  <td className="text-center">
                    {item.status === 1 ||
                    item.status === 2 ||
                    item.status === 3 ? (
                      <div className="dropdown">
                        <span
                          className={`badge bg-info text-dark p-2  ${
                            item.status === 2 || item.status === 3
                              ? `dropdown-toggle`
                              : `disabled`
                          }`}
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {item.ApprovedBy}
                        </span>
                        {item.ApprovedBy2 ? (
                          <ul
                            style={{ maxWidth: '10px', minHeight: '50px' }}
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <span className="dropdown-item " href="#">
                                {item.ApprovedBy2}
                              </span>
                            </li>
                          </ul>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      <span className="badge bg-info p-2">No View</span>
                    )}
                  </td>

                  <td className="text-center ">
                    {item.Settled === 1 ? (
                      <span className="badge bg-success p-2">Settled</span>
                    ) : (
                      <span className="badge bg-warning text-dark p-2">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="text-center ">
                    {item.SettledBy !== '' ? (
                      <span className="badge bg-success p-2">
                        {item.SettledBy}
                      </span>
                    ) : (
                      <span className="badge bg-warning text-dark p-2">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="text-center d-flex">
                    <Link
                      className="btn btn-sm text-decoration-none btn-success mx-1 py-0 d-flex justify-content-center align-items-center"
                      to={`/view-expense/${item.id}`}
                    >
                      <IoEyeOutline />
                    </Link>
                    <Link
                      className="btn btn-sm text-decoration-none btn-warning text-light mx-1 py-0 d-flex justify-content-center align-items-center"
                      to={`/update-expense/${item.id}`}
                    >
                      <FaRegEdit />
                    </Link>

                    <Link
                      type="button"
                      className="btn btn-danger btn-sm py-0 d-flex justify-content-center align-items-center"
                      data-bs-toggle="modal"
                      data-bs-backdrop="false"
                      onClick={openModal}
                      data-bs-target={`#exampleModal_${item.id}`}
                    >
                      <MdDeleteOutline />
                    </Link>

                    {/* <Link
                      className="btn btn-sm btn-success m-1  text-decoration-none   d-flex justify-content-center align-items-center"
                      target="_blank"
                      to={`/export-expense/${item.id}`}
                    >
                      <FaFileExport />
                    </Link> */}

                    <Link
                      className="btn btn-sm text-decoration-none btn-success text-light mx-1 py-2 d-flex justify-content-center align-items-center"
                      to={`/export-expense/${item.id}`}
                    >
                      <FaFileExport />
                    </Link>
                    <div
                      className={`modal fade${showModal ? ' show' : ''}`}
                      id={`exampleModal_${item.id}`}
                      tabIndex="-1"
                      aria-labelledby={`exampleModalLabel_${item.id}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id={`exampleModalLabel_${item.id}`}
                            >
                              Confirmation
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Are you sure to delete Expense-
                            <span className="text-success fw-bold">
                              {item.sitename}
                            </span>
                            ?
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              data-bs-dismiss="modal"
                              onClick={closeModal}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={(e) => deleteHandler(e, item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* { userInfo.isHr || userInfo.isHr ? (
                    <td>
                      <Link
                        className={`btn btn-sm btn-success m-1  ${
                          item.status >= 2 ? 'disabled' : ''
                        }`}
                        to={`/approve-expense/${item.id}`}
                        disabled={item.status >= 2}
                      >
                        Approve
                      </Link>
                    </td>
                  ) : (
                    ''
                  )} */}
                  <td>
                    <div className="d-flex">
                      {userInfo.isHr === 1 && item.status === 1 ? (
                        <Link
                          className={`btn btn-sm btn-success m-1 ${
                            item.status >= 2 ? 'disabled' : ''
                          }`}
                          to={`/approve-expense/${item.id}`}
                          disabled={item.status >= 2}
                        >
                          Approve
                        </Link>
                      ) : (
                        <Link
                          className={`btn btn-sm btn-success m-1 
                        disabled`}
                          disabled={item.status >= 2}
                        >
                          HR Approved
                        </Link>
                      )}
                      {userInfo.isDirector === 1 && item.status === 0 ? (
                        <Link
                          className={`btn btn-sm btn-success m-1 `}
                          to={`/approve-expense/${item.id}`}
                        >
                          Approve
                        </Link>
                      ) : (
                        <Link
                          className={`btn btn-sm btn-success m-1 
                        disabled`}
                          disabled={item.status >= 2}
                        >
                          Director Approved
                        </Link>
                      )}
                    </div>
                  </td>
                  <td>
                    {userInfo.isAccountant === 1 && item.status === 2 ? (
                      <Link
                        className={`btn btn-sm btn-success m-1`}
                        to={`/settle-expense/${item.id}`}
                        // disabled={item.status > 2}
                      >
                        Settle
                      </Link>
                    ) : userInfo.isAdmin === 1 && item.status === 2 ? (
                      <Link
                        className={`btn btn-sm btn-success m-1 
                        disabled`}
                        disabled={item.status >= 2}
                      >
                        Settle
                      </Link>
                    ) : (
                      <Link
                        className={`btn btn-sm btn-success m-1 
                        disabled`}
                        disabled={item.status >= 2}
                      >
                        Settled
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseHome;
