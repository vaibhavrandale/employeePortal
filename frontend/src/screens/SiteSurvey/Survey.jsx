import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';
import AlertBox from '../../components/MessageBox/AlertBox';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, siteSurvey: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    // case 'SURVEY_NOT_FOUND':
    //   return { ...state, loading: false, surveyNotFound: true };

    default:
      return state;
  }
};

function Survey() {
  const [{ loading, error, siteSurvey }, dispatch] = useReducer(reducer, {
    siteSurvey: {},
    loading: true,
    error: '',
    // surveyNotFound: false,
  });

  const { id: _id, projectCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(
          `/api/survey/siteSurveys/${projectCode}/${_id}`
        );

        console.log(result);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.siteSurvey });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [projectCode, _id]);

  return (
    <div className="container1">
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link
              to={`/sitedetails/${projectCode}`}
              className="text-decoration-none"
            >
              Site Details
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Site Survey
          </li>
        </ol>
      </nav>

      {loading ? (
        <div className="container1">
          {' '}
          <LoadingBox />
        </div>
      ) : error ? (
        <AlertBox className="alert alert-danger">{error}</AlertBox>
      ) : (
        <>
          <h2 className="text-center">Survey Details</h2>
          <div className="d-flex flex-wrap">
            <div className="fw-bolder ms-3 d-flex align-items-end">
              <div className="badge bg-danger">Survey Id: {_id}</div>
            </div>
            <div className="flex-grow-1 d-flex flex-column justify-content-end align-items-end">
              <div className="d-flex m-1">
                <span>Submitted By:</span>
                <span className="badge bg-success p-1 ms-1">
                  {siteSurvey.submittedBy}
                </span>
              </div>
              <div className="d-flex m-1">
                <span>Verified By:</span>
                {siteSurvey.status ? (
                  <span className="badge bg-success p-1 ms-1">
                    {siteSurvey.verifiedBy}
                  </span>
                ) : (
                  <span className="badge bg-danger p-1 ms-1">Pending</span>
                )}
              </div>
            </div>
          </div>

          <div className="row m-2">
            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ width: '110px' }}
            >
              Block:{' '}
              <span className="text-dark fw-bolder">{siteSurvey.block}</span>
            </div>
            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ width: '95px' }}
            >
              Table:{' '}
              <span className="text-dark fw-bolder">{siteSurvey.table}</span>
            </div>
            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ width: '90px' }}
            >
              Row: <span className="text-dark fw-bolder">{siteSurvey.row}</span>
            </div>
          </div>

          <div className="d-flex flex-wrap">
            <div className="d-flex border m-1" style={{ maxWidth: '52%' }}>
              <img
                src="/images/twopannel.png"
                alt=""
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start p-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="col-md-10 text-center">Name</th>
                    <th className="col-md-2 text-center">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SOLAR MODULE DIMENSION - A</td>
                    <td className="text-center">{siteSurvey.A}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE VIRTICAL GAP DIMENSION - B</td>
                    <td className="text-center">{siteSurvey.B}</td>
                  </tr>
                  <tr>
                    <td>TABLE WIDTH DIMENSION - C</td>
                    <td className="text-center">{siteSurvey.C}</td>
                  </tr>
                  <tr>
                    <td>BACK GROUND CLEARANCE DIMENSION - D</td>
                    <td className="text-center">{siteSurvey.D}</td>
                  </tr>
                  <tr>
                    <td>FRONT GROUND CLEARANCE DIMENSION - E</td>
                    <td className="text-center">{siteSurvey.E}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE HEIGHT DIMENSION - F</td>
                    <td className="text-center">{siteSurvey.F}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE FRAME CROSS SECTION DIMENSION - G</td>
                    <td className="text-center">{siteSurvey.G}</td>
                  </tr>
                  <tr>
                    <td>
                      INTER TABLE GAP DIMENSION - H{' '}
                      <span className="text-dark fw-bolder">
                        ({siteSurvey.htablex} &amp; {siteSurvey.htabley})
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.H}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE GAP HORIZONTAL DIMENSION - I</td>
                    <td className="text-center">{siteSurvey.I}</td>
                  </tr>
                  <tr>
                    <td>TILT ANGLE - J</td>
                    <td className="text-center">{siteSurvey.J}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Survey;
