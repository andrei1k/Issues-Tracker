import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Auth.css';

interface RegisterProps {
    onRegister: (localData: LocalData, rememberMe: boolean) => void;
}

interface LocalData {
    firstName: string;
    lastName: string;
    email: string;
}

function Register({ onRegister }: RegisterProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [message, setMessage] = useState('');
    
    const [successReg, setSuccessReg] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
        setPasswordsMatch(confirmPassword === password);
        
        if (password === '') {
            setPasswordsMatch(true); 
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { firstName, lastName, email, password };
        await fetch('http://88.203.234.166:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)      
        })
        .then(response => {
            if (response.status === 400) {
                setMessage("Email is already used!");
                throw new Error('Bad request');
            }
            if (!response.ok) {
                throw new Error('Server response was not ok');
            }
            return response.json();
        })
        .then( () => {
            setMessage("Register successfully!");
            const localData: LocalData = {firstName: data.firstName, lastName: data.lastName, email:data.email};
            setSuccessReg(true);
            onRegister(localData, false);
        })
        .catch(error => {
            console.error('Error sending query:', error);
        });
    };

    return (
        <div className='auth-container'>
            <form className='auth-form' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className='input-group'>
                    <input type='text' id='first-name' name='first-name' placeholder='First name' 
                        required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type='text' id='last-name' name='last-name' placeholder='Last name' 
                        required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type='email' id='email' name='email' placeholder='Email address' 
                        required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' id='password' name='password' placeholder='Password' 
                        required value={password} onChange={handlePasswordChange} />
                    <input type='password' id='confirm-password' name='confirm-password' placeholder='Confirm password' 
                        required value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {!passwordsMatch && <p id="p-match">Passwords do not match</p>}
                </div>
                <button type='submit'>Register</button>
                {successReg && <Navigate to='/dashboard'/>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;
