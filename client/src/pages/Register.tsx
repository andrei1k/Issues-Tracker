import React from 'react';
import { Helmet } from 'react-helmet';

import AuthForm,{LocalData} from '../components/AuthForm.tsx';

interface RegisterProps {
    onRegister: (userId:number, localData: LocalData, rememberMe: boolean, token: string) => void;
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
