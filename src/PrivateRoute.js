import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ user,children} ) {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return children ? children : <Outlet />;

}

export default PrivateRoute