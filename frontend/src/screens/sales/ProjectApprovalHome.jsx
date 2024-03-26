import React, { useContext, useEffect, useReducer, useState } from 'react';
// import leaves from './leaves.js';
import { Link } from 'react-router-dom';
import { Store } from '../../Store.js';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, projectapproval: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const ProjectApprovalHome = () => {
  const [{ loading, loadingUpdate, projectapproval }, dispatch] = useReducer(
    reducer,
    {
      projectapproval: [],
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
        const result = await axios.get(`/api/sales/project-approval`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.projectapproval,
        });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [userInfo.token]);

  const [searchTerm, setSearchTerm] = useState();
  const filteredData = projectapproval.filter((entry) => {
    // Check if searchTerm exists and if it matches any property of the entry
    if (searchTerm) {
      return (
        entry.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.BU.includes(searchTerm)
        // Add additional conditions for other properties if needed
      );
    }
    // If searchTerm is not provided, keep all entries
    return true;
  });

  return (
    <div className="container">
      <h3 className="text-center fw-bold">Project Approval</h3>
      <div className="d-flex justify-content-end m-1">
        <div className=" d-flex align-items-center justify-content-end">
          <input
            type="text"
            className="inputField search m-1"
            style={{ width: '250px' }}
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />{' '}
          <Link
            to="/new-project-approval"
            className="btn btn-sm btn-warning fw-bold m-1"
          >
            ADD
          </Link>
        </div>{' '}
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text-center">Serial</th>
              <th className="text-center">BU</th>
              <th className="text-center">customer</th>
              <th className="text-center">Project Capacity</th>
              <th className="text-center">Project Approval Status</th>
              <th className="text-center">Last Update</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.BU}</td>
                <td className="text-center">{item.customer}</td>
                <td className="text-center">{item.project_capacity}</td>
                <td className="text-center">{item.project_approval_status}</td>
                <td className="text-center">{item.created_by}</td>
                <td className="text-center">
                  <Link
                    className="btn btn-success btn-sm m-1"
                    to={`/view-project/${item.id}`}
                  >
                    <IoEyeOutline />
                  </Link>

                  <Link
                    className="btn btn-warning btn-sm m-1"
                    to={`/update-project-approval/${item.id}`}
                  >
                    <FaRegEdit />
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

export default ProjectApprovalHome;
