import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../App.css';
import './dashboard.css';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import LoadingBox5 from '../components/LoadingBox/LoadingBox5';
import LoadingBox5White from '../components/LoadingBox/LoadingBox5White';
import { Helmet } from 'react-helmet';
import { getError } from '../utils';
import { AiOutlineSend } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
// import img from './Vaibhav_Randale.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingBox4 from '../components/LoadingBox/LoadingBox4';
import { differenceInMonths } from 'date-fns';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, notices: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_BIRTHDAY_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_BIRTHDAY_SUCCESS':
      return { ...state, birthdayData: action.payload, loading: false };

    case 'FETCH_BIRTHDAY_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };

    case 'CREATE_SUCCESS':
      return { ...state, wish: action.payload, loadingCreate: false };

    case 'CREATE_FAIL':
      return { ...state, error: action.payload, loadingCreate: false };

    default:
      return state;
  }
};
function Dashboard() {
  const [{ loading, error, notices, loadingCreate, birthdayData }, dispatch] =
    useReducer(reducer, {
      notices: [],
      birthdayData: [],
      loading: true,
      error: '',
    });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [isAttendanceLoggedin, setIsAttendanceLoggedin] = useState(
    !!state.attendance
  );

  const navigate = useNavigate();

  const [birthdayEmployees, setBirthdayEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeWishes, setSelectedEmployeeWishes] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [birthdayBoyId, setbirthdayBoyId] = useState('');
  const [wishername, setwishername] = useState(userInfo.name);
  const [wisher_employee_id, setwisher_employee_id] = useState(
    userInfo.employee_id
  );
  const [wisher_email, setwisher_email] = useState(userInfo.email);
  const [wish, setWish] = useState('');
  const [wisher_image, setwisher_image] = useState(userInfo.profileImage);

  const [isInputDisabled, setInputDisabled] = useState(false);

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
    const fetchBirthdayData = async () => {
      try {
        const response = await axios.get('/api/employees/birthday-check');
        const birthdayData = response.data;
        console.log(response.data);
        if (birthdayData && birthdayData.length > 0) {
          setBirthdayEmployees(birthdayData);
        }
      } catch (error) {
        console.error('Error fetching birthday data:', error);
      }
    };

    fetchBirthdayData();
  }, [state.attendance]);

  const latestNotice = notices[notices.length - 1];
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    afterChange: (current) => setCurrentSlide(current),
  };
  const NewDate = new Date();

  const Year = NewDate.getFullYear();
  const Month = NewDate.getMonth() + 1; // Note that months are zero-based (January is 0, February is 1, etc.)
  const ToDay = NewDate.getDate();
  const loginHandler = async (e) => {
    try {
      // const { data } = await axios.post(
      //   `/api/employees/checkin/${userInfo._id}`,
      const { data } = await axios.post(
        `/api/attendence/checkin/${Year}/${Month}/${ToDay}/${userInfo._id}`,

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
        position: 'top-center',
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
        `/api/attendence/checkout/${Year}/${Month}/${ToDay}/${userInfo._id}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);

      ctxDispatch({ type: 'ATTENDANCE_LOGOUT' });
      localStorage.removeItem('Attendence');

      // const customMessage = data.message;

      toast.success('Logout Successfull', {
        position: 'top-center',
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

  const WishHandler = async (e, id) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    const missingFields = [];

    if (!wish) {
      missingFields.push('Please Enter wish');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`, {
        position: 'top-center',
      });
      return;
    }

    try {
      const { data } = await axios.post(`/api/employees/post-wish`, {
        birthdayBoyId: id,
        wishername,
        wisher_employee_id,
        wisher_email,
        wish,
        wisher_image,
      });
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      setWish('');
      setInputDisabled(true);
      toast.success('Wish Posted successfully', {
        position: 'top-center',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-center',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const today = new Date();
  const currentMonth = today.getMonth() + 1; // January is 0, so add 1
  const currentDate = today.getDate();

  // Filter employees whose birthday matches the current date and month
  const birthdayEmployeesToday = birthdayEmployees.filter((employee) => {
    const birthdateParts = employee.birthday_date.split('/'); // Split date by '/'
    const birthMonth = parseInt(birthdateParts[1], 10); // Convert to integer
    const birthDate = parseInt(birthdateParts[0], 10); // Convert to integer
    return birthMonth === currentMonth && birthDate === currentDate;
  });

  const joiningDate = userInfo.joiningDate; // Assuming you have the joiningDate in a suitable format
  console.log(joiningDate);

  const formatDate2 = (dateStr) => {
    const dateObj = new Date(dateStr);

    // Extracting date and time components
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed in JavaScript
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const Today = formatDate2(new Date());

  console.log(Today);

  // const timeDifference = Today - joiningDate;
  const monthsDifference =
    (today.getFullYear() - new Date(joiningDate).getFullYear()) * 12 +
    (today.getMonth() - new Date(joiningDate).getMonth());

  console.log(`Today's date: ${Today}`);
  console.log(`Joining date: ${joiningDate}`);
  console.log(`Difference in months: ${monthsDifference}`);

  const limitMonth = 6;
  // const showLeavesLink = true;
  return (
    <div className=" container">
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
        className="  p-2"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
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
          <>
            {birthdayEmployeesToday.length > 0 &&
            birthdayEmployees.length > 0 ? (
              <div
                style={{
                  height: 'auto',
                  width: '280px',
                  margin: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
                className=""
              >
                <Slider {...settings}>
                  {birthdayEmployees.map((employee) => (
                    <div className="birthday-card" key={employee._id}>
                      {userInfo.email === employee.birthday_boy_email ? (
                        <Link
                          to={`/wishes/${employee.birthday_boy_employee_id}`}
                          className="top-right-link"
                        >
                          <BiTimeFive />
                        </Link>
                      ) : (
                        ''
                      )}
                      <p className="birthday-message">
                        Happy Birthday!
                        <br />
                        <span className="birthday-name text-dark">
                          {employee.birthday_boy}
                        </span>
                      </p>
                      <div className="birthday_image_container">
                        <img
                          src={employee.birthday_boy_image}
                          alt="Birthday Cake"
                          className="birthday-image"
                        />
                      </div>
                      <form>
                        <p className="footer-text">
                          Best wishes on your special day! <br />
                          <span className="text-success fw-bold">
                            {employee.birthday_date}
                          </span>
                          <br />
                          <span className="msgContainer d-flex m-1">
                            <input
                              type="text"
                              className="msgBox"
                              value={wish}
                              required
                              onChange={(e) => setWish(e.target.value)}
                              placeholder={`Wish ${employee.birthday_boy.toLowerCase()}...`}
                            />
                            <button
                              className="Submit"
                              onClick={(e) => WishHandler(e, employee._id)}
                            >
                              {loadingCreate ? (
                                <LoadingBox4 />
                              ) : (
                                <AiOutlineSend />
                              )}
                            </button>
                          </span>
                        </p>
                      </form>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              ''
            )}

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
                {userInfo &&
                  !userInfo.isVisitor &&
                  (monthsDifference >= limitMonth ? (
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
                  ) : (
                    ''
                  ))}

                {/* {userInfo && !userInfo.isVisitor && (
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
                )} */}
                {userInfo && !userInfo.isVisitor && (
                  <div className="col">
                    <div className="card border border-0 quicklikCard">
                      <Link
                        to={`/myattendance/${userInfo._id}`}
                        className="p-1 text-decoration-none"
                      >
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
                            My Timeline
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}

                {/* {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
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
                )} */}
                {userInfo && !userInfo.isVisitor && (
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
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
