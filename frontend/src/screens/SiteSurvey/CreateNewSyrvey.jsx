import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import { GrClose } from 'react-icons/gr';
import '../../App.css';
import { FiExternalLink } from 'react-icons/fi';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

function CreateNewSyrvey({ projectCode }) {
  const navigate = useNavigate();

  const params = useParams(); // /:id
  const { id } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ error, loadingCreate, loadingUpload }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );

  // const [isLoading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [surveyId, setSurveyId] = useState('');
  const [projectcode, setProjectcode] = useState('');
  const [block, setBlock] = useState('');
  const [structure, setStructure] = useState('');
  const [row, setRow] = useState('');
  const [table, setTable] = useState('');
  const [A, setA] = useState('');
  const [ImageA, setImageA] = useState('');
  const [B, setB] = useState('');
  const [ImageB, setImageB] = useState('');
  const [C, setC] = useState('');
  const [ImageC, setImageC] = useState('');
  const [D, setD] = useState('');
  const [ImageD, setImageD] = useState('');
  const [E, setE] = useState('');
  const [ImageE, setImageE] = useState('');
  const [F, setF] = useState('');
  const [ImageF, setImageF] = useState('');
  const [G, setG] = useState('');
  const [ImageG, setImageG] = useState('');
  const [H, setH] = useState('');
  const [ImageH, setImageH] = useState('');
  const [I, setI] = useState('');
  const [ImageI, setImageI] = useState('');
  const [J, setJ] = useState('');
  const [ImageJ, setImageJ] = useState('');
  const [htablex, setHtablex] = useState('');
  const [htabley, setHtabley] = useState('');
  const [img, setImg] = useState('');
  const [images, setImages] = useState([]);
  const [submittedBy, setSubmittedBy] = useState('');

  const handleNextSection = (e) => {
    e.preventDefault();
    setProgress(progress + 1);
  };

  const handlePreviousSection = (e) => {
    e.preventDefault();
    setProgress(progress - 1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Create an array to store the names of empty fields
    const emptyFields = [];

    // Check and add the names of empty fields to the array

    if (!A) {
      emptyFields.push('A');
    }
    if (!B) {
      emptyFields.push('B');
    }
    if (!C) {
      emptyFields.push('C');
    }
    if (!D) {
      emptyFields.push('D');
    }
    if (!E) {
      emptyFields.push('E');
    }
    if (!F) {
      emptyFields.push('F');
    }
    if (!G) {
      emptyFields.push('G');
    }
    if (!H) {
      emptyFields.push('H');
    }
    if (!I) {
      emptyFields.push('I');
    }
    if (!J) {
      emptyFields.push('J');
    }
    if (!block) {
      emptyFields.push('block');
    }
    if (!row) {
      emptyFields.push('row');
    }
    if (!table) {
      emptyFields.push('table');
    }
    if (!structure) {
      emptyFields.push('structure');
    }
    if (!ImageC) {
      emptyFields.push('ImageC');
    }
    if (!ImageG) {
      emptyFields.push('ImageG');
    }

    // Perform your required field validation here
    if (emptyFields.length > 0) {
      const errorMessage = `Please fill the following fields,it is mandatory: ${emptyFields.join(
        ', '
      )} .`;
      // alert(errorMessage);
      toast.error(errorMessage);
      return; // Prevent form submission if any required field is empty
    }

    try {
      dispatch({ type: 'CREATE_REQUEST' });
      await axios.post(
        `/api/survey/sitesurveys/${id}`,
        {
          projectCode: id,
          table,
          row,
          block,
          structure,
          A,
          B,
          C,
          D,
          E,
          F,
          G,
          H,
          I,
          J,
          ImageA,
          ImageB,
          ImageC,
          ImageD,
          ImageE,
          ImageF,
          ImageG,
          ImageH,
          ImageI,
          ImageJ,
          htablex,
          htabley,
          img,
          images,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Survey Created successfully', {
        position: 'bottom-right',
      });
      navigate(`/siteDetails/${id}`);
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e, forImages, fieldName) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      // Update the corresponding state variable based on the field name
      if (forImages) {
        // Additional images
        setImages([...images, data.secure_url]);
      } else {
        // A to J images
        switch (fieldName) {
          case 'A':
            setImageA(data.secure_url);
            break;
          case 'B':
            setImageB(data.secure_url);
            break;
          case 'C':
            setImageC(data.secure_url);
            break;
          case 'D':
            setImageD(data.secure_url);
            break;
          case 'E':
            setImageE(data.secure_url);
            break;
          case 'F':
            setImageF(data.secure_url);
            break;
          case 'G':
            setImageG(data.secure_url);
            break;
          case 'H':
            setImageH(data.secure_url);
            break;
          case 'I':
            setImageI(data.secure_url);
            break;
          case 'J':
            setImageJ(data.secure_url);
            break;
          // ... Add similar cases for images C to J
          default:
            break;
        }
      }

      toast.success('Image uploaded successfully. ');
    } catch (err) {
      toast.success(getError(err), {
        position: 'bottom-left',
      });
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName) => {
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. ', {
      position: 'bottom-left',
    });
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
              </Link>{' '}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/sitelist" className="text-decoration-none">
                Site List
              </Link>{' '}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                to={`/siteDetails/${projectcode}`}
                className="text-decoration-none"
              >
                Site Details :{projectcode}
              </Link>{' '}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Site Survey
            </li>
          </ol>
        </nav>{' '}
        <h2 className="text-center text-dark fw-bolder">Add New Survey</h2>
        {/* <span className="underline"></span> */}
        <span className="text-center text-muted">
          (note* : all values are in mm)
        </span>
        <form onSubmit={submitHandler}>
          {progress === 0 && (
            <div className="form-group mt-4">
              <div className="row d-flex flex-column justify-content-center align-items-center ">
                <div className="form-group col-md-2 m-1">
                  <label htmlFor="structure">Structure:</label>
                  <select
                    id="structure"
                    className="form-control"
                    value={structure}
                    onChange={(e) => setStructure(e.target.value)}
                    required
                  >
                    <option value="">Structure</option>
                    <option value="1P">1P</option>
                    <option value="2P">2P</option>
                    <option value="4L">4L</option>
                    <option value="3P">3P</option>
                    <option value="6L">6L</option>
                    <option value="4P">4P</option>
                    <option value="8L">8L</option>
                  </select>
                </div>

                <div className="form-group col-md-2 m-1">
                  <label htmlFor="lastName">Enter Block Name :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Block Name"
                    value={block}
                    required
                    onChange={(e) => setBlock(e.target.value)}
                  />
                </div>

                <div className="form-group col-md-2 m-1">
                  <label htmlFor="lastName">Enter Row Name :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Row Name"
                    value={row}
                    required
                    onChange={(e) => setRow(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-2 m-1">
                  <label htmlFor="lastName">Enter Table Name :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Table Name"
                    value={table}
                    required
                    onChange={(e) => setTable(e.target.value)}
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
                  <div className="col-md-12 row d-flex justify-content-center align-items-center">
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          A :{' '}
                          {ImageA && (
                            <Link
                              className="text-decoration-none "
                              target="blank"
                              to={ImageA}
                            >
                              A
                              <span>
                                <FiExternalLink className="pb-1 fs-5 " />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter A"
                          value={A}
                          required
                          onChange={(e) => setA(e.target.value)}
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Row Name"
                          value={surveyId}
                        />
                      </div>
                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image A:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'A')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          B :{' '}
                          {ImageB && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageB}
                            >
                              B
                              <span className="pb-2 fs-5">
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}{' '}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter B"
                          value={B}
                          required
                          onChange={(e) => setB(e.target.value)}
                        />
                      </div>
                      <div className="col-md-5">
                        <div className="form-group mx-1 ">
                          <label htmlFor="lastName ">Upload Image B:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'B')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          C :{' '}
                          {ImageC && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageC}
                            >
                              C{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter C"
                          value={C}
                          required
                          onChange={(e) => setC(e.target.value)}
                        />
                      </div>
                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image C:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            // required
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'C')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}

                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          D :{' '}
                          {ImageD && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageD}
                            >
                              D{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter D"
                          value={D}
                          required
                          onChange={(e) => setD(e.target.value)}
                        />
                      </div>

                      <div className="col-md-5">
                        {/* <div className="form-group mx-1">
                            <label htmlFor="lastName ">D Image file :</label>

                            <input
                              value={ImageD}
                              className="form-control"
                              onChange={(e) => setImageD(e.target.value)}
                            />
                          </div> */}

                        <div className="form-group mx-1 ">
                          <label htmlFor="lastName ">Upload Image D:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'D')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}

                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          E :{' '}
                          {ImageE && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageE}
                            >
                              E{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter E"
                          value={E}
                          required
                          onChange={(e) => setE(e.target.value)}
                        />
                      </div>

                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image E:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'E')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}

                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          F :{' '}
                          {ImageF && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageF}
                            >
                              F{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter F"
                          value={F}
                          required
                          onChange={(e) => setF(e.target.value)}
                        />
                      </div>

                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image F:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'F')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}

                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          G :{' '}
                          {ImageG && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageG}
                            >
                              G{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter G"
                          value={G}
                          required
                          onChange={(e) => setG(e.target.value)}
                        />
                      </div>

                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image G:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            // required
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'G')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}

                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName"> Table 1 :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter table 1"
                          value={htablex}
                          required
                          onChange={(e) => setHtablex(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-5  mx-1">
                        <label htmlFor="lastName"> Table 2 :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter table 2"
                          value={htabley}
                          required
                          onChange={(e) => setHtabley(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          H :{' '}
                          {ImageH && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageH}
                            >
                              H{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter H"
                          value={H}
                          required
                          onChange={(e) => setH(e.target.value)}
                        />
                      </div>

                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image H:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'H')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}

                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName">
                          {' '}
                          I :{' '}
                          {ImageI && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageI}
                            >
                              I{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter I"
                          value={I}
                          required
                          onChange={(e) => setI(e.target.value)}
                        />
                      </div>

                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image I:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'I')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}

                    {/* -------------------------------------------------------- */}
                    <div className="row d-flex  mb-2 m-1">
                      <div className="form-group col-md-6 mx-1">
                        <label htmlFor="lastName ">
                          {' '}
                          J :{' '}
                          {ImageJ && (
                            <Link
                              className="text-decoration-none"
                              target="blank"
                              to={ImageJ}
                            >
                              J{' '}
                              <span>
                                <FiExternalLink />
                              </span>
                            </Link>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control m-1"
                          placeholder="Enter J"
                          value={J}
                          required
                          onChange={(e) => setJ(e.target.value)}
                        />
                      </div>
                      <div className="col-md-5">
                        <div className="form-group mx-1">
                          <label htmlFor="lastName ">Upload Image J:</label>
                          <span className="text-muted"></span>
                          {loadingUpload && <LoadingBox4 />}
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => uploadFileHandler(e, false, 'J')}
                          />
                        </div>
                      </div>
                    </div>
                    {/* -------------------------------------------------------- */}
                    <hr className="mt-2" />
                    <h3 className="text-center">If Any Additional Image</h3>
                    <div className="form-group mx-1 mb-2 m-1">
                      <label htmlFor="lastName "> Image file :</label>

                      <input
                        value={img}
                        className="form-control"
                        onChange={(e) => setImg(e.target.value)}
                      />
                    </div>

                    <div className="form-group mx-1 mb-2 m-1">
                      <label htmlFor="lastName ">Upload Image:</label>
                      <span className="text-muted">(Optional)</span>
                      {loadingUpload && <LoadingBox4 />}
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Enter J"
                        onChange={uploadFileHandler}
                      />
                    </div>

                    <div className="form-group  mx-1 mb-2 m-1">
                      <label>additional Images</label>
                      {images.length === 0 && (
                        <p
                          className="bg-info text-center m-1 border border-rounded p-1"
                          style={{ maxWidth: '30%' }}
                        >
                          {' '}
                          no image
                        </p>
                        // <span className="alert alert-info">No Image</span>
                      )}

                      <ul variant="flush " className="m-1"></ul>
                      {images &&
                        images.map((x) => (
                          <li className="m-1" key={x}>
                            {x}
                            <button
                              // variant="light "
                              className=" m-1 closeBtn"
                              id="closeBtn"
                              onClick={() => deleteFileHandler(x)}
                            >
                              <GrClose className="fs-9" />
                            </button>
                          </li>
                        ))}
                      <label htmlFor="lastName ">
                        Upload Additional Image: (Optional)
                      </label>

                      {loadingUpload && <LoadingBox4 />}
                      <input
                        type="file"
                        className="form-control"
                        id="lastName"
                        onChange={(e) => uploadFileHandler(e, true)}
                      />

                      <input
                        type="hidden"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter Row Name"
                        value={submittedBy}
                      />

                      <input
                        type="hidden"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter Row Name"
                        value={projectCode}
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
                    Submit{loadingCreate && <LoadingBox4 />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateNewSyrvey;
