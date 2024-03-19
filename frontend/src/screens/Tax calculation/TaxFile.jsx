import React from 'react';
import { Document, Page } from 'react-pdf';

const TaxFile = ({ pdf }) => {
  return (
    <div className="border border-danger">
      <Document file={pdf} style={{ maxHeight: '400px' }}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default TaxFile;
