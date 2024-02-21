import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import PdfComp from './PdfComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
const Dummypages = () => {
  const [filename, setFilename] = useState([]);
  const [title, setTitle] = useState('');
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get('http://localhost:5000/get-files');
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', filename);
    console.log(title, filename);

    const result = await axios.post('http://localhost:5000/uploadp', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(result);
    if (result) {
      toast.success('Uploaded Successfully!!!');
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:5000/files/${pdf}`);
  };

  return (
    // <div className="container">
    //   <input
    //     type="file"
    //     onChange={(e) => setFilename(e.target.files[0])}
    //     className="m-1"
    //   />
    //   <input
    //     type="text"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.files[0])}
    //     className="m-1"
    //   />
    //   <button type="button" onClick={upload}>
    //     Upload
    //   </button>

    //   <h2>Uploaded Files</h2>
    //   <ul>
    //     {file.map((file) => (
    //       <li key={file.id}>
    //         <Link to={`${file.filename}`}>{file.title}</Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div className="container">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFilename(e.target.files[0])}
        />
        <br />
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ''
            : allImage.map((data, index) => {
                return (
                  <div className="inner-div" key={index}>
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.filename)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  );
};

export default Dummypages;

// import React from 'react';

// const Dummypages = () => {
//   return <div className="container">Dummypages</div>;
// };

// export default Dummypages;
