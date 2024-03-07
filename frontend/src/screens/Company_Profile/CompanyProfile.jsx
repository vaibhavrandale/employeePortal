import React, { useState, useEffect, useReducer } from 'react';
import './profile.css';
import EmployeeCard from './EmployeeCard';
// import employees from './employee.js';
import noimg from './noresult.jpg';
import { Helmet } from 'react-helmet';
import axios from 'axios';
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

const CompanyProfile = () => {
  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  // const [loading, setLoading] = useState(false);
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png';

  const handleBadgeClick = (department) => {
    setSelectedDepartment(department);
  };

  // useEffect(() => {
  //   // Simulate an API call or any asynchronous operation
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // Simulating a 1-second delay
  // }, [selectedDepartment]);

  //new
  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/employees');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employees });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [selectedDepartment]);

  const departmentMap = {
    isSales: 'Sales',
    isScm: 'SCM',
    isDesign: 'Design',
    isProject: 'Project',
    isProduction: 'Production',
    isAccountant: 'Account',
    isHr: 'HR',
    isSoftwareDevlopment: 'Software Dev',
    isHardwareDevlopment: 'Hardware Dev',
  };

  const getDepartmentName = (employee) => {
    for (const [key, value] of Object.entries(departmentMap)) {
      if (employee[key] === 1) {
        return value;
      }
    }
    return 'Unknown Department';
  };

  const filteredEmployees = selectedDepartment
    ? employees.filter(
        (employee) =>
          getDepartmentName(employee) === selectedDepartment &&
          employee.activate === 1
      )
    : employees.filter((employee) => employee.activate === 1);

  const directors = employees.filter(
    (employee) => employee.designation === 'Director'
  );

  const renderEmployeeCards = () => {
    if (loading) {
      return <LoadingBox5 />;
    }

    if (filteredEmployees.length > 0) {
      return filteredEmployees.map((item, index) => (
        <EmployeeCard
          key={index}
          NAME={item.NAME}
          img={item.image}
          designation={item.designation}
          employee_id={item.employee_id}
          email={item.email}
        />
      ));
    } else {
      return (
        <EmployeeCard
          img={noimg}
          NAME=""
          designation="No employees associated with the selected department."
          employee_id=""
        />
      );
    }
  };

  const handleReset = () => {
    setSelectedDepartment(null);
  };

  return (
    <div className="main-container" style={{ marginTop: '60px' }}>
      <Helmet>
        <title>Company Profile</title>
      </Helmet>
      <div className="imageContainer">
        <img src={logo} className="p-0 " alt="" />
      </div>

      <p className="text-center text-success fw-bolder">
        We make Green Energy Greener!
      </p>
      <h3 className="my-3 text-center">Directors</h3>

      <div className="d-flex justify-content-center flex-wrap">
        {directors.map((item, index) => (
          <EmployeeCard
            key={index}
            NAME={item.NAME}
            img={item.image}
            designation={item.designation}
            employee_id={item.employee_id}
            email={item.email}
          />
        ))}
      </div>

      <h3 className="my-3 text-center">Team Tour</h3>

      <div className="d-flex justify-content-center my-3 flex-wrap">
        {[
          'Account',
          'HR',
          'SCM',
          'Sales',
          'Design',
          'Software Dev',
          'Hardware Dev',
          'Production',
          'Project',
        ].map((department, index) => (
          <div
            key={index}
            className={`Department badge bg-${
              selectedDepartment === department
                ? 'success text-white '
                : 'light text-dark '
            } p-2 m-1 border border-1 ${
              selectedDepartment === department ? 'selected' : ''
            }`}
            onClick={() => handleBadgeClick(department)}
          >
            {department}
          </div>
        ))}
        <div
          className="Department badge bg-light p-2 text-dark m-1 border border-1"
          onClick={handleReset}
        >
          ALL
        </div>
      </div>

      <div
        className="d-flex justify-content-center flex-wrap"
        // style={{ minHeight: '0px' }}
      >
        {renderEmployeeCards()}
      </div>
    </div>
  );
};

export default CompanyProfile;
