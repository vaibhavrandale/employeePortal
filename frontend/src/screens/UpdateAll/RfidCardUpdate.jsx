import React, { useContext, useEffect, useReducer, useState } from 'react';
import './rfid-update.css';
import data from './data.js';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { Store } from '../../Store.js';
import axios from 'axios';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, uidCard: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const RfidCardUpdate = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, uidCard }, dispatch] = useReducer(reducer, {
    uidCard: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/uid-update`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.uidCard });
        console.log(result.data.uidCard);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, []);

  const filteredData = uidCard
    .filter(
      (item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.updatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employee_id.includes(searchTerm) ||
        item.current_uid.includes(searchTerm)
    )
    .sort((a, b) => a.employee_id.localeCompare(b.employee_id));

  return (
    <div className="container">
      <h3 className="text-center fw-bold mb-2">Update UID Card</h3>

      <div className="d-flex justify-content-end">
        <input
          type="text"
          className="inputField search"
          style={{ width: '250px' }}
          placeholder="Search Employee.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-responsive-lg">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text-center">Employee ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Prevoius UID</th>
              <th className="text-center">current UID</th>
              <th className="text-center">Last Update</th>
              <th className="text-center">Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.employee_id}</td>
                  <td className="text-center">{item.Name}</td>
                  <td className="text-center">{item.prevoius_uid}</td>
                  <td className="text-center">{item.current_uid}</td>
                  <td className="text-center">{item.updatedBy}</td>
                  <td className="text-center">
                    <Link
                      className="btn px-2"
                      to={`/update-rfid/${item.employee_id}`}
                    >
                      <FiEdit />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center border m-1 p-1 ">
                <td className="text-center" colSpan={6}>
                  <LoadingBox4 />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RfidCardUpdate;
