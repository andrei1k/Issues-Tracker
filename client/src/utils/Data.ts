import Cookies from 'js-cookie'

export const IP_ADDRESS = 'localhost';

interface ProjectInfo {
    crrProjectId: string;
    crrProjectName: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    createdAt?: string;
}

export interface UserStatsViewModel {
    projects: number;
    issues: number;
}

export function setToken(token: string, rememberUser: boolean): void {
    let expires: Date;
    if (rememberUser) {
        expires = new Date(new Date().getTime() +  7 * 24 * 60 * 60 * 1000); // 7 day
    } else {
        expires = new Date(new Date().getTime() + 20* 60 * 1000); // 20 min
    }

    Cookies.set('expiration-token-time', expires.toUTCString());
    Cookies.set('token', token, { expires });
};

export function isTokenExpired(): boolean {
    const token = Cookies.get('token');
    if (!token) return true;

    const expirationDateStr= Cookies.get('expiration-token-time');
    if (!expirationDateStr) return true;

    const expirationDate = new Date(expirationDateStr);
    const currentDate = new Date();
    return currentDate >= expirationDate;
};

export function removeToken(): void {
    Cookies.remove('expiration-token-time');
    Cookies.remove('token');
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