// import React from 'react';
// import { useParams } from 'react-router-dom';

// function EditLeave() {
//   const { id } = useParams();

//   return <div className="container">Edit Leave {id}</div>;
// }

// export default EditLeave;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { Helmet } from 'react-helmet';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, Leave: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, allLeaves: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, error: action.payload, loadingUpdate: false };

    default:
      return state;
  }
};

function EditLeave() {
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  const { id } = useParams();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [employee_id, setEmployee_id] = useState(userInfo.employee_id);

  const [name, setName] = useState('');

  const [type, setType] = useState('');

  const [other, setOther] = useState('');

  const [expectedDateOfLeave, setExpectedDateOfLeave] = useState('');

  const [expectedDateOfreturn, setExpectedDateOfreturn] = useState('');

  const [reasonInDetail, setReasonInDetail] = useState('');

  const [mobileNo, setMobileNo] = useState('');
  const saveSettings = async (settings) => {
    // Simulating a delay for API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Normally, here you would make an API call to save the settings
    // For the sake of this example, we're assuming it always succeeds

    return 'Success'; // Return a success message or data
  };
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/leaves/${userInfo.employee_id}/${id}`
        );
        console.log(result);
        setName(result.data.leave.name);
        setType(result.data.leave.type);
        setExpectedDateOfLeave(result.data.leave.expectedDateOfLeave);
        setExpectedDateOfreturn(result.data.leave.expectedDateOfreturn);
        setReasonInDetail(result.data.leave.reasonInDetail);
        setMobileNo(result.data.leave.mobileNo);

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.leave });
        console.log(result.data.leave);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      setTimeout(() => {
        // setEmployees(result.data);
        // setLoading(false);
      }, 2000); // Simulating a 2-second delay
    };

    // setLoading(true);
    fetchData();
  }, [userInfo.employee_id, id]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_REQUEST',
    });
    const missingFields = [];

    if (!reasonInDetail) {
      missingFields.push('Please Enter Reason in details Details');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/leaves/${userInfo.employee_id}/${id}`,
        {
          employee_id,
          name,
          type,
          other,
          expectedDateOfLeave,
          expectedDateOfreturn,
          reasonInDetail,
          mobileNo,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      //   toast.success('Leave Updated successfully');

      toast.promise(saveSettings({ action: 'approve', leaveId: id }), {
        position: 'top-right',
        loading: 'Updating leave...',
        success: <b>Leave Updated Successfully!</b>,
        error: <b>Could not update Leave.</b>,
      });

      navigate('/leaves-history');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className="container1  ">
      <Helmet>
        <title>Update Leave</title>
      </Helmet>
      {/* {loadingUpdate ? (
        <loadingUpdateBox3 />
      ) : ( */}
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
                to={'/leaves-history'}
                // onClick={historyHandler}
              >
                Leaves History
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Update Leaves Application
            </li>
          </ol>
        </nav>{' '}
        <h2 className="text-center text-dark fw-bolder">
          Update Leave Application
        </h2>
        <span className="underline"></span>
        {/* <div className="col-md-12 d-flex justify-content-end mt-3 me-5">
          <Link
            className="historyBtn  bg-warning"
            to={'/leaves-history'}
            // onClick={historyHandler}
          >
            History <FaHistory />{' '}
          </Link>
        </div> */}
        <form onSubmit={SubmitHandler}>
          <div className="form-group mt-4">
            <div className="row d-flex flex-column justify-content-center align-items-center">
              <div className="form-group col-md-5 m-2">
                <label htmlFor="firstName"> Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-5 m-2">
                <label htmlFor="mobileNo">Type of Leave:</label>
                <select
                  id="leave"
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="sick">Sick</option>
                  <option value="privilege">Privilege</option>
                  <option value="casual">casual</option>
                </select>
                {type === 'other' && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Enter leave type"
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                  />
                )}
              </div>{' '}
              <div className="form-group col-md-5 m-2">
                <label htmlFor="leaveDate">Expected Date of Leave:</label>
                <input
                  type="text"
                  className="form-control"
                  id="leaveDate"
                  value={expectedDateOfLeave}
                  onChange={(e) => setExpectedDateOfLeave(e.target.value)}
                />
              </div>
              <div className="form-group col-md-5 m-2">
                <label htmlFor="returnDate">Expected Date of Return:</label>
                <input
                  type="text"
                  className="form-control"
                  id="returnDate"
                  value={expectedDateOfreturn}
                  onChange={(e) => setExpectedDateOfreturn(e.target.value)}
                />
              </div>
              <div className="form-group col-md-5 m-2">
                <label htmlFor="mobileNo">Reason of Leave in Deatil :</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  placeholder="Enter Reason"
                  value={reasonInDetail}
                  onChange={(e) => setReasonInDetail(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group col-md-5 m-2">
                <label htmlFor="mobileNo">Mobile No :</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  placeholder="Enter Mobile No."
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
                <input
                  type="hidden"
                  className="form-control"
                  id="mobileNo"
                  placeholder="Enter Mobile No."
                  value={employee_id}
                  onChange={(e) => setEmployee_id(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex  justify-content-center align-items-center me-5">
              <button
                className="submitBtn px-2 pt-1 pb-1 border-1"
                type="submit"
                style={{ width: '150px' }}
              >
                {loadingUpdate ? <LoadingBox4 /> : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* )} */}
    </div>
  );
}

export default EditLeave;
