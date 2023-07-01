import React, { useEffect, useState } from 'react';
import '../../App.css';
import data from '../Employee/data';
import { Link, useParams } from 'react-router-dom';

function PannelDetails() {
  const { id: surveyId, projectCode } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [pannelDetails, setPannelDetails] = useState(null);

  // useEffect(() => {
  //   const fetchData = () => {
  //     const foundPannelDetails = data.siteDetails.find(
  //       (site) => site.surveyId === surveyId
  //     );
  //     setPannelDetails(foundPannelDetails);
  //     setLoading(false);
  //   };
  //   setLoading(true);
  //   setTimeout(fetchData, 1);

  //   fetchData();
  // }, [surveyId]);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        const foundPannelDetails = data.siteDetails.find(
          (site) => site.surveyId === surveyId
        );
        setPannelDetails(foundPannelDetails);
        setLoading(false);
      }, 2000);
    };

    setLoading(true);
    fetchData();
  }, [surveyId]);
  return (
    <div className="container1">
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link
              to={`/sitedetails/${projectCode}`}
              className="text-decoration-none"
            >
              Site Survey
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Site Details
          </li>
        </ol>
      </nav>{' '}
      <h2 className="text-center">Survey Details </h2>
      {isLoading ? (
        <div style={{ minHeight: '100vh' }}>
          <div
            className="spinner-border me-5 d-flex justify-content-center align-items-center "
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex flex-wrap">
            <div className="fw-bolder ms-3 d-flex align-items-end">
              <div className="badge bg-danger">
                Survey Id: {pannelDetails.surveyId}
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-end align-items-end">
              <div className="d-flex m-1">
                <span>Submitted By:</span>
                <span className="badge bg-success p-1 ms-1">
                  {pannelDetails.submittedBy}
                </span>
              </div>
              <div className="d-flex m-1">
                <span>Verified By:</span>

                {pannelDetails.status === true ? (
                  <span className="badge bg-success p-1 ms-1">
                    {pannelDetails.verifiedBy}
                  </span>
                ) : (
                  <span className="badge bg-danger p-1 ms-1">Pending</span>
                )}
              </div>
            </div>
          </div>
          <div className="row   m-2">
            <div
              className="col-md-3 fw-bolder badge bg-info m-2  p-2"
              style={{ width: '110px' }}
            >
              Block:{' '}
              <span className="text-dark fw-bolder">{pannelDetails.block}</span>
            </div>
            <div
              className="col-md-3 fw-bolder badge bg-info m-2  p-2"
              style={{ width: '95px' }}
            >
              Table:
              <span className="text-dark fw-bolder">
                {' '}
                {pannelDetails.table}
              </span>
            </div>
            <div
              className="col-md-3 fw-bolder badge bg-info m-2  p-2"
              style={{ width: '90px' }}
            >
              Row:
              <span className="text-dark fw-bolder"> {pannelDetails.row}</span>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="d-flex border  m-1" style={{ maxWidth: '52%' }}>
              <img
                src="/images/twopannel.png"
                alt=""
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start  p-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="col-md-10 text-center">Name </th>
                    <th className="col-md-2 text-center">Value </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SOLAR MODULE DIMENSION - A</td>
                    <td className="text-center">{pannelDetails.A}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE VIRTICAL GAP DIMENSION - B</td>
                    <td className="text-center">{pannelDetails.B}</td>
                  </tr>
                  <tr>
                    <td>TABLE WIDTH DIMENSION - C</td>
                    <td className="text-center">{pannelDetails.C}</td>
                  </tr>

                  <tr>
                    <td>BACK GROUND CLEARANCE DIMENSION - D</td>
                    <td className="text-center">{pannelDetails.D}</td>
                  </tr>
                  <tr>
                    <td>FRONT GROUND CLEARANCE DIMENSION - E</td>
                    <td className="text-center">{pannelDetails.E}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE HEIGHT DIMENSION - F</td>
                    <td className="text-center">{pannelDetails.F}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE FRAME CROSS SECTION DIMENSION - G</td>
                    <td className="text-center">{pannelDetails.G}</td>
                  </tr>
                  <tr>
                    <td>
                      {' '}
                      INTER TABLE GAP DIMENSION - H{' '}
                      <span className="text-dark fw-bolder">
                        ({pannelDetails.htablex} & {pannelDetails.htabley})
                      </span>
                    </td>
                    <td className="text-center">{pannelDetails.H}</td>
                  </tr>
                  <tr>
                    <td>SOLAR MODULE GAP HORIZONTAL DIMENSION - I</td>
                    <td className="text-center">{pannelDetails.I}</td>
                  </tr>
                  <tr>
                    <td>TILT ANGLE - J</td>
                    <td className="text-center">{pannelDetails.J}</td>
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

export default PannelDetails;
