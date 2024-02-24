import React, { useContext, useEffect, useReducer } from 'react';
// import expenses from './expenses';
import { Link } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { Store } from '../../Store';
import axios from 'axios';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

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
    } else {
      fetchData();
    }
    // fetchData();
  }, [successDelete]);

  return (
    <div className="container">
      <h3 className="text-center my-3">Site Expenses</h3>
      <div className="d-flex justify-content-end align-items-end my-2">
        <Link to="/new-expense" className="btn btn-sm btn-warning w-0 ">
          ADD
        </Link>
      </div>
      <div className="table-responsive">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <LoadingBox4 />
          </div>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Serial
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Employee ID
                </th>
                <th
                  scope="col"
                  className="text-center "
                  style={{ width: '250px' }}
                >
                  Site Name
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Approved By
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Settled
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Settled By
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: '50px' }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.id}</td>
                  <td className="text-center">{item.employeeName}</td>
                  <td className="text-center">{item.employee_id}</td>
                  <td className="text-center">{item.sitename}</td>
                  <td className="text-center">{item.siteLocation}</td>
                  <td className="text-center">{item.startDate}</td>
                  <td className="text-center">
                    {item.status === 1 ? (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    ) : item.status === 2 ? (
                      <span className="badge bg-success">Approved</span>
                    ) : (
                      <span className="badge bg-info">No View</span>
                    )}
                  </td>

                  <td className="text-center">
                    {item.status === 1 || item.status === 2 ? (
                      <div className="dropdown">
                        <span
                          className={`badge bg-info text-dark p-2  ${
                            item.status === 2 ? `dropdown-toggle` : `disabled`
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
                      <span className="badge bg-info">No View</span>
                    )}
                  </td>
                  <td className="text-center ">
                    {item.Settled === 1 ? (
                      <span className="badge bg-success">Settled</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="text-center ">
                    {item.SettledBy !== '' ? (
                      <span className="badge bg-success">{item.SettledBy}</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="text-center d-flex">
                    <Link
                      className="btn btn-sm text-decoration-none btn-success mx-1"
                      to={`/view-expense/${item.id}`}
                    >
                      <IoEyeOutline />
                    </Link>
                    <Link className="btn btn-sm text-decoration-none btn-warning text-light mx-1">
                      <FaRegEdit />
                    </Link>
                    <Link className="btn btn-sm text-decoration-none btn-danger mx-1">
                      <MdDeleteOutline />
                    </Link>
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
