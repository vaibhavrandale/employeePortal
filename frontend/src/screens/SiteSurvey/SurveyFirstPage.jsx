import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SurveyFirstPage() {
  const [isLoading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleNextSection = (e) => {
    e.preventDefault();
    setProgress(progress + 1);
  };

  const handlePreviousSection = (e) => {
    e.preventDefault();
    setProgress(progress - 1);
  };

  return (
    <div className="container1">
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
                <Link to="/sitelist" className="text-decoration-none">
                  Site List
                </Link>{' '}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                New Survey
              </li>
            </ol>
          </nav>{' '}
          <h2 className="text-center text-dark fw-bolder">Add New Survey</h2>
          <span className="underline"></span>
          <div className="col-md-12 d-flex justify-content-end mt-3 me-5">
            <Link className="historyBtn  bg-warning m-1" to={'/sitelist'}>
              View all
            </Link>
          </div>
          <form action="">
            {progress === 0 && (
              <div className="form-group mt-4">
                <div className="row d-flex flex-column justify-content-center align-items-center">
                  <div className="form-group col-md-2 m-1">
                    <label htmlFor="structure">Structure:</label>
                    <select id="structure" className="form-control">
                      <option value="">Select Structure</option>
                      <option value="onep">1P</option>
                      <option value="twop">2P</option>
                      <option value="fourl">4L</option>
                      <option value="threep">3P</option>
                      <option value="sixl">6L</option>
                      <option value="fourp">4P</option>
                      <option value="eightl">8L</option>
                    </select>
                  </div>

                  <div className="form-group col-md-2 m-1">
                    <label htmlFor="lastName">Enter Block Name :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter Block Name"
                    />
                  </div>

                  <div className="form-group col-md-2 m-1">
                    <label htmlFor="lastName">Enter Row Name :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter Row Name"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end align-items-center me-5 mt-3">
                  <button
                    className="submitBtn px-2 pt-1 pb-1 me-2"
                    onClick={handleNextSection}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {progress === 1 && (
              <div className="m-2  p-1 pb-2">
                <div className="form-group mt-4">
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <div className="col-md-12 row d-flex justify-content-start align-items-center">
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> A :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter A"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> B :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter B"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> C :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter C"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> D :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter D"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> E :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter E"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> F :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter F"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> G :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter G"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> H :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter H"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName"> I :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter I"
                        />
                      </div>
                      <div className="form-group col-md-1 mx-1">
                        <label htmlFor="lastName "> J :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter J"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end align-items-center me-5 mt-3">
                    <button
                      className="submitBtn px-2 pt-1 pb-1 me-2"
                      onClick={handlePreviousSection}
                    >
                      Previous
                    </button>

                    <button
                      className="submitBtn px-2 pt-1 pb-1 me-2"
                      style={{ marginRight: '50px' }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default SurveyFirstPage;
