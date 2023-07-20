import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function ProductionAdminRoutes({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin && userInfo.isProduction ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}
