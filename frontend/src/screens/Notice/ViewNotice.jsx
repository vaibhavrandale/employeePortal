import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
// import notice from './notice';
import axios from 'axios';
import LoadingBox2 from '../../components/LoadingBox/LoadingBox2';
import logo from './survey.png';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, notice: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function ViewNotice() {
  const { id } = useParams();
  const [{ loading, error, notice }, dispatch] = useReducer(reducer, {
    notice: {},
    loading: true,
    error: '',
  });

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/notice/${id}`);
        console.log(result);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.notice,
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
  }, [id]);

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
            <Link
              className="text-decoration-none"
              to={'/notice-home-page'}
              // onClick={historyHandler}
            >
              All Notices
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Notice Details -<span className="text-danger">{notice.title}</span>
          </li>
        </ol>
      </nav>{' '}
      {loading ? (
        <LoadingBox2 />
      ) : (
        <div className="notice-container">
          <div className="notice-header">
            <h2 className="text-uppercase fw-bold text-primary">
              {notice.title}
            </h2>
            <div className="notice-subject">
              <strong>Date:</strong>{' '}
              <span className="text-success"> {notice.date}</span>
            </div>
            <hr />
          </div>
          <div className="notice-body">
            {notice.subject ? (
              <p>
                <span className="text-danger">Subject</span> :&nbsp;
                {notice.subject}
              </p>
            ) : (
              ''
            )}
            <p>{notice.description}</p>

            {/* <h6>
              <b> Highlighted Points</b>
            </h6> */}
            {notice.highlightPoints.length === 0 ? (
              <div className="attachment-container m-1">
                {notice.highlightPoints.map((item, index) => (
                  <div className="highlight-item " key={index}>
                    <ul
                      style={{
                        listStyleType:
                          notice.highlightPoints.length === 0
                            ? 'square'
                            : 'none',
                      }}
                    >
                      <li>{item}</li>
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="notice-footer">
            <div className="footer-content  ">
              <br />
              <span>Best Regards,</span>
              <br />
              <span>{notice.noticeBy},</span>
              <br />
              <span>TAYPRO PRIVATE LIMITED</span>
              <br />
              <span>
                <b>We make green energy greener!!</b>
              </span>
              <br />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewNotice;
