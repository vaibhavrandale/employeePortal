import React, { useEffect, useState, useReducer, useContext } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { HiShieldCheck } from 'react-icons/hi';
import * as XLSX from 'xlsx';
import './Sitetable.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import MsgBox from '../../components/MessageBox/MsgBox';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import { Helmet } from 'react-helmet';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        siteSurveys: action.payload,
      };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'VERIFY_REQUEST':
      return { ...state, loadingVerify: true };
    case 'VERIFY_SUCCESS':
      return { ...state, loadingVerify: false };
    case 'VERIFY_FAIL':
      return { ...state, loadingVerify: false };

    default:
      return state;
  }
};

function SiteTable({ projectCode }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, error, siteSurveys, loadingCreate, loadingVerify },
    dispatch,
  ] = useReducer(reducer, {
    siteSurveys: [], // Update the initial state to an empty object
    loading: true,
    error: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [createSurvey, setCreateSurvey] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/survey/sitesurveys/${projectCode}`
        );

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.siteSurveys });
        // console.log(latestRemark);
        // console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [projectCode]);
  // console.log(siteSurveys);
  const itemsPerPage = 10;
  // console.log(site);
  const filteredData = siteSurveys.filter(
    (item) =>
      item.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.row.toLowerCase().includes(searchTerm.toLowerCase())
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

  const downloadDataAsExcel = (siteSurveys, selectedColumns) => {
    // Extract only the selected columns from each site survey
    const filteredData = siteSurveys.map((survey) =>
      selectedColumns.reduce((obj, key) => {
        if (key in survey) {
          if (Array.isArray(survey[key])) {
            if (key === 'H') {
              // Join "H" array with a comma if its length is greater than one
              obj[key] =
                survey[key].length > 1
                  ? survey[key].join(', ')
                  : survey[key][0];
            } else if (key === 'htablex' || key === 'htabley') {
              // Handle "htablex" and "htabley" differently
              obj[key] =
                survey[key].length > 1
                  ? survey[key].join(', ')
                  : survey[key][0];
            } else {
              // Join other array fields with a comma
              obj[key] = survey[key].join(', ');
            }
          } else {
            // Regular single-value field
            obj[key] = survey[key];
          }
        }
        return obj;
      }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelFile = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'binary',
    });

    const buffer = new ArrayBuffer(excelFile.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelFile.length; i++) {
      view[i] = excelFile.charCodeAt(i) & 0xff;
    }

    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'siteSurveys.xlsx';
    downloadLink.click();
  };

  const handleDownloadButtonClick = () => {
    const specificData = siteSurveys.filter(
      (item) => item.projectCode === projectCode
    );

    if (specificData.length > 0) {
      const selectedColumns = [
        'projectCode',
        'block',
        'row',
        'table',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'htablex',
        'htabley',
        'submittedBy',
        'submittedAt',
        'verifiedBy',
        'verifiededAt',
        'remark',
        'remarkBy',
        'status',
      ];

      downloadDataAsExcel(specificData, selectedColumns);
    } else {
      toast.error('No site surveys found for export.', {
        position: 'bottom-right',
      });
    }
  };

  const createHandler = async (e) => {
    setCreateSurvey(!createSurvey);
  };

  const createSurveyHandler = async () => {
    navigate(`/newsurvey/${projectCode}`);
  };

  const popupHandle = (_id) => {
    setPopupOpen(!isPopupOpen);
    // handleVerify(_id);
  };

  const handleVerify = async (_id) => {
    popupHandle();

    try {
      dispatch({ type: 'VERIFY_REQUEST' });
      const { data } = await axios.put(
        `/api/survey/sitesurveys/verify/${_id}`,
        {
          status: true,
          verifiedBy: userInfo.name,
          verifiedAt: new Date(),
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('Verified successfully');
      dispatch({ type: 'VERIFY_SUCCESS', payload: data.siteSurveys });
      console.log(data);
      navigate(`/survey/${_id}`);
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
      dispatch({
        type: 'VERIFY_FAIL',
      });
    }
  };
  return (
    <>
      {createSurvey && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to to create new Survey?</p>
            <div className="popup-buttons">
              <button
                className="popup-button verify"
                onClick={createSurveyHandler}
              >
                Yes{loadingCreate && <LoadingBox4 />}
              </button>
              <button className="popup-button cancel" onClick={createHandler}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-3">
        {loading ? (
          <LoadingBox5 />
        ) : error ? (
          <MsgBox className="alert alert-danger">{error}</MsgBox>
        ) : (
          <>
            <div className="form-group   mb-2 search-input">
              <Link
                id="AddBtn"
                className="bg-dark text-white m-1"
                onClick={createHandler}
              >
                New Survey
              </Link>
              <Link
                id="AddBtn"
                className="bg-success text-white m-1"
                onClick={handleDownloadButtonClick}
              >
                Export
              </Link>
              <input
                type="text"
                className="form-control search"
                placeholder="Search Location.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="table table-bordered ">
              {/* <table className="table table-bordered "> */}
              <thead>
                <tr>
                  <th className="col-md-1 text-center">Block </th>
                  <th className="col-md-1 text-center">Row </th>
                  <th className="col-md-1 text-center">Table </th>
                  <th className="col-md-2 text-center">Submitted By </th>

                  <th className="col-md-1 text-center">Status </th>
                  <th className="col-md-2 text-center">Remark </th>
                  <th className="col-md-2 text-center">Remark By </th>
                  <th className="col-md-1 text-center">View </th>
                  <th className="col-md-1 text-center">Edit </th>
                  {userInfo.isAdmin && userInfo.isSuperAdmin ? (
                    <th className="col-md-2 text-center">verify </th>
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
                    <td className=" d-flex justify-content-center align-items-center">
                      {item.block}
                    </td>
                    <td className="text-center">{item.row}</td>
                    <td className="text-center">{item.table}</td>
                    <td className="text-center">{item.submittedBy}</td>
                    <td className="text-center">
                      {item.status === true ? (
                        <span className="badge bg-success">Verified</span>
                      ) : (
                        <span className="badge bg-danger">Pending</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.reviews &&
                      item.reviews.length > 0 &&
                      item.reviews[item.reviews.length - 1].remark !== '' ? (
                        <span>
                          {item.reviews[item.reviews.length - 1].remark}
                        </span>
                      ) : (
                        <span className="badge bg-danger">Pending</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.reviews &&
                      item.reviews.length > 0 &&
                      item.reviews[item.reviews.length - 1].remarkBy !== '' ? (
                        <span>
                          {item.reviews[item.reviews.length - 1].remarkBy}
                        </span>
                      ) : (
                        <span className="badge bg-danger">Pending</span>
                      )}
                    </td>
                    <td className="text-center">
                      <button className="edit-button">
                        <Link
                          className="fs-5 "
                          to={`/survey/${item._id}`}
                          style={{ color: 'blue' }}
                        >
                          <AiOutlineEye />
                        </Link>
                      </button>
                    </td>
                    <td className="text-center">
                      {!userInfo.isSuperAdmin && item.status ? (
                        <button className="edit-button" disabled>
                          <BiEdit style={{ color: 'black' }} className="fs-5" />
                        </button>
                      ) : (
                        <button className="edit-button">
                          <Link
                            className="fs-5"
                            to={`/editSurvey/${item._id}`}
                            style={{ color: 'blue' }}
                          >
                            {' '}
                            <BiEdit />
                          </Link>
                        </button>
                      )}
                    </td>

                    {userInfo.isAdmin && userInfo.isSuperAdmin ? (
                      <td className="text-center">
                        {item.status === false ? (
                          <button
                            className=" edit-button fs-5 pt-1 link"
                            style={{ color: 'blue' }}
                            // onClick={popupHandle(item._id)}
                            onClick={() => popupHandle(item._id, item.surveyId)}
                            disabled={
                              !userInfo.isAdmin || !userInfo.isSuperAdmin
                            } // Add the check here
                          >
                            <HiShieldCheck />
                          </button>
                        ) : (
                          <button
                            className=" edit-button fs-5 pt-1 link"
                            disabled
                            style={{ color: 'green' }}
                          >
                            <HiShieldCheck />
                          </button>
                        )}

                        {isPopupOpen && (
                          <div className="popup-container">
                            <div className="popup">
                              <p>Are you sure you want to Verify?</p>
                              <div className="popup-buttons">
                                <button
                                  className="popup-button verify"
                                  onClick={() => handleVerify(item._id)}
                                >
                                  Verify {loadingVerify && <LoadingBox3 />}
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
                      </td>
                    ) : (
                      ''
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {/* {<LoadingBox /> && filteredData.length === 0 && (
        <p className="text-center">No results found.</p>
      )} */}
        {<LoadingBox3 /> && (
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
    </>
  );
}

export default SiteTable;
