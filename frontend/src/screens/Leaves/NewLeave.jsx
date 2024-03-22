import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };

    case 'CREATE_SUCCESS':
      return { ...state, allLeaves: action.payload, loadingCreate: false };

    case 'CREATE_FAIL':
      return { ...state, error: action.payload, loadingCreate: false };

    default:
      return state;
  }
};

function NewLeave() {
  const [{ loadingCreate }, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [employee_id, setEmployee_id] = useState(userInfo.employee_id);

  const [name, setName] = useState(userInfo.NAME);

  const [type, setType] = useState('');

  const [other, setOther] = useState('');

  const [expectedDateOfLeave, setExpectedDateOfLeave] = useState('');

  const [expectedDateOfreturn, setExpectedDateOfreturn] = useState('');

  const [reasonInDetail, setReasonInDetail] = useState('');

  const [mobileNo, setMobileNo] = useState(userInfo.mobile_no);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
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
      const { data } = await axios.post(
        `/api/leaves/apply-leave/${userInfo.employee_id}`,
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
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Leave Applied successfully', {
        position: 'bottom-right',
      });
      navigate('/leaves-history');
    } catch (error) {
      toast.error(getError(error), {
        position: 'bottom-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="container1  ">
      {/* {loadingCreate ? (
        <loadingCreateBox3 />
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
              Leaves Application
            </li>
          </ol>
        </nav>{' '}
        <h2 className="text-center text-dark fw-bolder">Leave Application</h2>
        <span className="underline"></span>
        <form>
          <div className="form-group mt-4">
            <div className="row col-md-12 d-flex flex-column justify-content-center align-items-center">
              <div className="form-group col-md-5 my-2">
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
                  <option value="casual">Casual</option>
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
              </div>
              <div className="form-group col-md-5 my-2">
                <label htmlFor="leaveDate">From:</label>
                <input
                  type="date"
                  className="form-control"
                  id="leaveDate"
                  value={expectedDateOfLeave}
                  onChange={(e) => setExpectedDateOfLeave(e.target.value)}
                />
              </div>
              <div className="form-group col-md-5 my-2">
                <label htmlFor="returnDate">To:</label>
                <input
                  type="date"
                  className="form-control"
                  id="returnDate"
                  value={expectedDateOfreturn}
                  onChange={(e) => setExpectedDateOfreturn(e.target.value)}
                />
              </div>
              <div className="form-group  col-md-5 my-2">
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

              <div className="form-group  col-md-10 ">
                <input
                  type="hidden"
                  className="form-control"
                  id="mobileNo"
                  placeholder="Enter Mobile No."
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
                <input
                  type="hidden"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
            <div className="d-flex justify-content-end align-items-center me-5">
              <button
                className="submitBtn px-2 pt-1 pb-1"
                type="button"
                onClick={SubmitHandler}
                style={{ marginRight: '50px' }}
              >
                {loadingCreate ? (
                  <>
                    Applying&nbsp;
                    <LoadingBox4 />
                  </>
                ) : (
                  'Apply'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* )} */}
    </div>
  );
}

export default NewLeave;
