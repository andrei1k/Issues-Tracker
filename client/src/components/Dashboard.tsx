import React from 'react';
import './Login.css';
interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

interface DashboardProps {
    userInfo: UserData | null; 
}
function Dashboard({ userInfo }: DashboardProps ) {
    return (<div>
        <h2>Welcome, {userInfo?.firstName} {userInfo?.lastName}</h2>
        </div>);
}

export default Dashboard;