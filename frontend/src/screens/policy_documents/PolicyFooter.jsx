import React from 'react';
import { Link } from 'react-router-dom';

const PolicyFooter = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="" style={{ bottom: '0' }}>
      <hr style={{ margin: '0px 0px 0px 0px' }} />
      <footer className="text-center py-3">
        © Copyright {year}
        <Link className="mx-1 text-decoration-none">employee.taypro.in</Link>||
        All Rights Reserved.
      </footer>
    </div>
  );
};

export default PolicyFooter;
