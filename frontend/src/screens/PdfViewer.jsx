import React from 'react';
import { useParams } from 'react-router-dom';

function PdfViewer() {
  const { name } = useParams();
  return (
    <div className="container">
      {name}
      <embed src={name} type="application/pdf" width="100%" height="600px" />
    </div>
  );
}

export default PdfViewer;
