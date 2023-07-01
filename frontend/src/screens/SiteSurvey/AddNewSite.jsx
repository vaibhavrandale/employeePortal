import React, { useEffect, useState } from 'react';
import '../../App.css';

import { Link } from 'react-router-dom';

function AddNewSite() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setLoading(true);
  }, []);

  return (
    <div className="container1  ">
      {isLoading ? (
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="m-2 card p-1 pb-2">
          <nav
            style={{ '--bs-breadcrumb-divider': "'>'" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>{' '}
              </li>
              <li className="breadcrumb-item">
                <Link to="/sitelist" className="text-decoration-none">
                  Site List
                </Link>{' '}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Add New Site
              </li>
            </ol>
          </nav>{' '}
          <h2 className="text-center text-dark fw-bolder">Add New Site</h2>
          <span className="underline"></span>
          <div className="col-md-12 d-flex justify-content-end mt-3 me-5">
            <Link className="historyBtn  bg-warning m-1" to={'/sitelist'}>
              View all
            </Link>
          </div>
          <form action="">
            <div className="form-group mt-4">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="firstName">Customer Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter Customer Name"
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="lastName">Site Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Site Location"
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="mobileNo">Plant Capacity:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Plant Capacity"
                  />
                </div>{' '}
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="lastName"> Project Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Project Code"
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="leaveDate">Upload Logo :</label>
                  <input type="file" className="form-control" id="logo" />
                </div>
              </div>
              <div className="d-flex  justify-content-end align-items-center me-5">
                <button
                  className="submitBtn px-2 pt-1 pb-1"
                  style={{ marginRight: '50px' }}
                >
                  Add{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddNewSite;
