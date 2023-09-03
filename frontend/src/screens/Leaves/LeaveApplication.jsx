// import React, { useContext, useEffect, useReducer, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// import './leave.css';
// import axios from 'axios';
// import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
// import { toast } from 'react-hot-toast';
// import { getError } from '../../utils';
// import { Store } from '../../Store';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };

//     case 'FETCH_SUCCESS':
//       return { ...state, leave: action.payload, loading: false };

//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     case 'LEAVE_STATUS_REQUEST':
//       return { ...state, loadingLeaveStatus: true };

//     case 'LEAVE_STATUS_SUCCESS':
//       return { ...state, leave: action.payload, loadingLeaveStatus: false };

//     case 'LEAVE_STATUS_FAIL':
//       return { ...state, loadingLeaveStatus: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// function LeaveApplication() {
//   const [{ loading, error, leave, loadingLeaveStatus }, dispatch] = useReducer(
//     reducer,
//     {
//       leave: {},
//       loading: true,
//       error: '',
//     }
//   );
//   const { employeeid, id } = useParams();

//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   const [isPopupOpenApprove, setIsPopupOpenApprove] = useState(false);
//   const [isPopupOpenDecline, setIsPopupOpenDecline] = useState(false);
//   const [approved, setApproved] = useState(false);
//   const [remark, setRemark] = useState('');

//   useEffect(() => {
//     // Simulate API call or data fetching
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });

//       try {
//         const result = await axios.get(
//           `/api/employees/leave/${employeeid}/${id}`
//         );
//         console.log(result);
//         dispatch({ type: 'FETCH_SUCCESS', payload: result.data.leave });
//         // console.log(result.data.employee.address);
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: err.message });
//       }

//       setTimeout(() => {
//         // setEmployees(result.data);
//         // setLoading(false);
//       }, 2000); // Simulating a 2-second delay
//     };

//     // setLoading(true);
//     fetchData();
//   }, [id, employeeid]);

//   const saveSettings = async (settings) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     return 'Success'; // Return a success message or data
//   };

//   const openApprovalModal = (_id) => {
//     setIsPopupOpenApprove(_id);
//   };

//   const popupHandleApprove = () => {
//     setIsPopupOpenApprove(null);
//   };

//   const popupHandleDecline = () => {
//     setIsPopupOpenDecline(null);
//   };

//   const navigate = useNavigate();

//   const LeaveApproveHandler = async (_id) => {
//     // e.preventDefault();
//     popupHandleApprove();
//     const missingFields = [];

//     if (!remark) {
//       missingFields.push('Please Enter Remark to approve leave');
//     }

//     if (missingFields.length > 0) {
//       toast.error(`${missingFields.join(', ')}`);

//       return;
//     }
//     dispatch({
//       type: 'LEAVE_STATUS_REQUEST',
//     });
//     try {
//       const { data } = await axios.put(
//         `api/employees/leaves/${employeeid}/${_id}/approve`,
//         {
//           approved: true,
//           remark,
//         },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       console.log(data);
//       dispatch({
//         type: 'LEAVE_STATUS_SUCCESS',
//         payload: data.employee.allLeaves,
//       });
//       // toast.success('Leave Approved Successfully', {
//       //   position: 'bottom-right',
//       // });
//       toast.promise(saveSettings({ action: 'approve', leaveId: _id }), {
//         position: 'top-right',
//         loading: 'Approving leave...',
//         success: <b>Leave Approved Successfully!</b>,
//         error: <b>Could not approved Leave.</b>,
//       });
//       // navigate('/leaves-history');
//       // window.location.reload();
//       //   siteSurvey.rating = data.rating;
//       //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
//     } catch (error) {
//       toast.error(getError(error), {
//         position: 'top-right',
//       });
//       dispatch({ type: 'LEAVE_STATUS_FAIL' });
//     }
//   };

//   const openDeclineModal = (_id) => {
//     setIsPopupOpenDecline(_id);
//   };

//   const LeaveDeclineHandler = async (_id) => {
//     // e.preventDefault();
//     openDeclineModal();
//     const missingFields = [];

//     if (!remark) {
//       missingFields.push('Please Enter Remark to decline leave');
//     }

//     if (missingFields.length > 0) {
//       toast.error(`${missingFields.join(', ')}`);
//       return;
//     }
//     dispatch({
//       type: 'LEAVE_STATUS_REQUEST',
//     });
//     try {
//       const { data } = await axios.put(
//         `api/employees/leaves/${employeeid}/${_id}/reject`,
//         {
//           approved: false,
//           remark,
//         },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       console.log(data);
//       dispatch({
//         type: 'LEAVE_STATUS_SUCCESS',
//         payload: data.employee.allLeaves,
//       });
//       // toast.success('Leave Rejected Successfully', {
//       //   position: 'top-right',
//       // });
//       toast.promise(saveSettings({ action: 'approve', leaveId: _id }), {
//         position: 'top-right',
//         loading: 'Rejecting leave...',
//         success: <b>Leave Rejected Successfully!</b>,
//         error: <b>Could not reject Leave.</b>,
//       });

