import React from 'react';
import { Link } from 'react-router-dom';
import './sales.css';
import SalesCard from './SalesCard';
const SalasHome = () => {
  return (
    <div className="container">
      <h3 className="text-center">Sales Quick links</h3>
      <SalesCard />
    </div>
  );
};

export default SalasHome;
