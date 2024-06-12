import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import { getProjectInfo, getToken, getUserId, getUserInfo } from '../utils/Data.tsx';
import { Project } from '../../../server/src/models/Project.ts';

function PrivateOutlet () {
    const token = getToken();
    const userId = getUserId();
    const projectId = getProjectInfo().crrProjectId;
    if (token !== '' && matchUrl(userId, projectId)) {
      return <Outlet/>;
    }
    else {
      return <Navigate to='/' />;
    }
}

function matchUrl(userId: number, projectId: number) {
  const matchDashboard = window.location.pathname.match(/^\/(\d+)\/dashboard$/);
  const matchProject = window.location.pathname.match(/^\/\d+\/projects\/(\d+)$/);
  const matchAddIssue = window.location.pathname.match(/^\/(\d+)\/projects\/(\d+)\/add-issue$/);

  const matchOther = window.location.pathname === '/home' ||
                  window.location.pathname === '/' || 
                  window.location.pathname === '/issues' || 
                  window.location.pathname === '/workflow' || 
                  window.location.pathname === '/profile' ||
                  matchProject || matchAddIssue;

  if (matchDashboard) {
    const urlUserId = parseInt(matchDashboard[1]);
    return userId === urlUserId;
  } 
  // else if (matchProject) {
  //   console.log(matchProject);
  //   const urlUserId = parseInt(matchProject[0]);
  //   // console.log("url user id " + urlUserId);
  //   const urlProjectId = parseInt(matchProject[1]);
  //   // console.log("url proj id " + urlProjectId);
  //   return userId === urlUserId && projectId === urlProjectId;
  // } 
  else if (matchOther) {
    return true; 
  }
  else {
    return false;
  }
}

export default PrivateOutlet;