//       navigate('/leaves-history');
//       // window.location.reload();
//       //   siteSurvey.rating = data.rating;
//       //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
//     } catch (err) {
//       toast.error(getError(err), {
//         position: 'bottom-right',
//       });
//       dispatch({ type: 'LEAVE_STATUS_FAIL' });
//     }
//   };

//   const alreadyApproved = () => {
//     toast('Already Approved!', {
//       icon: ' ✅',

//       position: 'top-right',
//     });
//   };

//   const alreadyRejected = () => {
//     toast.error('Already Rejected!', {
//       icon: ' ✅',

//       position: 'top-right',
//     });
//   };

//   return (
//     <div className="container">
//       <div class="card" style={{ maxWidth: '25rem', margin: 'auto' }}>
//         <div class="card-body">
//           <h5 class="card-title">Name : {leave.name}</h5>
//           <hr />
//           <p class="card-text">
//             From :
//             {new Date(leave.expectedDateOfLeave).toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: 'numeric',
//             })}{' '}
//           </p>
//           <p className="card-text">
//             To :{' '}
//             {new Date(leave.expectedDateOfreturn).toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: 'numeric',
//             })}
//           </p>
//           <p class="card-text">Reason : {leave.reasonInDetail}</p>
//           <p class="card-text">Employee Id : {leave.employee_id}</p>
//           <p class="card-text">email : {leave.email}</p>
//           <p class="card-text">Mobile : {leave.mobileNo}</p>

//           <div className="d-flex justify-content-center">
//             <Link
//               // onClick={() => }
//               className="btn btn-sm bg-success text-light  text-decoration-none m-1"
//             >
//               Approve
//             </Link>
//             <Link
//               onClick={() => openDeclineModal(leave._id)}
//               className="btn btn-sm bg-danger   text-light text-decoration-none m-1"
//             >
//               Decline
//             </Link>

//             {isPopupOpenDecline && (
//               <div className="popup-container border-0">
//                 <div className="popup">
//                   <p>
//                     Leave ID : <span className="text-info">{leave._id}</span>
//                     <br />
//                     <hr /> <span>Reason : {leave.reasonInDetail}</span>
//                     <hr />
//                     <div className="d-flex justify-content-evenly">
//                       From :{' '}
//                       <span className="text-success">
//                         {' '}
//                         {new Date(leave.expectedDateOfLeave).toLocaleDateString(
//                           'en-US',
//                           {
//                             day: 'numeric',
//                             month: 'short',
//                             year: 'numeric',
//                           }
//                         )}{' '}
//                       </span>
//                       | To :{' '}
//                       <span className="text-success">
//                         {new Date(
//                           leave.expectedDateOfreturn
//                         ).toLocaleDateString('en-US', {
//                           day: 'numeric',
//                           month: 'short',
//                           year: 'numeric',
//                         })}
//                       </span>
//                     </div>
//                   </p>

//                   <form>
//                     <div className="d-flex mt-3 justify-content-center align-items-center ">
//                       <span>Remark:&nbsp;</span>
//                       <input
//                         type="text"
//                         name=""
//                         id=""
//                         value={remark}
//                         onChange={(e) => setRemark(e.target.value)}
//                       />
//                     </div>
//                     <div className="mt-3  d-flex justify-content-center align-items-center ">
//                       <div className="d-flex flex-column">
//                         <div className="d-flex">
//                           {/* <span>Decline :</span>{' '} */}
//                           <input
//                             type="hidden"
//                             style={{ height: '25px' }}
//                             // checked={approved}
//                             checked
//                             onChange={(e) => setApproved(e.target.value)}
//                             // className="d-flex justify-content-lg-around"
//                             name=""
//                             id=""
//                           />
//                         </div>{' '}
//                       </div>
//                     </div>
//                   </form>
//                   <div className="popup-buttons">
//                     <button
//                       className="popup-button verify"
//                       onClick={() => LeaveDeclineHandler(leave._id)}
//                     >
//                       Decline {loadingLeaveStatus && <LoadingBox4 />}
//                       {/* {loadingCreate && <LoadingBox4 />} */}
//                     </button>
//                     <button
//                       className="popup-button cancel"
//                       onClick={popupHandleDecline}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LeaveApplication;

// import React, { useContext, useEffect, useReducer, useState } from 'react';
// import '../../App.css';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import LoadingBox from '../../components/LoadingBox';
// import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
// import { Store } from '../../Store';
// import { BsShieldCheck } from 'react-icons/bs';
// import { toast } from 'react-hot-toast';
// import { AiOutlineReload } from 'react-icons/ai';
// // import { toast } from 'react-toastify';

// import { getError } from '../../utils';
// import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
// import MsgBox from '../../components/MessageBox/MsgBox';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };

//     case 'FETCH_SUCCESS':
//       return { ...state, leaves: action.payload, loading: false };

//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };

//     case 'LEAVE_STATUS_REQUEST':
//       return { ...state, loadingLeaveStatus: true };

