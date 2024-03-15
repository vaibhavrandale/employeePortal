import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import './Table.css'; // Import the CSS file for custom styling
// import data from './data';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AlertBox from '../../components/MessageBox/AlertBox';
import { Store } from '../../Store';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };

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

const TableWithSearchAndPagination = () => {
  const [
    { loading, error, employees, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
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
  const [isdeletePopupOpen, setdeletePopupOpen] = useState(false);
  // const [loadedImages, setLoadedImages] = useState([]);

  // const [backEmployee, setBackEmployee] = useState([]);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  //new
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/employees', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employees });
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
  }, [successDelete, userInfo]);

  // const filteredData = employees.filter(
  //   (item) =>
  //     item.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.employee_id.includes(searchTerm) ||
  //     item.joiningDate.includes(searchTerm)
  // );

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
  const popupDeleteHandle = () => {
    setdeletePopupOpen(!isdeletePopupOpen);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const closeDeletePopup = () => {
    setdeletePopupOpen(false);
  };

  const saveSettings = async (settings) => {
    // Simulating a delay for API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return 'Success'; // Return a success message or data
  };

  // const DeleteHandler = async (e, id) => {
  //   console.log(id);
  //   e.preventDefault();
  //   popupDeleteHandle();
  //   dispatch({
  //     type: 'DELETE_REQUEST',
  //   });

  //   try {
  //     const { data } = await axios.delete(
  //       `/api/employees/${id}`,

  //       {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       }
  //     );
  //     console.log(data);
  //     dispatch({
  //       type: 'DELETE_SUCCESS',
  //       payload: data,
  //     });

  //     toast.promise(saveSettings({ action: 'delete' }), {
  //       position: 'top-right',
  //       loading: 'Processing...',
  //       success: <b>Employee Deleted Successfully!</b>,
  //       error: <b>Could not Delete employee data.</b>,
  //     });

  //     // navigate('/leaves-history');
  //   } catch (error) {
  //     toast.error(getError(error));
  //     dispatch({ type: 'DELETE_FAIL' });
  //   }
  // };

  return (
    <div className="table-container ">
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to add new Employee?</p>
            <div className="popup-buttons">
              <button className="popup-button verify" onClick={createHandler}>
                <span className="d-flex justify-content-center align-items-center">
                  ADD
                  {/* <BsPersonAdd /> */}
                </span>
              </button>
              <button className="popup-button cancel" onClick={closePopup}>
                <span className="d-flex justify-content-center align-items-center">
                  {' '}
                  CANCEL
                  {/* <RxCross2 /> */}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-center ">Employees Details</h2>
      {loading ? (
        // <LoadingBox />

        <LoadingBox5 />
      ) : error ? (
        <AlertBox className="alert alert-danger">{error}</AlertBox>
      ) : (
        <>
          <div className="form-group   mb-2  d-flex w-100 justify-content-between  align-items-center">
            {userInfo && userInfo.isHr === 1 ? (
              <div>
                <Link id="" className="NewBtn" onClick={popupHandle}>
                  ADD
                </Link>
              </div>
            ) : (
              <div></div>
            )}
            <input
              type="text"
              className="inputField search "
              style={{ width: '250px' }}
              placeholder="Search Employee.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div class="table-responsive">
            <table
              className="table table-bordered "
              // style={{ minWidth: '1050px' }}
            >
              <thead>
                <tr>
                  <th className="col-md-1 text-center">Employee ID</th>
                  <th className="col-md-1 text-center">Image</th>
                  <th className="col-md-3 text-center">Name</th>
                  <th className="col-md-2 text-center">Designation</th>
                  <th className="col-md-2 text-center">Email</th>
                  <th className="col-md-1 text-center">Joining Date</th>
                  {/* {userInfo.isSuperAdmin ? (
                    <th className="col-md-1 text-center">Remove</th>
                  ) : (
                    ''
                  )} */}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className={item.activate === 0 ? 'table-danger' : ''}
                    onMouseEnter={() => handleRowHover(index)}
                    onMouseLeave={() => handleRowHover(null)}
                  >
                    <td className="text-center" style={{ minWidth: '200px' }}>
                      {' '}
                      <Link
                        className="text-decoration-none  text-danger"
                        to={`/employeedetails/${item.employee_id}`}
                      >
                        {item.employee_id}
                      </Link>
                    </td>
                    <td className="text-center" style={{ minWidth: '200px' }}>
                      {' '}
                      <div
                        className="table-image-container "
                        style={{ height: '45px' }}
                      >
                        <Link to={`/employeedetails/${item.employee_id}`}>
                          <img
                            src={item.image}
                            alt={item.NAME}
                            style={{
                              height: '50px',
                              width: '50px',
                              objectFit: 'cover',
                            }}
                            // style={{ backgroundColor: 'transparent' }}
                            // onLoad={() => handleImageLoad(index)}
                          />
                        </Link>
                      </div>
                    </td>
                    <td className="text-center" style={{ minWidth: '200px' }}>
                      {' '}
                      {item.NAME}
                    </td>

                    <td className="text-center" style={{ minWidth: '200px' }}>
                      {' '}
                      {item.designation}
                    </td>
                    <td className="text-center" style={{ minWidth: '200px' }}>
                      {' '}
                      {item.email}
                    </td>
                    <td className="text-center" style={{ minWidth: '200px' }}>
                      {' '}
                      {item.joiningDate}
                    </td>
                    {/*{userInfo.isSuperAdmin ? (
                      <td className="text-center  fs-5">
                        {loadingDelete ? (
                          <LoadingBox4 />
                        ) : (
                          <Link
                            onClick={popupDeleteHandle}
                            className="text-danger"
                          >
                            <MdDeleteOutline />
                          </Link>
                        )}
                      </td>
                    ) : (
                      ''
                    )} */}

                    {/* {userInfo.isSuperAdmin ? (
                      <td className="text-center fs-5">
                        {loadingDelete ? (
                          <LoadingBox4 />
                        ) : item.email === 'vaibhav.randale@taypro.in' ? (
                          <div disabled className="text-danger">
                            <MdDeleteOutline />
                          </div>
                        ) : (
                          <>
                            <Link
                              onClick={popupDeleteHandle}
                              className="text-danger"
                            >
                              <MdDeleteOutline />
                            </Link>
                            {isdeletePopupOpen && (
                              <div className="popup-container">
                                <div className="popup">
                                  <p>
                                    Are you sure you want to delete Employee?
                                  </p>
                                  <div className="popup-buttons">
                                    <button
                                      className="popup-button verify"
                                      onClick={(e) => DeleteHandler(e, item.id)}
                                    >
                                      <AiOutlineDelete />
                                    </button>
                                    <button
                                      className="popup-button cancel"
                                      onClick={closeDeletePopup}
                                    >
                                      <RxCross2 />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    ) : (
                      ''
                    )} */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {<LoadingBox5 /> && (
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
      )}
    </div>
  );
};

export default TableWithSearchAndPagination;
