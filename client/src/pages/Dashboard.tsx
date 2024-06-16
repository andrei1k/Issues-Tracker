import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaTrashAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import '../styles/Dashboard.css';
import projectService, { Project } from '../services/ProjectService.ts';
import Modal from '../components/Modal.tsx';
import UserForm from '../components/UserForm.tsx';

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

function Dashboard({ userId, userInfo }: DashboardProps ) {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const[currentProjectId, setCurrentProjectId] = useState(0);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const viewProjects = async () => {
        try {
            const data = await projectService.viewProjects(userId);
            setProjects(data);
        }
        catch(error) {
            console.log(error.message);
        }
    };
    
    const removeProject = async (projectId: number, mustBeDeleted: boolean) => {
        try {
            await projectService.removeProject(userId, projectId, mustBeDeleted);
            await viewProjects();
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const addProject = async (projectName: string) => {
        try {
            await projectService.addProject(userId, projectName);
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

    const handleAddUser: React.MouseEventHandler<SVGAElement> = async (event) => {
        event.preventDefault();
        const projectId = event.currentTarget.getAttribute('data-projectid');
        if (projectId !== null) {
            setCurrentProjectId(parseInt(projectId));
        }
        openModal();
    } 

    const handleLeave: React.MouseEventHandler<SVGAElement> = async (event) => {
        event.preventDefault();
        const projectId = event.currentTarget.getAttribute('data-projectid');
        await removeProject(Number(projectId), false);
    };

    const handleRemove: React.MouseEventHandler<SVGAElement> = async (event) => {
        event.preventDefault();
        const projectId = event.currentTarget.getAttribute('data-projectid');
        await removeProject(Number(projectId), true);
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
                <form className='project-form' onSubmit={handleSubmit}>
                    <input 
                        className='project-input'
                        type="text" 
                        placeholder="Enter project name" 
                        value={projectName} 
                        onChange={(e) => setProjectName(e.target.value)} 
                    />
                    <button className='project-button' type="submit">Create Project</button>
                </form>
                {message && <p className='message'>{message}</p>}
                <h3 className='section-title'>My Projects:</h3>
                <div className='project-container'>
                 {projects.map((project) => (
                        <div className="project" key={project.id}>
                            <div className="project-header">
                                <div 
                                    className="project-title" 
                                    data-projectid={project.id}
                                    data-projectname={project.title}
                                    onClick={handleView}>
                                    {project.title}
                                </div>
                                <div className="project-date">
                                    Created at: {new Date(project.createdAt).toUTCString()}
                                </div>
                            </div>
                            <div className="project-actions">
                                <div className='action'>
                                    <FaUserPlus 
                                        data-projectid={project.id} 
                                        onClick={handleAddUser}/>
                                    <span className='action-name'>Add user</span>
                                    <Modal 
                                        isOpen={isModalOpen} 
                                        onClose={closeModal} 
                                        children={<UserForm projectId={currentProjectId} closeModal={closeModal}/>}>
                                    </Modal>
                                </div>
                                <div className='action'>
                                    <FaSignOutAlt 
                                        data-projectid={project.id}
                                        onClick={handleLeave}
                                    />
                                    <span className='action-name'>Leave</span>
                                </div>
                                <div className='action'>
                                    <FaTrashAlt
                                        data-projectid={project.id} 
                                        onClick={handleRemove}
                                    />
                                    <span className='action-name'>Delete</span>
                                </div>

                            </div>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    );
    
}

export default Dashboard;
