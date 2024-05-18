import React from 'react';
import { Helmet } from 'react-helmet';

function Profile() {
    return (
        <div>
            <Helmet>
                <title>Profile | Issue Tracker</title>
            </Helmet>
            <h1>Profile page</h1>
        </div>
    );
}

export default Profile;