// import React from 'react';

// const BirthdayHome = () => {
//   return <div>BirthdayHome</div>;
// };

// export default BirthdayHome;

import React, { useState, useEffect, useReducer } from 'react';
import './birthday.css';
import EmployeeCard from './BirthdayCard';
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

const BirthdayHome = () => {
  const [{ loading, error, employees }, dispatch] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });

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
  }, []);

  const renderEmployeeCards = () => {
    if (loading) {
      return <LoadingBox5 />;
    }

    if (employees.length > 0) {
      return employees.map((item, index) => (
        <EmployeeCard
          key={index}
          NAME={item.NAME}
          img={item.image}
          designation={item.designation}
          employee_id={item.employee_id}
          email={item.email}
          joiningDate={item.joiningDate}
          birth_date={item.birth_date}
        />
      ));
    }
  };

  return (
    <div className="main-container" style={{ marginTop: '60px' }}>
      <Helmet>
        <title>Company Profile</title>
      </Helmet>

      <h3 className="my-3 text-center fw-bold" style={{ color: 'crimson' }}>
        Employee Birth and Joining Date
      </h3>

      <div className="d-flex justify-content-center flex-wrap">
        {renderEmployeeCards()}
      </div>
    </div>
  );
};

export default BirthdayHome;
