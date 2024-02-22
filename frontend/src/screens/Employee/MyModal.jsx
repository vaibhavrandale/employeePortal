import React from 'react';
import { Link } from 'react-router-dom';

const MyModal = (props) => {
  return (
    <div
      className="modal fade"
      id={props.modalName}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {props.data}
            </h5>

            <Link
              type="button"
              class="btn-close"
              aria-label="Close"
              data-bs-dismiss="modal"
            ></Link>
          </div>
          <div className="modal-body">
            <img
              src={props.img}
              style={{ height: '500px', width: '100%', objectFit: 'contain' }}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
