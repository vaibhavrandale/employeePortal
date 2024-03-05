import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
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

    case 'ACCESS_REQUEST':
      return { ...state, loadingAccess: true };

    case 'ACCESS_SUCCESS':
      return { ...state, access: action.payload, loadingAccess: false };

    case 'ACCESS_FAIL':
      return { ...state, loadingAccess: false, error: action.payload };

    case 'ACCESS_UPDATE_REQUEST':
      return { ...state, loadingAccess: true, successAccess: false };

    case 'ACCESS_UPDATE_SUCCESS':
      return {
        ...state,
        access: action.payload,
        loadingAccess: false,
        successAccess: true,
      };

    case 'ACCESS_UPDATE_FAIL':
      return {
        ...state,
        loadingAccess: false,
        error: action.payload,
        successAccess: false,
      };

    // case 'DELETE_REQUEST':
    //   return { ...state, loadingDelete: true, successDelete: false };

    // case 'DELETE_SUCCESS':
    //   return { ...state, loadingDelete: false, successDelete: true };

    // case 'DELETE_FAIL':
    //   return { ...state, loadingDelete: false };

    case 'ACCESS_RESET':
      return { ...state, loadingDelete: false, successAccess: false };

    default:
      return state;
  }
};

const Manualjobs = () => {
  const [{ loadingCreate, access, loadingAccess, successAccess }, dispatch] =
    useReducer(reducer, {
      access: {},
      loadingCreate: false,
      error: '',
    });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [accessStatus, setAccessStatus] = useState(0);

  useEffect(() => {
    // Simulate API call or data fetching
    const StatusData = async () => {
      dispatch({ type: 'ACCESS_REQUEST' });
      try {
        const accessresult = await axios.get(`/api/access/1`);
        console.log(accessresult.data);
        dispatch({
          type: 'ACCESS_SUCCESS',
          payload: accessresult.data.payslip,
        });

        setAccessStatus(accessresult.data.access.status);
      } catch (err) {
        dispatch({ type: 'ACCESS_FAIL', payload: err.message });
      }
    };

    //

    if (successAccess) {
      dispatch({ type: 'ACCESS_RESET' });
    } else {
      StatusData();
    }
  }, [successAccess]);

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

  const AccessActivatelHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'ACCESS_REQUEST_SUCCESS',
    });

    try {
      const { data } = await axios.put(`/api/access/activate/1`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({
        type: 'ACCESS_UPDATE_SUCCESS',
      });
      toast.success(data.message, {
        position: 'top-right',
      });
      // window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'ACCESS_UPDATE_FAIL' });
    }
  };
  const AccessDeActivatelHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'ACCESS_REQUEST_SUCCESS',
    });

    try {
      const { data } = await axios.put(`/api/access/deactivate/1`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({
        type: 'ACCESS_UPDATE_SUCCESS',
      });

      toast.success(data.message, {
        position: 'top-right',
      });

      // window.location.reload();
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'ACCESS_UPDATE_FAIL' });
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

        <div className=" Manualcard m-1">
          <div className="d-flex justify-content-center">
            {' '}
            <GiTimeBomb className=" text-danger  manualicon" />
          </div>

          {accessStatus === 1 ? (
            <Link
              className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
              onClick={AccessActivatelHandler}
            >
              {loadingAccess ? (
                <>
                  Update Employee On
                  <LoadingBox4 />
                </>
              ) : (
                ` Update Employee On`
              )}
            </Link>
          ) : (
            <Link
              className="btn btn-sm btn-warning m-1 manualBtn fw-bold fs-6"
              onClick={AccessDeActivatelHandler}
            >
              {loadingAccess ? (
                <>
                  Update Employee off
                  <LoadingBox4 />
                </>
              ) : (
                ` Update Employee off`
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manualjobs;
