import React from 'react';
import { useParams } from 'react-router-dom';

const ViewScopeofWork = () => {
  const { id } = useParams();

  return <div className="container">ViewScopeofWork :{id}</div>;
};

export default ViewScopeofWork;
