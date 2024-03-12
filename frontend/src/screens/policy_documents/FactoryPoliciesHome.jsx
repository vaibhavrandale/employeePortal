import React from 'react';
import FactoryPolicies from './FactoryPolicy.js';
import { Link } from 'react-router-dom';
const FactoryPoliciesHome = () => {
  return (
    <div className="container">
      <h3 className="fw-bold text-center">Taypro's Factory Policies</h3>
      <div className=" d-flex justify-content-center flex-wrap ">
        {FactoryPolicies.map((policy, index) => (
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
              className="text-decoration-none btn btn-sm btn-link m-1 fw-bold"
              style={{ color: 'crimson' }}
              type="button"
              to={policy.link}
            >
              {policy.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactoryPoliciesHome;
