import axios from 'axios';
import React, { useReducer, useState } from 'react';
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [{ loading, error, loadingUpload }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // If no file selected, do nothing

    setSelectedFile(file);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      await axios.post('api/upload/pdffiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('File uploaded successfully!');
      setSelectedFile('');
    } catch (error) {
      toast.error('Error uploading the file');
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(error) });
    }
  };

  return (
    <div className="container">
      <h1>PDF Upload</h1>
      <input type="file" onChange={handleFileChange} accept=".pdf" />{' '}
      {loadingUpload && <LoadingBox1 />}
    </div>
  );
}

export default Dummypages;
