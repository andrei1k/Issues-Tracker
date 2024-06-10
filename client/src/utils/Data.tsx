import React from "react";

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
    const tokenData = localStorage.getItem('token');
    if (tokenData) {
        return JSON.parse(tokenData);
    }

    return null;
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