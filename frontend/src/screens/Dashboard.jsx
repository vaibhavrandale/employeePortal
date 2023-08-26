import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../App.css';
import './dashboard.css';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import LoadingBox5 from '../components/LoadingBox/LoadingBox5';
import LoadingBox5White from '../components/LoadingBox/LoadingBox5White';
import { Helmet } from 'react-helmet';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, notices: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    // case 'ATTENDANCE_REQUEST':
    //   return { ...state, loadingUpdate: true };

    // case 'ATTENDANCE_SUCCESS':
    //   return {
    //     ...state,
    //     attendanceDetails: action.payload,
    //     loadingUpdate: false,
    //   };

    // case 'ATTENDANCE_FAIL':
    //   return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};
function Dashboard() {
  const [{ loading, error, notices }, dispatch] = useReducer(reducer, {
    notices: [],
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [isAttendanceLoggedin, setIsAttendanceLoggedin] = useState(
    !!state.attendance
  ); // Initialize based on context
  const [forceUpdate, setForceUpdate] = useState(0);

  // After login or logout:

  // function NoticeHome() {

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/notice`);
        // setForceUpdate((prev) => prev + 1);
        console.log(result);
        setIsAttendanceLoggedin(!!state.attendance);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.notices,
        });

        // Calculate remaining leaves based on fetched leave counts
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [state.attendance]);

  const latestNotice = notices[notices.length - 1];

  // const loginHandler = () => {
  //   toast.success('Logged in');
  // };

  const loginHandler = async (e) => {
    // e.preventDefault();

    // dispatch({ type: 'ATTENDANCE_REQUEST' });

    try {
      const { data } = await axios.post(
        `/api/employees/checkin/${userInfo._id}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      window.location.reload();
      dispatch({ type: 'ATTENDANCE_SUCCESS', payload: data.attendanceDetails });
      localStorage.setItem(
        'Attendence',
        JSON.stringify(data.attendanceDetails)
      );
      // const customMessage = data.message;

      toast.success('Login Successfull', {
        position: 'top-right',
      });

      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      // dispatch({ type: 'ATTENDANCE_FAIL' });
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault();

    // dispatch({ type: 'ATTENDANCE_REQUEST' });

    try {
      const { data } = await axios.post(
        `/api/employees/checkout/${userInfo._id}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);

      ctxDispatch({ type: 'ATTENDANCE_LOGOUT' });
      localStorage.removeItem('Attendence');

      // const customMessage = data.message;

      toast.success('Logout Successfull', {
        position: 'top-right',
      });

      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      // dispatch({ type: 'ATTENDANCE_FAIL' });
    }
  };

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    // Extracting date and time components
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed in JavaScript
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours() % 12 || 12); // Convert 24-hour format to 12-hour format
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const period = dateObj.getHours() >= 12 ? 'PM' : 'AM';

    return `${day}/${month}/${year} ${hours}.${minutes} ${period}`;
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const popupHandle = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className="container ">
      <span
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ overflow: 'hidden' }}
      >
        {state.attendance && state.attendance.loginTime ? (
          <>
            <button onClick={popupHandle} className="mb-2 punchinBtn">
              Logout
            </button>
            {isPopupOpen && (
              <div className="popup-container">
                <div className="popup">
                  <p>Are you sure you want to Logout?</p>
                  <div className="popup-buttons">
                    <button
                      className="popup-button verify"
                      onClick={logoutHandler}
                    >
                      YES
                    </button>
                    <button
                      className="popup-button cancel"
                      onClick={popupHandle}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            )}
            <p>
              Login:{' '}
              <div className="badge bg-success">
                {formatDate(state.attendance.loginTime)}
              </div>
            </p>
          </>
        ) : (
          <>
            <button onClick={loginHandler} className="mb-2 punchinBtn">
              Login
            </button>

            <p></p>
          </>
        )}
      </span>

      <div
        className=""
        style={{
          display: 'flex',

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {loading ? (
          <LoadingBox5 />
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
                    <Link
                      to="salary-Entry"
                      className="p-1 text-decoration-none"
                    >
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

              {/* {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
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
            )} */}

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

              {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
                <div className="col">
                  <div className="card border border-0 quicklikCard">
                    <Link
                      to="attendance-home-page"
                      className="p-1 text-decoration-none"
                    >
                      <img
                        src="/images/icons/attendance1.jpg"
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
                          Attendance
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {userInfo && userInfo.isAdmin && !userInfo.isVisitor && (
                <div className="col">
                  <div className="card border border-0 quicklikCard">
                    <Link to="/upcoming" className="p-1 text-decoration-none">
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
                          coming..
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {userInfo && userInfo.isAdmin && !userInfo.isVisitor && (
              <div className="marquee-container">
                {latestNotice && (
                  <div className="marquee-content">
                    New notice from {latestNotice.noticeBy} regarding{' '}
                    {latestNotice.title} on {latestNotice.date}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
