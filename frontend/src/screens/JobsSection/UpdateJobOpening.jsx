import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateJobOpening = () => {
  const { jobid } = useParams();
  return <div className="container">UpdateJobOpening {jobid}</div>;
};

export default UpdateJobOpening;
