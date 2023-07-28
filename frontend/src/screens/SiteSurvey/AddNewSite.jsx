import { useEffect, useState, useReducer, useContext } from 'react';
import '../../App.css';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import AlertBox from '../../components/MessageBox/AlertBox';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getError } from '../../utils';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import LoadingBox3 from '../../components/LoadingBox/LoadingBox3';

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

function AddNewSite() {
  const navigate = useNavigate();

  const params = useParams(); // /product/:id
  const { id: siteId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [customerName, setCustomerName] = useState('');

  const [siteLocation, setSiteLocation] = useState('');
  const [plantCapacity, setPlantCapacity] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [customerLogo, setCustomerLogo] = useState('');

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   setLoading(true);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/survey/sites/${siteId}`);
        console.log(data);
        setCustomerName(data.customerName);
        setSiteLocation(data.siteLocation);
        setPlantCapacity(data.plantCapacity);
        setProjectCode(data.projectCode);
        setCustomerLogo(data.customerLogo);

        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [siteId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/survey/sites/${siteId}`,
        {
          _id: siteId,
          customerName,
          siteLocation,
          projectCode,
          customerLogo,
          plantCapacity,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Site updated successfully');
      navigate('/sitelist');
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
        setCustomerLogo([...customerLogo, data.secure_url]);
      } else {
        setCustomerLogo(data.secure_url);
      }

      toast.success('Image uploaded successfully. click Update to apply it', {
        position: 'bottom-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  // const deleteFileHandler = async (fileName) => {
  //   setCustomerLogo(customerLogo.filter((x) => x !== fileName));
  //   toast.success('Image removed successfully. click Update to apply it');
  // };

  return (
    <div className="container1  ">
      {/* {siteId} */}
      {loading ? (
        <LoadingBox3 />
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
          <div className="col-md-12 d-flex justify-content-end mt-3 me-5"></div>
          <form onSubmit={submitHandler}>
            <div className="form-group mt-4">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="firstName">Customer Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="lastName">Site Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Site Location"
                    value={siteLocation}
                    onChange={(e) => setSiteLocation(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="mobileNo">Plant Capacity:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Plant Capacity"
                    value={plantCapacity}
                    onChange={(e) => setPlantCapacity(e.target.value)}
                  />
                </div>{' '}
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="lastName"> Project Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Project Code"
                    value={projectCode}
                    onChange={(e) => setProjectCode(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="leaveDate">Logo file :</label>

                  <input
                    type="text"
                    className="form-control"
                    value={customerLogo}
                    // onChange={(e) => setCustomerLogo(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-5 m-2">
                  <label htmlFor="leaveDate">Upload Logo :</label>
                  <span className="text-muted">
                    (image size should be 123*43)
                  </span>
                  {loadingUpload && <LoadingBox4 />}
                  <input
                    type="file"
                    className="form-control"
                    id="logo"
                    onChange={uploadFileHandler}
                  />
                </div>
              </div>
              <div className="d-flex  justify-content-end align-items-center me-5">
                <button
                  className="submitBtn px-2 pt-1 pb-1"
                  style={{ marginRight: '50px' }}
                >
                  Update {loadingUpdate && <LoadingBox4 />}
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
