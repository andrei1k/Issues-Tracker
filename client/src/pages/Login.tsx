import React from 'react';
import { Helmet } from 'react-helmet';

import AuthForm from '../components/AuthForm.tsx';

interface LoginProps {
    onLogin: (userId:number, rememberMe: boolean, token: string) => void;
}

function Login({ onLogin }: LoginProps) {
    return(
        <div>
            <Helmet>
                <title>Login | Issue Tracker</title>
            </Helmet>
            <AuthForm onSubmit={onLogin} formType='login' />
        </div>
        );
}

export default Login;
