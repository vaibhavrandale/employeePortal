import React, { useContext, useEffect, useReducer, useState } from 'react';

import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../utils';
import toast from 'react-hot-toast';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, createloading: true };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        attendance: action.payload,
        createloading: false,
      };

    case 'FETCH_FAIL':
      return { ...state, createloading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpload: '' };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loadingUpdate: false,
        errorUpload: '',
      };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpload: action.payload };

    default:
      return state;
  }
};

const UpdateTimeline = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, loadingUpdate, attendance, createloading, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    attendance: {},
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const { year, month, day, employee_id, id } = useParams();
  const [UID, setUID] = useState('');
  const [Name, setName] = useState('');
  const [employeeid, setEmployeeId] = useState(employee_id);
  const [IN_LATTITUDE_1, setIN_LATTITUDE_1] = useState('');
  const [IN_LONGITUDE_1, setIN_LONGITUDE_1] = useState('');
  const [IN_TIME_1, setIN_TIME_1] = useState('');
  const [OUT_LATTITUDE_1, setOUT_LATTITUDE_1] = useState('');
  const [OUT_LONGITUDE_1, setOUT_LONGITUDE_1] = useState('');
  const [OUT_TIME_1, setOUT_TIME_1] = useState('');
  const [IN_LATTITUDE_2, setIN_LATTITUDE_2] = useState('');
  const [IN_LONGITUDE_2, setIN_LONGITUDE_2] = useState('');
  const [IN_TIME_2, setIN_TIME_2] = useState('');
  const [OUT_LATTITUDE_2, setOUT_LATTITUDE_2] = useState('');
  const [OUT_LONGITUDE_2, setOUT_LONGITUDE_2] = useState('');
  const [OUT_TIME_2, setOUT_TIME_2] = useState('');
  const [IN_LATTITUDE_3, setIN_LATTITUDE_3] = useState('');
  const [IN_LONGITUDE_3, setIN_LONGITUDE_3] = useState('');
  const [IN_TIME_3, setIN_TIME_3] = useState('');
  const [OUT_LATTITUDE_3, setOUT_LATTITUDE_3] = useState('');
  const [OUT_LONGITUDE_3, setOUT_LONGITUDE_3] = useState('');
  const [OUT_TIME_3, setOUT_TIME_3] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [Year, setYear] = useState(year);
  const [Month, setMonth] = useState(month);
  const [Day, setDay] = useState(day);
  const [isLeave, setIsLeave] = useState(false);
  const [LeaveType, setLeaveType] = useState('');

  // using this create useState

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/attendence/${Year}/${Month}/${Day}/${employee_id}/${id}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.attendance });
        console.log(result.data.attendance);

        setName(result.data.attendance.Name);
        setUID(result.data.attendance.UID);
        setEmployeeId(result.data.attendance.employee_id);
        setIN_LATTITUDE_1(result.data.attendance.IN_LATTITUDE_1);
        setIN_LONGITUDE_1(result.data.attendance.IN_LONGITUDE_1);
        setIN_TIME_1(result.data.attendance.IN_TIME_1);
        setOUT_LATTITUDE_1(result.data.attendance.OUT_LATTITUDE_1);
        setOUT_LONGITUDE_1(result.data.attendance.OUT_LONGITUDE_1);
        setOUT_TIME_1(result.data.attendance.OUT_TIME_1);
        setIN_LATTITUDE_2(result.data.attendance.IN_LATTITUDE_2);
        setIN_LONGITUDE_2(result.data.attendance.IN_LONGITUDE_2);
        setIN_TIME_2(result.data.attendance.IN_TIME_2);
        setOUT_LATTITUDE_2(result.data.attendance.OUT_LATTITUDE_2);
        setOUT_LONGITUDE_2(result.data.attendance.OUT_LONGITUDE_2);
        setOUT_TIME_2(result.data.attendance.OUT_TIME_2);
        setIN_LATTITUDE_3(result.data.attendance.IN_LATTITUDE_3);
        setIN_LONGITUDE_3(result.data.attendance.IN_LONGITUDE_3);
        setIN_TIME_3(result.data.attendance.IN_TIME_3);
        setOUT_LATTITUDE_3(result.data.attendance.OUT_LATTITUDE_3);
        setOUT_LONGITUDE_3(result.data.attendance.OUT_LONGITUDE_3);
        setOUT_TIME_3(result.data.attendance.OUT_TIME_3);
        setTotalHours(result.data.attendance.totalHours);
        setIsLeave(result.data.attendance.isLeave);
        setLeaveType(result.data.attendance.LeaveType);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [Year, Day, employee_id, id, Month]);

  // create
  const UpdateTimelineHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_REQUEST',
    });
    const missingFields = [];

    if (!IN_TIME_1) {
      missingFields.push('In time 1 is not available');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/attendence/${Year}/${Month}/${Day}/${employee_id}/${id}`,
        {
          IN_TIME_1,
          IN_LATTITUDE_1,
          IN_LONGITUDE_1,
          IN_TIME_2,
          IN_LATTITUDE_2,
          IN_LONGITUDE_2,
          IN_TIME_3,
          IN_LATTITUDE_3,
          IN_LONGITUDE_3,
          OUT_TIME_1,
          OUT_LATTITUDE_1,
          OUT_LONGITUDE_1,
          OUT_TIME_2,
          OUT_LATTITUDE_2,
          OUT_LONGITUDE_2,
          OUT_TIME_3,
          OUT_LATTITUDE_3,
          OUT_LONGITUDE_3,
          totalHours,
          isLeave,
          LeaveType,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data.attendance,
      });
      toast.success('Attendance updated successfully', {
        position: 'top-right',
      });
      navigate('/detailed-timeline');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className="container">
      <div className="p-2" style={{}}>
        <h4 className="text-center fw-bold">
          Edit Timeline -{' '}
          <b className="text-primary">
            {year}/{month}/{day} - {id}
          </b>{' '}
        </h4>
        <div className="table-responsive">
          {createloading ? (
            <LoadingBox4 />
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    ID
                  </th>
                  <th scope="col" className="text-center">
                    Name
                  </th>

                  <th scope="col" className="text-center">
                    UID
                  </th>
                  <th scope="col" className="text-center">
                    Employee ID
                  </th>
                  <th scope="col" className="text-center">
                    IN_LATTITUDE_1
                  </th>
                  <th scope="col" className="text-center">
                    IN_LONGITUDE_1
                  </th>
                  <th scope="col" className="text-center">
                    IN_TIME_1
                  </th>
                  <th scope="col" className="text-center">
                    OUT_LATTITUDE_1
                  </th>
                  <th scope="col" className="text-center">
                    OUT_LONGITUDE_1
                  </th>
                  <th scope="col" className="text-center">
                    OUT_TIME_1
                  </th>
                  <th scope="col" className="text-center">
                    IN_LATTITUDE_2
                  </th>
                  <th scope="col" className="text-center">
                    IN_LONGITUDE_2
                  </th>
                  <th scope="col" className="text-center">
                    IN_TIME_2
                  </th>
                  <th scope="col" className="text-center">
                    OUT_LATTITUDE_2
                  </th>
                  <th scope="col" className="text-center">
                    OUT_LONGITUDE_2
                  </th>
                  <th scope="col" className="text-center">
                    OUT_TIME_2
                  </th>
                  <th scope="col" className="text-center">
                    IN_LATTITUDE_3
                  </th>
                  <th scope="col" className="text-center">
                    IN_LONGITUDE_3
                  </th>
                  <th scope="col" className="text-center">
                    IN_TIME_3
                  </th>
                  <th scope="col" className="text-center">
                    OUT_LATTITUDE_3
                  </th>
                  <th scope="col" className="text-center">
                    OUT_LONGITUDE_3
                  </th>
                  <th scope="col" className="text-center">
                    OUT_TIME_3
                  </th>
                  <th scope="col" className="text-center">
                    totalHours
                  </th>
                  <th scope="col" className="text-center">
                    year
                  </th>
                  <th scope="col" className="text-center">
                    month
                  </th>
                  <th scope="col" className="text-center">
                    day
                  </th>
                  <th scope="col" className="text-center">
                    isLeave
                  </th>
                  <th scope="col" className="text-center">
                    LeaveType
                  </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!attendance ? (
                  <tr>
                    <td colSpan={35} className="text-start table-danger">
                      No data found
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="text-center">
                      <input type="text" disabled value={id} />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        disabled
                        value={UID}
                        onChange={(e) => setUID(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        disabled
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        disabled
                        value={employeeid}
                        onChange={(e) => setEmployeeId(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_LATTITUDE_1}
                        onChange={(e) => setIN_LATTITUDE_1(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_LONGITUDE_1}
                        onChange={(e) => setIN_LONGITUDE_1(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_TIME_1}
                        onChange={(e) => setIN_TIME_1(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_LATTITUDE_1}
                        onChange={(e) => setOUT_LATTITUDE_1(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_LONGITUDE_1}
                        onChange={(e) => setOUT_LONGITUDE_1(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_TIME_1}
                        onChange={(e) => setOUT_TIME_1(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_LATTITUDE_2}
                        onChange={(e) => setIN_LATTITUDE_2(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_LONGITUDE_2}
                        onChange={(e) => setIN_LONGITUDE_2(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_TIME_2}
                        onChange={(e) => setIN_TIME_2(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_LATTITUDE_2}
                        onChange={(e) => setOUT_LATTITUDE_2(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_LONGITUDE_2}
                        onChange={(e) => setOUT_LONGITUDE_2(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_TIME_2}
                        onChange={(e) => setOUT_TIME_2(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_LATTITUDE_3}
                        onChange={(e) => setIN_LATTITUDE_3(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_LONGITUDE_3}
                        onChange={(e) => setIN_LONGITUDE_3(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={IN_TIME_3}
                        onChange={(e) => setIN_TIME_3(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_LATTITUDE_3}
                        onChange={(e) => setOUT_LATTITUDE_3(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_LONGITUDE_3}
                        onChange={(e) => setOUT_LONGITUDE_3(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={OUT_TIME_3}
                        onChange={(e) => setOUT_TIME_3(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={totalHours}
                        onChange={(e) => setTotalHours(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={Year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={Month}
                        onChange={(e) => setMonth(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={Day}
                        onChange={(e) => setDay(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={isLeave}
                        onChange={(e) => setIsLeave(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={LeaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <Link
                        className="btn btn-sm btn-warning fw-bold"
                        style={{width:"100px"}}
                        onClick={(e) => UpdateTimelineHandler(e, employee_id)}
                      >
                        {loadingUpdate ? (
                          <>
                            wait.
                            <LoadingBox4 />
                          </>
                        ) : (
                          'Update'
                        )}
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateTimeline;
