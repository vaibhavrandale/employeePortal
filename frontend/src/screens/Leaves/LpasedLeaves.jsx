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
      return { ...state, lapaseleave: action.payload, loading: false };

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
  const [{ loading, loadingUpdate, lapaseleave, employee }, dispatch] =
    useReducer(reducer, {
      lapaseleave: [],
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
        const result = await axios.get(`/api/lapaseleave/${employeeid}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.lapaseleave });
        console.log(result.data);
        setEmployee_id(result.data.lapaseleave.employee_id);
        setname(result.data.lapaseleave.Name);
        setleaves(result.data.lapaseleave.leaves);
        setSick(result.data.lapaseleave.sick);
        setPrivilege(result.data.lapaseleave.privilege);
        setCasual(result.data.lapaseleave.casual);
        setisLapsed(result.data.lapaseleave.isLapsed);
        setLeaveTypeLapsed(result.data.lapaseleave.LeavetypeLapsed);
        setNoofleaveLapsed(result.data.lapaseleave.NoofleaveLapsed);
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
