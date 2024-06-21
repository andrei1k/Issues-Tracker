import React from "react";
import Cookies from 'js-cookie'

export function setToken(token: string, rememberUser: boolean) {
    let expires: Date;
    if (rememberUser) {
        expires = new Date(new Date().getTime() +  7 * 24 * 60 * 60 * 1000); // 7 day
    } else {
        expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 min
    }
    console.log(expires);
    Cookies.set('token', token, { expires });
    console.log('Token expiration date:', expires);
};

export function isTokenExpired() {
    const token = Cookies.get('token');
    if (!token) return true;
  
    const cookieString = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!cookieString) return true;
  
    const expiresString = cookieString.split('; ').find(row => row.startsWith('expires='));
    if (!expiresString) return true;
  
    const expirationDate = new Date(expiresString.split('=')[1]);
    const currentDate = new Date();
  
    return currentDate > expirationDate;
};

export function removeToken() {
    Cookies.remove('token');
}

export function isEmptyUserData() {
    return getUserInfo() !== null;
}

export function getUserId() {
    const userIdData = localStorage.getItem('userId');
    if (userIdData) {
        return JSON.parse(userIdData);
    }

    return null;
}


export function getToken() {
    const token = Cookies.get('token');
    return token ?  token : null;
}


export function getUserInfo() {
    const userInfoData = localStorage.getItem('userData');
    if (userInfoData) {
        return JSON.parse(userInfoData);
    }

    return null;
}

export function getIsLoggedIn() {
    const isLoggedInData = localStorage.getItem('isLoggedIn');
    if (isLoggedInData) {
        return JSON.parse(isLoggedInData);
    }

    return null;
}

export function getProjectInfo() {
    const projectData = localStorage.getItem('project');
    if (projectData) {
        return JSON.parse(projectData);
    }
}