//     case 'LEAVE_STATUS_SUCCESS':
//       return { ...state, leaves: action.payload, loadingLeaveStatus: false };

//     case 'LEAVE_STATUS_FAIL':
//       return { ...state, loadingLeaveStatus: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// function LeaveApplication() {
//   const [{ loading, error, leaves, loadingLeaveStatus }, dispatch] = useReducer(
//     reducer,
//     {
//       leaves: [],
//       loading: true,
//       error: '',
//     }
//   );
//   const { id } = useParams();

//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   // const [leaves, setLeaves] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [isPopupOpenApprove, setIsPopupOpenApprove] = useState(false);
//   const [isPopupOpenDecline, setIsPopupOpenDecline] = useState(false);

//   const [approved, setApproved] = useState(false);
//   const [remark, setRemark] = useState('');
//   const [remainingLeaves, setRemainingLeaves] = useState({
//     totalleaves: 0,
//     sick: 0,
//     privilege: 0,
//     casual: 0,
//   });
//   const itemsPerPage = 5;
//   // const navigate = useNavigate();
//   const saveSettings = async (settings) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     return 'Success'; // Return a success message or data
//   };

//   useEffect(() => {
//     // Simulate API call or data fetching
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });

//       try {
//         const result = await axios.get(`/api/employees/leaves/${id}`);
//         console.log(result.data.leaves);
//         // if (result.data.employee) {
//         //   // Your current logic here
//         // } else {
//         //   console.warn('Employee data not found.');
//         //   // Handle this scenario, maybe dispatch an action to indicate no employee data.
//         // }
//         dispatch({
//           type: 'FETCH_SUCCESS',
//           payload: result.data.leaves,
//         });

//         // Get the leave counts from the fetched data
//         const { leaves, sick, privilege, casual } = result.data.leaves;
//         setRemainingLeaves({
//           totalleaves: leaves,
//           sick: sick,
//           privilege: privilege,
//           casual: casual,
//         });
//         // Calculate remaining leaves based on fetched leave counts
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: err.message });
//       }

//       setTimeout(() => {
//         // setEmployees(result.data);
//         // setLoading(false);
//       }, 2000); // Simulating a 2-second delay
//     };

//     fetchData();
//   }, [id]);

