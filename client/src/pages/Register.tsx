import React from 'react';
import { Helmet } from 'react-helmet';

import AuthForm from '../components/AuthForm.tsx';

interface RegisterProps {
    onRegister: (userId:number, rememberMe: boolean, token: string) => void;
}

function Register({ onRegister }: RegisterProps) {
    return( 
        <div>
            <Helmet>
                <title>Register | Issue Tracker</title>
            </Helmet>
            <AuthForm onSubmit={onRegister} formType="register" />
        </div>
    );
}

export default Register;
