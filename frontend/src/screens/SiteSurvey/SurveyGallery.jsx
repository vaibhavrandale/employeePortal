// import React, { useContext, useEffect, useReducer, useState } from 'react';
// import '../../App.css';
// import '../SiteSurvey/surveyGallery.css';
// import { BsDownload } from 'react-icons/bs';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { getError } from '../../utils';
// import { Store } from '../../Store';
// import LoadingBox from '../../components/LoadingBox';
// import AlertBox from '../../components/MessageBox/AlertBox';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, siteSurvey: action.payload, loading: false };

//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// function SurveyGallery() {
//   const [{ loading, error, siteSurvey }, dispatch] = useReducer(reducer, {
//     siteSurvey: {},
//     loading: true,
//     error: '',
//     // surveyNotFound: false,
//   });

//   const { id } = useParams();
//   const { state, dispatch: ctxDispatch } = useContext(Store);

//   const [selectedImage, setSelectedImage] = useState('');

//   // const handleDownloadClick = () => {
//   //   if (selectedImage) {
//   //     console.log(siteSurvey); // Log the siteSurvey object
//   //     console.log(selectedImage); // Log the selectedImage value

//   //     const directImageUrl = siteSurvey.imageUrls[selectedImage];
//   //     if (directImageUrl) {
//   //       const link = document.createElement('a');
//   //       link.href = directImageUrl;
//   //       link.download = `image_${imageNames[selectedImage]}.png`;
//   //       link.click();
//   //     }
//   //   }
//   // };

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });

//       try {
//         const result = await axios.get(`/api/survey/siteSurveys/get/${id}`);

//         console.log(result);
//         dispatch({ type: 'FETCH_SUCCESS', payload: result.data.siteSurvey });
//         console.log(result.data.siteSurvey);

//         // Retrieve the selected image URL from local storage
//         const storedSelectedImage = localStorage.getItem('selectedImage');
//         if (storedSelectedImage) {
//           setSelectedImage(storedSelectedImage);
//         }
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleThumbnailClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     localStorage.setItem('selectedImage', imageUrl);
//   };
//   const imageNames = {
//     [siteSurvey.ImageA]: 'A',
//     [siteSurvey.ImageB]: 'B',
//     [siteSurvey.ImageC]: 'C',
//     [siteSurvey.ImageD]: 'D',
//     [siteSurvey.ImageE]: 'E',
//     [siteSurvey.ImageF]: 'F',
//     [siteSurvey.ImageG]: 'G',
//     [siteSurvey.ImageH]: 'H',
//     [siteSurvey.ImageI]: 'I',
//     [siteSurvey.ImageJ]: 'J',
//   };

//   const handleSelectedImageDownload = async () => {
//     try {
//       const response = await fetch(`${selectedImage}`);
//       const blob = await response.blob();

//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `Image_${imageNames[selectedImage]}.png`;
//       link.click();

//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error downloading the image:', error);
//     }
//   };

//   return (
//     <div className="">
//       {loading ? (
//         <div className="">
//           {' '}
//           <LoadingBox />
//         </div>
//       ) : error ? (
//         <AlertBox className="alert alert-danger">{error}</AlertBox>
//       ) : (
//         <>
//           <div className="container4 ">
//             <div className="gallery mx-2">
//               <h3 className="text-center">Survey Images</h3>
//               <div className="large-image ">
//                 <img
//                   id="mainImage "
//                   className="p-1 rounded"
//                   src={selectedImage || siteSurvey.ImageA}
//                   alt={selectedImage || siteSurvey.ImageA}
//                 />
//                 <div className="d-flex justify-content-between">
//                   <p className="">image :{imageNames[selectedImage]} </p>
//                   {/* <button
//                     className="btn     bg-none"
//                     onClick={handleDownloadClick}
//                   >
//                     Download <BsDownload />
//                   </button> */}
//                   <button
//                     className="btn  submitBtn "
//                     onClick={handleSelectedImageDownload}
//                   >
//                     Download <BsDownload />
//                   </button>

