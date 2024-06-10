import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import '../styles/Auth.css';

interface AuthProps {
  onSubmit: (userId:number, data: any, rememberMe: boolean, token: string) => void;
  formType: 'login' | 'register';
}

export interface LocalData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

// used for authUser parameter
type FormData = Omit<LocalData, 'userId'>;

function AuthForm({ onSubmit, formType }: AuthProps) {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordStrong, setPasswordStrong] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);


  const isEmailValid = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const isNameValid = (name: string): boolean => {
    return /^[а-яА-Яa-zA-Z-]+$/.test(name);
  };

  const isPasswordStrong = (password: string): boolean => {
    return /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/.test(password);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isSessionExpired = urlParams.get('sessionExpired');

    if (isSessionExpired === 'true') {
      setSessionExpired(true);
    }

  }, []); 

  const handlePasswordChange = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentPassword = event.target.value;
      setPassword(currentPassword);
      setPasswordStrong(isPasswordStrong(currentPassword));
      setPasswordsMatch(currentPassword === confirmPassword);
      if (currentPassword === '' && confirmPassword === '') {
          setPasswordsMatch(true);
          setPasswordStrong(true);
      }
  };

  const handleConfirmPasswordChange = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentPassword = event.target.value;
      setConfirmPassword(currentPassword);
      setPasswordsMatch(currentPassword === password);
  };

  async function authUser(formData: FormData) {
    try {
      const response = await fetch(`http://localhost:3001/auth/${formType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
      });
      
      if (response.status === 400) {
        setMessage(`${formType === 'login' ? 'Wrong email or password!' : 
        'Email is already used!'} `);
        setLoading(false);
        throw new Error('Bad request');
      }
      
      if (response.status === 500 || !response.ok) {
        setMessage('Internal error!');
        setLoading(false);
        throw new Error('Server response was not ok');
      }
  
      const data = await response.json();
  
      setMessage(`${formType === 'login' ? 'Login' : 'Register'} successfully!`);

      const localUserId = data.currentUser.id;
      setUserId(data.currentUser.id);
      const localData: LocalData = {
        firstName: data.currentUser.firstName,
        lastName: data.currentUser.lastName,
        email: data.currentUser.email,
      }
  
      setSuccess(true);
      setLoading(false);
      onSubmit(localUserId, localData, rememberMe, data.token);
    } catch (error) {
      console.error(`${formType} error:`, error);
    }
  };

  const handleSubmit = 
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      // wait almost 1 sec for displaying loading indicator
      await new Promise(_ => setTimeout(_, 600));

      if (!isEmailValid(email)) {
        setMessage('Please enter a valid email address.');
        setLoading(false);
        return;
      }

      if (formType === 'register') {
        if (!isNameValid(firstName) || !isNameValid(lastName)) {
          setMessage('Please enter valid first and last names.');
          setLoading(false);
          return;
        }
      }
      const formData = { firstName, lastName, email, password };
      await authUser(formData);
  };

  return (
    <div>{sessionExpired && <div className='session-expire'>Session has expired, please log in again!</div>}
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit} noValidate>
        <h2>{formType === 'login' ? 'Login' : 'Register'}</h2>          
        <div className='input-group'>
          {formType === 'register' && (
            <>
              <input type='text' name='first-name' placeholder='First name' 
                required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type='text' name='last-name' placeholder='Last name' 
                required value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </>
          )}
          <input type='email' name='email' placeholder='Email address' 
            required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' name='password' placeholder='Password' 
            required value={password} onChange={handlePasswordChange} />
          {formType === 'register' && (
            <>
              <input type='password' name='confirm-password' placeholder='Confirm password' 
                required value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {!passwordsMatch && <p>Passwords do not match!</p>}
              {!passwordStrong && <p>Password must have at least 8 symbols, char and digits!</p>}
            </>
          )}
        </div>
        {formType === 'login' && 
          <label className='remember-button'>
            <input type='checkbox' onChange={() => setRememberMe(!rememberMe)} checked={rememberMe}/>Remember Me
          </label>
        }
        <button onClick={() => setMessage('')} className='submit' type='submit'>{formType === 'login' ? 'Login' : 'Register'}</button>
        {loading && <div className="loading-indicator"></div>}
        {message && <p>{message}</p>}
      </form>
    </div>
    </div>
  );
}

export default AuthForm;
