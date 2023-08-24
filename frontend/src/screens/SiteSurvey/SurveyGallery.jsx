import React, { useContext, useEffect, useReducer, useState } from 'react';
// import '../../App.css';
import '../SiteSurvey/surveyGallery.css';
import { BsDownload } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';
import { Store } from '../../Store';
import LoadingBox from '../../components/LoadingBox';
import AlertBox from '../../components/MessageBox/AlertBox';
import { toast } from 'react-hot-toast';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, siteSurvey: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function SurveyGallery() {
  const [{ loading, error, siteSurvey }, dispatch] = useReducer(reducer, {
    siteSurvey: {},
    loading: true,
    error: '',
    // surveyNotFound: false,
  });

  const { id } = useParams();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/survey/siteSurveys/get/${id}`);

        console.log(result);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.siteSurvey });
        console.log(result.data.siteSurvey);

        // Retrieve the selected image URL from local storage
        const storedSelectedImage = localStorage.getItem('selectedImage');
        if (storedSelectedImage) {
          setSelectedImage(storedSelectedImage);
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [id]);

  const handleThumbnailClick = (imageUrl) => {
    console.log('Clicked on thumbnail with URL:', imageUrl);
    setSelectedImage(imageUrl);
    localStorage.setItem('selectedImage', imageUrl);
    console.log('Updated selectedImage state and local storage');
  };

  // const imageNames = {
  //   [siteSurvey.ImageA]: 'A',
  //   [siteSurvey.ImageB]: 'B',
  //   [siteSurvey.ImageC]: 'C',
  //   [siteSurvey.ImageD]: 'D',
  //   [siteSurvey.ImageE]: 'E',
  //   [siteSurvey.ImageF]: 'F',
  //   [siteSurvey.ImageG]: 'G',
  //   [siteSurvey.ImageH]: 'H',
  //   [siteSurvey.ImageI]: 'I',
  //   [siteSurvey.ImageJ]: 'J',
  // };

  const handleSelectedImageDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${selectedImage}`);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Image_${imageNames[selectedImage]}.png`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  const constructImageNames = (siteSurvey) => {
    let imageNames = {};

    Object.entries(siteSurvey).forEach(([key, value]) => {
      if (key.startsWith('Image') && value) {
        if (Array.isArray(value)) {
          value.forEach((img, index) => {
            imageNames[img] = key.slice(5) + (index + 1);
          });
        } else {
          imageNames[value] = key.slice(5);
        }
      }
    });

    return imageNames;
  };

  const imageNames = constructImageNames(siteSurvey);

  return (
    <div className="">
      {loading ? (
        <div className="">
          <LoadingBox />
        </div>
      ) : error ? (
        <AlertBox className="alert alert-danger">{error}</AlertBox>
      ) : (
        <>
          <div className="container4 ">
            <div className="gallery mx-2">
              <h3 className="text-center">Survey Images</h3>
              <div className="large-image">
                {selectedImage ? (
                  <img
                    id="mainImage"
                    className="p-1 rounded"
                    src={selectedImage}
                    alt={selectedImage}
                    onLoad={() => URL.revokeObjectURL(selectedImage)}
                  />
                ) : (
                  <LoadingBox />
                )}
                <div className="d-flex justify-content-between">
                  {selectedImage && (
                    <p className="">image: {imageNames[selectedImage]}</p>
                  )}
                  {/* <button
                    className="btn  submitBtn2"
                    onClick={handleSelectedImageDownload}
                  >
                    <BsDownload />
                  </button> */}
                  <div
                    class="button downloadBtn"
                    onClick={handleSelectedImageDownload}
                  >
                    <div class="button-wrapper">
                      <div class="text1">Download</div>
                      <span class="icon1">
                        <svg
                          className="svg"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="2em"
                          height="2em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="thumbnail-row" id="thumbnailRow">
                {/* {Object.entries(siteSurvey).map(([key, value]) => {
                  if (key.startsWith('Image') && value) {
                    // Check if value is truthy
                    return (
                      <div
                        className="d-flex justify-content-center flex-column"
                        key={key}
                      >
                        <span className="text-center fw-bolder">
                          {key.slice(5)}
                        </span>
                        <img
                          id={key}
                          className="thumbnail rounded rounded"
                          src={value}
                          alt={value}
                          onClick={() => handleThumbnailClick(value)}
                        />
                      </div>
                    );
                  }
                  return null;
                })} */}

                {Object.entries(siteSurvey).map(([key, value]) => {
                  if (key.startsWith('Image') && value) {
                    if (key === 'ImageH' && Array.isArray(value)) {
                      // Handle the case where value is an array of image URLs
                      return value.map((img, index) => (
                        <div
                          className="d-flex justify-content-center flex-column"
                          key={`ImageH-${index}`}
                        >
                          <span className="text-center fw-bolder">
                            H{index + 1}
                          </span>
                          <img
                            id={`ImageH-${index}`}
                            className="thumbnail rounded rounded"
                            src={img}
                            alt={img}
                            onClick={() => handleThumbnailClick(img)}
                          />
                        </div>
                      ));
                    } else {
                      // Handle the normal case where value is a single image URL
                      return (
                        <div
                          className="d-flex justify-content-center flex-column"
                          key={key}
                        >
                          <span className="text-center fw-bolder">
                            {key.slice(5)}
                          </span>
                          <img
                            id={key}
                            className="thumbnail rounded rounded"
                            src={value}
                            alt={value}
                            onClick={() => handleThumbnailClick(value)}
                          />
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            </div>
            <Link className="mt-1" to={`/survey/${siteSurvey._id}`}>
              Back to Survey
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default SurveyGallery;
