import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import './Table.css'; // Import the CSS file for custom styling
// import data from './data';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import LoadingBox from '../../components/LoadingBox';
import AlertBox from '../../components/MessageBox/AlertBox';
import { Store } from '../../Store';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const TableWithSearchAndPagination = () => {
  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  // const [loading, setLoading] = useState(true);
  // const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  // const [backEmployee, setBackEmployee] = useState([]);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  //new
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/employees');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employees });
        console.log(result.data);
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

  const filteredData = employees.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.image.includes(searchTerm) ||
      item.joiningDate.includes(searchTerm)
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
  const createHandler = async () => {
    popupHandle();
    toast.error('Please fill all details before submiting!');
    navigate('/addemployee');
  };

  const popupHandle = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  return (
    <div className="table-container">
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to add new Employee?</p>
            <div className="popup-buttons">
              <button className="popup-button verify" onClick={createHandler}>
                ADD
              </button>
              <button className="popup-button cancel" onClick={popupHandle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-center">Employees Details</h2>
      <div className="form-group   mb-2 search-input">
        {userInfo && userInfo.isAdmin && userInfo.isAccountant && (
          <Link
            id="AddBtn"
            className="bg-dark text-white"
            onClick={popupHandle}
          >
            ADD
          </Link>
        )}
        <input
          type="text"
          className="form-control search"
          placeholder="Search Employee.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        // <LoadingBox />

        <LoadingBox3 />
      ) : error ? (
        <AlertBox className="alert alert-danger">{error}</AlertBox>
      ) : (
        <div className="">
          <table
            className="table table-bordered table-responsive"
            style={{ minWidth: '1100px' }}
          >
            <thead>
              <tr>
                <th className="col-md-2 text-center">Image</th>
                <th className="col-md-4 text-center">Name</th>
                <th className="col-md-2 text-center">Employee ID</th>
                <th className="col-md-2 text-center">Designation</th>
                <th className="col-md-5 text-center">Email</th>
                <th className="col-md-4 text-center">Joining Date</th>
                <th className="col-md-1 text-center">Action</th>
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
                  <td className="text-center">
                    <div className="table-image-container">
                      <Link to={`/employeedetails/${item._id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="table-image"
                          // style={{ backgroundColor: 'transparent' }}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </Link>
                    </div>
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.employee_id}</td>
                  <td className="text-center">{item.designation}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">{item.joiningDate}</td>
                  <td className="text-center">
                    <button className="edit-button">
                      <Link
                        className="link"
                        to={`/employeedetails/${item._id}`}
                      >
                        {' '}
                        <BiEdit />
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* {<LoadingBox /> && ( */}
      <nav className="pagination-container">
        <ul className="pagination">
          {Array(Math.ceil(filteredData.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`page-item  ${
                  currentPage === index + 1 ? 'active ' : ''
                }`}
              >
                <button
                  className="page-link bg-dark border border-white"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </nav>
      {/* )} */}
    </div>
  );
};

export default TableWithSearchAndPagination;
