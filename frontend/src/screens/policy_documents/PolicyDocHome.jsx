// import React, { useContext, useEffect, useReducer, useState } from 'react';
// import './policy.css';
// import { Link } from 'react-router-dom';
// import { FaLink } from 'react-icons/fa';
// import { Store } from '../../Store';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { getError } from '../../utils';
// import { RiDeleteBinLine } from 'react-icons/ri';
// import LoadingBox1 from '../../components/LoadingBox1';
// import PdfComp from '../PdfComp';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };

//     case 'FETCH_SUCCESS':
//       return { ...state, allImage: action.payload, loading: false };

//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };

//     case 'DELETE_SUCCESS':
//       return { ...state, loadingDelete: false, successDelete: true };

//     case 'DELETE_FAIL':
//       return { ...state, loadingDelete: false };

//     case 'DELETE_RESET':
//       return { ...state, loadingDelete: false, successDelete: false };

//     default:
//       return state;
//   }
// };

// const PolicyDocHome = () => {
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { userInfo } = state;
//   const [{ loading, allImage, createloading, successDelete }, dispatch] =
//     useReducer(reducer, {
//       allImage: [],
//       loading: true,
//       error: '',
//     });

//   const [link, setLink] = useState('');
//   const [name, setName] = useState('');
//   const [deleteModalId, setDeleteModalId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [viewPdfModalVisible, setViewPdfModalVisible] = useState(false);

//   const [filename, setFilename] = useState([]);
//   const [title, setTitle] = useState('');
//   // const [allImage, setAllImage] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);

//   // useEffect(() => {
//   //   // Simulate API call or data fetching
//   //   const fetchData = async () => {
//   //     dispatch({ type: 'FETCH_REQUEST' });

//   //     try {
//   //       const result = await axios.get('/get-files');
//   //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data.data });
//   //       console.log(result.data);
//   //     } catch (err) {
//   //       dispatch({ type: 'FETCH_FAIL', payload: err.message });
//   //     }
//   //   };
//   //   if (successDelete) {
//   //     dispatch({ type: 'DELETE_RESET' });
//   //   } else {
//   //     fetchData();
//   //   }
//   //   // fetchData();
//   // }, [successDelete]);

//   useEffect(() => {
//     if (successDelete) {
//       dispatch({ type: 'DELETE_RESET' });
//     } else {
//       getPdf();
//     }
//   }, [successDelete]);

//   const getPdf = async () => {
//     const result = await axios.get('/get-files');
//     console.log(result.data.data);
//     dispatch({ type: 'FETCH_SUCCESS', payload: result.data.data });

//     // setAllImage(result.data.data);
//   };

//   const deleteHandler = async (id) => {
//     setDeleteModalId(id);

//     try {
//       await axios.delete(`/files/${id}`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       });
//       toast.success(`policy deleted successfully`);
//       dispatch({
//         type: 'DELETE_SUCCESS',
//       });
//     } catch (err) {
//       toast.error(getError(err));
//       dispatch({
//         type: 'DELETE_FAIL',
//       });
//     } finally {
//       setShowModal(false);
//     }
//   };

//   const showPdf = (pdf) => {
//     setPdfFile(`/files/${pdf}`);
//   };

//   return (
//     <div className="container">
//       <h3 className="text-center fw-bold my-3">Policy Documents</h3>

//       <div className=" my-2 text-dark fw-bold">
//         <div className="d-flex justify-content-end">
//           {userInfo.isHr === 1 ? (
//             <Link to="/add-policy" className="btn btn-sm btn-warning">
//               ADD
//             </Link>
//           ) : (
//             ''
//           )}
//         </div>
//         <div className="d-flex flex-wrap justify-content-center">
//           {loading ? (
//             <LoadingBox1 />
//           ) : allImage.length === 0 ? (
//             <div className="text-center mt-3">
//               <span className="badge  bg-danger p-3 fs-6">No policy found</span>
//             </div>
//           ) : (
//             allImage.map((policy, index) => (
// <div className="card m-1 policyCard" key={index}>
//   <img src="/images/icons/policy.jpg" alt={policy.title} />
//   <p className=" my-2 text-dark fw-bold">{policy.title}</p>
//   <div className="d-flex">
//     <Link
//       className="text-decoration-none btn btn-sm btn-link m-1"
//       onClick={() => showPdf(policy.filename)}
//       type="button"
//       data-bs-toggle="modal"
//       data-bs-target={`#exampleModal_${policy.id}`}
//     >
//       View&nbsp;
//       <FaLink />
//     </Link>
//     {/* ----------------------view modal------------------- */}
//     <div
//       className="modal fade"
//       id={`exampleModal_${policy.id}`}
//       tabindex="-1"
//       aria-labelledby={`exampleModal_${policy.id}`}
//       aria-hidden="true"
//     >
//       <div className="modal-dialog  modal-xl">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5
//               className="modal-title"
//               id={`exampleModal_${policy.id}`}
//             >
//               Policy- {policy.title}
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <PdfComp pdfFile={pdfFile} />
//           </div>
//         </div>
//       </div>
//     </div>
//     {/* ----------------------view modal------------------- */}

//     {userInfo.isHr === 1 ? (
//       <>
//         <Link
//           className="mx-1 text-danger m-1"
//           onClick={() => setShowModal(true)}
//         >
//           <RiDeleteBinLine />
//         </Link>

//         {/* --------------------delete modal---------------------------------- */}

//         <div
//           className={`modal fade ${showModal ? 'show' : ''}`}
//           style={{ display: showModal ? 'block' : 'none' }}
//           tabIndex="-1"
//           role="dialog"
//           aria-labelledby="deleteModal"
//           aria-hidden={!showModal}
//         >
//           <div className="modal-dialog modal-dialog-centered modal-sm">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="deleteModalLabel">
//                   Confirmation
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 Are you sure to delete{' '}
//                 <span className="text-danger">
//                   {policy.title}
//                 </span>{' '}
//                 policy ?
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary btn-sm"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger btn-sm"
//                   onClick={(e) => deleteHandler(policy.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//                       {/* --------------------delete modal---------------------------------- */}
//                     </>
//                   ) : (
//                     ''
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="my-2 d-flex justify-content-center">
//           {' '}
//           {/* <PdfComp pdfFile={pdfFile} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PolicyDocHome;

import React, { useContext } from 'react';
import { Store } from '../../Store';
import { Link } from 'react-router-dom';
import { FaLink } from 'react-icons/fa6';
import './policy.css';
import PolicyCard from './PolicyCard';

const PolicyDocHome = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  return (
    <div className="container">
      <h3 className="fw-bold text-center">Taypro's Policies</h3>
      <PolicyCard />
    </div>
  );
};

export default PolicyDocHome;
