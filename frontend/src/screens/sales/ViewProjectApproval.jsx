// import React from 'react';
// import { useParams } from 'react-router-dom';

// const ViewProjectApproval = () => {
//   const { id } = useParams();
//   return <div className="container">ViewProjectApproval-{id}</div>;
// };

// export default ViewProjectApproval;

import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import toast from 'react-hot-toast';
import { getError } from '../../utils';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, projectapproval: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };

    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };

    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };

    default:
      return state;
  }
};

const ViewProjectApproval = () => {
  const [{ loading, loadingUpdate, projectapproval, loadingDelete }, dispatch] =
    useReducer(reducer, {
      projectapproval: {},
      loading: true,
      error: '',
    });
  const { id } = useParams();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/sales/project-approval/${id}`, {
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
  }, [id, userInfo.token]);

  const deleteHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        const data = await axios.delete(`/api/sales/project-approval/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success(data.message);

        dispatch({ type: 'DELETE_SUCCESS' });
        navigate('/project-approval');
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };
  return (
    <div className="container">
      {' '}
      <div className="card">
        <div className="card-header">
          <h3>
            Project Details -{' '}
            <div className="badge bg-success">{projectapproval.customer}</div>{' '}
          </h3>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center p-4">
            <LoadingBox4 />
          </div>
        ) : (
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Customer :</strong> {projectapproval.customer}
                </p>
                <p>
                  <strong>contact Person:</strong>{' '}
                  {projectapproval.contact_person}
                </p>
                <p>
                  <strong>Project Capacity:</strong>{' '}
                  {projectapproval.project_capacity}
                </p>
                <p>
                  <strong> site location:</strong>{' '}
                  {projectapproval.site_location}
                </p>
                <p>
                  <strong>Module Mounting Type:</strong>{' '}
                  {projectapproval.mms_type}
                </p>

                <p>
                  <strong>Distance to Nearest City:</strong>
                  {projectapproval.distance_to_nearest_city}
                </p>
                <p>
                  <strong>Is feasible At Cost:</strong>
                  {projectapproval.is_feasible_at_cost}
                </p>
                <p>
                  <strong>final Quote:</strong> {projectapproval.final_quote}
                </p>

                <p>
                  <strong>Final Quote Date:</strong>
                  {projectapproval.final_quote_date}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>project State:</strong>
                  {projectapproval.project_state}
                </p>
                <p>
                  <strong>Project Approval Status:</strong>
                  {projectapproval.project_approval_status}
                </p>
                <p>
                  <strong>created By:</strong>
                  {projectapproval.created_by}
                </p>
                <p>
                  <strong>sales Director:</strong>{' '}
                  {projectapproval.sales_director}
                </p>
                <p>
                  <strong>remark:</strong>
                  {projectapproval.remark}
                </p>
                <p>
                  <strong>Date of Approval:</strong>
                  {projectapproval.date_of_approval}
                </p>
                <p>
                  <strong>Date of Project Closure:</strong>
                  {projectapproval.date_of_project_closure}
                </p>
              </div>
            </div>

            {userInfo.isAccountant === 1 ? (
              ''
            ) : (
              <div className="d-flex justify-content-end">
                <Link
                  className="btn btn-sm btn-success m-1"
                  target="_blank"
                  to={`/export-project/${id}`}
                >
                  Export
                </Link>
                <Link
                  className="btn btn-sm btn-danger m-1"
                  onClick={deleteHandler}
                >
                  {loadingDelete ? (
                    <>
                      Deleting..
                      <LoadingBox4 />
                    </>
                  ) : (
                    'Delete'
                  )}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProjectApproval;
