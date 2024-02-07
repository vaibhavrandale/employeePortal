import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import { Store } from '../../Store';
import { BsShieldCheck } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { AiOutlineReload } from 'react-icons/ai';
// import { toast } from 'react-toastify';

import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import MsgBox from '../../components/MessageBox/MsgBox';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import { Helmet } from 'react-helmet';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, leaves: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'LEAVE_STATUS_REQUEST':
      return { ...state, loadingLeaveStatus: true };

    case 'LEAVE_STATUS_SUCCESS':
      return { ...state, leave: action.payload, loadingLeaveStatus: false };

    case 'LEAVE_STATUS_FAIL':
      return { ...state, loadingLeaveStatus: false, error: action.payload };

    default:
      return state;
  }
};

function LeavesHistory() {
  const [{ loading, error, leaves, loadingLeaveStatus }, dispatch] = useReducer(
    reducer,
    {
      leaves: [],
      loading: true,
      error: '',
    }
  );

  const { state } = useContext(Store);
  const { userInfo } = state;
  // const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isPopupOpenApprove, setIsPopupOpenApprove] = useState(false);
  const [isPopupOpenDecline, setIsPopupOpenDecline] = useState(false);

  const [approved, setApproved] = useState(false);
  const [remark, setRemark] = useState('');
  const [remainingLeaves, setRemainingLeaves] = useState({
    totalleaves: 0,
    sick: 0,
    privilege: 0,
    casual: 0,
  });
  const itemsPerPage = 5;
  // const navigate = useNavigate();
  const saveSettings = async (settings) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return 'Success'; // Return a success message or data
  };

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/leaves/${userInfo.employee_id}`);
        // console.log('leave result' + result);
        if (result) {
          // console.log(result.data.AllLeaves);
        } else {
          console.log('Leave data not found.');
          // Handle this scenario, maybe dispatch an action to indicate no employee data.
        }
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.AllLeaves,
        });

        const Employeeresult = await axios.get(
          `/api/employees/details/${userInfo.employee_id}`
        );
        // console.log(Employeeresult.data.employee);
        // Get the leave counts from the fetched data
        // const { leaves, sick, privilege, casual } = Employeeresult;

        const { leaves, sick, privilege, casual } =
          Employeeresult.data.employee;
        setRemainingLeaves({
          totalleaves: leaves,
          sick: sick,
          privilege: privilege,
          casual: casual,
        });
        // Calculate remaining leaves based on fetched leave counts
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      setTimeout(() => {
        // setEmployees(result.data);
        // setLoading(false);
      }, 2000); // Simulating a 2-second delay
    };

    fetchData();
  }, [userInfo.employee_id]);

  const filteredData = leaves.filter(
    (item) =>
      item.NAME ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.approvedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowHover = (index) => {
    setHoveredRow(index);
  };

  const openApprovalModal = (id) => {
    setIsPopupOpenApprove(id);
  };
  const approveLeave = leaves.find((leave) => leave.id === isPopupOpenApprove);

  const popupHandleApprove = () => {
    setIsPopupOpenApprove(null);
  };

  const popupHandleDecline = () => {
    setIsPopupOpenDecline(null);
  };

  const navigate = useNavigate();

  const LeaveApproveHandler = async (id) => {
    // e.preventDefault();
    popupHandleApprove();
    const missingFields = [];

    if (!remark) {
      missingFields.push('Please Enter Remark to approve leave');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(', ')}`);

      return;
    }
    dispatch({
      type: 'LEAVE_STATUS_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `api/leaves/${userInfo.id}/${id}/approve`,
        {
          approved: true,
          remark,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      // console.log(data);
      dispatch({
        type: 'LEAVE_STATUS_SUCCESS',
        payload: data.AllLeave,
      });
      // toast.success('Leave Approved Successfully', {
      //   position: 'bottom-right',
      // });
      toast.promise(saveSettings({ action: 'approve', leaveId: id }), {
        position: 'top-right',
        loading: 'Approving leave...',
        success: <b>Leave Approved Successfully!</b>,
        error: <b>Could not approved Leave.</b>,
      });
      // navigate('/leaves-history');
      // window.location.reload();
      //   siteSurvey.rating = data.rating;
      //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'LEAVE_STATUS_FAIL' });
    }
  };

  const openDeclineModal = (id) => {
    setIsPopupOpenDecline(id);
  };
  const declineLeave = leaves.find((leave) => leave.id === isPopupOpenDecline);

  const LeaveDeclineHandler = async (id) => {
    // e.preventDefault();
    openDeclineModal();
    const missingFields = [];

    if (!remark) {
      missingFields.push('Please Enter Remark to decline leave');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(', ')}`);
      return;
    }
    dispatch({
      type: 'LEAVE_STATUS_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `api/leaves/${userInfo.employee_id}/${id}/reject`,
        {
          approved: false,
          remark,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      // console.log(data);
      dispatch({
        type: 'LEAVE_STATUS_SUCCESS',
        payload: data.employee.AllLeaves,
      });
      // toast.success('Leave Rejected Successfully', {
      //   position: 'top-right',
      // });
      toast.promise(saveSettings({ action: 'approve', leaveId: id }), {
        position: 'top-right',
        loading: 'Rejecting leave...',
        success: <b>Leave Rejected Successfully!</b>,
        error: <b>Could not reject Leave.</b>,
      });

      navigate('/leaves-history');
      // window.location.reload();
      //   siteSurvey.rating = data.rating;
      //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'LEAVE_STATUS_FAIL' });
    }
  };

  const alreadyApproved = () => {
    toast('Already Approved!', {
      icon: ' ✅',

      position: 'top-right',
    });
  };

  const alreadyRejected = () => {
    toast.error('Already Rejected!', {
      icon: ' ✅',

      position: 'top-right',
    });
  };
  const reload = () => {
    window.location.reload();
  };

  const styles = {
    input2: {
      width: '120px',
      padding: '8px',
    },
    inputFocus: {
      borderColor: '#007BFF',
    },
  };

  return (
    <div className="container ">
      <Helmet>
        <title>Leaves</title>
      </Helmet>
      {/* Approval Modal */}
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Leaves-history
          </li>
        </ol>
      </nav>{' '}
      {loading ? (
        <LoadingBox5 />
      ) : error ? (
        <MsgBox className="alert alert-danger">{error}</MsgBox>
      ) : (
        <>
          <h2 className="text-dark">Your Leave History</h2>
          <div className="d-flex">
            <Link className="submitBtn2    " to={'/leave'}>
              Apply{' '}
            </Link>
            <div className="d-flex justify-content-center align-items-center">
              <div className="badge bg-danger mx-1 pt-2 pb-2">
                Total Leaves : {remainingLeaves.totalleaves}
              </div>
              <div className="badge bg-primary mx-1 pt-2 pb-2">
                Sick :{remainingLeaves.sick}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="badge bg-warning text-dark mx-1 pt-2 pb-2">
                Previlege :{remainingLeaves.privilege}
              </div>
              <div className="badge bg-info text-dark mx-1 pt-2 pb-2">
                Casual : {remainingLeaves.casual}
              </div>
              <div
                className="mx-1 d-flex justify-content-center align-items-center "
                style={{ cursor: 'pointer' }}
              >
                <span onClick={() => reload()}>
                  <AiOutlineReload />
                </span>
              </div>
            </div>
            {currentItems.length === 0 ? (
              ''
            ) : (
              <div className="form-group    mb-2 search-input m-1">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search Leave.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
          {currentItems.length === 0 ? (
            <MsgBox className="alert alert-danger">No Leaves Found!</MsgBox>
          ) : (
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th className="col-md-1 text-center">Sr No </th>
                  <th className="col-md-1 text-center">Applied At </th>
                  <th className="col-md-1 text-center">Type</th>
                  <th className="col-md-1 text-center">From </th>
                  <th className="col-md-1 text-center">To </th>

                  <th className="col-md-1 text-center">Status</th>
                  <th className="col-md-1 text-center">Approved At </th>
                  <th className="col-md-1 text-center">Approved By</th>
                  <th className="col-md-1 text-center">Remark</th>
                  <th className="col-md-1 text-center">Remark By</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className={index === hoveredRow ? 'hovered-row' : ''}
                    onMouseEnter={() => handleRowHover(index)}
                    onMouseLeave={() => handleRowHover(null)}
                  >
                    <td className="text-center fw-bold">
                      <Link
                        className="text-decoration-none"
                        to={`/edit-leave/${item.id}`}
                      >
                        {index + 1}
                      </Link>
                    </td>
                    <td className="text-center">
                      {new Date(item.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="text-center fw-bold">{item.type}</td>
                    <td className="text-center">
                      {new Date(item.expectedDateOfLeave).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }
                      )}
                    </td>
                    <td className="text-center">
                      {new Date(item.expectedDateOfreturn).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }
                      )}
                    </td>
                    <td className="text-center">
                      {item.approved === 1 ? (
                        <span className="badge text-bg-success">Approved</span>
                      ) : item.approved === 0 && item.remark !== '' ? (
                        <span className="badge text-bg-danger">Rejected</span>
                      ) : (
                        <span className="badge text-bg-warning">Pending</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.approvedAt !== '' ? (
                        <span className="badge p-2 text-bg-light">
                          {}
                          {new Date(item.createdAt).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      ) : item.approvedAt === '' && item.remark !== '' ? (
                        <span className="badge text-bg-danger">Rejected</span>
                      ) : (
                        <span className="badge text-bg-warning">Pending</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.approvedBy !== '' ? (
                        <span className="badge text-bg-success">
                          {item.approvedBy}
                        </span>
                      ) : item.approvedBy === '' && item.remark !== '' ? (
                        <span className="badge text-bg-danger">Rejected</span>
                      ) : (
                        <span className="badge text-bg-warning">pending</span>
                      )}
                    </td>
                    <td className="text-center" style={{ minWidth: '180px' }}>
                      {item.remark === '' ? (
                        <span className="badge text-bg-warning">pending</span>
                      ) : (
                        <span className="">{item.remark}</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.remarkBy === '' ? (
                        <span className="badge text-bg-warning">pending</span>
                      ) : (
                        <span className="badge text-bg-success">
                          {item.remarkBy}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {<LoadingBox /> && (
        <nav className="pagination-container">
          <ul className="pagination">
            {Array(Math.ceil(filteredData.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link bg-dark border border-white "
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default LeavesHistory;
