import React from 'react';
import './Login.css';

interface DashboardProps {
    userInfo: UserData | null; 
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

function Dashboard({ userInfo }: DashboardProps ) {
    return (<div>
        <h2>Welcome, {userInfo?.firstName} {userInfo?.lastName}</h2>
        </div>);
}

export default Dashboard;