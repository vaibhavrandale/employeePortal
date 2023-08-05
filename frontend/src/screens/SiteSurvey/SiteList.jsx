import React, { useContext, useEffect, useReducer, useState } from 'react';
import './Sitetable.css';
// import data from '../Employee/data';
import { Link, useNavigate } from 'react-router-dom';
import { LuEdit2 } from 'react-icons/lu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AlertBox from '../../components/MessageBox/AlertBox';
import LoadingBox from '../../components/LoadingBox';
import { getError } from '../../utils';
import { Store } from '../../Store';
import { AiOutlineEye, AiOutlineFilePdf } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { RiSurveyLine } from 'react-icons/ri';
import LoadingBox1 from '../../components/LoadingBox1';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, sitelist: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'UPDATE_STATUS_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_STATUS_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_STATUS_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

function SiteList() {
  const [{ loading, error, sitelist, loadingCreate, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      sitelist: [],
      loading: true,
      error: '',
    });

  // const [loading, setLoading] = useState(true);
  // const [site, setSite] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Simulate API call or data fetching
  //   const fetchData = () => {
  //     // Replace this with your actual data fetching logic
  //     // For demonstration purposes, we'll use a timeout
  //     setTimeout(() => {
  //       setSite(data.siteDetails);
  //       setLoading(false);
  //     }, 2000); // Simulating a 2-second delay
  //   };

  //   setLoading(true);
  //   fetchData();
  // }, []);

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/survey/sites');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.sitelist });
        // console.log(result.data);
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

  // ------------------------------------

  const { state } = useContext(Store);
  const { userInfo } = state;

  const createSitehandler = async () => {
    // if (window.confirm('Are you sure to create?')) {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/survey/sites',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('site created successfully');
      dispatch({ type: 'CREATE_SUCCESS' });
      navigate(`/editSite/${data.site._id}`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
    // }
  };

  // ---------------------------------------

  const filteredData = sitelist.filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.siteLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.plantCapacity.toLowerCase().includes(searchTerm.toLowerCase())
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

  const popupHandle = () => {
    setPopupOpen(!isPopupOpen);
  };

  // const createSitehandler = () => {
  //   popupHandle();
  //   toast.success('New Site Added Successfully', {
  //     position: 'bottom-right',
  //   });
  //   navigate(`/addNewSite`);
  // };

  const SiteStatusShowHandler = async (id) => {
    try {
      dispatch({ type: 'UPDATE_STATUS_REQUEST' });
      const { result } = await axios.put(
        `/api/survey/sites/hide/${id}`,
        { status: true },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('site hide successfully');
      dispatch({
        type: 'UPDATE_STATUS_SUCCESS',
        // payload: result.data.sitelist,
      });
      // navigate(`/sitelist`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'UPDATE_STATUS_FAIL',
      });
    }
  };

  const SiteStatusHideHandler = async (id) => {
    try {
      dispatch({ type: 'UPDATE_STATUS_REQUEST' });
      const { result } = await axios.put(
        `/api/survey/sites/hide/${id}`,
        { status: false },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      toast.success('site unhide successfully');
      dispatch({
        type: 'UPDATE_STATUS_SUCCESS',
        // payload: result.data.sitelist,
      });
      // console.log(id);
      // navigate(`/sitelist`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'UPDATE_STATUS_FAIL',
      });
    }
  };

  return (
    <div className="container">
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to add new site?</p>
            <div className="popup-buttons">
              <button
                className="popup-button verify"
                onClick={createSitehandler}
              >
                Add {loadingCreate && <LoadingBox4 />}
              </button>
              <button className="popup-button cancel" onClick={popupHandle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container ">
        <div className="heading d-flex justify-content-between">
          <nav
            style={{ '--bs-breadcrumb-divider': "'>'" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>{' '}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Site List
              </li>
            </ol>
          </nav>{' '}
        </div>
        <h2 className="text-center">All Site's</h2>

        <div className="form-group   mb-2 search-input">
          {userInfo.isAdmin && userInfo.isSuperAdmin ? (
            <Link
              className="edit-button bg-dark text-white p-1 fs-6"
              id="AddBtn"
              onClick={popupHandle}
            >
              {' '}
              New Site
            </Link>
          ) : (
            ''
          )}
          <input
            type="text"
            className="form-control search"
            placeholder="Search Site .."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <LoadingBox3 />
        ) : error ? (
          <AlertBox className="alert alert-danger">{error}</AlertBox>
        ) : (
          // <div className="d-flex flex-column justify-content-start align-items-start flex-wrap  p-1">
          // <table className="table table-bordered">

          <div className="">
            <table
              className="table table-bordered table-responsive "
              // style={{ overflowX: 'auto' }}
            >
              <thead>
                <tr>
                  <th className="col-md-1 text-center">Customer Logo</th>
                  <th className="col-md-2 text-center">Customer Name</th>
                  <th className="col-md-2 text-center">Project Code</th>
                  <th className="col-md-2 text-center">Site Location</th>
                  <th className="col-md-1 text-center">Plant Capacity</th>
                  <th className="col-md-1 text-center">Plant Layout</th>
                  <th className="col-md-1 text-center">View Surveys</th>

                  {userInfo.isAdmin && userInfo.isSuperAdmin ? (
                    <th className="col-md-1 text-center">Edit</th>
                  ) : (
                    ''
                  )}
                  {userInfo.isAdmin && userInfo.isSuperAdmin ? (
                    <th className="col-md-1 text-center">Status</th>
                  ) : (
                    ''
                  )}
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
                    {!userInfo.isVisitor || item.status === false ? (
                      <>
                        <td className="text-center">
                          <div className="table-image-container1">
                            <Link to={`/siteDetails/${item.projectCode}`}>
                              {' '}
                              <img
                                src={item.customerLogo}
                                alt="Profile"
                                className="table-image1"
                              />
                            </Link>
                          </div>
                        </td>
                        <td className="text-center">{item.customerName}</td>
                        <td className="text-center">{item.projectCode}</td>
                        <td className="text-center">{item.siteLocation}</td>
                        <td className="text-center">{item.plantCapacity}</td>
                        <td className="text-center">
                          <button className="edit-button">
                            {item.plantLayout ? (
                              <Link
                                className="text-decoration-none"
                                to={`/plantlayout/${item._id}`}
                              >
                                <AiOutlineFilePdf className="text-danger" />
                              </Link>
                            ) : (
                              <span className="fs-6">NA</span>
                            )}
                          </button>
                        </td>
                        <td className="text-center">
                          <button className="edit-button">
                            <Link
                              className="link"
                              to={`/siteDetails/${item.projectCode}`}
                            >
                              {' '}
                              <RiSurveyLine className="text-warning" />
                            </Link>
                          </button>
                        </td>
                      </>
                    ) : (
                      ''
                    )}

                    {userInfo.isAdmin && userInfo.isSuperAdmin ? (
                      <td>
                        <button className="edit-button">
                          <Link className="link" to={`/editSite/${item._id}`}>
                            {' '}
                            <LuEdit2 className="text-success fs-5" />
                          </Link>
                        </button>
                      </td>
                    ) : (
                      ''
                    )}

                    {userInfo.isAdmin && userInfo.isSuperAdmin ? (
                      <td>
                        {item.status ? (
                          <button
                            className="edit-button fs-5 "
                            onClick={() => SiteStatusHideHandler(item._id)}
                          >
                            {' '}
                            <span className="badge bg-none text-info fs-5">
                              <BiShowAlt />
                              {loadingUpdate && <LoadingBox4 />}
                            </span>
                          </button>
                        ) : (
                          <button
                            className="edit-button fs-5"
                            onClick={() => SiteStatusShowHandler(item._id)}
                          >
                            <span className="badge bg-none">
                              <i
                                className="fa fa-ban ms-1 text-danger "
                                style={{ cursor: 'pointer' }}
                              ></i>
                              {loadingUpdate && <LoadingBox4 />}
                            </span>{' '}
                          </button>
                        )}
                      </td>
                    ) : (
                      ''
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* {loading && filteredData.length === 0 && (
          <AlertBox className="alert alert-danger">{error}</AlertBox>
        )} */}

        {<LoadingBox1 /> && (
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
    </div>
  );
}

export default SiteList;
