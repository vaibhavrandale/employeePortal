import React, { useContext } from 'react';
import './jobcard.css';
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import { Store } from '../../Store';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
const JobCard = (props) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <div className="card-container mx-2 my-2">
      <div className=" jobCard">
        <div className="card-front">
          <div className="d-flex justify-content-center flex-column">
            <span className="text-center fw-bolder my-1">
              Job-ID :{' '}
              <Link
                to={props.JobDescription}
                target="_blank"
                className="text-primary"
              >
                {props.JobID}
              </Link>{' '}
            </span>
            <span
              className="text-center text-danger fw-bold p-0"
              style={{ fontSize: '13px' }}
            >
              <CountdownTimer EndDate={props.EndDate} />
            </span>

            <div className="d-flex flex-column justify-content-center my-2">
              <Link
                to={props.JobDescription}
                target="_blank"
                className="btn btn-sm btn-primary m-1"
              >
                {' '}
                view JD
              </Link>
              <Link
                to={`/new-referal/${props.JobID}`}
                className="btn btn-sm btn-success m-1"
              >
                {' '}
                Refer
              </Link>
              {userInfo.isSuperAdmin === 1 ? (
                <Link
                  to={`/update-jobopening/${props.JobID}`}
                  className="btn btn-sm btn-warning m-1"
                >
                  <FaRegEdit />
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
