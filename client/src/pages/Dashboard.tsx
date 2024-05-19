import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Dashboard.css';


interface DashboardProps {
    userId: number;
    userInfo: UserData;
    token: string; 
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

function Dashboard({ userId, userInfo, token }: DashboardProps ) {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState<{ id: number, title: string, createdAt: string }[]>([]);
    const [message, setMessage] = useState('');
    const viewProjects = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:3001/projects/view/${userId}`, {
            // const response = await fetch(`http://88.203.234.166:3001/projects/view/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
    
            if (!response.ok) {
                throw new Error('Error fetching projects');
            }
    
            const data = await response.json();
            setProjects(data.projects);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const removeProject = async (projectName: string, mustBeDeleted: boolean) => {
        try {
            const response = await fetch(`http://0.0.0.0:3001/projects/remove/${userId}`, {
            // const response = await fetch(`http://88.203.234.166:3001/projects/remove/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify( {projectName, mustBeDeleted} )
            });
    
            if (!response.ok) {
                throw new Error('Error deleting projects');
            }
            
            viewProjects();
        } catch(error) {
            setMessage(error.message);
        }
    };

    const addProject = async (projectName: string) => {
        try {
            if (projectName === '') {
                throw new Error('empty-string');
            }
            const response = await fetch(`http://0.0.0.0:3001/projects/add/${userId}`, {
            // const response = await fetch(`http://88.203.234.166:3001/projects/add/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ projectName })
            });

            if (response.status === 400) {
                throw new Error('already-used-name');
            }

            if (!response.ok) {
                throw new Error('Error creating project');
            }

            setMessage('Project created successfully!');
            viewProjects();
        } catch (error) {
            console.error('Error creating project:', error);
            if (error.message === 'already-used-name') {
                setMessage('Project name is already used!');
            }
            else if (error.message === 'empty-string') {
                setMessage('Project must have a name!');
            }
            else {
                setMessage('Failed to create project!');
            }
        }
    };
    

    useEffect(() => {
        viewProjects();
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        await addProject(projectName);
    };

    const handleLeave: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        const crrProjectName = event.currentTarget.getAttribute('data-projectname');
        await removeProject(String(crrProjectName), false);
    };

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        const crrProjectName = event.currentTarget.getAttribute('data-projectname');
        await removeProject(String(crrProjectName), true);
    };

    const handleView: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        const crrProjectId = event.currentTarget.getAttribute('data-projectid');
        const crrProjectName = event.currentTarget.getAttribute('data-projectname');
        localStorage.setItem('project', JSON.stringify({crrProjectId, crrProjectName}));
        return true;
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | Issue Tracker</title>
            </Helmet>
            <div>
                <h2>Welcome, {userInfo.firstName} {userInfo.lastName}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Enter project name" 
                        value={projectName} 
                        onChange={(e) => setProjectName(e.target.value)} 
                    />
                    <button type="submit">Create Project</button>
                </form>
                {message && <p>{message}</p>}
                <h3>My Projects:</h3>
                <table className='project-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created at</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={index}>
                                <td>{project.title}</td>
                                <td>{new Date(project.createdAt).toUTCString()}</td>
                                <td className='button'>
                                <Link to={`/project/${userId}/${project.title}/add`}
                                    onClick={handleView}
                                    data-projectid={project.id}
                                    data-projectname={project.title}
                                    className='action-button'>
                                    Add Issue
                                </Link>
                                </td>
                                <td className='button'>
                                <Link to={`/project/${userId}/${project.title}`}
                                    onClick={handleView}
                                    data-projectid={project.id}
                                    data-projectname={project.title}
                                    className='action-button'>
                                    View
                                </Link>
                                </td>
                                <td className='button'>
                                    <button className='action-button' onClick={handleLeave} data-projectname={project.title}>Leave</button>
                                </td>
                                <td className='button'>
                                    <button className='action-button' onClick={handleRemove} data-projectname={project.title}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

export default Dashboard;
