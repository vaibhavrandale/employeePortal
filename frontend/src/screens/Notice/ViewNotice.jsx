import React from 'react';
import { Link, useParams } from 'react-router-dom';
import notice from './notice';

function ViewNotice() {
  const { id } = useParams();
  const matchingNotice = notice.find((item) => item.id === parseInt(id));

  // If there's no matching notice, return early
  if (!matchingNotice)
    return <div className="container">Notice not found!</div>;

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
            <Link
              className="text-decoration-none"
              to={'/notice-home-page'}
              // onClick={historyHandler}
            >
              All Notices
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Notice Details -<span className='text-danger'>{matchingNotice.title}</span>
          </li>
        </ol>
      </nav>{' '}
      <div className="notice-container">
        <div className="notice-header">
          <h2 className="text-uppercase fw-bold text-primary">
            {matchingNotice.title}
          </h2>
          <div className="notice-subject">
            <strong>Date:</strong>{' '}
            <span className="text-success">{matchingNotice.date}</span>
          </div>
          <hr />
        </div>
        <div className="notice-body">
          <p>{matchingNotice.briefNotice}</p>
          <h4>Key Points:</h4>
          <ul className="highlight-points">
            {matchingNotice.highlightPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="notice-footer">
          <div className="footer-content">
            <p>
              <strong>Notice by:</strong> {matchingNotice.noticeBy}
            </p>
            <img
              src={matchingNotice.seal}
              style={{ objectFit: 'contain', width: '100px', height: '50px' }} // Adjust size as required
              alt="Company Seal"
              className="company-seal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNotice;
