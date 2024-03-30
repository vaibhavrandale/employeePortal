import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import './jobcard.css';
import JobCard from './JobCard';
import axios from 'axios';
import { Store } from '../../Store';
import { Link } from 'react-router-dom';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, jobopening: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const JobOpeningsHome = () => {
  const [{ loading, error, jobopening }, dispatch] = useReducer(reducer, {
    jobopening: [],
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
        const result = await axios.get('/api/jobs/jobopening', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.jobopening });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [userInfo.token]);

  return (
    <div className="main-container" style={{ marginTop: '60px' }}>
      <Helmet>
        <title>Referal</title>
      </Helmet>
      <div className="imageContainer">
        <img src={logo} className="p-0 " alt="" />
      </div>

      <h3
        style={{ color: 'crimson' }}
        className="text-center text-decoration-none my-2"
      >
        New Job Openings
      </h3>

      <div className="d-flex justify-content-end flex-wrap">
        {userInfo.isSuperAdmin === 1 ? (
          <>
            <Link className="btn btn-sm btn-primary m-1" to="/new-opening">
              New Opening
            </Link>
            <Link className="btn btn-sm btn-success m-1" to="/all-referrals">
              View All
            </Link>
          </>
        ) : (
          ''
        )}

        <Link className="btn btn-sm btn-warning m-1" to="/your-referal-history">
          Your Referal History
        </Link>
      </div>
      {loading ? (
        <LoadingBox5 />
      ) : (
        <div className="d-flex justify-content-start flex-wrap">
          {jobopening.map((item, index) => (
            <JobCard
              key={index}
              JobID={item.JobID}
              JobDescription={item.JobDescription}
              EndDate={item.EndDate}
              submittedBy={item.submittedBy}
              submittedAt={item.submittedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobOpeningsHome;
