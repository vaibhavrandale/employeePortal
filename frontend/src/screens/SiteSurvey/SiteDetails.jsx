import React, { useEffect, useState } from 'react';
import '../../App.css';
import data from '../Employee/data';
import { Link, useParams } from 'react-router-dom';
import SiteTable from './SitTable';

function SiteDetails() {
  const { projectCode } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [site, setSite] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const foundSite = data.SiteSurvey.find(
        (site1) => site1.projectCode === projectCode
      );
      setSite(foundSite);
      setLoading(false);
    };

    setLoading(true);
    setTimeout(fetchData, 1);

    fetchData();
  }, [projectCode]);

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
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
                Site Details
              </li>
            </ol>
          </nav>{' '}
          {site ? (
            <h2>Project code: {site.projectCode}</h2>
          ) : (
            <p>Site not found</p>
          )}
          <SiteTable projectCode={projectCode} />{' '}
          {/* Pass projectCode as a prop */}
        </>
      )}
    </div>
  );
}

export default SiteDetails;