//                   {/* <ImageDownloader
//                     imageUrl={selectedImage}
//                     imageName={imageNames[selectedImage]}
//                   /> */}
//                 </div>
//               </div>
//               <div className="thumbnail-row" id="thumbnailRow">
//                 {siteSurvey.ImageA && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">A</span>
//                     <img
//                       id="1"
//                       className="thumbnail rounded rounded "
//                       src={siteSurvey.ImageA}
//                       alt={siteSurvey.ImageA}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageA)}
//                     />
//                   </div>
//                 )}
//                 {siteSurvey.ImageB && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">B</span>
//                     <img
//                       id="2"
//                       className="thumbnail rounded rounded"
//                       src={siteSurvey.ImageB}
//                       alt={siteSurvey.ImageB}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageB)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageC && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">C</span>
//                     <img
//                       id="3"
//                       className="thumbnail rounded rounded p-1"
//                       src={siteSurvey.ImageC}
//                       alt={siteSurvey.ImageC}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageC)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageD && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">D</span>
//                     <img
//                       id="4"
//                       className="thumbnail rounded rounded p-1"
//                       src={siteSurvey.ImageD}
//                       alt={siteSurvey.ImageD}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageD)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageE && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">E</span>
//                     <img
//                       id="5"
//                       className="thumbnail rounded rounded p-1"
//                       src={siteSurvey.ImageE}
//                       alt={siteSurvey.ImageE}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageE)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageF && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">F</span>
//                     <img
//                       id="6"
//                       className="thumbnail rounded rounded p-1"
//                       src={siteSurvey.ImageF}
//                       alt={siteSurvey.ImageF}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageF)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageG && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">G</span>
//                     <img
//                       id="7"
//                       className="thumbnail rounded rounded p-1"
//                       src={siteSurvey.ImageG}
//                       alt={siteSurvey.ImageG}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageG)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageH && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">H</span>
//                     <img
//                       id="8"
//                       className="thumbnail rounded p-1"
//                       src={siteSurvey.ImageH}
//                       alt={siteSurvey.ImageH}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageH)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageI && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">I</span>
//                     <img
//                       id="9"
//                       className="thumbnail rounded p-1"
//                       src={siteSurvey.ImageI}
//                       alt={siteSurvey.ImageI}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageI)}
//                     />
//                   </div>
//                 )}

//                 {siteSurvey.ImageJ && (
//                   <div className="d-flex jusify-content-center flex-column">
//                     <span className="text-center fw-bolder">J</span>
//                     <img
//                       id="10"
//                       className="thumbnail rounded p-1"
//                       src={siteSurvey.ImageJ}
//                       alt={siteSurvey.ImageJ}
//                       onClick={() => handleThumbnailClick(siteSurvey.ImageJ)}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <Link className="mt-1" to={`/survey/${siteSurvey._id}`}>
//               Back to Survey
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default SurveyGallery;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import '../../App.css';
import '../SiteSurvey/surveyGallery.css';
import { BsDownload } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';
import { Store } from '../../Store';
import LoadingBox from '../../components/LoadingBox';
import AlertBox from '../../components/MessageBox/AlertBox';

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
    setSelectedImage(imageUrl);
    localStorage.setItem('selectedImage', imageUrl);
  };

  const imageNames = {
    [siteSurvey.ImageA]: 'A',
    [siteSurvey.ImageB]: 'B',
    [siteSurvey.ImageC]: 'C',
    [siteSurvey.ImageD]: 'D',
    [siteSurvey.ImageE]: 'E',
    [siteSurvey.ImageF]: 'F',
    [siteSurvey.ImageG]: 'G',
    [siteSurvey.ImageH]: 'H',
    [siteSurvey.ImageI]: 'I',
    [siteSurvey.ImageJ]: 'J',
  };

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
                  <button
                    className="btn  submitBtn2"
                    onClick={handleSelectedImageDownload}
                  >
                    <BsDownload />
                  </button>
                </div>
              </div>
              <div className="thumbnail-row" id="thumbnailRow">
                {Object.entries(siteSurvey).map(([key, value]) => {
                  if (key.startsWith('Image')) {
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