//   const filteredData = leaves.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.expectedDateOfLeave.includes(searchTerm)
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleRowHover = (index) => {
//     setHoveredRow(index);
//   };

//   const openApprovalModal = (_id) => {
//     setIsPopupOpenApprove(_id);
//   };
//   const approveLeave = leaves.find((leave) => leave._id === isPopupOpenApprove);

//   const popupHandleApprove = () => {
//     setIsPopupOpenApprove(null);
//   };

//   const popupHandleDecline = () => {
//     setIsPopupOpenDecline(null);
//   };

//   const navigate = useNavigate();

//   const LeaveApproveHandler = async (_id) => {
//     // e.preventDefault();
//     popupHandleApprove();
//     const missingFields = [];

//     if (!remark) {
//       missingFields.push('Please Enter Remark to approve leave');
//     }

//     if (missingFields.length > 0) {
//       toast.error(`${missingFields.join(', ')}`);

//       return;
//     }
//     dispatch({
//       type: 'LEAVE_STATUS_REQUEST',
//     });
//     try {
//       const { data } = await axios.put(
//         `api/employees/leaves/${id}/${_id}/approve`,
//         {
//           approved: true,
//           remark,
//         },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       console.log(data);
//       dispatch({
//         type: 'LEAVE_STATUS_SUCCESS',
//         payload: data.leaves,
//       });
//       // toast.success('Leave Approved Successfully', {
//       //   position: 'bottom-right',
//       // });
//       toast.promise(saveSettings({ action: 'approve', leaveId: _id }), {
//         position: 'top-right',
//         loading: 'Approving leave...',
//         success: <b>Leave Approved Successfully!</b>,
//         error: <b>Could not approved Leave.</b>,
//       });
//       // navigate('/leaves-history');
//       // window.location.reload();
//       //   siteSurvey.rating = data.rating;
//       //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
//     } catch (error) {
//       toast.error(getError(error), {
//         position: 'top-right',
//       });
//       dispatch({ type: 'LEAVE_STATUS_FAIL' });
//     }
//   };

//   const openDeclineModal = (_id) => {
//     setIsPopupOpenDecline(_id);
//   };
//   const declineLeave = leaves.find((leave) => leave._id === isPopupOpenDecline);

//   const LeaveDeclineHandler = async (_id) => {
//     // e.preventDefault();
//     openDeclineModal();
//     const missingFields = [];

//     if (!remark) {
//       missingFields.push('Please Enter Remark to decline leave');
//     }

//     if (missingFields.length > 0) {
//       toast.error(`${missingFields.join(', ')}`);
//       return;
//     }
//     dispatch({
//       type: 'LEAVE_STATUS_REQUEST',
//     });
//     try {
//       const { data } = await axios.put(
//         `api/employees/leaves/${id}/${_id}/reject`,
//         {
//           approved: false,
//           remark,
//         },
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       console.log(data);
//       dispatch({
//         type: 'LEAVE_STATUS_SUCCESS',
//         payload: data.leaves,
//       });
//       // toast.success('Leave Rejected Successfully', {
//       //   position: 'top-right',
//       // });
//       toast.promise(saveSettings({ action: 'approve', leaveId: _id }), {
//         position: 'top-right',
//         loading: 'Rejecting leave...',
//         success: <b>Leave Rejected Successfully!</b>,
//         error: <b>Could not reject Leave.</b>,
//       });

//       navigate('/leaves-history');
//       // window.location.reload();
//       //   siteSurvey.rating = data.rating;
//       //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
//     } catch (err) {
//       toast.error(getError(err), {
//         position: 'bottom-right',
//       });
//       dispatch({ type: 'LEAVE_STATUS_FAIL' });
//     }
//   };

//   const alreadyApproved = () => {
//     toast('Already Approved!', {
//       icon: ' ✅',

//       position: 'top-right',
//     });
//   };

//   const alreadyRejected = () => {
//     toast.error('Already Rejected!', {
//       icon: ' ✅',

//       position: 'top-right',
//     });
//   };
//   const reload = () => {
//     window.location.reload();
//   };

//   return (
//     <div className="container ">
//       {/* Approval Modal */}
//       <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item">
//             <Link to="/" className="text-decoration-none">
//               Home
//             </Link>{' '}
//           </li>

//           <li className="breadcrumb-item active" aria-current="page">
//             Leaves-history
//           </li>
//         </ol>
//       </nav>{' '}
//       {loading ? (
//         <LoadingBox3 />
//       ) : error ? (
//         <MsgBox className="alert alert-danger">{error}</MsgBox>
//       ) : (
//         <>
//           <h2 className="text-dark">
//             <b>{leaves[0].name} </b>- Leave History
//           </h2>
//           <div className="d-flex">
//             <Link className="submitBtn2    " to={'/leave'}>
//               Apply{' '}
//             </Link>
//             <div className="d-flex justify-content-center align-items-center">
//               <div className="badge bg-danger mx-1 pt-2 pb-2">
//                 Total Leaves : {remainingLeaves.totalleaves}
//               </div>
//               <div className="badge bg-primary mx-1 pt-2 pb-2">
//                 Sick :{remainingLeaves.sick}
//               </div>
//             </div>
//             <div className="d-flex justify-content-center align-items-center">
//               <div className="badge bg-warning text-dark mx-1 pt-2 pb-2">
//                 Previlege :{remainingLeaves.privilege}
//               </div>
//               <div className="badge bg-info text-dark mx-1 pt-2 pb-2">
//                 Casual : {remainingLeaves.casual}
//               </div>
//               <div
//                 className="mx-1 d-flex justify-content-center align-items-center "
//                 style={{ cursor: 'pointer' }}
//               >
//                 <span onClick={() => reload()}>
//                   <AiOutlineReload />
//                 </span>
//               </div>
//             </div>
//             {currentItems.length === 0 ? (
//               ''
//             ) : (
//               <div className="form-group    mb-2 search-input m-1">
//                 <input
//                   type="text"
//                   className="form-control search"
//                   placeholder="Search Leave.."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>
//           {currentItems.length === 0 ? (
//             <MsgBox className="alert alert-danger">No Leaves Found!</MsgBox>
//           ) : (
//             <table className="table table-bordered ">
//               <thead>
//                 <tr>
//                   <th className="col-md-1 text-center">Sr No </th>
//                   <th className="col-md-1 text-center">Applied At </th>
//                   <th className="col-md-1 text-center">Type</th>
//                   <th className="col-md-1 text-center">From </th>
//                   <th className="col-md-1 text-center">To </th>

//                   <th className="col-md-1 text-center">Status</th>
//                   <th className="col-md-1 text-center">Approved At </th>
//                   <th className="col-md-1 text-center">Approved By</th>
//                   <th className="col-md-1 text-center">Remark</th>
//                   <th className="col-md-1 text-center">Remark By</th>
//                   <th className="col-md-1 text-center">Approve</th>
//                   <th className="col-md-1 text-center">Decline</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={index === hoveredRow ? 'hovered-row' : ''}
//                     onMouseEnter={() => handleRowHover(index)}
//                     onMouseLeave={() => handleRowHover(null)}
//                   >
//                     {/* {(index = index + 1)} */}
//                     <td className="text-center fw-bold">
//                       <Link
//                         className="text-decoration-none"
//                         to={`/edit-leave/${item._id}`}
//                       >
//                         {index + 1}
//                       </Link>
//                     </td>
//                     <td className="text-center">
//                       {}{' '}
//                       {new Date(item.createdAt).toLocaleDateString('en-GB', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric',
//                       })}
//                     </td>
//                     <td className="text-center fw-bold">{item.type}</td>
//                     <td className="text-center">
//                       {new Date(item.expectedDateOfLeave).toLocaleDateString(
//                         'en-GB',
//                         {
//                           day: '2-digit',
//                           month: '2-digit',
//                           year: 'numeric',
//                         }
//                       )}
//                     </td>
//                     <td className="text-center">
//                       {}{' '}
//                       {new Date(item.expectedDateOfreturn).toLocaleDateString(
//                         'en-GB',
//                         {
//                           day: '2-digit',
//                           month: '2-digit',
//                           year: 'numeric',
//                         }
//                       )}
//                     </td>
//                     <td className="text-center">
//                       {item.approved === true ? (
//                         <span className="badge text-bg-success">Approved</span>
//                       ) : item.approved === false && item.remark !== '' ? (
//                         <span className="badge text-bg-danger">Rejected</span>
//                       ) : (
//                         <span className="badge text-bg-warning">Pending</span>
//                       )}
//                     </td>{' '}
//                     <td className="text-center">
//                       {item.approvedAt !== '' ? (
//                         <span className="badge p-2 text-bg-light">
//                           {}
//                           {new Date(item.createdAt).toLocaleDateString(
//                             'en-GB',
//                             {
//                               day: '2-digit',
//                               month: '2-digit',
//                               year: 'numeric',
//                             }
//                           )}
//                         </span>
//                       ) : item.approvedAt === '' && item.remark !== '' ? (
//                         <span className="badge text-bg-danger">Rejected</span>
//                       ) : (
//                         <span className="badge text-bg-warning">Pending</span>
//                       )}
//                     </td>
//                     <td className="text-center">
//                       {item.approvedBy !== '' ? (
//                         <span className="badge text-bg-success">
//                           {item.approvedBy}
//                         </span>
//                       ) : item.approvedBy === '' && item.remark !== '' ? (
//                         <span className="badge text-bg-danger">Rejected</span>
//                       ) : (
//                         <span className="badge text-bg-warning">pending</span>
//                       )}
//                     </td>
//                     {/* <td className="">{item.remark}</td>
//                   <td className="text-center">{item.remarkBy}</td> */}
//                     <td className="text-center">
//                       {item.remark === '' ? (
//                         <span className="badge text-bg-warning">pending</span>
//                       ) : (
//                         <span className="">{item.remark}</span>
//                       )}
//                     </td>
//                     <td className="text-center">
//                       {item.remarkBy === '' ? (
//                         <span className="badge text-bg-warning">pending</span>
//                       ) : (
//                         <span className="badge text-bg-success">
//                           {item.remarkBy}
//                         </span>
//                       )}
//                     </td>
//                     {item.approved ? (
//                       <td className="text-center fw-bold">
//                         {/* <button className="btn btn-sm "> */}
//                         <BsShieldCheck
//                           style={{
//                             color: 'black',
//                             fontWeight: '800',
//                             fontSize: '15px',
//                             cursor: 'pointer',
//                           }}
//                           className="approve-button"
//                           onClick={() => alreadyApproved()}
//                         />
//                       </td>
//                     ) : (
//                       <td className="text-center fw-bold">
//                         {/* <button className="btn btn-sm "> */}
//                         <BsShieldCheck
//                           style={{
//                             color: 'lime',
//                             fontWeight: '800',
//                             fontSize: '15px',
//                             cursor: 'pointer',
//                           }}
//                           className="approve-button "
//                           onClick={() => openApprovalModal(item._id)}
//                         />
//                         {isPopupOpenApprove && (
//                           <div className="popup-container">
//                             <div className="popup">
//                               <p>
//                                 Leave ID :{' '}
//                                 <span className="text-info">
//                                   {approveLeave._id}
//                                 </span>
//                                 <br />
//                                 <hr />{' '}
//                                 <span>
//                                   Reason : {approveLeave.reasonInDetail}
//                                 </span>
//                                 <hr />
//                                 <div className="d-flex justify-content-evenly">
//                                   From :{' '}
//                                   <span className="text-success">
//                                     {' '}
//                                     {new Date(
//                                       approveLeave.expectedDateOfLeave
//                                     ).toLocaleDateString('en-US', {
//                                       day: 'numeric',
//                                       month: 'short',
//                                       year: 'numeric',
//                                     })}{' '}
//                                   </span>
//                                   | To :{' '}
//                                   <span className="text-success">
//                                     {new Date(
//                                       approveLeave.expectedDateOfreturn
//                                     ).toLocaleDateString('en-US', {
//                                       day: 'numeric',
//                                       month: 'short',
//                                       year: 'numeric',
//                                     })}
//                                   </span>
//                                 </div>
//                               </p>
//                               <form>
//                                 <div className="d-flex mt-3 justify-content-center align-items-center ">
//                                   <span>Remark:&nbsp;</span>
//                                   <input
//                                     type="text"
//                                     name=""
//                                     id=""
//                                     value={remark}
//                                     onChange={(e) => setRemark(e.target.value)}
//                                     required // Remark is required when not approved
//                                   />
//                                 </div>
//                                 <div className="mt-3  d-flex justify-content-center align-items-center ">
//                                   <div className="d-flex flex-column">
//                                     <div className="d-flex">
//                                       {/* <span>Approve :</span>{' '} */}
//                                       <input
//                                         type="hidden"
//                                         style={{ height: '25px' }}
//                                         checked={approved}
//                                         onChange={(e) =>
//                                           setApproved(e.target.value)
//                                         }
//                                         // className="d-flex justify-content-lg-around"
//                                         name=""
//                                         id=""
//                                       />
//                                     </div>{' '}
//                                   </div>
//                                 </div>
//                               </form>
//                               <div className="popup-buttons">
//                                 <button
//                                   className="popup-button verify"
//                                   onClick={() =>
//                                     LeaveApproveHandler(approveLeave._id)
//                                   }
//                                 >
//                                   Approve
//                                   {loadingLeaveStatus && <LoadingBox4 />}
//                                 </button>
//                                 <button
//                                   className="popup-button cancel"
//                                   onClick={popupHandleApprove}
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                     )}
//                     {item.approved === false && item.remark !== '' ? (
//                       <td className="text-center fw-bold">
//                         {/* <button className="btn btn-sm "> */}
//                         <BsShieldCheck
//                           style={{
//                             color: 'black',
//                             fontWeight: '800',
//                             fontSize: '15px',
//                             cursor: 'pointer',
//                           }}
//                           className="decline-button"
//                           onClick={() => alreadyRejected()}
//                         />
//                       </td>
//                     ) : (
//                       <td className="text-center fw-bold">
//                         {/* <button className="btn btn-sm "> */}
//                         <BsShieldCheck
//                           style={{
//                             color: 'red ',
//                             fontWeight: '800',
//                             fontSize: '15px',
//                             cursor: 'pointer',
//                           }}
//                           className="decline-button"
//                           onClick={() => openDeclineModal(item._id)}
//                         />

