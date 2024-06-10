import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar.tsx';
import { LocalData } from './components/AuthForm.tsx';

import PrivateOutlet from './routes/PrivateOutlet.tsx';

import NavBarLoggedIn from "./components/NavBarLoggedIn.tsx";
import HomeLoggedIn from "./components/HomeLoggedIn.tsx";
import AddIssue from "./components/AddIssue.tsx";
import IssueList from "./components/IssueList.tsx";

import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Profile from './pages/Profile.tsx';
import { getIsLoggedIn, getToken, getUserId, getUserInfo, isEmptyUserData } from './utils/Data.tsx';
import { WorkFlow } from './components/WorkFlow.tsx';

import './styles/App.css';
import WorkFlowForm from './components/WorkFlowForm.tsx';
const defaultUserData: LocalData = {
    firstName: '', lastName: '', email: ''
};

function App() {
    const [userData, setUserData] = useState<LocalData>(defaultUserData);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const token = getToken();
    const userId = getUserId();


    useEffect(() => {
        if (isEmptyUserData()) {
            const fetchedUserData = getUserInfo();
            const fetchedLogData = getIsLoggedIn();
            setUserData(fetchedUserData);
            setIsLoggedIn(fetchedLogData);
        }
        else {
            localStorage.setItem('userId', JSON.stringify(0));
            localStorage.setItem('userData', JSON.stringify(defaultUserData));
            localStorage.setItem('token', JSON.stringify(''));
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
            setUserData(defaultUserData);
        }
    }, []);

    const authorize = (userId:number, userInfo: LocalData, rememberMe: boolean, token: string) => {
        const updatedUserData = { userId, userInfo, token, isLoggedIn: true };

        localStorage.setItem('userId', JSON.stringify(userId));
        localStorage.setItem('userData', JSON.stringify(updatedUserData.userInfo));
        localStorage.setItem('token', JSON.stringify(updatedUserData.token));
        localStorage.setItem('isLoggedIn', JSON.stringify(updatedUserData.isLoggedIn));

        setUserData(updatedUserData.userInfo);
        setIsLoggedIn(updatedUserData.isLoggedIn);

        if (!rememberMe) {
            const logoutTimer = setTimeout(() => {
                localStorage.removeItem('logoutTimer');
                logOut();
                }, 10 * 60 * 1000); // 20 min
                localStorage.setItem('logoutTimer', JSON.stringify(logoutTimer));
                }
    };

    const logOut = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        
        setUserData(defaultUserData);
        setIsLoggedIn(false);

        if (localStorage.getItem('logoutTimer') !== null) {
            return <Navigate to='/'/>;
        }
        else {
            window.location.href = '/login?sessionExpired=true';
        }
    };

    return (
        <div className='container'>
            <Router>
            <div className='sidebar'>
                <NavBarLoggedIn userId={userId} isLoggedIn={isLoggedIn} logOut={logOut}/>
            </div>
            <div className='content'>
            {/* <NavBar userId={userId} isLoggedIn={isLoggedIn} logOut={logOut}/> */}
            <Routes>
                {!isLoggedIn && (
                <>
                    <Route path='/' element={<Home/>} />
                    <Route path='/login' element={<Login onLogin={authorize} />} />
                    <Route path='/register' element={<Register onRegister={authorize} />} />
                </>
                )}
                <Route element={<PrivateOutlet />}>
                        <Route path='/home' element={<HomeLoggedIn />} />
                        <Route path='/add-issue' element={<AddIssue />} />
                        <Route path='/issues' element={<IssueList />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/dashboard/:userId' element={<Dashboard userId={userId} userInfo={userData} token={token} />} />
                        <Route path='/statuses' element={<WorkFlow/>}/>
                        <Route path='/*' element={<HomeLoggedIn />}/>
                </Route>
                <Route path='/*' element={<Home/>}/>
            </Routes>
            </div>
            </Router>
        </div>
      );

}

export default App;
