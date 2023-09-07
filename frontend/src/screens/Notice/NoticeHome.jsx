import React, { useContext, useEffect, useReducer, useState } from 'react';
import './notice.css';
import { Link } from 'react-router-dom';
import { Element, scroller } from 'react-scroll'; // Import Element
import axios from 'axios';
import MsgBox from '../../components/MessageBox/MsgBox';
import logo from '../Signin/Taypro.png';
import { Store } from '../../Store';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, notices: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};

function NoticeHome() {
  const [{ loading, error, notices, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      notices: [],
      loading: true,
      error: '',
    });
  // const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupNoticeId, setPopupNoticeId] = useState(null);

  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/notice`);
        console.log(result);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.notices,
        });

        // Calculate remaining leaves based on fetched leave counts
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      setTimeout(() => {
        // setEmployees(result.data);
        // setLoading(false);
      }, 2000); // Simulating a 2-second delay
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const [searchTerm, setSearchTerm] = useState(''); // Add state for searchTerm

  // Filter notices based on the searchTerm
  const filteredNotices = notices.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popupHandle = (id) => {
    if (popupNoticeId === id) {
      setPopupNoticeId(null);
    } else {
      setPopupNoticeId(id);
    }
  };

  const deleteHandler = async (_id) => {
    setPopupNoticeId(null);
    // if (window.confirm('Are you sure to delete?')) {
    try {
      await axios.delete(`/api/notice/${_id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success('notice deleted successfully');
      dispatch({
        type: 'DELETE_SUCCESS',
      });
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'DELETE_FAIL',
      });
    }
    // }
  };

  return (
    <div className="container" style={{ overflow: 'hidden' }}>
      <div className="mb-3 d-flex justify-content-end "></div>
      <div className="m-5 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center">NOTICES</h3>
        <input
          type="search"
          name=""
          id=""
          placeholder="search notice.."
          style={{ width: '250px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
        {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
          <Link
            className="btn btn-sm btn-warning mt-2"
            to="/new-notice"
            style={{ width: '250px' }}
          >
            Post Notice
          </Link>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-start flex-wrap">
        {loading ? (
          <LoadingBox5 />
        ) : filteredNotices.length === 0 ? (
          <MsgBox className="alert alert-danger">No Notice Found</MsgBox>
        ) : (
          filteredNotices
            .slice(0)
            .reverse()
            .map((item, index) => (
              <Element
                name={`card-${index}`}
                key={index}
                onEnter={() =>
                  scroller.scrollTo(`card-${index}`, { duration: 0 })
                }
              >
                <div
                  className="card mx-2 my-2 animated" // Add 'animated' class
                  style={{
                    width: '18rem',
                    minHeight: '285px',
                    animationDelay: `${index * 0.1}s`, // Delay animation for each card
                  }}
                >
                  <img
                    src={logo}
                    className="card-img-top"
                    alt="..."
                    style={{
                      height: '50px',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'start',
                      objectFit: 'contain',
                    }}
                  />{' '}
                  <hr />
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">
                      {item.title}
                    </h5>
                    <p
                      className="card-text text-muted"
                      style={{ fontSize: '16px' }}
                    >
                      posted on-{' '}
                      {new Date(item.createdAt).toString().substring(0, 16)}
                    </p>
                    <p className="card-text">{item.subject}</p>
                    <hr />
                    <Link
                      to={`/notice/${item._id}`}
                      className="viewBtn text-decoration-none"
                    >
                      <AiOutlineEye />
                    </Link>
                    <Link
                      to={`/edit-notice/${item._id}`}
                      className="editBtn text-decoration-none"
                    >
                      <FiEdit />
                    </Link>
                    <Link
                      onClick={() => popupHandle(item._id)}
                      // to={`/notice/${item._id}`}
                      className="deleteBtn   text-danger text-decoration-none"
                    >
                      <MdDeleteOutline />
                    </Link>
                  </div>
                </div>{' '}
                {popupNoticeId === item._id && (
                  <div className="popup-container">
                    <div className="popup">
                      <p>Are you sure you want delete?</p>
                      <div className="popup-buttons">
                        <button
                          className="popup-button verify"
                          onClick={() => deleteHandler(item._id)}
                        >
                          {loadingDelete ? <LoadingBox3 /> : 'Delete'}
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
              </Element>
            ))
        )}
      </div>{' '}
    </div>
  );
}

export default NoticeHome;
