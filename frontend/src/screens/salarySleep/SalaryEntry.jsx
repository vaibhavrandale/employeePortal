import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import { Store } from '../../Store';
import './salarySleep.css';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function SalaryEntry() {
  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee
  const [salary, setSalary] = useState('');
  //   const [employeeid, setEmployeeid] = useState('');
  const [month, setMonth] = useState('');
  const [deductions, setDeductions] = useState('0');
  const [deductionReason, setDeductionReason] = useState('NA');
  const [year, setYear] = useState('');
  const [bonuses, setBonuses] = useState('0');
  //new
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      const year = new Date().getFullYear();
      setYear(year.toString());

      try {
        const result = await axios.get('/api/employees');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employees });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      setTimeout(() => {}, 2000); // Simulating a 2-second delay
    };

    // setLoading(true);
    fetchData();
  }, []);

  const getLatestSalary = () => {
    if (!selectedEmployee) return null;

    const employee = employees.find((emp) => emp._id === selectedEmployee);
    if (!employee || !employee.payslips || employee.payslips.length === 0)
      return null;

    // Sort the payslips in descending order based on the year and month
    const sortedPayslips = employee.payslips.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      } else {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        return months.indexOf(b.month) - months.indexOf(a.month);
      }
    });

    return sortedPayslips[0].salary;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    // if (!selectedEmployee || salary || month) {
    //   toast.error('Please select mandatory field ', {
    //     position: 'bottom-right',
    //   });
    //   return;
    // }

    const missingFields = [];

    if (!selectedEmployee) {
      missingFields.push('Employee ID');
    }

    if (!salary) {
      missingFields.push('Salary');
    }

    if (!month) {
      missingFields.push('Month');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `api/employees/${selectedEmployee}/payslips`,
        {
          month,
          year,
          salary,
          deductions,
          deductionReason,
          bonuses,
          status: true,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Salary Entry submitted successfully', {
        position: 'bottom-right',
      });

      //   siteSurvey.rating = data.rating;
      //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
      setMonth('');
      setYear('');
      setBonuses('');
      setDeductionReason('');
      setSelectedEmployee('');
      setSalary('');
    } catch (error) {
      toast.error(getError(error), {
        position: 'bottom-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">Salary Entry</h3>
      <div className="small-container">
        <form onSubmit={SubmitHandler}>
          <div className="row g-3 ">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="inputState" className="form-label">
                Employee Id <span className="text-danger">*</span>
              </label>
              <select
                id="inputState"
                // className="form-select"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #a6a6a6',
                  borderRadius: '4px',
                  outline: ' none',
                  padding: '0px',
                  width: '200px',

                  height: '35px',
                }}
                required
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option defaultValue="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.employee_id}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="" className="form-label">
                Enter Salary <span className="text-danger">*</span>
              </label>
              <br />
              <input
                type="text"
                id="input"
                // className="form-control "
                placeholder="Salary"
                aria-label="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #a6a6a6',
                  borderRadius: '4px',
                  outline: ' none',
                  padding: '10px',
                  width: '200px',

                  height: '35px',
                }}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="" className="form-label">
                Month<span className="text-danger">*</span>
              </label>
              <br />
              <select
                name=""
                id=""
                // className=" form-select "
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #a6a6a6',
                  borderRadius: '4px',
                  outline: ' none',
                  padding: '0px',
                  width: '200px',

                  height: '35px',
                }}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="" defaultValue="" selected>
                  Select a month
                </option>
                <option value="january">January</option>
                <option value="febraury">Febraury</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="" className="form-label">
                Enter Deduction (if Any)
              </label>
              <input
                type="text"
                // className="form-control input"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #a6a6a6',
                  borderRadius: '4px',
                  outline: ' none',
                  padding: '10px',
                  width: '200px',

                  height: '35px',
                }}
                placeholder="Deduction"
                aria-label="Deduction"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="" className="form-label">
                Deduction Reason (if any)
              </label>
              <input
                type="text"
                // className="form-control input"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #a6a6a6',
                  borderRadius: '4px',
                  outline: ' none',
                  padding: '10px',
                  width: '200px',

                  height: '35px',
                }}
                placeholder="Reason"
                aria-label="Reason"
                value={deductionReason}
                onChange={(e) => setDeductionReason(e.target.value)}
              />
              <input type="hidden" name="currentYear" value={year} />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="" className="form-label">
                Bonus (If Any)
              </label>
              <input
                type="text"
                // className="form-control input"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #a6a6a6',
                  borderRadius: '4px',
                  outline: ' none',
                  padding: '10px',
                  width: '200px',

                  height: '35px',
                }}
                placeholder="Bonus"
                aria-label="Deduction"
                value={bonuses}
                onChange={(e) => setBonuses(e.target.value)}
              />
            </div>
            <div className="">
              <button type="submit" className=" btn submitBtn2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {loading ? (
        <LoadingBox5 />
      ) : (
        selectedEmployee && ( // Show the table only if an employee is selected
          <div className=" d-flex justify-content-center">
            <table className="table table-bordered col-md-6">
              <thead>
                <tr>
                  <th className="col-md-1 text-center">Image</th>
                  <th className="col-md-1 text-center">Name</th>
                  <th className="col-md-1 text-center">Salary</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  // Find the selected employee in the employees array
                  if (employee._id === selectedEmployee) {
                    return (
                      <tr key={employee._id}>
                        <td className="text-center">
                          <img
                            src={employee.image}
                            className="thumbnail rounded-5"
                            alt=""
                          />
                        </td>
                        <td className="text-center">
                          <span>{employee.name}</span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-success">
                            {getLatestSalary()}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                  return null; // Return null for other employees (not selected)
                })}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

export default SalaryEntry;
