// import React from 'react';

// const ScopeofWorkHome = () => {
//   return <div className="container">ScopeofWorkHome</div>;
// };

// export default ScopeofWorkHome;

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
      return { ...state, scopeofwork: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const ScopeofWorkHome = () => {
  const [{ loading, loadingUpdate, scopeofwork }, dispatch] = useReducer(
    reducer,
    {
      scopeofwork: [],
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
        const result = await axios.get(`/api/sales/scopeofwork`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.scopeofwork });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [userInfo.token]);

  const [searchTerm, setSearchTerm] = useState();
  const filteredData = scopeofwork.filter((entry) => {
    // Check if searchTerm exists and if it matches any property of the entry
    if (searchTerm) {
      return (
        entry.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.plant_capacity.includes(searchTerm)
        // Add additional conditions for other properties if needed
      );
    }
    // If searchTerm is not provided, keep all entries
    return true;
  });

  return (
    <div className="container">
      <h3 className="text-center fw-bold">Scope of Work</h3>
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
            to="/add-scope-of-work"
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
              <th className="text-center">Client Name</th>
              <th className="text-center">Plant capacity</th>
              <th className="text-center">PO No.</th>
              <th className="text-center">PO Date</th>
              <th className="text-center">Last Update</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.client_name}</td>
                <td className="text-center">{item.plant_capacity}</td>
                <td className="text-center">{item.purchase_order_no}</td>
                <td className="text-center">{item.purchase_order_date}</td>
                <td className="text-center">{item.submittedBy}</td>
                <td className="text-center">
                  <Link
                    className="btn btn-success btn-sm m-1"
                    to={`/scope-of-work/${item.id}`}
                  >
                    <IoEyeOutline />
                  </Link>
                  <Link
                    className="btn btn-warning btn-sm m-1"
                    to={`/update-scope-of-work/${item.id}`}
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

export default ScopeofWorkHome;
