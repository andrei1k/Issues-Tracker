import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Profile.css';

function Profile() {
    return (
        <div>
            <Helmet>
                <title>Profile | Issue Tracker</title>
            </Helmet>
            <h1>Profile page</h1>
            <div className='information-user'>
                <h2>Main Info: </h2>
                <div>
                    Name: 
                </div>
            </div>
        </div>
    );
}

export default Profile;