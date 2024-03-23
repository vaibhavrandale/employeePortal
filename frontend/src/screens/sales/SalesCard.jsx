import React from 'react';
import { Link } from 'react-router-dom';
import './sales.css';

import sales from './sales';
const SalesCard = () => {
  return (
    <div className="d-flex justify-content-center flex-wrap my-3">
      {sales.map((sales, index) => (
        <div className="card m-1 SalesCard" key={index}>
          <Link
            className="text-decoration-none btn btn-sm btn-link m-1"
            type="button"
            to={sales.link}
          >
            <img src={sales.img} alt="img" />
          </Link>
          <Link
            className="text-decoration-none btn btn-sm btn-link m-1 fw-bold"
            style={{ color: 'crimson' }}
            type="button"
            to={sales.link}
          >
            {sales.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SalesCard;