//                         {isPopupOpenDecline && (
//                           <div className="popup-container border-0">
//                             <div className="popup">
//                               <p>
//                                 Leave ID :{' '}
//                                 <span className="text-info">
//                                   {declineLeave._id}
//                                 </span>
//                                 <br />
//                                 <hr />{' '}
//                                 <span>
//                                   Reason : {declineLeave.reasonInDetail}
//                                 </span>
//                                 <hr />
//                                 <div className="d-flex justify-content-evenly">
//                                   From :{' '}
//                                   <span className="text-success">
//                                     {' '}
//                                     {new Date(
//                                       declineLeave.expectedDateOfLeave
//                                     ).toLocaleDateString('en-US', {
//                                       day: 'numeric',
//                                       month: 'short',
//                                       year: 'numeric',
//                                     })}{' '}
//                                   </span>
//                                   | To :{' '}
//                                   <span className="text-success">
//                                     {new Date(
//                                       declineLeave.expectedDateOfreturn
//                                     ).toLocaleDateString('en-US', {
//                                       day: 'numeric',
//                                       month: 'short',
//                                       year: 'numeric',
//                                     })}
//                                   </span>
//                                 </div>
//                               </p>

//                               <form>
//                                 <div className="d-flex mt-3 justify-content-center align-items-center ">
//                                   <span>Remark:&nbsp;</span>
//                                   <input
//                                     type="text"
//                                     name=""
//                                     id=""
//                                     value={remark}
//                                     onChange={(e) => setRemark(e.target.value)}
//                                   />
//                                 </div>
//                                 <div className="mt-3  d-flex justify-content-center align-items-center ">
//                                   <div className="d-flex flex-column">
//                                     <div className="d-flex">
//                                       {/* <span>Decline :</span>{' '} */}
//                                       <input
//                                         type="hidden"
//                                         style={{ height: '25px' }}
//                                         // checked={approved}
//                                         checked
//                                         onChange={(e) =>
//                                           setApproved(e.target.value)
//                                         }
//                                         // className="d-flex justify-content-lg-around"
//                                         name=""
//                                         id=""
//                                       />
//                                     </div>{' '}
//                                   </div>
//                                 </div>
//                               </form>
//                               <div className="popup-buttons">
//                                 <button
//                                   className="popup-button verify"
//                                   onClick={() =>
//                                     LeaveDeclineHandler(declineLeave._id)
//                                   }
//                                 >
//                                   Decline{' '}
//                                   {loadingLeaveStatus && <LoadingBox4 />}
//                                   {/* {loadingCreate && <LoadingBox4 />} */}
//                                 </button>
//                                 <button
//                                   className="popup-button cancel"
//                                   onClick={popupHandleDecline}
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </>
//       )}
//       {<LoadingBox /> && (
//         <nav className="pagination-container">
//           <ul className="pagination">
//             {Array(Math.ceil(filteredData.length / itemsPerPage))
//               .fill()
//               .map((_, index) => (
//                 <li
//                   key={index}
//                   className={`page-item ${
//                     currentPage === index + 1 ? 'active' : ''
//                   }`}
//                 >
//                   <button
//                     className="page-link bg-dark border border-white "
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//           </ul>
//         </nav>
//       )}
//     </div>
//   );
// }

