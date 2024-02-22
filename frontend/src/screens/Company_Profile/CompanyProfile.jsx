import React, { useState, useEffect } from 'react';
import './profile.css';
import EmployeeCard from './EmployeeCard';
import employees from './employee.js';
import noimg from './noresult.jpg';
import { Helmet } from 'react-helmet';

const CompanyProfile = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';
  const handleBadgeClick = (department) => {
    setSelectedDepartment(department);
  };

  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }); // Simulating a 1-second delay
  }, [selectedDepartment]);

  const filteredEmployees = selectedDepartment
    ? employees.filter(
        (employee) =>
          employee.Department === selectedDepartment &&
          employee.isActivate === 1
      )
    : employees.filter((employee) => employee.isActivate === 1);

  const directors = employees.filter(
    (employee) => employee.Designation === 'Director'
  );

  const renderEmployeeCards = () => {
    if (loading) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }

    if (filteredEmployees.length > 0) {
      return filteredEmployees.map((item, index) => (
        <EmployeeCard
          key={index}
          name={item.NAME}
          img={item.img}
          designation={item.Designation}
          employee_id={item.employee_id}
          email={item.email}
        />
      ));
    } else {
      return (
        <EmployeeCard
          img={noimg}
          name=""
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
            name={item.NAME}
            img={item.img}
            designation={item.Designation}
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
        style={{ minHeight: '290px' }}
      >
        {renderEmployeeCards()}
      </div>
    </div>
  );
};

export default CompanyProfile;
