import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SurveySecondPage() {
  const [isLoading, setLoading] = useState(true);
  // const [selectedStructure, setSelectedStructure] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setLoading(true);
  }, []);

  return (
    <div className="container1">
      {isLoading ? (
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="m-2 card p-1 pb-2">
          <form action="">
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

              <div className="d-flex  justify-content-end align-items-center me-5 mt-3">
                <button
                  className="submitBtn px-2 pt-1 pb-1"
                  style={{ marginRight: '50px' }}
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default SurveySecondPage;
