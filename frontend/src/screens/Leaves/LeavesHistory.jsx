import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
// import { BiEdit } from 'react-icons/bi';
import data from '../Employee/data';

function LeavesHistory() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = () => {
      // Replace this with your actual data fetching logic
      // For demonstration purposes, we'll use a timeout
      setTimeout(() => {
        setLeaves(data.Leaves);
        setLoading(false);
      }, 2000); // Simulating a 2-second delay
    };

    setLoading(true);
    fetchData();
  }, []);

  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const itemsPerPage = 10;
  // const navigate = useNavigate();

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
      {isLoading ? (
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2 className="text-dark">Your Leave History</h2>
          <div className="form-group   mb-2 search-input">
            <input
              type="text"
              className="form-control search"
              placeholder="Search Leave.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="col-md-2 text-center">Applied At </th>
                <th className="col-md-1 text-center">Type</th>

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
                      <span class="badge p-2 text-bg-light">
                        {item.approvedAt}
                      </span>
                    ) : item.approvedAt === '' && item.remark !== '' ? (
                      <span className="badge text-bg-danger">Rejected</span>
                    ) : (
                      <span class="badge text-bg-warning">Pending</span>
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
      {!isLoading && filteredData.length === 0 && (
        <p className="text-center">No results found.</p>
      )}
      {!isLoading && (
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
                    className="page-link bg-dark border border-dark"
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
