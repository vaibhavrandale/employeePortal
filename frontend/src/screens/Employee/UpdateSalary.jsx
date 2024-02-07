import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SALARY_REQUEST':
      return { ...state, loadingSalary: true };

    case 'FETCH_SALARY_SUCCESS':
      return { ...state, payslip: action.payload, loadingSalary: false };

    case 'FETCH_SALARY_FAIL':
      return { ...state, loadingSalary: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, payslip: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};

const UpdateSalary = () => {
  const { employeeid, id } = useParams();
  //   console.log(employeeid, id);
  const [{ loading, error, payslip, loadingSalary, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      payslip: {},
      loading: true,
      error: '',
    });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [ctc, setCtc] = useState('');
  const [salarygroup, setSalarygroup] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const SalaryData = async () => {
      dispatch({ type: 'FETCH_SALARY_REQUEST' });
      try {
        const result = await axios.get(`/api/payslip/${employeeid}/${id}`);
        console.log(result);
        dispatch({
          type: 'FETCH_SALARY_SUCCESS',
          payload: result.data.payslip,
        });
        // console.log(result.data.employee.address);
        setCtc(result.data.ctc);
        setSalarygroup(result.data.salarygroup);
      } catch (err) {
        dispatch({ type: 'FETCH_SALARY_FAIL', payload: err.message });
      }
    };

    SalaryData();
  }, [employeeid, id]);

  const UpdateSalaryHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/payslip/updatepayslip/${employeeid}/${id}`,
        {
          ctc,
          salarygroup,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);

      // dispatch({ type: 'REFRESH_ADDRESS', payload: employees });
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
      });

      const custommessage = data.message;

      toast.success(custommessage, {
        position: 'top-center',
      });
      navigate(`/employeedetails/${employeeid}`);
    } catch (err) {
      toast.error(getError(err), {
        position: 'top-center',
      });
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  return (
    <div className="container">
      <form>
        <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
          <h4 className="fw-bold text-success text-center py-1">
            Update Salary Details
          </h4>

          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>CTC</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="ctc"
                    name="ctc"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Salary Group</td>
                <td>
                  <input
                    type="text"
                    className="form-control "
                    id="salarygroup"
                    name="salarygroup"
                    value={salarygroup}
                    onChange={(e) => setSalarygroup(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <button
              // onClick={(e) => DeclineHandler(leaveId)
              onClick={UpdateSalaryHandler}
              className="btn btn-sm btn-success m-1"
              style={{ width: '170px' }}
            >
              {loadingSalary ? (
                <>
                  updating Salary Details
                  {/* LoadingBox4 component */}
                </>
              ) : (
                'Update Salary Details'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateSalary;
