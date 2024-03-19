import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './rfid-update.css'; // Import the uid array
import data from './data.js';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { Store } from '../../Store.js';
import axios from 'axios';
import { getError } from '../../utils.js';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, uidCard: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, updateLoading: true };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        uidCard: [...state.uidCard, action.payload],
        updateLoading: false,
      };

    case 'UPDATE_FAIL':
      return { ...state, updateLoading: false, error: action.payload };

    default:
      return state;
  }
};

const UpdateUID = () => {
  const { id } = useParams();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, updateLoading }, dispatch] = useReducer(reducer, {
    uidCard: {},
    loading: true,
    error: '',
  });
  const [employee, setEmployee] = useState({});
  const [updatedUID, setUpdatedUID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/uid-update/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.uidCard });
        console.log(result.data);

        if (result) {
          setEmployee(result.data.uidCard);
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [id]);

  // create
  const UpdateUIDHandler = async (e) => {
    e.preventDefault();

    if (!updatedUID) {
      // Display toast message when updated UID is not provided
      toast.error('Please enter the updated UID.', {
        position: 'top-right',
      });
      return;
    }
    dispatch({
      type: 'UPDATE_REQUEST',
    });

    try {
      const { data } = await axios.put(
        `/api/uid-update/${id}`,
        {
          current_uid: updatedUID,
          updatedBy: userInfo.NAME,
          // description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data.holiday,
      });
      toast.success(data.message, {
        position: 'top-right',
      });
      navigate('/update-rfid');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className="container">
      <h3 className="text-center fw-bold mb-4">
        Update UID for Employee: {id}
      </h3>

      {Object.keys(employee).length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text-center">Employee ID</th>
              <th className="text-center">Name</th>

              <th className="text-center">Prevoius UID</th>
              <th className="text-center">New UID</th>

              <th className="text-center">Update</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(employee).length > 0 ? (
              <tr>
                <td className="text-center">{employee.employee_id}</td>
                <td className="text-center">{employee.Name}</td>
                <td className="text-center">{employee.current_uid}</td>
                <td className="text-center">
                  <input
                    type="text"
                    className=""
                    id="updatedUID"
                    required
                    value={updatedUID}
                    onChange={(e) => setUpdatedUID(e.target.value)}
                  />
                </td>

                <td className="text-center">
                  <Link
                    className="btn btn-sm btn-warning fw-bold"
                    onClick={(e) => UpdateUIDHandler(e, employee.employee_id)}
                  >
                    {updateLoading ? (
                      <>
                        Updating...
                        <LoadingBox4 />
                      </>
                    ) : (
                      'Update'
                    )}
                  </Link>
                </td>
              </tr>
            ) : (
              ''
            )}
          </tbody>
        </table>
      ) : (
        <div>
          <LoadingBox4 />
        </div>
      )}
    </div>
  );
};

export default UpdateUID;
