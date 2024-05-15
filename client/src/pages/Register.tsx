import React from 'react';
import AuthForm from '../components/AuthForm.tsx';

interface LocalData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface RegisterProps {
    onRegister: (localData: LocalData, rememberMe: boolean, token: string) => void;
}

function Register({ onRegister }: RegisterProps) {
    return <AuthForm onSubmit={onRegister} formType="register" />;
}

export default Register;