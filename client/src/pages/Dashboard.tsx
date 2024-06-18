import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaTrashAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import '../styles/Dashboard.css';
import projectService, { Project } from '../services/ProjectService.ts';
import Modal from '../components/Modal.tsx';
import UserForm from '../components/UserForm.tsx';
import AddProjectForm from '../components/AddProject.tsx';

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
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [projectSearch, setProjectSearch] = useState('');
    const [currentProjectId, setCurrentProjectId] = useState(0);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openProjectModal = () => {
        setIsProjectModalOpen(true);
    };

    const closeProjectModal = () => {
        setIsProjectModalOpen(false);
    }

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

    useEffect(() => {
        viewProjects();
    }, []);

    const handleAddUser: React.MouseEventHandler<SVGAElement> = async (event) => {
        event.preventDefault();
        const projectId = event.currentTarget.getAttribute('data-projectid');
        if (projectId !== null) {
            setCurrentProjectId(parseInt(projectId));
        }
        openModal();
    } 

    const handleCreateClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        openProjectModal();
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

    const handleView: React.MouseEventHandler<HTMLTableCellElement> = (event) => {
        event.preventDefault();
        const crrProjectId = event.currentTarget.getAttribute('data-projectid');
        const crrProjectName = event.currentTarget.getAttribute('data-projectname');
        localStorage.setItem('project', JSON.stringify({crrProjectId, crrProjectName}));
        navigate(`../${userId}/projects/${crrProjectId}`);
    };

    const sortByDate: React.ChangeEventHandler<HTMLSelectElement> = async (e) => {
        e.preventDefault();
        const option = e.target.value;
        if (option === 'newer') {
            const data = await projectService.viewSortedProjectsByDate(userId, true);
            setProjects(data);
        }
        else if (option === 'older') {
            const data = await projectService.viewSortedProjectsByDate(userId, false);
            setProjects(data);
        }
    }

    const sortByName: React.ChangeEventHandler<HTMLSelectElement> = async (e) => {
        e.preventDefault();
        const option = e.target.value;
        if (option === 'a-z') {
            const data = await projectService.viewSortedProjectsByDate(userId, true);
            setProjects(data);
        }
        else if (option === 'z-a') {
            const data = await projectService.viewSortedProjectsByDate(userId, false);
            setProjects(data);
        }
    }

    const filterProjects = (): Project[] => {
        if (projectSearch.trim() === '') {
            return projects;
        }
        return projects.filter((project) =>
            project.title.toLowerCase().includes(projectSearch.toLowerCase())
        );
    };

    return (
        <div>
            <Helmet>
                <title>Dashboard | Issue Tracker</title>
            </Helmet>
            <div>
                <h2>Welcome, {userInfo.firstName} {userInfo.lastName}</h2>
                <form className='project-sort-container'>
                    <input
                        className='project-input'
                        type="text" 
                        placeholder="Search project by name" 
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                    />
                    <select className='project-select-sort' onChange={sortByDate}>
                        <option disabled selected hidden>By Date</option>
                        <option className='project-option-sort' value='newer'>Newer projects first</option>
                        <option className='project-option-sort' value='older'>Older projects first</option>
                    </select>
                    <select className='project-select-sort' onChange={sortByName}>
                        <option disabled selected hidden>By Name</option>
                        <option className='project-option-sort' value='a-z'>A-Z</option>
                        <option className='project-option-sort' value='z-a'>Z-A</option>
                    </select>
                </form>

                <form className='project-form'>
                    <button 
                        className='project-button' 
                        type="submit"
                        onClick={handleCreateClick}>
                            Create Project
                    </button>
                </form>
                <Modal
                    isOpen={isProjectModalOpen}
                    onClose={closeProjectModal}
                    children={<AddProjectForm closeModal={closeProjectModal} viewProjects={viewProjects}/>}>
                </Modal>
                <h3 className='section-title'>My Projects:</h3>
                <div className='project-container'>
                 {filterProjects().map((project) => (
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