// export default LeaveApplication;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
      return { ...state, leaves: action.payload, loadingLeaveStatus: false };

    case 'LEAVE_STATUS_FAIL':
      return { ...state, loadingLeaveStatus: false, error: action.payload };

    default:
      return state;
  }
};

function LeaveApplication() {
  const [{ loading, error, leaves, loadingLeaveStatus }, dispatch] = useReducer(
    reducer,
    {
      leaves: [],
      loading: true,
      error: '',
    }
  );
  const { id } = useParams();

  const { state } = useContext(Store);
  const { userInfo } = state;
  // const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
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
        const result = await axios.get(`/api/employees/details/${id}`);
        setName(result.data.employee.name);
        console.log(result.data.employee.name);
        // console.log(result.data.employee.allLeaves);
        if (result.data.employee) {
          // Your current logic here
        } else {
          console.warn('Employee data not found.');
          // Handle this scenario, maybe dispatch an action to indicate no employee data.
        }
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.employee.allLeaves,
        });

        // Get the leave counts from the fetched data
        const { leaves, sick, privilege, casual } = result.data.employee;
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
  }, [id]);

  const filteredData = leaves.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.expectedDateOfLeave.includes(searchTerm)
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

  const openApprovalModal = (_id) => {
    setIsPopupOpenApprove(_id);
  };
  const approveLeave = leaves.find((leave) => leave._id === isPopupOpenApprove);

  const popupHandleApprove = () => {
    setIsPopupOpenApprove(null);
  };

  const popupHandleDecline = () => {
    setIsPopupOpenDecline(null);
  };

  const navigate = useNavigate();

  const LeaveApproveHandler = async (_id) => {
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
        `/api/employees/leaves/${id}/${_id}/approve`,
        {
          approved: true,
          remark,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'LEAVE_STATUS_SUCCESS',
        payload: data.employee.allLeaves,
      });
      // toast.success('Leave Approved Successfully', {
      //   position: 'bottom-right',
      // });
      toast.promise(saveSettings({ action: 'approve', leaveId: _id }), {
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

  const openDeclineModal = (_id) => {
    setIsPopupOpenDecline(_id);
  };
  const declineLeave = leaves.find((leave) => leave._id === isPopupOpenDecline);

  const LeaveDeclineHandler = async (_id) => {
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
        `/api/employees/leaves/${id}/${_id}/reject`,
        {
          approved: false,
          remark,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'LEAVE_STATUS_SUCCESS',
        payload: data.employee.allLeaves,
      });
      // toast.success('Leave Rejected Successfully', {
      //   position: 'top-right',
      // });
      toast.promise(saveSettings({ action: 'approve', leaveId: _id }), {
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

  return (
    <div className="container ">
      {/* Approval Modal */}
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>
          <li className="breadcrumb-item">
            <Link to={`/employees`} className="text-decoration-none">
              Employees{' '}
            </Link>{' '}
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/employeedetails/${id}`}
              className="text-decoration-none"
            >
              Employee Details
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
          <h2 className="text-dark">
            <b>{name}</b>- Leave History
          </h2>
          <div className="d-flex">
            {/* <Link className="submitBtn2    " to={'/leave'}>
              Apply{' '}
            </Link> */}
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
                  <th className="col-md-1 text-center">Approve</th>
                  <th className="col-md-1 text-center">Decline</th>
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
                    {/* {(index = index + 1)} */}
                    <td className="text-center fw-bold">
                      <Link
                        className="text-decoration-none"
                        to={`/edit-leave/${item._id}`}
                      >
                        {index + 1}
                      </Link>
                    </td>
                    <td className="text-center">
                      {}{' '}
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
                      {}{' '}
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
                      {item.approved === true ? (
                        <span className="badge text-bg-success">Approved</span>
                      ) : item.approved === false && item.remark !== '' ? (
                        <span className="badge text-bg-danger">Rejected</span>
                      ) : (
                        <span className="badge text-bg-warning">Pending</span>
                      )}
                    </td>{' '}
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
                    {/* <td className="">{item.remark}</td>
                  <td className="text-center">{item.remarkBy}</td> */}
                    <td className="text-center">
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
                    {item.approved ? (
                      <td className="text-center fw-bold">
                        {/* <button className="btn btn-sm "> */}
                        <BsShieldCheck
                          style={{
                            color: 'black',
                            fontWeight: '800',
                            fontSize: '15px',
                            cursor: 'pointer',
                          }}
                          className="approve-button"
                          onClick={() => alreadyApproved()}
                        />
                      </td>
                    ) : (
                      <td className="text-center fw-bold">
                        {/* <button className="btn btn-sm "> */}
                        <BsShieldCheck
                          style={{
                            color: 'lime',
                            fontWeight: '800',
                            fontSize: '15px',
                            cursor: 'pointer',
                          }}
                          className="approve-button "
                          onClick={() => openApprovalModal(item._id)}
                        />
                        {isPopupOpenApprove && (
                          <div className="popup-container">
                            <div className="popup">
                              <p>
                                Leave ID :{' '}
                                <span className="text-info">
                                  {approveLeave._id}
                                </span>
                                <br />
                                <hr />{' '}
                                <span>
                                  Reason : {approveLeave.reasonInDetail}
                                </span>
                                <hr />
                                <div className="d-flex justify-content-evenly">
                                  From :{' '}
                                  <span className="text-success">
                                    {' '}
                                    {new Date(
                                      approveLeave.expectedDateOfLeave
                                    ).toLocaleDateString('en-US', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}{' '}
                                  </span>
                                  | To :{' '}
                                  <span className="text-success">
                                    {new Date(
                                      approveLeave.expectedDateOfreturn
                                    ).toLocaleDateString('en-US', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>
                              </p>
                              <form>
                                <div className="d-flex mt-3 justify-content-center align-items-center ">
                                  <span>Remark:&nbsp;</span>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    required // Remark is required when not approved
                                  />
                                </div>
                                <div className="mt-3  d-flex justify-content-center align-items-center ">
                                  <div className="d-flex flex-column">
                                    <div className="d-flex">
                                      {/* <span>Approve :</span>{' '} */}
                                      <input
                                        type="hidden"
                                        style={{ height: '25px' }}
                                        checked={approved}
                                        onChange={(e) =>
                                          setApproved(e.target.value)
                                        }
                                        // className="d-flex justify-content-lg-around"
                                        name=""
                                        id=""
                                      />
                                    </div>{' '}
                                  </div>
                                </div>
                              </form>
                              <div className="popup-buttons">
                                <button
                                  className="popup-button verify"
                                  onClick={() =>
                                    LeaveApproveHandler(approveLeave._id)
                                  }
                                >
                                  Approve
                                  {loadingLeaveStatus && <LoadingBox4 />}
                                </button>
                                <button
                                  className="popup-button cancel"
                                  onClick={popupHandleApprove}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    )}
                    {item.approved === false && item.remark !== '' ? (
                      <td className="text-center fw-bold">
                        {/* <button className="btn btn-sm "> */}
                        <BsShieldCheck
                          style={{
                            color: 'black',
                            fontWeight: '800',
                            fontSize: '15px',
                            cursor: 'pointer',
                          }}
                          className="decline-button"
                          onClick={() => alreadyRejected()}
                        />
                      </td>
                    ) : (
                      <td className="text-center fw-bold">
                        {/* <button className="btn btn-sm "> */}
                        <BsShieldCheck
                          style={{
                            color: 'red ',
                            fontWeight: '800',
                            fontSize: '15px',
                            cursor: 'pointer',
                          }}
                          className="decline-button"
                          onClick={() => openDeclineModal(item._id)}
                        />

                        {isPopupOpenDecline && (
                          <div className="popup-container border-0">
                            <div className="popup">
                              <p>
                                Leave ID :{' '}
                                <span className="text-info">
                                  {declineLeave._id}
                                </span>
                                <br />
                                <hr />{' '}
                                <span>
                                  Reason : {declineLeave.reasonInDetail}
                                </span>
                                <hr />
                                <div className="d-flex justify-content-evenly">
                                  From :{' '}
                                  <span className="text-success">
                                    {' '}
                                    {new Date(
                                      declineLeave.expectedDateOfLeave
                                    ).toLocaleDateString('en-US', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}{' '}
                                  </span>
                                  | To :{' '}
                                  <span className="text-success">
                                    {new Date(
                                      declineLeave.expectedDateOfreturn
                                    ).toLocaleDateString('en-US', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>
                              </p>

                              <form>
                                <div className="d-flex mt-3 justify-content-center align-items-center ">
                                  <span>Remark:&nbsp;</span>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                  />
                                </div>
                                <div className="mt-3  d-flex justify-content-center align-items-center ">
                                  <div className="d-flex flex-column">
                                    <div className="d-flex">
                                      {/* <span>Decline :</span>{' '} */}
                                      <input
                                        type="hidden"
                                        style={{ height: '25px' }}
                                        // checked={approved}
                                        checked
                                        onChange={(e) =>
                                          setApproved(e.target.value)
                                        }
                                        // className="d-flex justify-content-lg-around"
                                        name=""
                                        id=""
                                      />
                                    </div>{' '}
                                  </div>
                                </div>
                              </form>
                              <div className="popup-buttons">
                                <button
                                  className="popup-button verify"
                                  onClick={() =>
                                    LeaveDeclineHandler(declineLeave._id)
                                  }
                                >
                                  Decline{' '}
                                  {loadingLeaveStatus && <LoadingBox4 />}
                                  {/* {loadingCreate && <LoadingBox4 />} */}
                                </button>
                                <button
                                  className="popup-button cancel"
                                  onClick={popupHandleDecline}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    )}
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

export default LeaveApplication;
