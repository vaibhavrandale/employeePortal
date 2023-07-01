import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SurveyFirstPage() {
  const [isLoading, setLoading] = useState(true);
  //   const [selectedStructure, setSelectedStructure] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setLoading(true);
  }, []);

  //   const handleStructureChange = (event) => {
  //     setSelectedStructure(event.target.value);
  //   };

  //   const getImageForStructure = () => {
  //     if (selectedStructure === 'onep') {
  //       return '/images/image.jpg'; // Replace with the actual image source for 1P structure
  //     } else if (selectedStructure === 'twop') {
  //       return '/images/twopannel.png'; // Replace with the actual image source for 1P structure
  //     } else if (selectedStructure === 'fourl') {
  //       return '/images/image.jpg'; // Replace with the actual image source for 1P structure
  //     } else if (selectedStructure === 'threep') {
  //       return '/images/image.jpg'; // Replace with the actual image source for 1P structure
  //     } else if (selectedStructure === 'sixl') {
  //       return '/images/image.jpg'; // Replace with the actual image source for 1P structure
  //     } else if (selectedStructure === 'fourp') {
  //       return '/images/image.jpg'; // Replace with the actual image source for 1P structure
  //     } else if (selectedStructure === 'eightl') {
  //       return '/images/image.jpg'; // Replace with the actual image source for 1P structure
  //     }
  //     // Add more else if conditions for other structures

  //     // If no structure is selected or matched, return a default image
  //     return 'twopannel.png'; // Replace with the default image source
  //   };

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
            <div className="form-group mt-4">
              <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="form-group col-md-2 m-1">
                  <label htmlFor="structure">Structure:</label>
                  <select
                    id="structure"
                    className="form-control"
                    // onChange={handleStructureChange}
                  >
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
                {/* {selectedStructure && (
                  <img
                    src={getImageForStructure()}
                    alt={`Structure ${selectedStructure}`}
                    style={{ width: '400px', height: '200px' }}
                  />
                )} */}

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
export default SurveyFirstPage;
