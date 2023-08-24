// import React from 'react'

// function NewNotice() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default NewNotice

import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };

    case 'CREATE_SUCCESS':
      return { ...state, notices: action.payload, loadingCreate: false };

    case 'CREATE_FAIL':
      return { ...state, error: action.payload, loadingCreate: false };

    default:
      return state;
  }
};

function NewNotice() {
  const [{ loadingCreate }, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [highlightPoints, setHighlightPoints] = useState(['']);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [noticeBy, setNoticeBy] = useState(userInfo.name);

  const addNewField = (e) => {
    e.preventDefault();
    setHighlightPoints([...highlightPoints, '']);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE_REQUEST',
    });
    const missingFields = [];

    if (!subject) {
      missingFields.push('Please Enter Subject');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/notice`,
        {
          title,
          date,
          subject,
          description,
          highlightPoints,
          noticeBy,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Notice Created successfully', {
        position: 'bottom-right',
      });
      navigate('/notice-home-page');
    } catch (error) {
      toast.error(getError(error), {
        position: 'bottom-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="container1  ">
      {/* {loadingCreate ? (
        <loadingCreateBox3 />
      ) : ( */}
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
                to={'/notice-home-page'}
                // onClick={historyHandler}
              >
                Notices
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create New Notice
            </li>
          </ol>
        </nav>{' '}
        <h2 className="text-center text-dark fw-bolder">New notice</h2>
        <span className="underline"></span>
        {/* <div className="col-md-12 d-flex justify-content-end mt-3 me-5">
          <Link
            className="historyBtn  bg-warning"
            to={'/leaves-history'}
            // onClick={historyHandler}
          >
            History <FaHistory />{' '}
          </Link>
        </div> */}
        <form onSubmit={SubmitHandler}>
          <div className="form-group mt-4">
            <div className="row d-flex flex-column justify-content-center align-items-center">
              <div className="form-group col-md-5 m-2">
                <label htmlFor="firstName"> Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group col-md-5 m-2">
                <label htmlFor="leaveDate">Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="leaveDate"
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group col-md-5 m-2">
                <label htmlFor="mobileNo">subject:</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  placeholder="Enter subject"
                  value={subject}
                  required
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="form-group col-md-5 m-2">
                <label htmlFor="mobileNo">description :</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group col-md-5 m-2">
                {highlightPoints.map((briefNotice, index) => (
                  <div key={index} className="form-group col-md-5 m-2">
                    <label htmlFor={`briefNotice-${index}`}>
                      {index + 1}) Highlight Points:
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id={`briefNotice-${index}`}
                      placeholder={`Enter Highlighted points ${index + 1}`}
                      value={briefNotice}
                      onChange={(e) => {
                        const newHighlightPoints = [...highlightPoints];
                        newHighlightPoints[index] = e.target.value;
                        setHighlightPoints(newHighlightPoints);
                      }}
                    ></textarea>
                  </div>
                ))}
                <button
                  className="btn btn-sm bg-dark text-white border-0"
                  onClick={(e) => addNewField(e)}
                >
                  Add New
                </button>
              </div>
            </div>
            <div className="d-flex  justify-content-end align-items-center me-5">
              <button
                className="submitBtn px-2 pt-1 pb-1"
                type="submit"
                style={{ marginRight: '50px' }}
              >
                {loadingCreate ? 'Creating..' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* )} */}
    </div>
  );
}

export default NewNotice;
