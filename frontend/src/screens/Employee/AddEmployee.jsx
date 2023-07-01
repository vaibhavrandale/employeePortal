import React, { useState } from 'react';
import '../../App.css';
import data from '../Employee/data';
import { Link } from 'react-router-dom';

function AddEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [experience, setExperience] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [image, setImage] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new employee object with the form inputs
    const newEmployee = {
      employee_id: 'unique_id_here', // You can generate a unique ID here
      name: `${firstName} ${lastName}`,
      image,
      email,
      isAdmin: false,
      joiningDate,
      birth_date: birthDate,
      gender,
      designation,
      state,
      address,
      mobile_no: mobileNo,
      age,
      experience,
      activate: true,
    };

    // Update the data object with the new employee
    data.employees.push(newEmployee);

    // Log the updated data object (you can remove this in the final version)
    console.log(data);

    // Reset the form inputs after submission
    setFirstName('');
    setLastName('');
    setMobileNo('');
    setExperience('');
    setEmail('');
    setBirthDate('');
    setImage('');
    setJoiningDate('');
    setAddress('');
    setAge('');
    setDesignation('');
    setGender('');
    setState('');
  };

  return (
    <div className="container">
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
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="form-group col-md-4">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="mobileNo">Mobile No.:</label>
              <input
                type="text"
                className="form-control"
                id="mobileNo"
                placeholder="Enter Mobile No."
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="experience">Experience:</label>
              <input
                type="text"
                className="form-control"
                id="experience"
                placeholder="Enter Experience in Months"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter company mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="birthDate">Birth Date:</label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                placeholder="Enter DOB"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="joiningDate">Joining Date:</label>
              <input
                type="text"
                className="form-control"
                id="joiningDate"
                placeholder="Enter Joining Date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                className="form-control"
                id="age"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="designation">Designation:</label>
              <input
                type="text"
                className="form-control"
                id="designation"
                placeholder="Enter Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">State:</label>
              <select
                id="state"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="form-group col-md-4">
              <label htmlFor="profileImage">Passport Size Image:</label>
              <input
                type="file"
                className="form-control"
                id="profileImage"
                placeholder="Upload Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="experienceLetter">Experience Letter:</label>
              <input
                type="file"
                className="form-control"
                id="experienceLetter"
                placeholder="Upload Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="otherDocument">Other Document:</label>
              <input
                type="file"
                className="form-control"
                id="otherDocument"
                placeholder="Upload Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
