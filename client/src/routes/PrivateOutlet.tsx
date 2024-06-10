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
  // const matchDashboard = window.location.pathname.match(/^\/dashboard\/(\d+)$/);
  const matchDashboard = window.location.pathname.match(/^\/(\d+)\/dashboard$/);
  const matchProject = window.location.pathname.match(/^\/\d+\/projects\/([^/]+)$/);
  
  const matchOther = window.location.pathname === '/home' ||
                  window.location.pathname === '/' || 
                  window.location.pathname === '/issues' || 
                  window.location.pathname === '/add-issue' || 
                  window.location.pathname === '/workflow' || 
                  window.location.pathname === '/profile' ||
                  matchProject;

  if (matchDashboard) {
    const urlUserId = parseInt(matchDashboard[1]);
    console.log(urlUserId);
    return userId === urlUserId;

  } 
  // else if (matchProject) {
  //   console.log(matchProject[0]);
  //   const urlUserId = parseInt(matchProject[1]);
  //   return userId === urlUserId;
  // } 
  else if (matchOther) {
    return true; 
  }
  else {
    return false;
  }
}

export default PrivateOutlet;