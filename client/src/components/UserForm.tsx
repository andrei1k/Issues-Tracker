import React, { useState } from 'react';
import projectService from '../services/ProjectService.ts';

import '../styles/UserForm.css';

interface UserFormProps {
    projectId: number;
    closeModal: () => void;
}

const UserForm = ({ projectId, closeModal }: UserFormProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await projectService.addUserInProject(projectId, firstName, lastName, email);
            setMessage('Successfully added user!');
            setTimeout(() => {
                closeModal();
            }, 1500);
        } catch(error) {       
            if (error.message === 'User is already added') {
                setMessage('User is already added!');
            }
            else if (error.message === 'User is not found') {
                setMessage('User is not found!');
            }
            else {
                setMessage('Internal error (Possibly wrong data)');
            }
            console.error('error adding user in project: ', error.message);
        }
    };

    return (
        <form onSubmit={closeModal}>
            <div className='user-form'>
                <h2>Add user in the project</h2>
                <label htmlFor="name">First name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="name">Last name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {message && <p>{message}</p>}
                <button onClick={handleSubmit} type="submit">Submit</button>
            </div>
        </form>
    );
};

export default UserForm;
