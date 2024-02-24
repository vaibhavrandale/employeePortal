import React from 'react';
import { Link } from 'react-router-dom';

const GenerateDoc = () => {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '13rem' }}>
        <Link
          to="/experience-letter"
          className="btn btn-sm text-decoration-none btn-warning"
        >
          Experience Letter
        </Link>
      </div>
    </div>
  );
};

export default GenerateDoc;
