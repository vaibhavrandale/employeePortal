import React from 'react';
import { useParams } from 'react-router-dom';

import './leave.css';
function LeaveApplication() {
  const { id } = useParams();

  return <div className="container">leave -{id}</div>;
}

export default LeaveApplication;
