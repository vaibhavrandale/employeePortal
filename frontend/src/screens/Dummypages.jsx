import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import LoadingBox1 from '../components/LoadingBox1';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
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

function Dummypages() {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [{ loading, error, loadingUpload }, dispatch] = useReducer(reducer, {
  //   loading: true,
  //   error: '',
  // });

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return; // If no file selected, do nothing

  //   setSelectedFile(file);

  //   const formData = new FormData();
  //   formData.append('pdf', file);

  //   try {
  //     dispatch({ type: 'UPLOAD_REQUEST' });
  //     await axios.post('api/upload/pdffiles', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     dispatch({ type: 'UPLOAD_SUCCESS' });
  //     toast.success('File uploaded successfully!');
  //     setSelectedFile('');
  //   } catch (error) {
  //     toast.error('Error uploading the file');
  //     dispatch({ type: 'UPLOAD_FAIL', payload: getError(error) });
  //   }
  // };

  // const [pdfs, setPdfs] = useState([]);
  // //new
  // useEffect(() => {
  //   // Simulate API call or data fetching
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });

  //     try {
  //       const result = await axios.get('/api/upload/pdfs');
  //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //       console.log(result.data);
  //       setPdfs(result.data);
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: err.message });
  //     }

  //     setTimeout(() => {
  //       // setEmployees(result.data);
  //       // setLoading(false);
  //     }, 2000); // Simulating a 2-second delay
  //   };

  //   // setLoading(true);
  //   fetchData();
  // }, []);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevWidth + 2;
      });
    }, 100);

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="container">
      {!loadingComplete && (
        <div
          onLoadingComplete={handleLoadingComplete}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '4px',
            backgroundColor: '#FF10F0',
            width: `${width}%`,
            zIndex: 10000,
          }}
        ></div>
      )}

      {/*       
      <h1>PDF Upload</h1>
      <input type="file" onChange={handleFileChange} accept=".pdf" />{' '}
      {loadingUpload && <LoadingBox1 />}
      <div className="box">
        {pdfs.map((pdf) => (
          <div key={pdf._id} className="m-1 card">
            <h3>{pdf.name}</h3>

            <object
              data={pdf._id}
              type="application/pdf"
              width="100%"
              height="200px"
              alt=""
            />
          </div>
        ))}
        ;
      </div> */}
    </div>
  );
}

export default Dummypages;
