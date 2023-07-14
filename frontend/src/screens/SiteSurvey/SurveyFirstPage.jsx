import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import LoadingBox from '../../components/LoadingBox';
import LoadingBox1 from '../../components/LoadingBox1';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
// import AlertBox from '../../components/MessageBox/AlertBox';
import { GrClose } from 'react-icons/gr';
// import AlertBox1 from '../../components/MessageBox/AlertBox1';
import '../../App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

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
function SurveyFirstPage() {
  const navigate = useNavigate();

  const params = useParams(); // /product/:id
  const { projectCode, id: _id } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  // const [isLoading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [surveyId, setSurveyId] = useState('');
  const [projectcode, setProjectcode] = useState('');
  const [block, setBlock] = useState('');
  const [structure, setStructure] = useState('');
  const [row, setRow] = useState('');
  const [table, setTable] = useState('');
  const [A, setA] = useState('');
  const [B, setB] = useState('');
  const [C, setC] = useState('');
  const [D, setD] = useState('');
  const [E, setE] = useState('');
  const [F, setF] = useState('');
  const [G, setG] = useState('');
  const [H, setH] = useState('');
  const [I, setI] = useState('');
  const [J, setJ] = useState('');
  const [htablex, setHtablex] = useState('');
  const [htabley, setHtabley] = useState('');
  const [img, setImg] = useState('');
  const [images, setImages] = useState([]);
  const [submittedBy, setSubmittedBy] = useState('');
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  const handleNextSection = (e) => {
    e.preventDefault();
    setProgress(progress + 1);
  };

  const handlePreviousSection = (e) => {
    e.preventDefault();
    setProgress(progress - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `/api/survey/sitesurveys/${projectCode}/${_id}`
        );
        // console.log(data.siteSurvey.projectCode);
        setProjectcode(data.siteSurvey.projectCode);
        setSurveyId(data.siteSurvey.surveyId);
        setBlock(data.siteSurvey.block);
        setTable(data.siteSurvey.table);
        setRow(data.siteSurvey.row);
        setStructure(data.siteSurvey.structure);
        setA(data.siteSurvey.A);
        setB(data.siteSurvey.B);
        setC(data.siteSurvey.C);
        setD(data.siteSurvey.D);
        setE(data.siteSurvey.E);
        setF(data.siteSurvey.F);
        setG(data.siteSurvey.G);
        setH(data.siteSurvey.H);
        setI(data.siteSurvey.I);
        setJ(data.siteSurvey.J);
        setSubmittedBy(data.siteSurvey.submittedBy);
        setImg(data.siteSurvey.img);
        setImages(data.siteSurvey.images);
        setHtablex(data.siteSurvey.htablex);
        setHtabley(data.siteSurvey.htabley);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [projectCode, _id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/survey/sitesurveys/${projectCode}/${_id}`,
        {
          _id,
          surveyId,
          projectCode,
          table,
          row,
          block,
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
          submittedBy,
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
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Site updated successfully');
      navigate(`/siteDetails/${projectCode}`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
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

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImg(data.secure_url);
      }

      toast.success('Image uploaded successfully. ', {
        position: 'bottom-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName) => {
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. ', {
      position: 'bottom-right',
    });
  };

  return (
    <div className="container1">
      {projectCode}
      {loading ? (
        <LoadingBox />
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
                    >
                      <option value="">Structure</option>
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
                      value={block}
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
                      onChange={(e) => setRow(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-2 m-1">
                    <label htmlFor="lastName">Enter Table Name :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter Row Name"
                      value={table}
                      onChange={(e) => setTable(e.target.value)}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end align-items-center me-5 mt-3">
                  <button
                    className="submitBtn px-2 pt-1 pb-1 me-2"
                    onClick={handleNextSection}
                  >
                    Next{loading && <LoadingBox1 />}
                  </button>
                </div>
              </div>
            )}

            {progress === 1 && (
              <div className="m-2  p-1 pb-2">
                <div className="form-group mt-4">
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <div className="col-md-12 row d-flex justify-content-center align-items-center">
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> A :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter A"
                          value={A}
                          onChange={(e) => setA(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> B :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter B"
                          value={B}
                          onChange={(e) => setB(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> C :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter C"
                          value={C}
                          onChange={(e) => setC(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> D :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter D"
                          value={D}
                          onChange={(e) => setD(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> E :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter E"
                          value={E}
                          onChange={(e) => setE(e.target.value)}
                        />
                      </div>
                      <div className="form-group mx-1">
                        <label htmlFor="lastName"> F :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter F"
                          value={F}
                          onChange={(e) => setF(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> G :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter G"
                          value={G}
                          onChange={(e) => setG(e.target.value)}
                        />
                      </div>
                      <div className="form-group mx-1">
                        <label htmlFor="lastName"> Table 1 :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter H"
                          value={htablex}
                          onChange={(e) => setHtablex(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> H :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter H"
                          value={H}
                          onChange={(e) => setH(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> Table 2 :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter H"
                          value={htabley}
                          onChange={(e) => setHtabley(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName"> I :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter I"
                          value={I}
                          onChange={(e) => setI(e.target.value)}
                        />
                      </div>
                      <div className="form-group  mx-1">
                        <label htmlFor="lastName "> J :</label>
                        <input
                          type="text"
                          className="form-control m-1"
                          placeholder="Enter J"
                          value={J}
                          onChange={(e) => setJ(e.target.value)}
                        />
                      </div>

                      <div className="form-group mx-1">
                        <label htmlFor="lastName "> Image file :</label>

                        <input
                          value={img}
                          className="form-control"
                          onChange={(e) => setImg(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group mx-1">
                        <label htmlFor="lastName ">Upload Image:</label>
                        <span className="text-muted">
                          (image size should be 123*43)
                        </span>
                        {loadingUpload && <LoadingBox1 />}
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Enter J"
                          onChange={uploadFileHandler}
                        />
                      </div>

                      <div className="form-group  mx-1">
                        <label>additional Images</label>
                        {images.length === 0 && (
                          <p
                            className="bg-info  m-1 border border-rounded p-1"
                            style={{ width: '20%' }}
                          >
                            {' '}
                            no image
                          </p>
                          // <span className="alert alert-info">No Image</span>
                        )}

                        <ul variant="flush " className="m-1"></ul>
                        {images.map((x) => (
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
                          Upload Additional Image:
                        </label>

                        {loadingUpload && <LoadingBox1 />}
                        <input
                          type="file"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter J"
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
                          value={surveyId}
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Row Name"
                          value={surveyId}
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
                      Submit{loadingUpdate && <LoadingBox1 />}
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
