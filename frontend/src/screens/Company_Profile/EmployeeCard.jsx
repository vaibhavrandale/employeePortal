import React from 'react';
import './profile.css';

const EmployeeCard = (props) => {
  return (
    <div className="card mx-2 my-2 directorCard">
      <img
        height={180}
        width={180}
        style={{ padding: '5px', objectFit: 'cover' }}
        src={props.img}
        alt=""
      />
      <span className="text-center fw-bolder">{props.name}</span>
      <span
        className="text-center p-0"
        style={{ maxWidth: '160px', margin: 'auto' }}
      >
        {props.designation}
      </span>
      <span className="text-center text-success fw-bold  p-0">
        {props.employee_id}
      </span>
    </div>
  );
};

export default EmployeeCard;
