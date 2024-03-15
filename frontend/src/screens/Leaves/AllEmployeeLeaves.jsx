// import React from 'react';

// const AllEmployeeLeaves = () => {
//   return <div className="container">AllEmployeeLeaves</div>;
// };

// export default AllEmployeeLeaves;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import { Store } from '../../Store';
import { BsShieldCheck } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { AiOutlineReload } from 'react-icons/ai';
// import { toast } from 'react-toastify';

import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import MsgBox from '../../components/MessageBox/MsgBox';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'LEAVE_STATUS_REQUEST':
      return { ...state, loadingLeaveStatus: true };

    case 'LEAVE_STATUS_SUCCESS':
      return { ...state, leaves: action.payload, loadingLeaveStatus: false };

    case 'LEAVE_STATUS_FAIL':
      return { ...state, loadingLeaveStatus: false, error: action.payload };

    default:
      return state;
  }
};

function AllEmployeeLeaves() {
  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { id } = useParams();
  // const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const Employeeresult = await axios.get(`/api/employees`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: Employeeresult.data.employees,
        });

        // Calculate remaining leaves based on fetched leave counts
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [userInfo.token]);

  const filteredData = employees
    .filter(
      (item) =>
        item.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employee_id.includes(searchTerm) ||
        item.joiningDate.includes(searchTerm) ||
        item.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by 'activate' property with 1s coming first
      if (a.activate === 1 && b.activate === 0) {
        return -1; // 'a' comes first
      } else if (a.activate === 0 && b.activate === 1) {
        return 1; // 'b' comes first
      } else {
        // If 'activate' values are the same, use employee_id for sorting
        return a.employee_id.localeCompare(b.employee_id);
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  return (
    <div className="container ">
      <h2 className="text-dark">All Employee Leave History</h2>
      <div className="d-flex">
        {/* <Link className="submitBtn2    " to={'/leave'}>
              Apply{' '}
            </Link> */}

        {currentItems.length === 0 ? (
          ''
        ) : (
          <div className="form-group    mb-2 search-input m-1">
            <input
              type="text"
              className="form-control search"
              placeholder="Search Leave.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {loading ? (
        <LoadingBox5 />
      ) : error ? (
        <MsgBox className="alert alert-danger">{error}</MsgBox>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <MsgBox className="alert alert-danger">No Leaves Found!</MsgBox>
          ) : (
            <div class="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th className="col-md-1 text-center">Employee ID </th>{' '}
                    <th className="col-md-1 text-center">Name </th>
                    <th className="col-md-1 text-center">Email</th>
                    <th className="col-md-1 text-center">Sick</th>
                    <th className="col-md-1 text-center">Casual</th>
                    <th className="col-md-1 text-center">Previlege</th>
                    <th className="col-md-1 text-center">Total</th>
                    <th className="col-md-1 text-center">View Leaves</th>
                    {/* <th className="col-md-1 text-center">Approve</th>
                  <th className="col-md-1 text-center">Decline</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className={`hovered-row ${
                        item.activate === 0 ? `table-danger` : ``
                      }`}
                    >
                      <td className="text-center fw-bold">
                        {item.employee_id}
                      </td>

                      <td className="text-center fw-bold">{item.NAME}</td>
                      <td className="text-center fw-bold">{item.email}</td>

                      <td className="text-center fw-bold">{item.sick}</td>
                      <td className="text-center fw-bold">{item.casual}</td>
                      <td className="text-center fw-bold">{item.privilege}</td>
                      <td className="text-center fw-bold">{item.leaves}</td>

                      <td className="text-center">
                        <Link
                          // style={{ width: '86px' }}
                          className="text-decoration-none btn btn-sm bg-warning fw-bold "
                          to={`/leave-application/${item.employee_id}`}
                          // to={`/leave-status/${item.employee_id}/${item.id}`}
                          target="blank"
                        >
                          {/* &nbsp;<i className="fas fa-edit"></i> */}
                          view
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      {<LoadingBox /> && (
        <nav className="pagination-container">
          <ul className="pagination">
            {Array(Math.ceil(filteredData.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link bg-dark border border-white "
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default AllEmployeeLeaves;
