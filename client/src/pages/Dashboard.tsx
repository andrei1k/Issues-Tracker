import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Dashboard.css';
import projectService, { Project } from '../services/ProjectService.ts';

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
    const [projects, setProjects] = useState<Project[]>([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    // PROBLEM WITH SETTING DATA
    const viewProjects = async () => {
        try {
            const data = await projectService.viewProjects(userId);
            setProjects(data);
            console.log(data);
        }
        catch(error) {
            console.log(error.message);
        }
    };
    
    const removeProject = async (projectName: string, mustBeDeleted: boolean) => {
        await projectService.removeProject(userId, projectName, mustBeDeleted);
        await viewProjects();
    };

    const addProject = async (projectName: string) => {
        try {
            projectService.addProject(userId, projectName);
            setMessage('Project created successfully!');
            await viewProjects();
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

    const handleView: React.MouseEventHandler<HTMLTableDataCellElement> = (event) => {
        event.preventDefault();
        const crrProjectId = event.currentTarget.getAttribute('data-projectid');
        const crrProjectName = event.currentTarget.getAttribute('data-projectname');
        localStorage.setItem('project', JSON.stringify({crrProjectId, crrProjectName}));
        navigate(`../${userId}/projects/${crrProjectId}`);
    };

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
                            <th></th>
                            <th></th>
                            <th>Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        { projects.length > 0 && projects.map(project => (
                            <tr key={project.id}>
                                <td className='project-view'
                                    onClick={handleView} 
                                    data-projectid={project.id}
                                    data-projectname={project.title}>{project.title}
                                </td>
                                <td className='button'>
                                    <button className='action-button' onClick={handleLeave} data-projectname={project.title}>Leave</button>
                                </td>
                                <td className='button'>
                                    <button className='action-button' onClick={handleRemove} data-projectname={project.title}>Delete</button>
                                </td>
                                <td>{new Date(project.createdAt).toUTCString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

export default Dashboard;
