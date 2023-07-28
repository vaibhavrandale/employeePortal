import React, { useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';
import logger from 'use-reducer-logger';
import AlertBox from '../../components/MessageBox/AlertBox';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
// import { BiEdit } from 'react-icons/bi';
// import data from '../Employee/data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, leaves: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function LeavesHistory() {
  const [{ loading, error, leaves }, dispatch] = useReducer(logger(reducer), {
    leaves: [],
    loading: true,
    error: '',
  });

  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate API call or data fetching
  //   const fetchData = () => {
  //     // Replace this with your actual data fetching logic
  //     // For demonstration purposes, we'll use a timeout
  //     setTimeout(() => {
  //       setLeaves(data.Leaves);
  //       setLoading(false);
  //     }, 2000); // Simulating a 2-second delay
  //   };

  //   setLoading(true);
  //   fetchData();
  // }, []);

  // const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const itemsPerPage = 5;
  // const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/leaves');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      setTimeout(() => {
        // setEmployees(result.data);
        // setLoading(false);
      }, 2000); // Simulating a 2-second delay
    };

    // setLoading(true);
    fetchData();
  }, []);

  const filteredData = leaves.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.approvedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.remarkBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.expectedDateOfLeave.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowHover = (index) => {
    setHoveredRow(index);
  };
  return (
    <div className="container">
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/leaves" className="text-decoration-none">
              Leaves
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Leaves-history
          </li>
        </ol>
      </nav>{' '}
      {loading ? (
        <LoadingBox3 />
      ) : error ? (
        <AlertBox>{error}</AlertBox>
      ) : (
        <>
          <h2 className="text-dark">Your Leave History</h2>
          <div className="d-flex">
            <Link className="submitBtn2    " to={'/leave'}>
              Apply{' '}
            </Link>
            <div className="form-group    mb-2 search-input m-1">
              <input
                type="text"
                className="form-control search"
                placeholder="Search Leave.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="col-md-2 text-center">Applied At </th>
                <th className="col-md-1 text-center"> Leave Type</th>

                <th className="col-md-2 text-center">Approved At </th>
                <th className="col-md-1 text-center">Approved By</th>
                <th className="col-md-1 text-center">Status</th>
                <th className="col-md-3 text-center">Remark</th>
                <th className="col-md-3 text-center">Remark By</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  className={index === hoveredRow ? 'hovered-row' : ''}
                  onMouseEnter={() => handleRowHover(index)}
                  onMouseLeave={() => handleRowHover(null)}
                >
                  <td className="text-center">{item.submittedAt}</td>
                  <td className="text-center">{item.type}</td>

                  <td className="text-center">
                    {item.approvedAt !== '' ? (
                      <span className="badge p-2 text-bg-light">
                        {item.approvedAt}
                      </span>
                    ) : item.approvedAt === '' && item.remark !== '' ? (
                      <span className="badge text-bg-danger">Rejected</span>
                    ) : (
                      <span className="badge text-bg-warning">Pending</span>
                    )}
                  </td>
                  <td className="text-center">
                    {item.approvedBy !== '' ? (
                      <span className="badge text-bg-success">
                        {item.approvedBy}
                      </span>
                    ) : item.approvedBy === '' && item.remark !== '' ? (
                      <span className="badge text-bg-danger">Rejected</span>
                    ) : (
                      <span className="badge text-bg-warning">pending</span>
                    )}
                  </td>
                  <td className="text-center">
                    {item.approved === true ? (
                      <span className="badge text-bg-success">Approved</span>
                    ) : item.approved === false && item.remark !== '' ? (
                      <span className="badge text-bg-danger">Rejected</span>
                    ) : (
                      <span className="badge text-bg-warning">Pending</span>
                    )}
                  </td>

                  <td className="">{item.remark}</td>
                  <td className="text-center">{item.remarkBy}</td>
                  {/* <td className="text-center">
                    <button className="edit-button">
                      <Link
                        className="link"
                        to={`/employeedetails/${item.employee_id}`}
                      >
                        {' '}
                        <BiEdit />
                      </Link>
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {<LoadingBox /> && filteredData.length === 0 && (
        <p className="text-center">No results found.</p>
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

export default LeavesHistory;
