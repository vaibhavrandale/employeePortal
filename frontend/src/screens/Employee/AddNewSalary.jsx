// import React from 'react'

// const AddNewSalary = () => {
//   return (
//     <div>AddNewSalary</div>
//   )
// }

// export default AddNewSalary

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
      return { ...state, employee: action.payload, loadingSalary: false };

    case 'FETCH_SALARY_FAIL':
      return { ...state, loadingSalary: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'CREATE_SUCCESS':
      return { ...state, payslip: action.payload, loadingUpdate: false };

    case 'CREATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};

const AddNewSalary = () => {
  const { employeeid } = useParams();
  //   console.log(employeeid, id);
  const [{ loading, error, employee, loadingSalary, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      employee: {},
      loading: true,
      error: '',
    });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [ctc, setCtc] = useState('');
  const [salarygroup, setSalarygroup] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const SalaryData = async () => {
      dispatch({ type: 'FETCH_SALARY_REQUEST' });
      try {
        const result = await axios.get(`/api/employees/${employeeid}`);
        console.log(result);
        dispatch({
          type: 'FETCH_SALARY_SUCCESS',
          payload: result.data.employee,
        });
        // console.log(result.data.employee.address);
        setName(result.data.NAME);
        setEmail(result.data.email);
      } catch (err) {
        dispatch({ type: 'FETCH_SALARY_FAIL', payload: err.message });
      }
    };

    SalaryData();
  }, [employeeid]);

  const CreateSalaryHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    try {
      const { data } = await axios.post(
        `/api/payslip/createpayslip/${employeeid}`,
        {
          ctc,
          salarygroup,
          NAME: name,
          email: email,
          month: month,
          year: year,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);

      // dispatch({ type: 'REFRESH_ADDRESS', payload: employees });
      dispatch({
        type: 'CREATE_SUCCESS',
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
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return (
    <div className="container">
      <form>
        <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
          <h4 className="fw-bold text-success text-center py-1">Add New</h4>
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
                    style={{ width: '200px' }}
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
                    style={{ width: '200px' }}
                    id="salarygroup"
                    name="salarygroup"
                    value={salarygroup}
                    onChange={(e) => setSalarygroup(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Month </td>
                <td className="d-flex flex-column">
                  <input
                    type="text"
                    className="form-control m-1"
                    style={{ width: '200px' }}
                    id="month"
                    name="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Year </td>
                <td className="d-flex flex-column">
                  <input
                    type="text"
                    className="form-control m-1"
                    style={{ width: '200px' }}
                    id="year"
                    name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <button
              // onClick={(e) => DeclineHandler(leaveId)
              onClick={CreateSalaryHandler}
              className="btn btn-sm btn-success m-1"
              style={{ width: '150px' }}
            >
              {loadingSalary ? (
                <>
                  Addding Salary Details
                  {/* LoadingBox4 component */}
                </>
              ) : (
                'Add Salary Details'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewSalary;
