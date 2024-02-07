import React, { useEffect, useReducer, useState } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox4copy from '../../components/LoadingBox/LoadingBox4copy';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_LEAVE':
      return { ...state, Leave: action.payload };

    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, Leave: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };

    case 'UPDATE_REQUEST_APPROVE':
      return { ...state, loadingUpdateApprove: true };

    case 'UPDATE_SUCCESS_APPROVE':
      return { ...state, Leave: action.payload, loadingUpdateApprove: false };

    case 'UPDATE_FAIL_APPROVE':
      return { ...state, error: action.payload, loadingUpdateApprove: false };

    case 'UPDATE_REQUEST_REJECT':
      return { ...state, loadingUpdateReject: true };

    case 'UPDATE_SUCCESS_REJECT':
      return { ...state, Leave: action.payload, loadingUpdateReject: false };

    case 'UPDATE_FAIL_REJECT':
      return { ...state, error: action.payload, loadingUpdateReject: false };

    default:
      return state;
  }
};

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const LeaveStatus = () => {
  const [
    { loading, Leave, loadingUpdateApprove, loadingUpdateReject },
    dispatch,
  ] = useReducer(reducer, {
    Leave: [],
    loading: true,
    error: '',
  });
  const { employeeId, leaveId } = useParams();

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [remark, setRemark] = useState('');

  //   const [approved, setApproved] = useState('');
  //   const [approvedAt, setApprovedAt] = useState('');
  //   const [createdAt, setCreatedAt] = useState('');
  //   const [approvedBy, setApprovedBy] = useState('');
  //   const [expectedDateOfLeave, setExpectedDateOfLeave] = useState('');
  //   const [expectedDateOfreturn, setExpectedDateOfreturn] = useState('');
  //   const [id, setId] = useState('');
  //   const [reasonInDetail, setReasonInDetail] = useState('');
  //   const [name, setName] = useState('');
  //   const [remarkBy, setRemarkBy] = useState('');
  //   const [type, setType] = useState('');

  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/leaves/${employeeId}/${leaveId}`);
        // console.log(result);

        // setRemark(result.data.leave.remark);

        // setName(result.data.leave.name);
        // setId(result.data.leave.id);
        // setType(result.data.leave.type);
        // setExpectedDateOfLeave(result.data.leave.expectedDateOfLeave);
        // setExpectedDateOfreturn(result.data.leave.expectedDateOfreturn);
        // setReasonInDetail(result.data.leave.reasonInDetail);
        // setApproved(result.data.leave.approved);
        // setApprovedAt(result.data.leave.approvedAt);
        // setApprovedBy(result.data.leave.approvedBy);
        // setRemarkBy(result.data.leave.remarkBy);
        // setCreatedAt(result.data.leave.createdAt);

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.leave });
        // console.log(result.data.leave);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    // setLoading(true);
    fetchData();
  }, [employeeId, leaveId]);

  const ApproveHandler = async (leaveid) => {
    // e.preventDefault();

    const missingFields = [];

    if (!remark) {
      missingFields.push('Please Enter Remark to approve leave');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(', ')}`);

      return;
    }
    dispatch({
      type: 'UPDATE_REQUEST_APPROVE',
    });
    try {
      const { data } = await axios.put(
        `/api/leaves/${employeeId}/${leaveid}/approve`,
        {
          approved: '1',
          remark,
          approvedBy: userInfo.NAME,
          remarkBy: userInfo.NAME,
          approvedAt: currentDate,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'UPDATE_SUCCESS_APPROVE',
        payload: data.Leave,
      });

      toast.success('Leave Approved', {
        position: 'top-right',
      });
      dispatch({ type: 'REFRESH_LEAVE', payload: data.Leave });
      setRemark('');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'UPDATE_FAIL_APPROVE' });
    }
  };

  const DeclineHandler = async (leaveid) => {
    const missingFields = [];

    if (!remark) {
      missingFields.push('Please Enter Remark to decline leave');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(', ')}`);
      return;
    }
    dispatch({
      type: 'UPDATE_REQUEST_REJECT',
    });
    try {
      const { data } = await axios.put(
        `/api/leaves/${employeeId}/${leaveid}/reject`,
        {
          remark: remark,
          approved: '0',
          approvedBy: '',
          remarkBy: userInfo.NAME,
          approvedAt: '',
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'UPDATE_SUCCESS_REJECT',
        payload: data.Leave,
      });
      toast.success('Leave Rejected Successfully', {
        position: 'top-right',
      });

      dispatch({ type: 'REFRESH_LEAVE', payload: data.Leave });
      setRemark('');
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPDATE_FAIL_REJECT' });
    }
  };

  return (
    <div className="container1  ">
      <Helmet>
        <title>Update Leave Status</title>
      </Helmet>
      <div className="m-2 card p-1 pb-2">
        <nav
          style={{ '--bs-breadcrumb-divider': "'>'" }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                Home
              </Link>{' '}
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              <Link
                className="text-decoration-none"
                to={`/leave-application/${employeeId}`}
                // onClick={historyHandler}
              >
                Leaves History
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Update Leaves Status
            </li>
          </ol>
        </nav>{' '}
        <h2 className="text-center text-dark fw-bolder">Update Leave Status</h2>
        <span className="underline"></span>
        <table
          class="table table-striped"
          style={{ width: 'auto', overflowX: 'scroll' }}
        >
          <thead>
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">Applied At </th>
              <th scope="col">Type</th>
              <th scope="col">Reason</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Status</th>
              <th scope="col">Approved At</th>
              <th scope="col">Approved By</th>
              <th scope="col">Remark</th>
              <th scope="col">Remark By</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan="12">
                  <span className="badge bg-success p-2 ">
                    <span className=""> Loading....</span>
                    <LoadingBox4 />
                  </span>
                </td>
              </tr>
            ) : Leave ? (
              <>
                <tr>
                  <th scope="row">{Leave.id}</th>
                  <td>{`${new Date(Leave.createdAt)
                    .getDate()
                    .toString()
                    .padStart(2, '0')}/${(
                    new Date(Leave.createdAt).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, '0')}/${new Date(
                    Leave.createdAt
                  ).getFullYear()}`}</td>

                  <td>{Leave.type}</td>
                  <td>{Leave.reasonInDetail}</td>
                  {/* <td>{Leave.expectedDateOfLeave}</td> */}

                  <td>{`${new Date(Leave.expectedDateOfLeave)
                    .getDate()
                    .toString()
                    .padStart(2, '0')}/${(
                    new Date(Leave.expectedDateOfLeave).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, '0')}/${new Date(
                    Leave.expectedDateOfLeave
                  ).getFullYear()}`}</td>

                  <td>{`${new Date(Leave.expectedDateOfreturn)
                    .getDate()
                    .toString()
                    .padStart(2, '0')}/${(
                    new Date(Leave.expectedDateOfreturn).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, '0')}/${new Date(
                    Leave.expectedDateOfreturn
                  ).getFullYear()}`}</td>

                  <td>
                    {Leave.approved === 1 ? (
                      <span className="badge text-white bg-success">
                        Approved
                      </span>
                    ) : Leave.approved === 0 && Leave.remark !== '' ? (
                      <span className="badge text-white bg-danger">
                        Rejected
                      </span>
                    ) : (
                      <span className="badge text-white bg-warning">
                        Pending
                      </span>
                    )}
                  </td>
                  {/* <td>{approvedAt}</td> */}

                  <td className="text-center">
                    {Leave.approvedAt !== '' ? (
                      <span className="badge p-2 text-light bg-success">
                        {}
                        {new Date(Leave.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    ) : Leave.approvedAt === '' && Leave.remark !== '' ? (
                      <span className="badge text-light bg-danger">
                        Rejected
                      </span>
                    ) : (
                      <span className="badge text-light bg-warning">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    {Leave.approvedBy !== '' ? (
                      <span className="badge text-white bg-success">
                        {Leave.approvedBy}
                      </span>
                    ) : Leave.approvedBy === '' && Leave.remark !== '' ? (
                      <span className="badge text-white bg-danger">
                        Rejected
                      </span>
                    ) : (
                      <span className="badge text-white bg-warning">
                        pending
                      </span>
                    )}
                  </td>

                  <td className="text-center">
                    {Leave.remark === '' ? (
                      <span className="badge text-white bg-warning">
                        pending
                      </span>
                    ) : Leave.approved === 0 && Leave.remark !== '' ? (
                      <span className="badge text-white bg-danger">
                        {Leave.remark}
                      </span>
                    ) : (
                      <span className={`badge bg-success`}>{Leave.remark}</span>
                    )}
                  </td>
                  <td className="text-center">
                    {Leave.remarkBy === '' ? (
                      <span className="badge text-white bg-warning">
                        pending
                      </span>
                    ) : Leave.approved === 0 && Leave.remark !== '' ? (
                      <span className="badge text-white bg-danger">
                        {Leave.remarkBy}
                      </span>
                    ) : (
                      <span className="badge  text-white bg-success">
                        {Leave.remarkBy}
                      </span>
                    )}
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td>Leave not found</td>
              </tr>
            )}
          </tbody>
        </table>
        <form>
          <div className="form-group mt-4">
            <div className="row d-flex flex-column justify-content-center align-items-center">
              <div className="form-group col-md-4 m-2">
                <label htmlFor="firstName"> Remark:</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: '350px', margin: 'auto' }}
                  id="remark"
                  placeholder="Enter remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex  justify-content-center align-items-center ">
              <button
                className="btn btn-sm btn-success mx-1  border-1"
                type="button"
                onClick={(e) => ApproveHandler(leaveId)}
                style={{ width: '150px', margin: 'auto' }}
              >
                {loadingUpdateApprove ? <LoadingBox4copy /> : 'Approve'}
              </button>
              <button
                className="btn btn-sm btn-danger mx-1 border-1"
                type="button"
                onClick={(e) => DeclineHandler(leaveId)}
                style={{ width: '150px', margin: 'auto' }}
              >
                {loadingUpdateReject ? <LoadingBox4 /> : 'Reject'}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default LeaveStatus;
