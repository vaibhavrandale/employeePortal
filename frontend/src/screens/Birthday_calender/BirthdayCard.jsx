// import React from 'react';

// const BirthdayCard = () => {
//   return <div>BirthdayCard</div>;
// };

// export default BirthdayCard;

import React from 'react';
import { Link } from 'react-router-dom';
import './birthday.css';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { IoIdCardSharp } from 'react-icons/io5';
import { FaUserTie } from 'react-icons/fa';
import { GoRocket } from 'react-icons/go';
const BirthdayCard = (props) => {
  return (
    <div className="card-container mx-2 my-2">
      <div className=" birthdayCard">
        <div className="card-front">
          <img
            height={180}
            width={180}
            style={{ padding: '5px', objectFit: 'cover', borderRadius: '10px' }}
            src={props.img}
            alt=""
          />
          <div className="d-flex justify-content-center flex-column">
            <span className="text-center fw-bolder">{props.NAME}</span>
            <span
              className="text-center p-0 ms-3 d-flex justify-content-start align-items-center fw-bold"
              //   style={{ maxWidth: '160px', margin: 'auto' }}
            >
              <GoRocket /> &nbsp; {props.designation}
            </span>
            <span className="text-center text-success fw-bold p-0 ms-3 d-flex justify-content-start align-items-center">
              <IoIdCardSharp /> &nbsp; {props.employee_id}
            </span>
            {/* <hr className="p-p mb-1" /> */}
            <span
              className="text-center  fw-bold p-0 fw-bold ms-3 d-flex justify-content-start align-items-center"
              style={{ color: 'crimson' }}
            >
              <LiaBirthdayCakeSolid /> &nbsp; {props.birth_date}
            </span>
            <span
              className="text-center  fw-bold p-0 fw-bold ms-3 d-flex justify-content-start align-items-center"
              style={{ color: 'blue' }}
            >
              <FaUserTie /> &nbsp; {props.joiningDate}
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
          {/* <span className="chat">
            <Link className="text-decoration-none" to={`mailto:${props.email}`}>
                 <MdOutlineMailOutline />
            </Link>
          </span>
          <span className="chat">
            <Link className="text-decoration-none">
              <IoChatboxEllipsesOutline style={{ color: 'green' }} />
            </Link>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;
