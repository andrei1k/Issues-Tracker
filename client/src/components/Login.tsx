import React from 'react';
import AuthForm from './AuthForm.tsx';

interface LocalData {
    firstName: string;
    lastName: string;
    email: string;
}

interface LoginProps {
    onLogin: (localData: LocalData, rememberMe: boolean) => void;
}

function Login({ onLogin }: LoginProps) {
    return <AuthForm onSubmit={onLogin} formType="login" />;
}

export default Login;
