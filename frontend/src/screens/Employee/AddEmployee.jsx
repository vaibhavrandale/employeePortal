import React, { useContext, useReducer, useState } from 'react';
import '../../App.css';
// import data from '../Employee/data';
import { Link, useNavigate } from 'react-router-dom';
import { getError } from '../../utils';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Store } from '../../Store';
import LoadingBox1 from '../../components/LoadingBox1';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };

    case 'CREATE_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'CREATE_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

function AddEmployee() {
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [employee_id, setEmployee_id] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [State, setState] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [aadhar_no, setAdharno] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [activate, setActivate] = useState(false);
  const [leaves, setLeaves] = useState(30);
  const [pf_account_no, setPf_account_no] = useState('');
  const [bank_account_no, setBank_account_no] = useState('');
  const [uan_number, setUan_number] = useState('');
  const [pan_number, setPan_number] = useState('');
  const [payslips, setPayslips] = useState([]);

  const [isAdmin, setIsAdmin] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isSales, setIsSales] = useState(false);
  const [isScm, setIsScm] = useState(false);
  const [isDesign, setIsDesign] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [isProduction, setIsProduction] = useState(false);
  const [isAccountant, setIsAccountant] = useState(false);
  const SubmitHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!firstName) {
      missingFields.push('Employee First Name');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `api/employees`,
        {
          employee_id,
          name: `${firstName} ${lastName}`,
          image,
          email,
          password: employee_id,
          isAdmin,
          isSuperAdmin,
          isSales,
          isScm,
          isDesign,
          isProject,
          isVisitor,
          isProduction,
          isAccountant,
          joiningDate,
          birth_date,
          gender,
          designation,
          state: State,
          address,
          mobile_no,
          age,
          experience,
          activate,
          leaves,
          aadhar_no,
          pf_account_no,
          bank_account_no,
          uan_number,
          pan_number,
          payslips,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Employee Added successfully', {
        position: 'bottom-right',
      });
      navigate('/employees');

      //   siteSurvey.rating = data.rating;
      //   dispatch({ type: 'REFRESH_EMPLOYEE', payload: employees });
    } catch (error) {
      toast.error(getError(error), {
        position: 'bottom-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // profileImages

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/profileImages',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImage([...image, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }

      toast.success('Image uploaded successfully.', {
        position: 'bottom-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
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
            Add Employee
          </li>
        </ol>
      </nav>{' '}
      <h2 className="text-center">New Employee Registration</h2>
      <hr className="w-50 m-auto" />
      <form onSubmit={SubmitHandler}>
        <div className="form-group mt-4">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="form-group col-md-4">
              <label htmlFor="firstName">Employee ID:</label> <br />
              <input
                type="text"
                className=""
                id="firstName"
                placeholder="Enter Employee ID"
                value={employee_id}
                onChange={(e) => setEmployee_id(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="firstName">Email:</label> <br />
              <input
                type="text"
                className=""
                id="firstName"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="firstName">First Name:</label> <br />
              <input
                type="text"
                className=""
                id="firstName"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="lastName">Last Name:</label> <br />
              <input
                type="text"
                className=""
                id="lastName"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="mobileNo">Mobile No.:</label> <br />
              <input
                type="text"
                className=""
                id="mobileNo"
                placeholder="Enter Mobile No."
                value={mobile_no}
                onChange={(e) => setMobile_no(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="DOB">Date of Birth:</label> <br />
              <input
                type="date"
                className=""
                id="dob"
                placeholder="Enter DOB"
                value={birth_date}
                onChange={(e) => setBirth_date(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="gender">Gender:</label> <br />
              <select
                id="gender"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="experience">Designation:</label> <br />
              <input
                type="text"
                className=""
                id="designation"
                placeholder="Enter designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="bank">Bank Account No:</label> <br />
              <input
                type="text"
                className=""
                id="bank"
                placeholder="Enter PF No"
                value={bank_account_no}
                onChange={(e) => setBank_account_no(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="pf">PF Account No:</label> <br />
              <input
                type="text"
                className=""
                id="pf"
                placeholder="Enter PF No"
                value={pf_account_no}
                onChange={(e) => setPf_account_no(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="UAN">UAN No:</label> <br />
              <input
                type="text"
                className=""
                id="pf"
                placeholder="Enter UAN  No"
                value={uan_number}
                onChange={(e) => setUan_number(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="joiningDate">Joining Date:</label> <br />
              <input
                type="text"
                className=""
                id="joiningDate"
                placeholder="Enter Joining Date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="age">Adhar Card:</label> <br />
              <input
                type="text"
                className=""
                id="aadhar"
                placeholder="Enter adhar no"
                value={aadhar_no}
                onChange={(e) => setAdharno(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="age">Pan Card:</label> <br />
              <input
                type="text"
                className=""
                id="pan"
                placeholder="Enter Pan no"
                value={pan_number}
                onChange={(e) => setPan_number(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="age">Age:</label> <br />
              <input
                type="text"
                className=""
                id="age"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="age">Experience:</label> <br />
              <input
                type="text"
                className=""
                id="age"
                placeholder="Enter Age"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">Address :</label> <br />
              <textarea
                type="text"
                className="input ps-2 pt-1 pb-1 "
                id="state"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">State:</label> <br />
              <input
                type="text"
                className="input"
                id="state"
                placeholder="Enter State"
                value={State}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div
            className="row d-flex justify-content-center align-items-center mt-3 card flex-row ms-2 p-2"
            style={{ width: '90vmax', overflowX: 'hidden' }}
          >
            <h4>Department</h4>
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is Admin ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                placeholder="Enter Joining Date"
                // value={isAdmin}
                // onChange={(e) => setIsAdmin(e.target.value)}

                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is superAdmin ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                // value={isSuperAdmin}
                // onChange={(e) => setIsSuperAdmin(e.target.value)}
                checked={isSuperAdmin}
                onChange={(e) => setIsSuperAdmin(e.target.checked)}
              />
            </div>{' '}
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is Production ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                // value={isProduction}
                // onChange={(e) => setIsProduction(e.target.value)}
                checked={isProduction}
                onChange={(e) => setIsProduction(e.target.checked)}
              />
            </div>{' '}
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is SCM ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                // value={isScm}
                // onChange={(e) => setIsScm(e.target.value)}
                checked={isScm}
                onChange={(e) => setIsScm(e.target.checked)}
              />
            </div>{' '}
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is Sales ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                placeholder="Enter Joining Date"
                // value={isSales}
                // onChange={(e) => setIsSales(e.target.value)}
                checked={isSales}
                onChange={(e) => setIsSales(e.target.checked)}
              />
            </div>{' '}
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is Account ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                placeholder="Enter Joining Date"
                // value={isAccountant}
                // onChange={(e) => setIsAccountant(e.target.value)}
                checked={isAccountant}
                onChange={(e) => setIsAccountant(e.target.checked)}
              />
            </div>{' '}
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is Project ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                placeholder="Enter Joining Date"
                // value={isProject}
                // onChange={(e) => setIsProject(e.target.value)}
                checked={isProject}
                onChange={(e) => setIsProject(e.target.checked)}
              />
            </div>
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is Design ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                placeholder="Enter Joining Date"
                // value={isDesign}
                // onChange={(e) => setIsDesign(e.target.value)}
                checked={isDesign}
                onChange={(e) => setIsDesign(e.target.checked)}
              />
            </div>
            <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
              <label htmlFor="joiningDate">Is Visitor ?: &nbsp;</label>
              <input
                type="checkbox"
                className="input2"
                id="joiningDate"
                placeholder="Enter Joining Date"
                // value={isVisitor}
                // onChange={(e) => setIsVisitor(e.target.value)}
                checked={isVisitor}
                onChange={(e) => setIsVisitor(e.target.checked)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="profileImage">Passport Size Image: </label> <br />
              <input
                type="file"
                className="input1 w-50"
                id="logo"
                onChange={uploadFileHandler}
              />{' '}
              {loadingUpload && <LoadingBox1 />}
              {image && (
                <img
                  src={image}
                  alt={image}
                  className="circle-rounded border"
                />
              )}{' '}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="experienceLetter">Experience Letter:</label>{' '}
              <br />
              <input
                type="file"
                className="input1 w-50"
                id="experienceLetter"
                placeholder="Upload Image"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="otherDocument">Other Document:</label> <br />
              <input
                type="file"
                className="input1 w-50"
                id="otherDocument"
                placeholder="Upload Image"
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-end">
          <button className="btn submitBtn p-1 mt-3">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;

// import React, { useState } from 'react';
// import data from './data'; // Import the data object from data.js

// function AddEmployee() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   // ... other state variables and their respective setters

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Create a new employee object with the form data
//     const newEmployee = {
//       employee_id: generateEmployeeId(), // Generate a unique employee ID
//       name: `${firstName} ${lastName}`,
//       // ... other employee properties based on the form fields
//     };

//     // Update the data object with the new employee
//     data.employees.push(newEmployee);

//     // Log the updated data object (for testing purposes)
//     console.log(data);

//     // Reset the form fields
//     setFirstName('');
//     setLastName('');
//     // ... reset other form fields
//   };

//   // ... rest of the component code
// }
