import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import { getProjectInfo, getToken, getUserId } from '../utils/Data.ts';

function PrivateOutlet () {
    const token = getToken();
    const userId = getUserId();
    const projectId = getProjectInfo()?.crrProjectId;
    if (token !== '' && matchUrl(userId ?? 0, parseInt(projectId ?? ''))) {
      return <Outlet/>;
    }
    else {
      return <Navigate to='/' />;
    }
}

function matchUrl(userId: number, projectId: number): boolean {
  const pathParts = window.location.pathname.split('/');

  if (pathParts[2] === 'dashboard') {
    return Number(pathParts[1]) === Number(userId);
  }
  else if (pathParts[2] === 'projects') {
    return Number(pathParts[1]) === Number(userId) &&
          Number(pathParts[3]) === Number(projectId);
  }
  else if(pathParts[2] === 'profile') {
    return Number(pathParts[1]) === Number(userId);
  }
  else if (pathParts[1] === 'home' || 
          pathParts[1] === 'workflow' ||
          pathParts[1] === 'profile' || 
          pathParts[1] === '') 
  {
    return true;
  }
  else {
    return false;
  }
}

export default PrivateOutlet;