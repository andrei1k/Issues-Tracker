import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { UserData, UserStatsViewModel } from '../utils/Data.ts';
import userService from '../services/UserService.ts';

import '../styles/Profile.css';

function Profile() {

    const [userData, setUserData] = useState<UserData>();
    const [userStats, setUserStats] = useState<UserStatsViewModel>();

    
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
        <div>
            <Helmet>
                <title>Profile | Issue Tracker</title>
            </Helmet>
            <h1>Profile page</h1>
            <div className='information-user'>
                <h2>Main Info: </h2>
                <div>
                    <span>Email: </span>{userData?.email}
                </div>
                <div>
                    <span>First Name: </span>{userData?.firstName}
                </div>
                <div>
                    <span>Last Name: </span>{userData?.lastName}
                </div>
            </div>

            <div className='user-cards'>
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
    );
}

export default Profile;