import React, { useContext, useEffect, useReducer } from 'react';
import '../App.css';
// import Banner from '../components/Banner/Banner';
// import VideoSection from '../components/Videosection/VideoSection';
// import logo from './salarySleep/Taypro.png';
import './dashboard.css';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import { SlCalender } from 'react-icons/sl';
import axios from 'axios';
import LoadingBox2 from '../components/LoadingBox/LoadingBox2';

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
function Dashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  // function NoticeHome() {
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

  const latestNotice = notices[notices.length - 1];

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <LoadingBox2 />
      ) : (
        <div
          className=" row  col-6 m-1 pb-3 border  "
          style={{ display: 'grid', placeItems: 'center' }}
        >
          <span className="bg-dark text-light ">Quick Links</span>
          <div className="row row-cols-1 row-cols-md-4 g-2">
            {userInfo && userInfo.isAccountant && (
              <div className="col">
                <div
                  className="card border border-0 quicklikCard"
                  id="quicklikCard"
                >
                  <Link to="employees" className="p-1 text-decoration-none">
                    <img
                      src="/images/icons/employee.png"
                      height={50}
                      width={100}
                      alt=""
                      style={{ objectFit: 'contain' }}
                      className="card-img-top quicklikCardImg rounded-circle"
                    />
                    {/* <span className='card-img-top'></span> */}
                    <div className="card-body text-center">
                      <span
                        className="card-title  "
                        style={{ color: '#2749f5', fontWeight: '500' }}
                      >
                        Employees
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            <div className="col">
              <div className="card border border-0 quicklikCard">
                <Link to="sitelist" className="p-1 text-decoration-none">
                  <img
                    src="/images/icons/survey.png"
                    className="card-img-top quicklikCardImg"
                    height={50}
                    style={{ objectFit: 'contain' }}
                    alt="..."
                  />
                  <div className="card-body text-center ">
                    <span
                      className="card-title"
                      style={{ color: '#2749f5', fontWeight: '500' }}
                    >
                      {' '}
                      Survey
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            {userInfo && !userInfo.isVisitor && (
              <div className="col">
                <div className="card border border-0 quicklikCard">
                  <Link
                    to="leaves-history"
                    className="p-1 text-decoration-none"
                  >
                    <img
                      src="/images/icons/leaves.png"
                      height={50}
                      style={{ objectFit: 'contain' }}
                      className="card-img-top quicklikCardImg"
                      alt="i"
                    />
                    <div className="card-body text-center">
                      <span
                        className="card-title"
                        style={{ color: '#2749f5', fontWeight: '500' }}
                      >
                        leaves
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {userInfo && !userInfo.isVisitor && (
              <div className="col">
                <div className="card border border-0 quicklikCard">
                  <Link to="pay-sleep" className="p-1 text-decoration-none">
                    <img
                      src="/images/icons/slip.png"
                      height={50}
                      style={{ objectFit: 'contain' }}
                      className="card-img-top quicklikCardImg"
                      alt="i"
                    />
                    <div className="card-body text-center">
                      <span
                        className="card-title"
                        style={{ color: '#2749f5', fontWeight: '500' }}
                      >
                        Pay Slip
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ---------------------2nd row ---------------------- */}
          <div className="row row-cols-1 row-cols-md-4 g-2">
            {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
              <div className="col">
                <div className="card border border-0 quicklikCard">
                  <Link to="salary-Entry" className="p-1 text-decoration-none">
                    <img
                      src="/images/icons/salary.jpg"
                      height={50}
                      style={{ objectFit: 'contain' }}
                      className="card-img-top quicklikCardImg"
                      alt="i"
                    />
                    <div className="card-body text-center">
                      <span
                        className="card-title "
                        style={{ color: '#2749f5', fontWeight: '500' }}
                      >
                        Entry
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
              <div className="col">
                <div className="card border border-0 quicklikCard">
                  <Link to="calendar" className="p-1 text-decoration-none">
                    <img
                      src="/images/icons/calendar.png"
                      height={50}
                      style={{ objectFit: 'contain', background: '' }}
                      className="card-img-top quicklikCardImg"
                      alt="i"
                    />
                    <div className="card-body text-center">
                      <span
                        className="card-title "
                        style={{ color: '#2749f5', fontWeight: '500' }}
                      >
                        Calendar
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
              <div className="col">
                <div className="card border border-0 quicklikCard">
                  <Link
                    to="notice-home-page"
                    className="p-1 text-decoration-none"
                  >
                    <img
                      src="/images/icons/notice.png"
                      height={50}
                      style={{ objectFit: 'contain', background: '' }}
                      className="card-img-top quicklikCardImg"
                      alt="i"
                    />
                    <div className="card-body text-center">
                      <span
                        className="card-title "
                        style={{ color: '#2749f5', fontWeight: '500' }}
                      >
                        Notice's
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {userInfo && userInfo.isAdmin && !userInfo.isVisitor && (
              <div className="col">
                <div className="card border border-0 quicklikCard">
                  <Link to="" className="p-1 text-decoration-none">
                    <img
                      src="/images/icons/soon_watch.png"
                      height={50}
                      style={{ objectFit: 'contain' }}
                      className="card-img-top quicklikCardImg"
                      alt="i"
                    />
                    <div className="card-body text-center">
                      <span
                        className="card-title"
                        style={{ color: '#2749f5', fontWeight: '500' }}
                      >
                        comming..
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="marquee-container">
            {latestNotice && (
              <div className="marquee-content">
                New notice from {latestNotice.noticeBy} regarding{' '}
                {latestNotice.title} on {latestNotice.date}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2nd row--------------------------- */}
      {/* <LoadingBox4 /> */}
    </div>
  );
}

export default Dashboard;
