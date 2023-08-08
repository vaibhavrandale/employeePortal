import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MsgBox from '../../components/MessageBox/MsgBox';
import { getError } from '../../utils';
import LoadingBox1 from '../../components/LoadingBox1';
import { toast } from 'react-hot-toast';
import { Store } from '../../Store';
import '../../App.css';
import { TbExternalLink } from 'react-icons/tb';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, siteSurvey: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'REFRESH_PRODUCT':
      return { ...state, siteSurvey: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };

    default:
      return state;
  }
};

function Survey({ projectCode }) {
  const [{ loading, error, siteSurvey, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      siteSurvey: {},
      loading: true,
      error: '',
      // surveyNotFound: false,
    });
  const [remark, setRemark] = useState('');
  const { id } = useParams();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });

        try {
          const result = await axios.get(`/api/survey/siteSurveys/get/${id}`);

          console.log(result);
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data.siteSurvey });
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
      fetchData();
    } else {
      navigate('/'); // Use "replace: true" to avoid adding a new entry to the history
    }
  }, [id, navigate, userInfo]);
  let reviewRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!remark) {
      toast.error('Please enter remark ', {
        position: 'bottom-right',
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/survey/sitesurveys/${id}/reviews`,
        { remark, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Remark submitted successfully', {
        position: 'bottom-right',
      });
      siteSurvey.reviews.unshift(data.review);
      siteSurvey.numReviews = data.numReviews;
      siteSurvey.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: siteSurvey });
      setRemark('');

      window.scrollTo({
        behavior: 'smooth',
        top: reviewRef.current.offsetTop,
      });
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return (
    <div className="container1">
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link
              to={`/sitedetails/${siteSurvey.projectCode}`}
              className="text-decoration-none"
            >
              Site Details
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Site Survey
          </li>
        </ol>
      </nav>

      {loading ? (
        <div className="container1">
          {' '}
          <LoadingBox3 />
        </div>
      ) : error ? (
        <MsgBox className="alert alert-danger text-center">{error}</MsgBox>
      ) : (
        <>
          <h2 className="text-center">Survey Details</h2>
          <div className="d-flex flex-wrap">
            <div className="fw-bolder ms-3 d-flex align-items-end">
              <div className="badge bg-danger">Survey Id: {id}</div>
            </div>
            <div className="flex-grow-1 d-flex flex-column justify-content-end align-items-end">
              <div className="d-flex m-1">
                <span>Submitted By:</span>
                <span className="badge bg-success p-1 ms-1">
                  {siteSurvey.submittedBy}
                </span>
              </div>
              <div className="d-flex m-1">
                <span>Verified By:</span>
                {siteSurvey.status ? (
                  <span className="badge bg-success p-1 ms-1">
                    {siteSurvey.verifiedBy}
                  </span>
                ) : (
                  <span className="badge bg-danger p-1 ms-1">Pending</span>
                )}
              </div>
            </div>
          </div>

          <div className="row m-2">
            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ maxWidth: '130px' }}
            >
              Project:{' '}
              <span className="text-dark fw-bolder">
                {siteSurvey.projectCode}
              </span>
            </div>
            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ width: '110px' }}
            >
              Block:{' '}
              <span className="text-dark fw-bolder">{siteSurvey.block}</span>
            </div>
            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ width: '95px' }}
            >
              Table:{' '}
              <span className="text-dark fw-bolder">{siteSurvey.table}</span>
            </div>
            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ width: '90px' }}
            >
              Row: <span className="text-dark fw-bolder">{siteSurvey.row}</span>
            </div>

            <div
              className="col-md-3 fw-bolder badge bg-info m-2 p-2"
              style={{ width: '90px' }}
            >
              Structure:{' '}
              <span className="text-dark fw-bolder">
                {siteSurvey.structure}
              </span>
            </div>

            <div className=" d-flex   justify-content-start flex-wrap">
              <span>Table 1</span>
              <input type="radio" style={{ height: '10px' }} />{' '}
              <span>Table 1</span>
              <input type="radio" style={{ height: '10px' }} />{' '}
              <span>Table 1</span>
              <input type="radio" style={{ height: '10px' }} />
            </div>
          </div>

          <div className="d-flex flex-wrap">
            <div className="d-flex border m-1" style={{ maxWidth: '51%' }}>
              <img
                src="/images/twopannel.png"
                alt=""
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start p-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="col-md-10 text-center">Name</th>
                    <th className="col-md-2 text-center">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      SOLAR MODULE DIMENSION - A{' '}
                      <span>
                        {siteSurvey.ImageA && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.A}</td>
                  </tr>
                  <tr>
                    <td>
                      SOLAR MODULE VIRTICAL GAP DIMENSION - B{' '}
                      <span>
                        {siteSurvey.ImageB && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>{' '}
                    </td>
                    <td className="text-center">{siteSurvey.B} </td>
                  </tr>
                  <tr>
                    <td>
                      TABLE WIDTH DIMENSION - C{' '}
                      <span>
                        {siteSurvey.ImageC && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.C}</td>
                  </tr>
                  <tr>
                    <td>
                      BACK GROUND CLEARANCE DIMENSION - D{' '}
                      <span>
                        {siteSurvey.ImageD && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.D}</td>
                  </tr>
                  <tr>
                    <td>
                      FRONT GROUND CLEARANCE DIMENSION - E{' '}
                      <span>
                        {siteSurvey.ImageE && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.E}</td>
                  </tr>
                  <tr>
                    <td>
                      SOLAR MODULE HEIGHT DIMENSION - F{' '}
                      <span>
                        {siteSurvey.ImageF && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.F}</td>
                  </tr>
                  <tr>
                    <td>
                      SOLAR MODULE FRAME CROSS SECTION DIMENSION - G{' '}
                      <span>
                        {siteSurvey.ImageG && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.G}</td>
                  </tr>
                  <tr>
                    <td>
                      INTER TABLE GAP DIMENSION - H{' '}
                      <span>
                        {siteSurvey.ImageH && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                      <span className="text-dark fw-bolder">
                        ({siteSurvey.htablex} &amp; {siteSurvey.htabley})
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.H}</td>
                  </tr>
                  <tr>
                    <td>
                      SOLAR MODULE GAP HORIZONTAL DIMENSION - I{' '}
                      <span>
                        {siteSurvey.ImageI && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.I}</td>
                  </tr>
                  <tr>
                    <td>
                      TILT ANGLE - J{' '}
                      <span>
                        {siteSurvey.ImageJ && (
                          <Link
                            className="ms-1 text-decoration-none fs-5"
                            to={`/surveyImages/${id}`}
                          >
                            <TbExternalLink />
                          </Link>
                        )}
                      </span>
                    </td>
                    <td className="text-center">{siteSurvey.J}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="m-1">
            <h3 className="mt-2">Survey Images </h3>{' '}
            <div className="d-flex ">
              <div className="d-flex">
                {siteSurvey.img && (
                  <>
                    {/* <span className="text-muted">
                      (To view image in click on image)
                    </span> */}
                    <Link to={siteSurvey.img} target="blank">
                      <img
                        // key={siteSurvey.img}
                        src={siteSurvey.img}
                        alt={siteSurvey.img}
                        className="card m-1"
                        style={{ height: '100px', width: '100px' }}
                      />
                    </Link>
                  </>
                )}
              </div>
              {siteSurvey.images.length === 0 && (
                <MsgBox className="alert alert-info m-1 text-center">
                  There is no extra survey Image
                </MsgBox>
              )}
              <div className="d-flex">
                {siteSurvey.images.map((image, index) => (
                  <Link to={image} target="blank">
                    <img
                      key={index}
                      src={image}
                      alt={image}
                      className="card m-1"
                      style={{
                        height: '100px',
                        width: '100px',
                        objectFit: 'fill',
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <h3 ref={reviewRef} className="mt-3 text-center">
            Remarks ({siteSurvey.numReviews})
          </h3>
          <div className="mb-3 d-flex justify-content-center">
            {siteSurvey.reviews.length === 0 && (
              <MsgBox className="alert alert-info m-1 text-center">
                There is no remarks
              </MsgBox>
            )}
          </div>
          <div className="d-flex justify-content-center ">
            <ul>
              {siteSurvey.reviews
                .slice()
                .reverse()
                .map((review) => (
                  <li
                    key={review._id}
                    className="bg-info card m-1 p-1  "
                    style={{ width: '440px' }}
                    variant=""
                  >
                    <span>
                      Remark By : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>{review.remarkBy}</strong>
                    </span>
                    <span>
                      Remark Date :&nbsp;&nbsp;&nbsp;
                      {new Date(review.createdAt).toLocaleString('en-US', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </span>

                    <span>
                      Remark
                      :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                      {review.remark}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="my-3 d-flex justify-content-center ">
            {' '}
            <form onSubmit={submitHandler}>
              <h3>Write a Remark</h3>

              <label
                controlId="floatingTextarea"
                label="Comments"
                className="mb-1"
              >
                <input
                  className="form-control"
                  as="textarea"
                  placeholder="Leave a remark here"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </label>
              <div className="mb-3 ">
                {/* <button
                  className="btn-sm submitBtn"
                  disabled={loadingCreateReview}
                  type="submit"
                >
                  Submit
                </button>
                {loadingCreateReview && <LoadingBox1></LoadingBox1>} */}

                {loadingCreateReview ? (
                  <LoadingBox1 />
                ) : (
                  <button
                    className="btn-sm submitBtn"
                    // disabled={loadingCreateReview}
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Survey;
