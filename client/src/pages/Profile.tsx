import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { UserData, UserStatsViewModel } from '../utils/Data.ts';
import userService from '../services/UserService.ts';

import '../styles/Profile.css';

function Profile() {

    const [userData, setUserData] = useState<UserData>();
    const [userStats, setUserStats] = useState<UserStatsViewModel>();

    const formatDate = (utcDateString) => {
        const date = new Date(utcDateString);
        return date.toLocaleString('bg-BG');
      };      
      

    const getUserData = async () => {
        const fetchedUserData = await userService.getUser();
        console.log(fetchedUserData);
        setUserData(fetchedUserData);
    }

    const getUserStats = async () => {
        const fetchedUserStats: UserStatsViewModel = await userService.getUserStats() as UserStatsViewModel;
        console.log(fetchedUserStats);
        setUserStats(fetchedUserStats);
        console.log(userStats);
    }

    useEffect(() => {
        console.log('useEffect')
        getUserData();
        getUserStats();
    },[])
    return (
        <div className='profile-container'>
            <Helmet>
                <title>Profile | Issue Tracker</title>
            </Helmet>
            <h1>Profile page</h1>
            <div className='information-user'>
            <div className='user-cards'>
                <div className='information-card'>
                    <h2>Main Information</h2>
                    <div className='information-container'>
                        <div>
                            <label className='information-label'>Email: </label>
                            <span className='information-span'>{userData?.email}</span>
                        </div>
                        <div>
                            <label className='information-label'>First Name: </label>
                            <span className='information-span'>{userData?.firstName}</span>
                        </div>
                        <div>
                            <label className='information-label'>Last Name: </label>
                            <span className='information-span'>{userData?.lastName}</span>
                        </div>
                        <div>
                            <label className='information-label'>Creation: </label>
                            <span className='information-span'>{formatDate(userData?.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <h3>Issues</h3>
                    <p>Total: {userStats?.issues}</p>
                </div>
                <div className='card'>
                    <h3>Projects</h3>
                    <p>Total: {userStats?.projects}</p>
                </div>
            </div>
        </div>
        </div>

    );
}

export default Profile;