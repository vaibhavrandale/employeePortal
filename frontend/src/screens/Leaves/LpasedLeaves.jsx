import React, { useContext, useEffect, useReducer } from 'react';
// import leaves from './leaves.js';
import { Link } from 'react-router-dom';
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

    default:
      return state;
  }
};

const LapasedLeaves = () => {
  const [{ loading, loadingUpdate, leavelapse }, dispatch] = useReducer(
    reducer,
    {
      leavelapse: [],
      loading: true,
      error: '',
    }
  );

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/leaves/leave-lapse`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.leavelapse });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [userInfo.token]);

  return (
    <div className="container">
      <h3 className="text-center fw-bold">Lapsed Leaves</h3>

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
            {leavelapse.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.employee_id}</td>
                <td className="text-center">{item.Name}</td>
                <td className="text-center">{item.leaves}</td>
                <td className="text-center">{item.sick}</td>
                <td className="text-center">{item.privilege}</td>
                <td className="text-center">{item.casual}</td>
                <td className="text-center">{item.isLapsed}</td>
                <td className="text-center">
                  {item.LeavetypeLapsed === '' ? (
                    <span className="badge bg-warning">NO</span>
                  ) : (
                    <span className="badge bg-success">Casual</span>
                  )}
                </td>
                <td className="text-center">{item.NoofleaveLapsed}</td>
                <td className="text-center">
                  <Link
                    className="btn btn-warning btn-sm"
                    to={`/edit-lapsed-leaves/${item.id}`}
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LapasedLeaves;
