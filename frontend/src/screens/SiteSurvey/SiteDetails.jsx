import React, { useEffect, useReducer } from 'react';
import '../../App.css';
// import data from '../Employee/data';
import { Link, useParams } from 'react-router-dom';
import SiteTable from './SitTable';
import axios from 'axios';
// import LoadingBox from '../../components/LoadingBox';
// import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        siteSurveys: action.payload,
      };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function SiteDetails() {
  const [{ loading, error, siteSurveys }, dispatch] = useReducer(reducer, {
    siteSurveys: [], // Update the initial state to an empty object
    loading: true,
    error: '',
  });
  const { projectCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/survey/sitesurveys/${projectCode}`
        );
        console.log(result);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });

        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, [projectCode]);

  return (
    <div className="container1">
      {/* {projectCode} */}
      {loading ? (
        <LoadingBox3 />
      ) : (
        <>
          <nav
            style={{ '--bs-breadcrumb-divider': "'>'" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>{' '}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/sitelist" className="text-decoration-none">
                  Site List
                </Link>{' '}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Site Details :{projectCode}
              </li>
            </ol>
          </nav>{' '}
          {siteSurveys ? (
            <h2>
              Project code: {projectCode}
              <br />
              {siteSurveys.customerName}
            </h2>
          ) : (
            <p>Survey not found</p>
          )}
          <SiteTable projectCode={projectCode} />{' '}
          {/* Pass projectCode as a prop */}
        </>
      )}
    </div>
  );
}

export default SiteDetails;
