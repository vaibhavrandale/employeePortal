import React, { useContext, useEffect, useReducer, useState } from 'react';
import './Sitetable.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AlertBox from '../../components/MessageBox/AlertBox';
import { getError } from '../../utils';
import { Store } from '../../Store';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { BiShowAlt } from 'react-icons/bi';
import { RiSurveyLine } from 'react-icons/ri';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import { Helmet } from 'react-helmet';
import { MdDeleteOutline } from 'react-icons/md';

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

function SiteList() {
  const [
    {
      loading,
      error,
      sitelist,
      loadingCreate,
      loadingUpdate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    sitelist: [],
    loading: true,
    error: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isdeletePopupOpen, setdeletePopupOpen] = useState(false);

  const itemsPerPage = 10;
  const navigate = useNavigate();

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

      setTimeout(() => {}, 2000); // Simulating a 2-second delay
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

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
      console.log(result);
      toast.success('site hide successfully');
      dispatch({
        type: 'UPDATE_STATUS_SUCCESS',
        // payload: result.data.sitelist,
      });
      window.location.reload();
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
      window.location.reload();
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'UPDATE_STATUS_FAIL',
      });
    }
  };

  const popupDeleteHandle = () => {
    setdeletePopupOpen(!isdeletePopupOpen);
  };
  const saveSettings = async (settings) => {
    // Simulating a delay for API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Normally, here you would make an API call to save the settings
    // For the sake of this example, we're assuming it always succeeds

    return 'Success'; // Return a success message or data
  };

  const DeleteHandler = async (e, id) => {
    e.preventDefault();
    popupDeleteHandle();
    dispatch({
      type: 'DELETE_REQUEST',
    });

    try {
      const { data } = await axios.delete(
        `/api/survey/sites/${id}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'DELETE_SUCCESS',
        payload: data,
      });

      toast.promise(saveSettings({ action: 'approve', leaveId: id }), {
        position: 'top-right',
        loading: 'Processing...',
        success: <b>Site Deleted Successfully!</b>,
        error: <b>Could not Delete site data.</b>,
      });

      // navigate('/leaves-history');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'DELETE_FAIL' });
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
        <Helmet>
          <title>Site List</title>
        </Helmet>
        <div className="heading d-flex justify-content-between">
          <nav
            style={{ '--bs-breadcrumb-divider': "'>'" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item" style={{ fontSize: '20px' }}>
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>{' '}
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ fontSize: '20px' }}
              >
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
          <LoadingBox5 />
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

                  <th className="col-md-1 text-center">Delete</th>
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
                                style={{
                                  objectFit: 'contain',
                                  // mixBlendMode: 'color-burn',
                                }}
                              />
                            </Link>
                          </div>
                        </td>
                        <td className="text-center">{item.customerName}</td>
                        <td className="text-center">{item.projectCode}</td>
                        <td className="text-center">{item.siteLocation}</td>
                        <td className="text-center">{item.plantCapacity}</td>
                        <td className="text-center">
                          {' '}
                          <button className="edit-button">
                            {item.plantLayout ? (
                              <Link
                                className="text-decoration-none"
                                target="blank"
                                to={item.plantLayout}
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
                            <FiEdit className="text-success fs-5" />
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
                            </span>{' '}
                            {loadingUpdate && <LoadingBox4 />}
                          </button>
                        )}
                      </td>
                    ) : (
                      ''
                    )}
                    {userInfo.isSuperAdmin ? (
                      <td className="text-center  fs-4">
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
                    )}
                    {isdeletePopupOpen && (
                      <div className="popup-container">
                        <div className="popup">
                          <p>Are you sure you want to delete Site?</p>
                          <div className="popup-buttons">
                            <button
                              className="popup-button verify"
                              onClick={(e) => DeleteHandler(e, item._id)}
                            >
                              DELETE
                            </button>
                            <button
                              className="popup-button cancel"
                              onClick={popupHandle}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </div>
  );
}

export default SiteList;
