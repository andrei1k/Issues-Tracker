import Cookies from 'js-cookie'

interface ProjectInfo {
    crrProjectId: string;
    crrProjectName: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

export function setToken(token: string, rememberUser: boolean) {
    let expires: Date;
    if (rememberUser) {
        expires = new Date(new Date().getTime() +  7 * 24 * 60 * 60 * 1000); // 7 day
    } else {
        expires = new Date(new Date().getTime() + 30 * 1000); // 20 min
    }

    Cookies.set('expiration-token-time', expires.toUTCString());
    Cookies.set('token', token, { expires });
};

export function isTokenExpired() {
    const token = Cookies.get('token');
    if (!token) return true;

    const expirationDateStr= Cookies.get('expiration-token-time');
    if (!expirationDateStr) return true;

    const expirationDate = new Date(expirationDateStr);
    const currentDate = new Date();
    return currentDate >= expirationDate;
};

export function removeToken() {
    Cookies.remove('token');
    Cookies.remove('expiration-token-time');
}

export function getUserId(): number | null {
    const userIdData = localStorage.getItem('userId');
    if (userIdData) {
        return JSON.parse(userIdData);
    }

    return null;
}

export function getToken(): string | null {
    const token = Cookies.get('token');
    return token ?  token : null;
}

export function getIsLoggedIn(): boolean | null {
    const isLoggedInData = localStorage.getItem('isLoggedIn');
    if (isLoggedInData) {
        console.log(JSON.parse(isLoggedInData));
        return JSON.parse(isLoggedInData);
    }

    return null;
}

export function getProjectInfo(): ProjectInfo | null{
    const projectData = localStorage.getItem('project');
    if (projectData) {
        return JSON.parse(projectData);
    }

    return null;
}