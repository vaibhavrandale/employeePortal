import React, { useContext, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, leavelapse: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, leavelapse: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};

const EditLapsedLeaves = () => {
  const { id } = useParams();
  const [{ loading, loadingUpdate, leavelapse }, dispatch] = useReducer(
    reducer,
    {
      leavelapse: {},
      loading: true,
      error: '',
    }
  );

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [NoOfLeaveLapsed, setNoOfleaveLapsed] = useState(0);
  const [LeavetypeLapsed, setLeavetypeLapsed] = useState('');
  const [leaves, setLeaves] = useState(0);
  const [casual, setCasual] = useState(0);
  const [isLapsed, setIsLapsed] = useState(0);
  const [privilege, setPrivilege] = useState(0);
  const [sick, setsick] = useState(0);
  const [year, setYear] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/leaves/leave-lapse/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.leavelapse });
        console.log(result.data);

        setNoOfleaveLapsed(result.data.leavelapse.NoofleaveLapsed);
        setLeavetypeLapsed(result.data.leavelapse.LeavetypeLapsed);
        setLeaves(result.data.leavelapse.leaves);
        setCasual(result.data.leavelapse.casual);
        setIsLapsed(result.data.leavelapse.isLapsed);
        setNoOfleaveLapsed(result.data.leavelapse.NoofleaveLapsed);
        setPrivilege(result.data.leavelapse.privilege);
        setsick(result.data.leavelapse.sick);
        setYear(result.data.leavelapse.year);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [userInfo.token, id]);

  //   const UpdateLapsedLeaveHandler = (e) => {
  //     e.preventDefault();
  //     toast.success('Updated Successfully');
  //   };

  const UpdateLapsedLeaveHandler = async (e) => {
    e.preventDefault();
    const missingFields = [];

    if (!NoOfLeaveLapsed) {
      missingFields.push('Please Leave type Lapsed');
    }
    if (!LeavetypeLapsed) {
      missingFields.push('Please Leave type Lapsed');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(', ')}`);

      return;
    }
    dispatch({
      type: 'UPDATE_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/leaves/leave-lapse/${id}`,
        {
          NoOfLeaveLapsed,
          LeavetypeLapsed,
          leaves,
          casual,
          isLapsed,
          privilege,
          sick,
          year,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
      });
      // toast.success('Leave Approved Successfully', {
      //   position: 'bottom-right',
      // });
      toast.success('lapse updated successfullt');
      navigate(`/lapsed-leaves`);
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  if (!leavelapse) {
    <div className="badge bg-danger">Leave lapse for this id is not found</div>;
  }

  return (
    <div className="container">
      <h3 className="text-center fw-bold"> Edit Lapsed Leaves -{id}</h3>
      <div className="card p-2" style={{ width: '650px', margin: 'auto' }}>
        <form className="" onSubmit={UpdateLapsedLeaveHandler}>
          <div className="mb-3">
            <label htmlFor="leaves" className="form-label">
              Leaves
            </label>
            <input
              type="text"
              className="form-control"
              id="leaves"
              value={leaves}
              onChange={(e) => setLeaves(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sick" className="form-label">
              Sick Leave
            </label>
            <input
              type="text"
              className="form-control"
              id="sick"
              value={sick}
              onChange={(e) => setsick(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="privilege" className="form-label">
              Privilege Leave
            </label>
            <input
              type="text"
              className="form-control"
              id="privilege"
              value={privilege}
              onChange={(e) => setPrivilege(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="casual" className="form-label">
              Casual Leave
            </label>
            <input
              type="text"
              className="form-control"
              id="casual"
              value={casual}
              onChange={(e) => setCasual(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="casual" className="form-label">
              Leave type Lapsed
            </label>
            <input
              type="text"
              className="form-control"
              id="casual"
              value={LeavetypeLapsed}
              onChange={(e) => setLeavetypeLapsed(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="casual" className="form-label">
              No of leave Lapsed
            </label>
            <input
              type="number"
              className="form-control"
              id="casual"
              value={NoOfLeaveLapsed}
              onChange={(e) => setNoOfleaveLapsed(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="casual" className="form-label">
              isLapsed
            </label>
            <input
              type="text"
              className="form-control"
              id="casual"
              value={isLapsed}
              onChange={(e) => setIsLapsed(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="text"
              className="form-control"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-warning">
              {loadingUpdate ? (
                <>
                  updating....
                  <LoadingBox4 />
                </>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLapsedLeaves;
