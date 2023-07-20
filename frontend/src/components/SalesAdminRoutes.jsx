import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function SalesAdminRoutes({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin && userInfo.isSales ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}
