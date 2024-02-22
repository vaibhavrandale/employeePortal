import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';

const EmployeeCard = (props) => {
  return (
    // <div className="card mx-2 my-2 directorCard">
    //   <img
    //     height={180}
    //     width={180}
    //     style={{ padding: '5px', objectFit: 'cover' }}
    //     src={props.img}
    //     alt=""
    //   />
    //   <span className="text-center fw-bolder">{props.name}</span>
    //   <span
    //     className="text-center p-0"
    //     style={{ maxWidth: '160px', margin: 'auto' }}
    //   >
    //     {props.designation}
    //   </span>
    //   <span className="text-center text-success fw-bold  p-0">
    //     {props.employee_id}
    //   </span>
    // </div>

    <div className="card-container mx-2 my-2">
      <div className=" directorCard">
        <div className="card-front">
          <img
            height={180}
            width={180}
            style={{ padding: '5px', objectFit: 'cover', borderRadius: '10px' }}
            src={props.img}
            alt=""
          />
          <div className="d-flex justify-content-center flex-column">
            <span className="text-center fw-bolder">{props.name}</span>
            <span
              className="text-center p-0"
              style={{ maxWidth: '160px', margin: 'auto' }}
            >
              {props.designation}
            </span>
            <span className="text-center text-success fw-bold p-0">
              {props.employee_id}
            </span>
          </div>
        </div>
        <div
          className="card-back"
          style={{
            backgroundImage: `url(${props.img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <span className="chat">
            <Link className="text-decoration-none" to={`mailto:${props.email}`}>
              {/* <span style={{ color: 'crimson' }} className="m-1"></span> */}
              <MdOutlineMailOutline />
            </Link>
          </span>
          <span className="chat">
            <Link className="text-decoration-none">
              {/* <span style={{ color: 'crimson' }} className="m-1"></span> */}
              <IoChatboxEllipsesOutline style={{ color: 'green' }} />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
