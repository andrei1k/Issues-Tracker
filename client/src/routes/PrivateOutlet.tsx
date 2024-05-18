import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import { getToken, getUserId, getUserInfo } from '../utils/Data.tsx';

function PrivateOutlet () {
    const token = getToken();
    const userId = getUserId();

    if (token !== '' && matchUserId(userId)) {
      return <Outlet/>;
    }
    else {
      return <Navigate to='/' />;
    }
}

function matchUserId(userId: number) {
  const matchDashboard = window.location.pathname.match(/^\/dashboard\/(\d+)$/);
  const matchProfile = window.location.pathname === '/profile';

  if (matchDashboard) {
    const urlUserId = parseInt(matchDashboard[1]);
    return userId === urlUserId;
  } 
  else if (matchProfile) {
    return true; 
  }
  return false;
}

export default PrivateOutlet;