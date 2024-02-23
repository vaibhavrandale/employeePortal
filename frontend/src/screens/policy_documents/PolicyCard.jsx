import React from 'react';
import { Link } from 'react-router-dom';
import './policy.css';
import policies from './policy.js';
const PolicyCard = () => {
  return (
    <div className="d-flex justify-content-center flex-wrap my-3">
      {policies.map((policy, index) => (
        <div className="card m-1 policyCard" key={index}>
          <Link
            className="text-decoration-none btn btn-sm btn-link m-1"
            type="button"
            to={policy.link}
          >
            {' '}
            <img src={policy.img} alt="img" />
          </Link>
          <Link
            className="text-decoration-none btn btn-sm btn-link m-1"
            type="button"
            to={policy.link}
          >
            {policy.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PolicyCard;
