import React from 'react';
import holidays from './holiday';

const Holidayhome = () => {
  return (
    <div className="container ">
      <div className="d-flex flex-wrap justify-content-center">
        {holidays.map((holiday, index) => (
          <div
            key={index}
            className={`card text-white ${holiday.color} mb-3 mx-1`}
            style={{ maxWidth: '14rem' }}
          >
            <div className="card-header" style={{ padding: '10px 1px ' }}>
              {holiday.name}-{holiday.date}
            </div>
            <div className="card-body">
              <h5 className="card-title">{holiday.title}</h5>
              <p className="card-text">{holiday.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holidayhome;
