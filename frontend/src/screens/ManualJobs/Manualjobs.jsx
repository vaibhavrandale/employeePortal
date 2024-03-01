import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import { getError } from '../../utils';
import './manual.css';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { GiGlassCelebration } from 'react-icons/gi';
import { FaAmazonPay } from 'react-icons/fa6';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { FcLeave } from 'react-icons/fc';
import { FaPlaneDeparture } from 'react-icons/fa';
import { GiTimeBomb } from 'react-icons/gi';
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };

    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };

    case 'CREATE_FAIL':
      return { ...state, error: action.payload, loadingCreate: false };

    default:
      return state;
  }
};

const Manualjobs = () => {
  const [{ loadingCreate }, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const BirthdayEmailHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/manual-trigger/send-birthday-emails`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const anniversaryemailHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/manual-trigger/anniversary-emails`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const payslipGenerate = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/manual-trigger/payslip-generate`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const probationEmails = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/manual-trigger/probation-emails`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const LeaveRecordCreateInRfidCheck = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/manual-trigger/auto-leave-record-create-in-rfidcheck`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const paidHolidayGenerator = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/manual-trigger/paid-holiday-generator`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const calculateTotalHoursForToday = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });

    try {
      const { data } = await axios.post(
        `/api/manual-trigger/calculate-total-hours-for-today`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return (
    <div className="container">
      <h2 className="text-center">Manual Jobs</h2>
      <div className="d-flex justify-content-center flex-wrap">
        <div className=" Manualcard m-1">
          {/* <img src="/images/icons/holiday.png" class="card-img-top" alt="..." /> */}
          <div className="d-flex justify-content-center">
            {' '}
            <LiaBirthdayCakeSolid className=" text-danger  manualicon" />
          </div>
          <Link
            className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
            onClick={BirthdayEmailHandler}
          >
            {loadingCreate ? (
              <>
                Birthday Emails
                <LoadingBox4 />
              </>
            ) : (
              `Birthday Emails`
            )}
          </Link>
        </div>
        <div className=" Manualcard m-1">
          <div className="d-flex justify-content-center">
            {' '}
            <GiGlassCelebration className=" text-danger  manualicon" />
          </div>
          <Link
            className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
            onClick={anniversaryemailHandler}
          >
            {loadingCreate ? (
              <>
                Anniversary-Emails
                <LoadingBox4 />
              </>
            ) : (
              `Anniversary Emails`
            )}
          </Link>
        </div>
        <div className=" Manualcard m-1">
          <div className="d-flex justify-content-center">
            {' '}
            <FaAmazonPay className=" text-danger  manualicon" />
          </div>
          <Link
            className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
            onClick={payslipGenerate}
          >
            {loadingCreate ? (
              <>
                payslip generate
                <LoadingBox4 />
              </>
            ) : (
              ` payslip generate`
            )}
          </Link>
        </div>
        <div className=" Manualcard m-1">
          <div className="d-flex justify-content-center">
            {' '}
            <MdOutlineMarkEmailRead className=" text-danger  manualicon" />
          </div>
          <Link
            className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
            onClick={probationEmails}
          >
            {loadingCreate ? (
              <>
                probation emails
                <LoadingBox4 />
              </>
            ) : (
              ` probation emails`
            )}
          </Link>{' '}
        </div>
        <div className=" Manualcard m-1">
          <div className="d-flex justify-content-center">
            {' '}
            <FcLeave className=" text-danger  manualicon" />
          </div>
          <Link
            className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
            onClick={LeaveRecordCreateInRfidCheck}
          >
            {' '}
            {loadingCreate ? (
              <>
                Leave Record
                <LoadingBox4 />
              </>
            ) : (
              `  Leave Record`
            )}
          </Link>
        </div>
        <div className=" Manualcard m-1">
          <div className="d-flex justify-content-center">
            {' '}
            <FaPlaneDeparture className=" text-danger  manualicon" />
          </div>
          <Link
            className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
            onClick={paidHolidayGenerator}
          >
            {' '}
            {loadingCreate ? (
              <>
                paid Holiday Generator
                <LoadingBox4 />
              </>
            ) : (
              ` paid Holiday Generator`
            )}
          </Link>
        </div>
        <div className=" Manualcard m-1">
          <div className="d-flex justify-content-center">
            {' '}
            <GiTimeBomb className=" text-danger  manualicon" />
          </div>
          <Link
            className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
            onClick={calculateTotalHoursForToday}
          >
            {loadingCreate ? (
              <>
                Total Hours for Day
                <LoadingBox4 />
              </>
            ) : (
              ` Total Hours for Day`
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Manualjobs;
