import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LocalData } from './components/AuthForm.tsx';

import PrivateOutlet from './routes/PrivateOutlet.tsx';

import NavBarLoggedIn from "./components/NavBar.tsx";
import HomeLoggedIn from "./components/HomeLoggedIn.tsx";
import IssueList from "./components/IssueList.tsx";

import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Profile from './pages/Profile.tsx';
import { getIsLoggedIn, isTokenExpired, getUserId, setToken, removeToken } from './utils/Data.tsx';
import { WorkFlow } from './pages/WorkFlow.tsx';

import './styles/App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const userId = getUserId();
    const [rememberUser, setRememberUser] = useState<boolean>(false);


    useEffect(() => {
        const fetchedLogData = getIsLoggedIn();
        setIsLoggedIn(fetchedLogData!);
        localStorage.setItem('userId', JSON.stringify(0));
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const intervalId = setInterval(() => {
                if (isTokenExpired() && !rememberUser) {
                    logOut();
                }
            }, 1000);
    
            return () => clearInterval(intervalId);
        }
    }, [isLoggedIn]);
    const authorize = (userId:number, userInfo: LocalData, rememberMe: boolean, token: string) => {
        const updatedUserData = { userId, userInfo, token, isLoggedIn: true };

        localStorage.setItem('userId', JSON.stringify(userId));
        localStorage.setItem('isLoggedIn', JSON.stringify(updatedUserData.isLoggedIn));
        
        setIsLoggedIn(updatedUserData.isLoggedIn);
        setRememberUser(rememberMe);
        setToken(updatedUserData.token, rememberUser);
    };

    const logOut = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        removeToken();

        setIsLoggedIn(false);
        setRememberUser(false);

        if (isTokenExpired()) {
                window.location.href = '/login?sessionExpired=true';
        } else {
            return <Navigate to='/'/>;
        }
    };

    return (
        <div className='container'>
            <Router>
            <div className='sidebar'>
                <NavBarLoggedIn userId={userId!} isLoggedIn={isLoggedIn} logOut={logOut}/>
            </div>
            <div className='content'>
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
                        <Route path='/issues' element={<IssueList />} />
                        <Route path='/:userId/profile' element={<Profile />} />
                        <Route path='/:userId/dashboard' element={<Dashboard userId={userId!} />} />
                        <Route path='/:userId/projects/:projectId' element={<IssueList/>}/>
                        <Route path='/workflow' element={<WorkFlow/>}/>
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
