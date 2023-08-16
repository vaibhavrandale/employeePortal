import React, { useState, useEffect, useReducer, useContext } from 'react';
import './Employee.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import { Store } from '../../Store';
import { LuEdit } from 'react-icons/lu';
import { MdVerified } from 'react-icons/md';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import MsgBox from '../../components/MessageBox/MsgBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_ADDRESS':
      return {
        ...state,
        employees: action.payload,
      };

    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, employees: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

    case 'UPDATE_ADDRESS_REQUEST':
      return { ...state, loadingUpdateAddress: true };

    case 'UPDATE_ADDRESS_SUCCESS':
      return {
        ...state,
        employees: action.payload,
        loadingUpdateAddress: false,
      };

    case 'UPDATE_ADDRESS_FAIL':
      return { ...state, loadingUpdateAddress: false, error: action.payload };

    case 'UPDATE_IDENTITY_REQUEST':
      return { ...state, loadingUpdateIdentity: true };

    case 'UPDATE_IDENTITY_SUCCESS':
      return {
        ...state,
        employees: action.payload,
        loadingUpdateIdentity: false,
      };

    case 'UPDATE_IDENTITY_FAIL':
      return { ...state, loadingUpdateIdentity: false, error: action.payload };

    case 'UPDATE_PERSONAL_REQUEST':
      return { ...state, loadingUpdateIdentity: true };

    case 'UPDATE_PERSONAL_SUCCESS':
      return {
        ...state,
        employees: action.payload,
        loadingUpdateIdentity: false,
      };

    case 'UPDATE_PERSONAL_FAIL':
      return { ...state, loadingUpdateIdentity: false, error: action.payload };

    default:
      return state;
  }
};
const EmployeeDetails = () => {
  const { id } = useParams();
  const [
    {
      loading,
      error,
      employees,
      loadingUpdate,
      loadingUpdateAddress,
      loadingUpdateIdentity,
    },
    dispatch,
  ] = useReducer(reducer, {
    employees: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [Address, setAddress] = useState(false);
  const [Identity, setIdentity] = useState(false);
  const [Personal, setPersonal] = useState(false);

  const [address, setEditAddress] = useState('');
  const [State, setEditState] = useState('');
  const [pf_account_no, setPf_account_no] = useState('');
  const [bank_account_no, setBank_account_no] = useState('');
  const [uan_number, setUan_number] = useState('');
  const [pan_number, setPan_number] = useState('');
  const [aadhar_no, setAadhar_no] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperiene] = useState('');
  const [leaves, setLeaves] = useState('');
  const [sick, setSick] = useState('');
  const [privilege, setPrivilege] = useState('');
  const [casual, setCasual] = useState('');

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/details/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employee });
        // console.log(result.data.employee.address);

        setEditAddress(result.data.employee.address);
        setEditState(result.data.employee.state);

        setAadhar_no(result.data.employee.aadhar_no);
        setBank_account_no(result.data.employee.bank_account_no);
        setPan_number(result.data.employee.pan_number);
        setPf_account_no(result.data.employee.pf_account_no);
        setUan_number(result.data.employee.uan_number);

        setLeaves(result.data.employee.leaves);
        setCasual(result.data.employee.casual);
        setPrivilege(result.data.employee.privilege);
        setSick(result.data.employee.sick);

        setName(result.data.employee.name);
        setEmail(result.data.employee.email);
        setJoiningDate(result.data.employee.joiningDate);
        setBirth_date(result.data.employee.birth_date);
        setGender(result.data.employee.gender);
        setDesignation(result.data.employee.designation);
        setMobile_no(result.data.employee.mobile_no);
        setAge(result.data.employee.age);
        setExperiene(result.data.employee.experience);
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
  }, [id]);

  const AddressHandle = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_ADDRESS_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/employees/address/${id}`,
        {
          address,
          state: State,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      const custommessage = data.message;
      console.log(data);

      toast.success(custommessage, {
        position: 'bottom-right',
      });

      // dispatch({ type: 'REFRESH_ADDRESS', payload: employees });
      dispatch({ type: 'UPDATE_ADDRESS_SUCCESS' });
      setAddress(false);
      navigate(`/employees`);
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPDATE_ADDRESS_FAIL' });
    }
  };

  const IdentityHandle = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_IDENTITY_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/employees/identitydetails/${id}`,
        {
          pf_account_no,
          bank_account_no,
          uan_number,
          pan_number,
          aadhar_no,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      const custommessage = data.message;
      console.log(data);

      toast.success(custommessage, {
        position: 'bottom-right',
      });

      // dispatch({ type: 'REFRESH_ADDRESS', payload: employees });
      dispatch({ type: 'UPDATE_IDENTITY_SUCCESS' });
      setAddress(false);
      navigate(`/employees`);
    } catch (error) {
      toast.error(getError(error), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPDATE_IDENTITY_FAIL' });
    }
  };

  const PersonalHandle = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_PERSONAL_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/employees/personaldetails/${id}`,
        {
          name,
          email,
          joiningDate,
          birth_date,
          gender,
          designation,
          mobile_no,
          age,
          experience,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      const custommessage = data.message;
      console.log(data);

      toast.success(custommessage, {
        position: 'bottom-right',
      });

      // dispatch({ type: 'REFRESH_ADDRESS', payload: employees });
      dispatch({ type: 'UPDATE_PERSONAL_SUCCESS' });
      setAddress(false);
      navigate(`/employees`);
    } catch (error) {
      toast.error(getError(error), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPDATE_PERSONAL_FAIL' });
    }
  };

  const DeactivateHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axios.put(
        `/api/employees/activate/${id}`,
        {
          activate: 'false',
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.employee });

      const customMessage = data.message;

      toast.success(customMessage, {
        position: 'top-right',
      });

      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const ActivateHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axios.put(
        `/api/employees/activate/${id}`,
        {
          activate: 'true',
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.employee });
      const customMessage = data.message;

      toast.success(customMessage, {
        position: 'top-right',
      });

      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const AddressToggle = () => {
    setAddress(true);
  };
  const IdentityToggle = () => {
    setIdentity(true);
  };
  const PersonalToggle = () => {
    setPersonal(true);
  };

  return (
    <div className="container">
      {/* {id} */}
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/employees" className="text-decoration-none">
              Employees
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Employees Details
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span className="text-success">{employees.name}</span>
          </li>
        </ol>
      </nav>{' '}
      {loading ? (
        // <LoadingBox />

        <LoadingBox3 />
      ) : error ? (
        <MsgBox className="alert alert-danger">{error}</MsgBox>
      ) : (
        <>
          <div className="d-flex justify-content-lg-between flex-wrap">
            <h2>
              {' '}
              <div className="m-1 p-1 text-center ">
                <span className="fw-bolder">{employees.name}</span>-
                <span>{employees.employee_id}</span>
              </div>
            </h2>

            <div className="m-2 p-1 text-center">
              {' '}
              {employees.activate === 'true' ? (
                <>
                  <span
                    className={`badge bg-success `}
                    style={{ fontSize: '15px' }}
                  >
                    activated
                  </span>
                  <MdVerified
                    className="fa fa-ban fs-5 ms-1 text-success "
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="click here to deactivate"
                    onClick={DeactivateHandler}
                  />
                  {/* {loadingUpdate && <LoadingBox4 />} */}
                </>
              ) : (
                <>
                  <span
                    className={`badge bg-danger`}
                    style={{ fontSize: '15px' }}
                  >
                    deactivated
                  </span>
                  <i
                    className="fa fa-ban fs-5 ms-1 text-danger "
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="click here to Activate"
                    onClick={ActivateHandler}
                  ></i>
                  {/* {loadingUpdate && <LoadingBox4 />} */}
                </>
              )}
              {loadingUpdate && <LoadingBox4 />}
            </div>
          </div>

          <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                id=""
                src={employees.image}
                alt={employees.name}
                className="rounded m-2"
                height={200}
                width={200}
              />
            </div>

            <div className="d-flex justify-content-center flex-wrap">
              {/* -----------------------------PERSONAL DETAILS------------------------------------------- */}

              <div
                className="card m-1 p-1"
                style={{ width: '350px', minHeight: '450px' }}
              >
                <div className="d-flex justify-content-center">
                  <h4 className="mt-2">
                    <b>Personal Details</b>
                  </h4>
                  {Personal ? (
                    <div className="p-1 d-flex justify-content-end align-items-center"></div>
                  ) : (
                    <div className="p-1 d-flex justify-content-end align-items-center">
                      <button className="btn btn-link" onClick={PersonalToggle}>
                        <LuEdit className="text-info" />
                      </button>
                    </div>
                  )}
                </div>
                <hr />
                {Personal ? (
                  <>
                    <form onSubmit={PersonalHandle}>
                      <div className="ps-2 mb-2">
                        <strong> Name :</strong> <br />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>Email :</strong> <br />
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>Joining Date :</strong> <br />
                        <input
                          type="text"
                          value={joiningDate}
                          onChange={(e) => setJoiningDate(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2 mb-2">
                        <strong>Birth Date:</strong> <br />
                        <input
                          type="date"
                          value={birth_date}
                          onChange={(e) => setBirth_date(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>Age :</strong> <br />
                        <input
                          type="text"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>Gender :</strong> <br />
                        <select
                          className="input1"
                          style={{ height: '39px' }}
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="" selected>
                            select
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      <div className="ps-2 mb-2">
                        <strong>Designation :</strong> <br />
                        <input
                          type="text"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                      </div>

                      <div className="ps-2 mb-2">
                        <strong>Mobile No :</strong> <br />
                        <input
                          type="text"
                          value={mobile_no}
                          onChange={(e) => setMobile_no(e.target.value)}
                        />
                      </div>

                      <div className="ps-2 mb-2">
                        <strong>Experience :</strong> <br />
                        <input
                          type="text"
                          value={experience}
                          onChange={(e) => setExperiene(e.target.value)}
                        />
                      </div>
                      <div
                        className="d-flex justify-content-end  pe-2"
                        style={{
                          marginRight: '3rem',
                        }}
                      >
                        <button
                          type="submit"
                          className=" btn btn-sm  submitBtn mt-2 "
                        >
                          {' '}
                          update {loadingUpdateIdentity && <LoadingBox4 />}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <p className="ps-2">
                      <strong>Name:</strong>

                      {employees.name}
                    </p>
                    <p className="ps-2">
                      <strong>Email:</strong> {employees.email}
                    </p>
                    <p className="ps-2">
                      <strong>Phone:</strong>

                      {employees.mobile_no}
                    </p>

                    <p className="ps-2">
                      <strong>Birth Date:</strong>

                      {employees.birth_date}
                    </p>
                    <p className="ps-2">
                      <strong>Age:</strong>

                      {employees.age}
                    </p>

                    <p className="ps-2">
                      {' '}
                      <strong>Designation:</strong>
                      {employees.designation}
                    </p>
                    <p className="ps-2">
                      <strong>joining Date:</strong>

                      {employees.joiningDate}
                    </p>
                    <p className="ps-2">
                      <strong>experience:</strong> {employees.experience}
                    </p>
                  </>
                )}
              </div>

              {/* --------------------PERSONAL DETAILS------------------------------ */}

              {/* -------------------------------addresss------------------------------- */}

              <div
                className="card m-1 p-1"
                style={{ width: '300px', maxHeight: '300px' }}
              >
                <div className="d-flex justify-content-center">
                  <h4 className="mt-2">
                    <b>Address Details</b>
                  </h4>
                  {Address ? (
                    <div className="p-1 d-flex justify-content-end align-items-center"></div>
                  ) : (
                    <div className="p-1 d-flex justify-content-end align-items-center">
                      <button className="btn btn-link" onClick={AddressToggle}>
                        <LuEdit className="text-info" />
                      </button>
                    </div>
                  )}
                </div>
                <hr />
                {Address ? (
                  <>
                    <form onSubmit={AddressHandle}>
                      <div className="ps-2 mb-2">
                        <strong>Address:</strong>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setEditAddress(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>State:</strong>
                        <input
                          type="text"
                          value={State}
                          onChange={(e) => setEditState(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-end  pe-2">
                        <button
                          type="submit"
                          className=" btn btn-sm  submitBtn mt-2 "
                        >
                          {' '}
                          update {loadingUpdateAddress && <LoadingBox4 />}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="ps-2 mb-2">
                      <p>
                        <strong>Address:</strong> {employees.address}
                      </p>
                    </div>
                    <div className="ps-2 mb-2">
                      <p>
                        <strong>State:</strong> {employees.state}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* -------------------------------address---------------------------- */}

              {/* ------------------identity---------------------------- */}

              <div
                className="card m-1 p-1"
                style={{ width: '300px', height: '450px' }}
              >
                <div className="d-flex justify-content-center">
                  <h4 className="mt-2">
                    <b>Identity Details</b>
                  </h4>
                  {Identity ? (
                    <div className="p-1 d-flex justify-content-end align-items-center"></div>
                  ) : (
                    <div className="p-1 d-flex justify-content-end align-items-center">
                      <button className="btn btn-link" onClick={IdentityToggle}>
                        <LuEdit className="text-info" />
                      </button>
                    </div>
                  )}
                </div>
                <hr />
                {Identity ? (
                  <>
                    <form onSubmit={IdentityHandle}>
                      <div className="ps-2 mb-2">
                        <strong>Adhar No:</strong>
                        <input
                          type="text"
                          value={aadhar_no}
                          onChange={(e) => setAadhar_no(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>Pan No:</strong>
                        <input
                          type="text"
                          value={pan_number}
                          onChange={(e) => setPan_number(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>Bank A/C No:</strong>
                        <input
                          type="text"
                          value={bank_account_no}
                          onChange={(e) => setBank_account_no(e.target.value)}
                        />
                      </div>
                      <div className="ps-2 mb-2">
                        <strong>PF :</strong>
                        <input
                          type="text"
                          value={pf_account_no}
                          onChange={(e) => setPf_account_no(e.target.value)}
                        />
                      </div>

                      <div className="ps-2 mb-2">
                        <strong>UAN :</strong>
                        <input
                          type="text"
                          value={uan_number}
                          onChange={(e) => setUan_number(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-end  pe-2">
                        <button
                          type="submit"
                          className=" btn btn-sm  submitBtn mt-2 "
                        >
                          {' '}
                          update {loadingUpdateIdentity && <LoadingBox4 />}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="ps-2 mb-2">
                      <p>
                        <strong>Adhar No:</strong> {employees.aadhar_no}
                      </p>
                    </div>
                    <div className="ps-2 mb-2">
                      <p>
                        <strong>Pan No:</strong> {employees.pan_number}
                      </p>
                    </div>
                    <div className="ps-2 mb-2">
                      <p>
                        <strong>Bank A/C No:</strong>{' '}
                        {employees.bank_account_no}
                      </p>
                    </div>

                    <div className="ps-2 mb-2">
                      <p>
                        <strong>PF no:</strong> {employees.pf_account_no}
                      </p>
                    </div>

                    <div className="ps-2 mb-2">
                      <p>
                        <strong>UAN:</strong> {employees.uan_number}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* ---------------------------identity-------------------------- */}
            </div>
            <hr />
            {/* <div className=" m-1 p-1">
              <div className="d-flex justify-content-center flex-wrap">
                <span className="d-flex justify-content-center align-items-center ps-2">
                  <h4>
                    <b>Assigned Role: &nbsp; &nbsp;</b>{' '}
                  </h4>
                </span>
                <span
                  className={`me-4 badge  p-2  mb-1 ${
                    employees.isAdmin ? `bg-success` : `bg-danger`
                  } `}
                >
                  {' '}
                  Admin
                </span>
                <span
                  className={`me-4 badge  p-2   mb-1 ${
                    employees.isSuperAdmin ? `bg-success` : `bg-danger`
                  } `}
                >
                  SuperAdmin
                </span>
                <span
                  className={`me-4 badge  p-2   mb-1 ${
                    employees.isDesign ? `bg-success` : `bg-danger`
                  } `}
                >
                  Design
                </span>
                <span
                  className={`me-4 badge  p-2    mb-1 ${
                    employees.isProduction ? `bg-success` : `bg-danger`
                  } `}
                >
                  Production
                </span>
                <span
                  className={`me-4 badge  p-2    mb-1 ${
                    employees.isSales ? `bg-success` : `bg-danger`
                  } `}
                >
                  Sales
                </span>
                <span
                  className={`me-4 badge  p-2    mb-1 ${
                    employees.isProject ? `bg-success` : `bg-danger`
                  } `}
                >
                  Project
                </span>
                <span
                  className={`me-4 badge  p-2   mb-1 ${
                    employees.isScm ? `bg-success` : `bg-danger`
                  } `}
                >
                  SCM
                </span>
                <span
                  className={`me-4 badge  p-2   mb-1 ${
                    employees.isAccountant ? `bg-success` : `bg-danger`
                  } `}
                >
                  Account
                </span>
              </div>
            </div> */}
            <div className="m-1 p-1">
              <div className="d-flex justify-content-center flex-wrap">
                <span className="d-flex justify-content-center align-items-center ps-2">
                  <h4>
                    <b>Assigned Role: &nbsp; &nbsp;</b>{' '}
                  </h4>
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isAdmin ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  Admin
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isSuperAdmin ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  SuperAdmin
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isDesign ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  Design
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isProduction ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  Production
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isSales ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  Sales
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isProject ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  Project
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isScm ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  SCM
                </span>
                <span
                  className={`me-4 badge p-2 mb-1 ${
                    employees.isAccountant ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  Account
                </span>
              </div>
            </div>

            <hr />
            <div className=" p-1 m-1 ">
              <h4>
                <b>Available Pay-slips</b>
              </h4>
              <div className="table-responsive">
                <table
                  className="table table-bordered "
                  style={{ overflowX: 'auto' }}
                >
                  <thead>
                    <tr>
                      <th className="col-md-1 text-center">Month</th>
                      <th className="col-md-1 text-center">Salary</th>
                      <th className="col-md-1 text-center">Bonus</th>
                      <th className="col-md-1 text-center">Deduction</th>
                      <th className="col-md-1 text-center">Deduction Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.payslips
                      .slice() // Create a copy of the array to avoid mutating the original array
                      .reverse() // Reverse the array to show the latest payslips first
                      .map((item, index) => (
                        <tr key={index}>
                          <td className=" text-center">
                            <span className="badge bg-success">
                              {item.month.toUpperCase()}-{item.year}
                            </span>{' '}
                          </td>
                          <td className="text-center">{item.salary}</td>
                          <td className="text-center">
                            {item.bonuses === 0 ? `0` : `${item.bonuses}`}
                          </td>
                          <td className="text-center">{item.deductions}</td>
                          <td className="text-center">
                            {item.deductionReason}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
