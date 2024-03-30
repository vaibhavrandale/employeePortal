// import React from 'react';

// const ViewAllReferrals = () => {
//   return <div className="container">ViewAllReferrals</div>;
// };

// export default ViewAllReferrals;

import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import './jobcard.css';
import JobCard from './JobCard';
import axios from 'axios';
import { Store } from '../../Store';
import { Link } from 'react-router-dom';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import { tr } from 'date-fns/locale';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, jobreferral: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const JobOpeningsHome = () => {
  const [{ loading, error, jobreferral }, dispatch] = useReducer(reducer, {
    jobreferral: [],
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png';

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get('/api/jobs/jobreferral', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.jobreferral });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [userInfo.token]);

  return (
    <div className="container">
      <Helmet>
        <title>Referal</title>
      </Helmet>

      <h3
        style={{ color: 'crimson' }}
        className="text-center text-decoration-none my-2"
      >
        All Employee Referrals
      </h3>

      {loading ? (
        <LoadingBox5 />
      ) : (
        <div className="d-flex justify-content-start flex-wrap">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center">id </th>
                  <th className="text-center">JobID </th>
                  <th className="text-center">Candidate Name </th>
                  <th className="text-center">Candidate Mobile No </th>
                  <th className="text-center">Candidate Email </th>
                  <th className="text-center">Candidate Adhaar No </th>
                  <th className="text-center">Candidate Resume</th>
                  <th className="text-center">profile screened</th>
                  <th className="text-center">profile screenedBy </th>
                  <th className="text-center">interview scheduled</th>
                  <th className="text-center">interview completed </th>
                  <th className="text-center">Candidate Joined </th>
                  <th className="text-center"> Employee Name </th>
                  <th className="text-center"> Employee Email </th>
                  <th className="text-center"> Employee Employee ID</th>
                </tr>
              </thead>
              <tbody>
                {jobreferral.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.JobID}</td>
                    <td className="text-center">{item.refer_employee_name}</td>
                    <td className="text-center">
                      {item.refer_employee_mobileno}
                    </td>
                    <td className="text-center">{item.refer_employee_email}</td>
                    <td className="text-center">
                      {item.refer_employee_adhaar_no}
                    </td>
                    <td className="text-center">
                      <Link to={item.refer_employee_resume} target="_blank">
                        View
                      </Link>
                    </td>
                    <td className="text-center">{item.profile_screened}</td>
                    <td className="text-center">{item.profile_screenedBy}</td>
                    <td className="text-center">{item.interview_scheduled}</td>
                    <td className="text-center">{item.interview_completed}</td>
                    <td className="text-center">
                      {item.refer_employee_joined}
                    </td>
                    <td className="text-center">
                      {item.refer_by_employee_name}
                    </td>
                    <td className="text-center">
                      {item.refer_by_employee_email}
                    </td>
                    <td className="text-center">
                      {item.refer_by_employee_employee_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobOpeningsHome;
