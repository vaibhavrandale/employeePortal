import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import image from './images.jpg';
import { AiOutlineSend } from 'react-icons/ai';
import './wish.css';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import AlertBox from '../../components/MessageBox/AlertBox';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, wishes: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function Wishes() {
  const [{ loading, error, wishes, loadingCreate }, dispatch] = useReducer(
    reducer,
    {
      wishes: [],
      loading: true,
      error: '',
    }
  );

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { id } = useParams();

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/birthday-check/${id}`);
        // setForceUpdate((prev) => prev + 1);
        console.log(result);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.wishes,
        });

        // Calculate remaining leaves based on fetched leave counts
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>{' '}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="#" className="text-decoration-none">
              Birthday Wishes
            </Link>{' '}
          </li>
        </ol>
      </nav>
      {loading ? (
        // <LoadingBox />

        <LoadingBox5 />
      ) : error ? (
        <AlertBox className="alert alert-danger">{error}</AlertBox>
      ) : (
        <>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th className="text-center col-md-1">Wisher Image</th>
                <th className="text-center col-md-1">Wisher Name</th>
                <th className="text-center col-md-1">Wish</th>
                <th className="text-center col-md-1">Reply</th>
              </tr>
            </thead>
            <tbody>
              {wishes.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <div className="table-image-container">
                      {item.wisher_image ? (
                        <img
                          src={item.wisher_image}
                          alt={item.wishername}
                          className="table-image object-fit-contain"
                        />
                      ) : (
                        <img
                          src={image}
                          alt={item.wishername}
                          className="table-image object-fit-contain"
                        />
                      )}
                    </div>
                  </td>
                  <td className="text-center">{item.wishername}</td>
                  <td className="text-center">{item.wish}</td>
                  <td className="text-center">
                    {item.reply ? (
                      item.reply
                    ) : (
                      <form action="">
                        <span className=" d-flex justify-content-center m-1">
                          <input
                            type="text"
                            className="msgBox"
                            required
                            placeholder="reply"
                          />
                          <button className="Submit">
                            <AiOutlineSend />
                          </button>
                        </span>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Wishes;
