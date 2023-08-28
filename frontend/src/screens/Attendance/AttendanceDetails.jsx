import React from 'react';
import { useParams } from 'react-router-dom';

function AttendanceDetails() {
  const { id } = useParams();
  return <div className="container">AttendanceDetails :{id}</div>;
}

export default AttendanceDetails;
