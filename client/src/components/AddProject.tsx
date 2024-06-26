import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import { getUserId } from '../utils/Data.ts';
import projectService from '../services/ProjectService.ts';

import '../styles/UserForm.css';

interface AddProjectFormProps {
    closeModal: () => void;
    viewProjects: () => Promise<void>;
}

function AddProjectForm({closeModal, viewProjects }: AddProjectFormProps) {
    const [projectTitle, setProjectTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            await projectService.addProject(getUserId()!, projectTitle);
            setMessage('Successfully added project!');
            await viewProjects();
            setTimeout(() => {
                closeModal();
            }, 1500);
        } catch(error) {       
            if (error.message === 'already-used-name') {
                setMessage('User is already added!');
            }
            else {
                setMessage('Internal error (Possibly wrong title format)');
            }
            console.error('error adding project: ', error.message);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Add Project | Issue Tracker</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className='user-form'>
                    <h2>Add New Project</h2>
                    <label htmlFor="name">Project Title: </label>
                    <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                    {message && <p>{message}</p>}
                    <button type="submit">Create Project</button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectForm;
