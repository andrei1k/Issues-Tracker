import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Profile.css';
import userService from '../services/UserService.ts';
import { UserData } from '../utils/Data';

function Profile() {

    const [userData, setUserData] = useState<UserData>();
    
    const getUserData = async () => {
        const fetchedUserData = await userService.getUser();
        setUserData(fetchedUserData);
    }

    useEffect(() => {
        getUserData();
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
        </div>
    );
}

export default Profile;