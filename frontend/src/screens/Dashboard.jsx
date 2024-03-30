import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../App.css';
import './dashboard.css';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import LoadingBox5 from '../components/LoadingBox/LoadingBox5';
import { Helmet } from 'react-helmet';
import { getError } from '../utils';
// import img from './Vaibhav_Randale.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingBox4 from '../components/LoadingBox/LoadingBox4';

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

    case 'FETCH_ATTENDANCE_REQUEST':
      return { ...state, loadingAttendance: true, successAttendance: false };

    case 'FETCH_ATTENDANCE_SUCCESS':
      return {
        ...state,
        attendance: action.payload,
        loadingAttendance: false,
        successAttendance: true,
      };

    case 'FETCH_ATTENDANCE_FAIL':
      return {
        ...state,
        loadingAttendance: false,
        error: action.payload,
        successAttendance: false,
      };

    case 'ENTRY_EXIT_RESET':
      return { ...state, loadingAttendance: false, successAttendance: false };
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
  const [
    {
      loading,
      notices,

      loadingAttendance,
      successAttendance,
    },
    dispatch,
  ] = useReducer(reducer, {
    notices: [],
    attendance: [],
    birthdayData: [],
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [isAttendanceLoggedin, setIsAttendanceLoggedin] = useState(
    !!state.attendance
  );

  const [birthdayEmployees, setBirthdayEmployees] = useState([]);
  const [AnnivarsaryEmployees, setAnnivarsaryEmployees] = useState([]);
  const [AttendanceResponse, setAttendanceResponse] = useState({
    IN_TIME_1: null,
    IN_TIME_2: null,
    IN_TIME_3: null,
    OUT_TIME_1: null,
    OUT_TIME_2: null,
    OUT_TIME_3: null,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [LoginAccessStatus, setLoginAccessStatus] = useState(0);

  var todayDate = new Date();

  // Get the current date, month, and year
  const day = todayDate.getDate();
  const month = todayDate.getMonth() + 1; // Note: Months are zero-based, so we add 1
  const year = todayDate.getFullYear();
  const hours = todayDate.getHours().toString().padStart(2, '0');
  const minutes = todayDate.getMinutes().toString().padStart(2, '0');
  const seconds = todayDate.getSeconds().toString().padStart(2, '0');

  useEffect(() => {
    // Simulate API call or data fetching

    const LoginStatusData = async () => {
      dispatch({ type: 'ACCESS_REQUEST' });
      try {
        const accessresult = await axios.get(`/api/access/2`);
        console.log(accessresult.data);
        dispatch({
          type: 'ACCESS_SUCCESS',
        });

        setLoginAccessStatus(accessresult.data.access.status);
      } catch (err) {
        dispatch({ type: 'ACCESS_FAIL', payload: err.message });
      }
    };

    LoginStatusData();

    const fetchNoticeData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/notice`);
        // setForceUpdate((prev) => prev + 1);
        console.log(result);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.notices,
        });

        // Calculate remaining leaves based on fetched leave counts
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchNoticeData();

    const fetchBirthdayData = async () => {
      try {
        const response = await axios.get('/api/employees/birthday-check');
        const birthdayData = response.data;
        console.log(response.data);
        if (birthdayData && birthdayData.length > 0) {
          setBirthdayEmployees(birthdayData);
        }

        const Annivarsaryresponse = await axios.get(
          '/api/employees/anniversary-check'
        );
        const AnnivarsaryData = Annivarsaryresponse.data;
        console.log(Annivarsaryresponse.data);
        if (AnnivarsaryData && AnnivarsaryData.length > 0) {
          setAnnivarsaryEmployees(AnnivarsaryData);
        }
      } catch (error) {
        console.error('Error fetching birthday data:', error);
      }
    };

    fetchBirthdayData();

    const fetchAttendanceData = async () => {
      try {
        const Attendanceresponse = await axios.get(
          `/api/attendence/${userInfo.employee_id}/${day}/${month}/${year}`
        );
        const AttendanceresponseData = Attendanceresponse.data;
        setAttendanceResponse(AttendanceresponseData.attendance);
        console.log(AttendanceresponseData.attendance);
        setIsAttendanceLoggedin(!!state.attendance);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: AttendanceresponseData.attendance,
        });
      } catch (error) {
        console.error('Error fetching attendance data:', error);

        // Set a default value for AttendanceResponse when an error occurs
        setAttendanceResponse({
          IN_TIME_1: null,
          IN_TIME_2: null,
          IN_TIME_3: null,
          OUT_TIME_1: null,
          OUT_TIME_2: null,
          OUT_TIME_3: null,
        });
      }
    };

    if (successAttendance) {
      dispatch({ type: 'ENTRY_EXIT_RESET' });
    } else {
      fetchAttendanceData();
    }
  }, [
    day,
    successAttendance,
    month,
    state.attendance,
    userInfo.UID,
    userInfo.employee_id,
    year,
  ]);

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

  const AnnivarsaryToday = AnnivarsaryEmployees.filter((employee) => {
    const AnniversaryParts =
      employee.anniversary_employee_joining_date.split('/'); // Split date by '/'
    const AnniversaryMonth = parseInt(AnniversaryParts[1], 10); // Convert to integer
    const AnniversaryDate = parseInt(AnniversaryParts[0], 10); // Convert to integer
    return AnniversaryMonth === currentMonth && AnniversaryDate === currentDate;
  });

  // 1st entry

  const [currentmonth, setCurrentMonth] = useState(month);
  const [currentyear, setCurrentyear] = useState(year);
  const [currentday, setCurrentday] = useState(day);
  const [UID, setUID] = useState(userInfo.UID);

  const [IN_LATTITUDE_1, setIN_LATTITUDE_1] = useState('');
  const [IN_LONGITUDE_1, setIN_LONGITUDE_1] = useState('');

  const [OUT_LATTITUDE_1, setOUT_LATTITUDE_1] = useState('');
  const [OUT_LONGITUDE_1, setOUT_LONGITUDE_1] = useState('');

  const [IN_LATTITUDE_2, setIN_LATTITUDE_2] = useState('');
  const [IN_LONGITUDE_2, setIN_LONGITUDE_2] = useState('');

  const [OUT_LATTITUDE_2, setOUT_LATTITUDE_2] = useState('');
  const [OUT_LONGITUDE_2, setOUT_LONGITUDE_2] = useState('');

  const [IN_LATTITUDE_3, setIN_LATTITUDE_3] = useState('');
  const [IN_LONGITUDE_3, setIN_LONGITUDE_3] = useState('');

  const [OUT_LATTITUDE_3, setOUT_LATTITUDE_3] = useState('');
  const [OUT_LONGITUDE_3, setOUT_LONGITUDE_3] = useState('');

  // Get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Set values for punch 1
        setIN_LATTITUDE_1(position.coords.latitude);
        setIN_LONGITUDE_1(position.coords.longitude);
        setOUT_LATTITUDE_1(position.coords.latitude);
        setOUT_LONGITUDE_1(position.coords.longitude);

        // Set values for punch 2
        setIN_LATTITUDE_2(position.coords.latitude);
        setIN_LONGITUDE_2(position.coords.longitude);
        setOUT_LATTITUDE_2(position.coords.latitude);
        setOUT_LONGITUDE_2(position.coords.longitude);

        // Correct the values for punch 3
        setIN_LATTITUDE_3(position.coords.latitude);
        setIN_LONGITUDE_3(position.coords.longitude);
        setOUT_LATTITUDE_3(position.coords.latitude); // Corrected this line
        setOUT_LONGITUDE_3(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }

  const [IN_TIME_1, setIN_TIME_1] = useState(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );

  const [OUT_TIME_1, setOUT_TIME_1] = useState(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );

  const [IN_TIME_2, setIN_TIME_2] = useState(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );
  const [OUT_TIME_2, setOUT_TIME_2] = useState(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );

  const [IN_TIME_3, setIN_TIME_3] = useState(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );
  const [OUT_TIME_3, setOUT_TIME_3] = useState(
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );

  const [isLeave, setLeave] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [LeaveType, setLeaveType] = useState('');
  const [Name, setName] = useState(userInfo.NAME);
  const [employee_id, setEmployee_id] = useState(userInfo.employee_id);

  // ----------------1st entry start-------------------

  const entryOneHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!UID) {
      missingFields.push('Employee UID');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `api/attendence/submit-entry-1`,
        {
          UID,
          IN_LATTITUDE_1,
          IN_LONGITUDE_1,
          IN_TIME_1,
          month,
          year,
          day,
          Name,
          employee_id,
          isLeave,
          totalHours,
          LeaveType,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Punch in successfully', {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // ---------------------------- 1st entry  end-----------------------------

  // ----------------1st exit start-------------------

  const exitOneHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!UID) {
      missingFields.push('Employee UID');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `api/attendence/submit-exit-1/${userInfo.employee_id}/${day}/${month}/${year}`,
        {
          OUT_LATTITUDE_1,
          OUT_LONGITUDE_1,
          OUT_TIME_1,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Punch out successfully', {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // ---------------------------- 1st exit  end-----------------------------

  // ----------------2nd entry start-------------------

  const entryTwoHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!UID) {
      missingFields.push('Employee UID');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `api/attendence/submit-entry-2/${userInfo.employee_id}/${day}/${month}/${year}`,
        {
          IN_LATTITUDE_2,
          IN_LONGITUDE_2,
          IN_TIME_2,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Second Punch in successfully', {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // ---------------------------- 2nd entry  end-----------------------------

  // ----------------2nd exit start-------------------

  const exitTwoHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!UID) {
      missingFields.push('Employee UID');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `api/attendence/submit-exit-2/${userInfo.employee_id}/${day}/${month}/${year}`,
        {
          OUT_LATTITUDE_2,
          OUT_LONGITUDE_2,
          OUT_TIME_2,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Second Punch out successfully', {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // ---------------------------- 2nd exit  end-----------------------------

  // ----------------3rd entry start-------------------

  const entryThreeHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!UID) {
      missingFields.push('Employee UID');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `api/attendence/submit-entry-3/${userInfo.employee_id}/${day}/${month}/${year}`,
        {
          IN_LATTITUDE_3,
          IN_LONGITUDE_3,
          IN_TIME_3,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Third Punch in successfully', {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // ---------------------------- 3rd entry  end-----------------------------

  // ----------------3rd exit start-------------------

  const exitThreeHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!UID) {
      missingFields.push('Employee UID');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `api/attendence/submit-exit-3/${userInfo.employee_id}/${day}/${month}/${year}`,
        {
          OUT_LATTITUDE_3,
          OUT_LONGITUDE_3,
          OUT_TIME_3,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Third Punch out successfully', {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
        autoClose: 5000, // 5000 milliseconds = 5 seconds
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // ---------------------------- 3rd exit  end-----------------------------

  return (
    <div className=" container">
      <div className="  p-2">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {loading ? (
          <LoadingBox5 />
        ) : (
          <>
            <div className="d-flex justify-content-center">
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
                      <div className="birthday-card" key={employee.id}>
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

                        <p className="footer-text mt-2">
                          Best wishes on your special day! <br />
                          <span className="text-success fw-bold">
                            {employee.birthday_date}
                          </span>
                        </p>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                ''
              )}
              {AnnivarsaryToday.length > 0 && AnnivarsaryToday.length > 0 ? (
                <div
                  style={{
                    height: 'auto',
                    width: '280px',
                    margin: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  className=""
                >
                  {/* id, anniversary_employee_name, anniversary_employee_joining_date, anniversary_employee_email,
                  //  anniversary_employee_employee_id, anniversary_employee_image, createdAt, updatedAt */}
                  <Slider {...settings}>
                    {AnnivarsaryEmployees.map((employee) => (
                      <div className="birthday-card" key={employee.id}>
                        <p className="birthday-message">
                          Happy work Anniversary!
                          <br />
                          <span className="birthday-name text-dark">
                            {employee.anniversary_employee_name}
                          </span>
                        </p>
                        <div className="birthday_image_container">
                          <img
                            src={employee.anniversary_employee_image}
                            alt="Birthday Cake"
                            className="birthday-image"
                          />
                        </div>

                        <p className="footer-text mt-2">
                          Best wishes on your special day! <br />
                          <span className="text-success fw-bold">
                            {employee.anniversary_employee_joining_date}
                          </span>
                        </p>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex justify-content-center">
              <div
                className="  row  col-6 m-1 pb-3 border  "
                style={{ display: 'grid', placeItems: 'center' }}
              >
                <span className="bg-dark text-light ">Quick Links</span>
                <div className="row row-cols-1 row-cols-md-4 g-2">
                  {userInfo &&
                  (userInfo.isSuperAdmin === 1 ||
                    userInfo.isHr === 1 ||
                    userInfo.isDirector === 1) ? (
                    <div className="col">
                      <div
                        className="card border border-0 quicklikCard"
                        id="quicklikCard"
                      >
                        <Link
                          to="employees"
                          className="p-1 text-decoration-none"
                        >
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
                  ) : (
                    ''
                  )}

                  {userInfo &&
                    userInfo.isVisitor === 0 &&
                    userInfo.isProbation === 1 && (
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
                                style={{
                                  color: '#2749f5',
                                  fontWeight: '500',
                                }}
                              >
                                leaves
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}

                  {userInfo && userInfo.isVisitor === 0 && (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to={`/myattendance`}
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

                  {userInfo && userInfo.isVisitor === 0 && (
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

                  {userInfo &&
                  (userInfo.isSuperAdmin === 1 ||
                    userInfo.isHr === 1 ||
                    userInfo.isDirector === 1) ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="new-attendancde"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/attendance1.jpg"
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
                              Timeline
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="calender"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/holiday.png"
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
                              Holiday
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  }

                  {userInfo && userInfo.isAdmin && userInfo.isVisitor === 0 && (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="/policy-documents-home"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/policy.jpg"
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
                              Policies
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {userInfo &&
                  (userInfo.isSuperAdmin === 1 ||
                    userInfo.isHr === 1 ||
                    userInfo.isDirector === 1) ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="/assets-home"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/assets.png"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              Assets
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {userInfo.isAdmin === 1 ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="/company-profile"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/profile.png"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              Company Profile
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {userInfo &&
                  (userInfo.isSuperAdmin === 1 ||
                    userInfo.isHr === 1 ||
                    userInfo.isDirector === 1) ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="/expenses-home"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/survey.png"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              Expenses
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {userInfo.isAdmin === 1 ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to={`/my-expenses-home`}
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/survey1.png"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              My Expenses
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {userInfo &&
                  (userInfo.isSuperAdmin === 1 ||
                    userInfo.isHr === 1 ||
                    userInfo.isDirector === 1) ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to={`/manual-jobs`}
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/manualjob.jpg"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              Advanced
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  {userInfo && userInfo.isSuperAdmin ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          // to={`/investment-declara`}
                          to={
                            userInfo.isSuperAdmin === 1
                              ? `/all-employee-investment`
                              : `/my-investment`
                          }
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/income.jpg"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              Invest. Declaration
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {(userInfo && userInfo.isSales) || userInfo.isAccountant ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          // to={`/investment-declara`}
                          to={`sales-home`}
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/sales.png"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              Sales
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {userInfo && userInfo.isVisitor === 0 && (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="jobopenings"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/referal.jpg"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              REFRAL
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {userInfo && userInfo.isAdmin && userInfo.isVisitor === 0 && (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="/upcoming"
                          className="p-1 text-decoration-none"
                        >
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

                  {userInfo &&
                  (userInfo.isSuperAdmin === 1 ||
                    userInfo.isHr === 1 ||
                    userInfo.isDirector === 1) ? (
                    <div className="col">
                      <div className="card border border-0 quicklikCard">
                        <Link
                          to="/birthday-calender"
                          className="p-1 text-decoration-none"
                        >
                          <img
                            src="/images/icons/birthday.png"
                            height={50}
                            style={{ objectFit: 'contain' }}
                            className="card-img-top quicklikCardImg"
                            alt="i"
                          />
                          <div className="card-body text-center">
                            <span
                              className="card-title"
                              style={{
                                color: '#2749f5',
                                fontWeight: '500',
                              }}
                            >
                              Birthday Calender
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                {userInfo && (
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
            </div>

            {/* punchin */}
            {LoginAccessStatus === 1 ? (
              <>
                {loadingAttendance ? (
                  <LoadingBox4></LoadingBox4>
                ) : (
                  <div className="d-flex justify-content-center">
                    {!AttendanceResponse ||
                    (AttendanceResponse.IN_TIME_1 === null &&
                      AttendanceResponse.IN_TIME_2 === null &&
                      AttendanceResponse.IN_TIME_3 === null &&
                      AttendanceResponse.OUT_TIME_1 === null &&
                      AttendanceResponse.OUT_TIME_2 === null &&
                      AttendanceResponse.OUT_TIME_3 === null) ? (
                      <form onSubmit={entryOneHandler}>
                        <input
                          type="hidden"
                          value={UID}
                          onChange={(e) => setUID(e.target.value)}
                        />

                        <input
                          type="hidden"
                          value={IN_LATTITUDE_1}
                          onChange={(e) => setIN_LATTITUDE_1(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={IN_LONGITUDE_1}
                          onChange={(e) => setIN_LONGITUDE_1(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={IN_TIME_1}
                          onChange={(e) => setIN_TIME_1(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={currentmonth}
                          onChange={(e) => setCurrentMonth(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={currentday}
                          onChange={(e) => setCurrentday(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={currentyear}
                          onChange={(e) => setCurrentyear(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={Name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={employee_id}
                          onChange={(e) => setEmployee_id(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={isLeave}
                          onChange={(e) => setLeave(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={totalHours}
                          onChange={(e) => setTotalHours(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={LeaveType}
                          onChange={(e) => setLeaveType(e.target.value)}
                        />
                        <button
                          type="submit"
                          className=" Loginbutton  btn-sm mx-1"
                        >
                          Tap 1
                        </button>
                      </form>
                    ) : (
                      ''
                    )}

                    {AttendanceResponse.IN_TIME_1 !== null &&
                    AttendanceResponse.IN_TIME_2 === null &&
                    AttendanceResponse.IN_TIME_3 === null &&
                    AttendanceResponse.OUT_TIME_1 === null &&
                    AttendanceResponse.OUT_TIME_2 === null &&
                    AttendanceResponse.OUT_TIME_3 === null ? (
                      <form onSubmit={exitOneHandler}>
                        <input
                          type="hidden"
                          value={OUT_LATTITUDE_1}
                          onChange={(e) => setOUT_LATTITUDE_1(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={OUT_LONGITUDE_1}
                          onChange={(e) => setOUT_LONGITUDE_1(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={OUT_TIME_1}
                          onChange={(e) => setOUT_TIME_1(e.target.value)}
                        />

                        <button className=" Loginbutton  mx-1" type="submit">
                          Punch out 1
                        </button>
                      </form>
                    ) : (
                      ''
                    )}

                    {!AttendanceResponse ||
                    (AttendanceResponse.IN_TIME_1 !== null &&
                      AttendanceResponse.IN_TIME_2 === null &&
                      AttendanceResponse.IN_TIME_3 === null &&
                      AttendanceResponse.OUT_TIME_1 !== null &&
                      AttendanceResponse.OUT_TIME_2 === null &&
                      AttendanceResponse.OUT_TIME_3 === null) ? (
                      <form onSubmit={entryTwoHandler}>
                        <input
                          type="hidden"
                          value={IN_LATTITUDE_2}
                          onChange={(e) => setIN_LATTITUDE_2(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={IN_LONGITUDE_2}
                          onChange={(e) => setIN_LONGITUDE_2(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={IN_TIME_2}
                          onChange={(e) => setIN_TIME_2(e.target.value)}
                        />

                        <button className=" Loginbutton  mx-1" type="submit">
                          Punch in 2
                        </button>
                      </form>
                    ) : (
                      ''
                    )}

                    {!AttendanceResponse ||
                    (AttendanceResponse.IN_TIME_1 !== null &&
                      AttendanceResponse.IN_TIME_2 !== null &&
                      AttendanceResponse.IN_TIME_3 === null &&
                      AttendanceResponse.OUT_TIME_1 !== null &&
                      AttendanceResponse.OUT_TIME_2 === null &&
                      AttendanceResponse.OUT_TIME_3 === null) ? (
                      <form onSubmit={exitTwoHandler}>
                        <input
                          type="hidden"
                          value={OUT_LATTITUDE_2}
                          onChange={(e) => setOUT_LATTITUDE_2(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={OUT_LONGITUDE_2}
                          onChange={(e) => setOUT_LONGITUDE_2(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={OUT_TIME_2}
                          onChange={(e) => setOUT_TIME_2(e.target.value)}
                        />

                        <button className=" Loginbutton  mx-1" type="submit">
                          Punch out 2
                        </button>
                      </form>
                    ) : (
                      ''
                    )}

                    {!AttendanceResponse ||
                    (AttendanceResponse.IN_TIME_1 !== null &&
                      AttendanceResponse.IN_TIME_2 !== null &&
                      AttendanceResponse.IN_TIME_3 === null &&
                      AttendanceResponse.OUT_TIME_1 !== null &&
                      AttendanceResponse.OUT_TIME_2 !== null &&
                      AttendanceResponse.OUT_TIME_3 === null) ? (
                      <form onSubmit={entryThreeHandler}>
                        <input
                          type="hidden"
                          value={IN_LATTITUDE_3}
                          onChange={(e) => setIN_LATTITUDE_3(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={IN_LONGITUDE_3}
                          onChange={(e) => setIN_LONGITUDE_3(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={IN_TIME_3}
                          onChange={(e) => setIN_TIME_3(e.target.value)}
                        />

                        <button className=" Loginbutton  mx-1" type="submit">
                          Punch in 3
                        </button>
                      </form>
                    ) : (
                      ''
                    )}

                    {AttendanceResponse.IN_TIME_1 !== null &&
                    AttendanceResponse.OUT_TIME_1 !== null &&
                    AttendanceResponse.OUT_TIME_1 !== null &&
                    AttendanceResponse.OUT_TIME_2 !== null &&
                    AttendanceResponse.IN_TIME_3 !== null &&
                    AttendanceResponse.OUT_TIME_3 === null ? (
                      <form onSubmit={exitThreeHandler}>
                        <input
                          type="hidden"
                          value={OUT_LATTITUDE_3}
                          onChange={(e) => setOUT_LATTITUDE_3(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={OUT_LONGITUDE_3}
                          onChange={(e) => setOUT_LONGITUDE_3(e.target.value)}
                        />
                        <input
                          type="hidden"
                          value={OUT_TIME_3}
                          onChange={(e) => setOUT_TIME_3(e.target.value)}
                        />

                        <button className=" Loginbutton  mx-1" type="submit">
                          Punch out 3
                        </button>
                      </form>
                    ) : (
                      AttendanceResponse.IN_TIME_1 !== null &&
                      AttendanceResponse.OUT_TIME_3 !== null && (
                        <span className="badge bg-success p-2">
                          Thank You! Have a Good Day...😊
                        </span>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
