import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function EditNotice() {
  const [{ loadingCreate, loading }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const { id } = useParams();
  const navigate = useNavigate();
  const [highlightPoints, setHighlightPoints] = useState(['']);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [noticeBy, setNoticeBy] = useState(userInfo.name);
  const [mobile_no, setMobile_no] = useState(userInfo.mobile_no);

  const addNewField = (e) => {
    e.preventDefault();
    setHighlightPoints([...highlightPoints, '']);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/notice/${id}`);
        console.log(data.notice);
        setTitle(data.notice.title);
        setHighlightPoints(data.notice.highlightPoints);
        setDate(data.notice.date);
        setSubject(data.notice.subject);
        setDescription(data.notice.description);

        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [id]);

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
      const { data } = await axios.put(
        `/api/notice/${id}`,
        {
          title,
          date,
          subject,
          description,
          highlightPoints,
          noticeBy,
          mobile_no,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Notice Updated successfully', {
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

  const handleDeleteHighlightPoint = (indexToDelete, e) => {
    e.preventDefault();
    setHighlightPoints((prevHighlightPoints) =>
      prevHighlightPoints.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="container1">
      <div className="m-2 card p-1 pb-2">
        <nav
          style={{ '--bs-breadcrumb-divider': "'>'" }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/notice-home-page" className="text-decoration-none">
                Notices
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Update Notice
            </li>
          </ol>
        </nav>
        <h2 className="text-center text-dark fw-bolder">Update notice</h2>
        <span className="underline"></span>
        <form onSubmit={SubmitHandler}>
          <div className="form-group mt-4">
            <div className="row d-flex flex-column justify-content-center align-items-center">
              <div className="form-group col-md-5 m-2">
                <label htmlFor="title">Title:</label>
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
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group col-md-5 m-2">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="form-group col-md-5 m-2">
                <label htmlFor="description">Description :</label>
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
                  <div key={index} className="form-group col-md-12 m-2">
                    <label htmlFor={`briefNotice-${index}`}>
                      {index + 1}] Highlight Points:
                    </label>
                    <div className="d-flex">
                      <textarea
                        type="text"
                        className="form-control"
                        id={`briefNotice-${index}`}
                        placeholder="Enter brief Notice"
                        value={briefNotice}
                        onChange={(e) => {
                          const newHighlightPoints = [...highlightPoints];
                          newHighlightPoints[index] = e.target.value;
                          setHighlightPoints(newHighlightPoints);
                        }}
                      ></textarea>
                      <button
                        className="btn deleteBtn fs-6"
                        onClick={(e) => handleDeleteHighlightPoint(index, e)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-sm bg-dark text-white border-0"
                style={{ maxWidth: '120px' }}
                onClick={addNewField}
              >
                Add New
              </button>
            </div>
            <div className="d-flex justify-content-end align-items-center me-5">
              <button
                className="submitBtn px-2 pt-1 pb-1"
                type="submit"
                style={{ marginRight: '50px' }}
              >
                {loadingCreate ? <LoadingBox4 /> : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNotice;
