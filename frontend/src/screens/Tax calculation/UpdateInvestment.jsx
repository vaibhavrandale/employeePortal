import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateInvestment = () => {
  const { id } = useParams();
  return <div className="container">UpdateInvestment {id}</div>;
};

export default UpdateInvestment;
