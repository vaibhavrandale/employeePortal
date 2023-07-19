import React, { useEffect, useState } from 'react';
import '../../App.css';
import { FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Leaves() {
  const [isLoading, setLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setLoading(true);
  }, []);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // const historyHandler = async () => {
  //   window.location.href = '/leaves-history';
  // };

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

              <li className="breadcrumb-item active" aria-current="page">
                <Link
                  className="text-decoration-none"
                  to={'/leaves-history'}
                  // onClick={historyHandler}
                >
                  Leaves History
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Leaves Application
              </li>
            </ol>
          </nav>{' '}
          <h2 className="text-center text-dark fw-bolder">Leave Application</h2>
          <span className="underline"></span>
          <div className="col-md-12 d-flex justify-content-end mt-3 me-5">
            <Link
              className="historyBtn  bg-warning"
              to={'/leaves-history'}
              // onClick={historyHandler}
            >
              History <FaHistory />{' '}
            </Link>
          </div>
          <form action="">
            <div className="form-group mt-4">
              <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="mobileNo">Type of Leave:</label>
                  <select
                    id="gender"
                    className="form-control"
                    value={selectedValue}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Seack</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="other">Other</option>
                  </select>
                  {selectedValue === 'other' && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter leave type"
                    />
                  )}
                </div>{' '}
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="lastName">Expected no. of leaves</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter no. of Leaves"
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="leaveDate">Expected Date of Leave:</label>
                  <input type="date" className="form-control" id="leaveDate" />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="returnDate">Expected Date of Return:</label>
                  <input type="date" className="form-control" id="returnDate" />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="mobileNo">Reason of Leave in Deatil :</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="mobileNo"
                    placeholder="Enter Reason"
                  ></textarea>
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="mobileNo">Mobile No :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNo"
                    placeholder="Enter Mobile No."
                  />
                </div>
              </div>
              <div className="d-flex  justify-content-end align-items-center me-5">
                <button
                  className="submitBtn px-2 pt-1 pb-1"
                  style={{ marginRight: '50px' }}
                >
                  Apply{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Leaves;
