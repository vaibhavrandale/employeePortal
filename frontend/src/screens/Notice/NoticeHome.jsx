import React, { useEffect, useReducer, useState } from 'react';
import './notice.css';
import { Link } from 'react-router-dom';
// import notice from './notice';
import LoadingBox2 from '../../components/LoadingBox/LoadingBox2';
import { Element, scroller } from 'react-scroll'; // Import Element
import axios from 'axios';
import MsgBox from '../../components/MessageBox/MsgBox';
import logo from '../Signin/Taypro.png';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, notices: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function NoticeHome() {
  const [{ loading, error, notices }, dispatch] = useReducer(reducer, {
    notices: [],
    loading: true,
    error: '',
  });

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

    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState(''); // Add state for searchTerm

  // Filter notices based on the searchTerm
  const filteredNotices = notices.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const [loading, setIsLoading] = useState(true); // Add loading state

  // useEffect(() => {
  //   // Simulating a data fetch with a timeout
  //   setTimeout(() => {
  //    // Set loading to false after data is fetched
  //   }, 1000); // For example, after 1 second
  // }, []);

  function noNotice() {
    if (notices.length === 0) {
      <div className="alert alert-danger">No Notices Found</div>;
    }
  }
  return (
    <div className="container">
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
        <Link
          className="btn btn-sm btn-warning mt-2"
          to="/new-notice"
          style={{ width: '250px' }}
        >
          Post Notice
        </Link>
      </div>
      <div className="d-flex justify-content-center align-items-start flex-wrap">
        {loading ? (
          <LoadingBox2 />
        ) : filteredNotices.length === 0 ? (
          <MsgBox className="alert alert-danger">No Notice Found</MsgBox>
        ) : (
          filteredNotices
            .slice(0)
            .reverse()
            .map((item, index) => (
              <Element
                name={`card-${index}`}
                onEnter={() =>
                  scroller.scrollTo(`card-${index}`, { duration: 0 })
                }
              >
                <div
                  className="card mx-2 my-2 animated" // Add 'animated' class
                  style={{
                    width: '18rem',
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
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">
                      {item.title}
                    </h5>
                    <p className="card-text">{item.date}</p>
                    <p className="card-text">{item.description}</p>
                    <Link
                      to={`/notice/${item._id}`}
                      className="btn btn-sm btn-primary text-decoration-none"
                    >
                      View
                    </Link>
                  </div>
                </div>{' '}
              </Element>
            ))
        )}
      </div>{' '}
    </div>
  );
}

export default NoticeHome;
