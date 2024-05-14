import React from 'react';
import AuthForm from '../components/AuthForm.tsx';

interface LocalData {
    userId:number,
    firstName: string;
    lastName: string;
    email: string;
}

interface LoginProps {
    onLogin: (localData: LocalData, rememberMe: boolean, token: string) => void;
}

function Login({ onLogin }: LoginProps) {
    return <div>
        <AuthForm onSubmit={onLogin} formType='login' />
    </div>;
}

export default Login;
