import React, { useContext, useEffect, useReducer, useState } from 'react';
// import leaves from './leaves.js';
import { Link, useParams } from 'react-router-dom';
import { Store } from '../../Store.js';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, leavelapse: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_EMPLOYEE_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_EMPLOYEE_SUCCESS':
      return { ...state, employee: action.payload, loading: false };

    case 'FETCH_EMPLOYEE_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const LapasedLeaves = () => {
  const [{ loading, loadingUpdate, leavelapse, employee }, dispatch] =
    useReducer(reducer, {
      leavelapse: [],
      employee: {},
      loading: true,
      error: '',
    });
  const { employeeid } = useParams();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [employee_id, setEmployee_id] = useState();
  const [year, setYear] = useState();
  const [Name, setname] = useState();
  const [leaves, setleaves] = useState();
  const [sick, setSick] = useState();
  const [privilege, setPrivilege] = useState();
  const [casual, setCasual] = useState();
  const [isLapsed, setisLapsed] = useState();
  const [LeavetypeLapsed, setLeaveTypeLapsed] = useState();
  const [NoofleaveLapsed, setNoofleaveLapsed] = useState();

  const [TotalLeaves, setTotalLeaves] = useState(0);
  const [TotalSick, setTotalSick] = useState(0);
  const [TotalPrivilege, setTotalPrivilege] = useState(0);

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/leaves/leave-lapse/${employeeid}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.leavelapse });
        console.log(result.data);
        setEmployee_id(result.data.leavelapse.employee_id);
        setname(result.data.leavelapse.Name);
        setleaves(result.data.leavelapse.leaves);
        setSick(result.data.leavelapse.sick);
        setPrivilege(result.data.leavelapse.privilege);
        setCasual(result.data.leavelapse.casual);
        setisLapsed(result.data.leavelapse.isLapsed);
        setLeaveTypeLapsed(result.data.leavelapse.LeavetypeLapsed);
        setNoofleaveLapsed(result.data.leavelapse.NoofleaveLapsed);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    // Simulate API call or data fetching
    const fetchEmployeeData = async () => {
      dispatch({ type: 'FETCH_EMPLOYEE_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/details/${employeeid}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: 'FETCH_EMPLOYEE_SUCCESS',
          payload: result.data.employee,
        });
        console.log(result.data);

        setTotalLeaves(result.data.employee.leaves);
        setTotalSick(result.data.employee.sick);
        setTotalPrivilege(result.data.employee.privilege);
      } catch (err) {
        dispatch({ type: 'FETCH_EMPLOYEE_FAIL', payload: err.message });
      }
    };

    fetchData();
    fetchEmployeeData();
    // fetchData();
  }, [employeeid, userInfo.token]);

  return (
    <div className="container">
      <h3 className="text-center fw-bold">Lapsed Leaves {employeeid}</h3>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center">Employee ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Leaves</th>
              <th className="text-center">Sick</th>
              <th className="text-center">Previledge</th>
              <th className="text-center">Casual</th>
              <th className="text-center">Lapsed YES/NOT</th>
              <th className="text-center">Leave type Lapsed</th>
              <th className="text-center">No of leave Lapsed</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{employee_id}</td>
              <td className="text-center">{Name}</td>
              <td className="text-center">{TotalLeaves}</td>
              <td className="text-center">{sick}</td>
              <td className="text-center">{privilege}</td>
              <td className="text-center">{casual}</td>
              <td className="text-center">{isLapsed}</td>
              <td className="text-center">{LeavetypeLapsed}</td>
              <td className="text-center">{NoofleaveLapsed}</td>
              <td className="text-center">
                <Link
                  className="btn btn-warning btn-sm"
                  to={`/edit-lapsed-leaves/${employeeid}`}
                >
                  Update
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LapasedLeaves;
