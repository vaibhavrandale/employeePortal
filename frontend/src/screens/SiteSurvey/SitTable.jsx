import React, { useEffect, useState, useReducer } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
// import { BiEdit } from 'react-icons/bi';
// import data from '../Employee/data'; // Assuming data.js is in the same directory
import { BiEdit } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { HiShieldCheck } from 'react-icons/hi';
import * as XLSX from 'xlsx';
import './Sitetable.css';
import { toast } from 'react-hot-toast';
import LoadingBox from '../../components/LoadingBox';
// import logger from 'use-reducer-logger';
import axios from 'axios';
import AlertBox from '../../components/MessageBox/AlertBox';

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

    default:
      return state;
  }
};

function SiteTable({ projectCode }) {
  const [{ loading, error, siteSurveys }, dispatch] = useReducer(reducer, {
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

        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [projectCode]);

  const itemsPerPage = 10;
  // console.log(site);
  const filteredData = siteSurveys.filter(
    (item) =>
      item.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.table.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const downloadDataAsExcel = (siteSurveys) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    const headerStyle = {
      fill: {
        fgColor: { rgb: 'FFFF00' }, // Yellow background color
      },
      font: {
        bold: true, // Bold font
      },
    };

    const worksheet = XLSX.utils.json_to_sheet(siteSurveys, { headerStyle });
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
    downloadLink.download = `${projectCode}.xlsx`;
    downloadLink.click();
  };

  const handleDownloadButtonClick = () => {
    const specificData = siteSurveys.filter(
      (item) => item.projectCode === projectCode
    );
    downloadDataAsExcel(specificData);
  };

  const createHandler = async (e) => {
    setCreateSurvey(!createSurvey);
  };

  const createSurveyHandler = async () => {
    toast.success('New Survey Created successfully', {
      position: 'bottom-right',
    });
    createHandler();

    navigate(`/newSurvey/${projectCode}`);
  };

  const popupHandle = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleVerify = () => {
    popupHandle();
    toast.success('Verified successfully', {
      position: 'bottom-right',
    });
  };

  return (
    <div className="container">
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to Verify?</p>
            <div className="popup-buttons">
              <button className="popup-button verify" onClick={handleVerify}>
                Verify
              </button>
              <button className="popup-button cancel" onClick={popupHandle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {createSurvey && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to to create new Survey?</p>
            <div className="popup-buttons">
              <button
                className="popup-button verify"
                onClick={createSurveyHandler}
              >
                Yes
              </button>
              <button className="popup-button cancel" onClick={createHandler}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <AlertBox className="alert alert-danger">{error}</AlertBox>
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
            <thead>
              <tr>
                <th className="col-md-2 text-center">Block </th>
                <th className="col-md-2 text-center">Table </th>
                <th className="col-md-2 text-center">Row </th>

                <th className="col-md-2 text-center">Status </th>
                <th className="col-md-2 text-center">Remark </th>
                <th className="col-md-2 text-center">Remark By </th>
                <th className="col-md-1 text-center">View </th>
                <th className="col-md-1 text-center">Edit </th>
                <th className="col-md-2 text-center">verify </th>
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
                  <td className="text-center">{item.block}</td>
                  <td className="text-center">{item.table}</td>
                  <td className="text-center">{item.row}</td>

                  <td className="text-center">
                    {item.status === true ? (
                      <span className="badge bg-success">Verified</span>
                    ) : (
                      <span className="badge bg-danger">Pending</span>
                    )}
                  </td>
                  <td className="text-center">
                    {item.remark !== '' ? (
                      <span className="">{item.remark}</span>
                    ) : (
                      <span className="badge bg-danger">Pending</span>
                    )}
                  </td>
                  <td className="text-center">
                    {item.remarkBy !== '' ? (
                      <span className="">{item.remarkBy}</span>
                    ) : (
                      <span className="badge bg-danger">Pending</span>
                    )}
                  </td>

                  <td className="text-center">
                    <Link
                      className="fs-5"
                      to={`/survey/${projectCode}/${item.surveyId}`}
                      style={{ color: 'blue' }}
                    >
                      <AiOutlineEye />
                    </Link>
                  </td>

                  <td className="text-center">
                    <button className="edit-button">
                      <Link
                        className="fs-5 "
                        to={`/editSiteDetails/${item.surveyId}`}
                        style={{ color: 'blue' }}
                      >
                        {' '}
                        <BiEdit />
                      </Link>
                    </button>
                  </td>

                  <td className="text-center">
                    <button
                      className=" edit-button fs-5 pt-1 link"
                      style={{ color: 'blue' }}
                      onClick={popupHandle}
                    >
                      <HiShieldCheck />
                    </button>
                  </td>
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

export default SiteTable;
