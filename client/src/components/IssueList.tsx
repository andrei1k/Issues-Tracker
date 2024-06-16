import React, { useState, useEffect } from "react";
import "../styles/IssueList.css";
import FilterForm from "./FilterForm.tsx";
import IssueItem from "./IssueItem.tsx";
import { Helmet } from "react-helmet";
import { getProjectInfo, getUserId } from "../utils/Data.tsx";
import { useNavigate } from "react-router-dom";
import issueService, { Issue } from "../services/IssueService.ts";
import projectService from "../services/ProjectService.ts";
import Modal from "./Modal.tsx";
import AddIssue from './AddIssue.tsx';

interface Project {
  id: number;
  title: string;
}

const defaultProject = {id: 0, title: ''};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

function IssueList() {
  const [project, setProject] = useState<Project>(defaultProject);
  const [filter, setFilter] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [assignees, setAssignees] = useState<User[]>([]);
  const [gridView, setGridView] = useState<boolean>(true);
  const [userId, setUserId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUsersForProject = async () => {
    try {
      if (!project.id) {
        return;
      }
      const users = await projectService.getUsersFromProject(project.id);
      setAssignees(users);
    } catch(error) {
      console.error("Error fetching users: ", error);
    }
  }

  const filterIssues = () => {
    let filtered: Issue[] = issues.filter((issue) => {
      const textMatch: boolean = issue.title.toLowerCase().includes(filter.toLowerCase()) ||
        issue.description.toLowerCase().includes(filter.toLowerCase());
      const priorityMatch: boolean = selectedPriority === "" ||
        parseInt(issue.priority) === parseInt(selectedPriority);
      const assigneeMatch: boolean = selectedAssignee === "" ||
        issue.assignedTo === selectedAssignee;
      return textMatch && priorityMatch && assigneeMatch;
    });

    setFilteredIssues(filtered);
  };

  useEffect(() => {
    const crrProjectInfo = getProjectInfo();
    setUserId(getUserId());
    setProject({ id: parseInt(crrProjectInfo.crrProjectId), 
      title: crrProjectInfo.crrProjectName });
  }, []);
  
  useEffect(() => {
    if (project.id !== defaultProject.id) {
      viewIssues();
      getUsersForProject();
    }
  }, [project]);

  useEffect(() => {

    filterIssues();
  }, [filter, selectedPriority, selectedAssignee, issues]);

  const handleGridClick = () => {
    setGridView(true);
  };

  const handleBoxClick = () => {
    setGridView(false);
  }

  const removeIssue = async (issueId: number ) => {
    try {
      await issueService.removeIssue(project.id, issueId);
      await viewIssues();
    }
    catch(error) {
      console.log(error.message);
    }
  }

  const viewIssues = async () => {
    try {
      const data =  await issueService.getIssues(project.id);
      setIssues(data);
    }
    catch(error) {
      console.log(error.message);
    }
  }
  
  const handleAddIssueButton = (e) => {
    e.preventDefault();
    openModal();
    // navigate(`../${userId}/projects/${project.id}/add-issue`);
  }

  return (
    <div className="issue-list">
      <Helmet>
        <title>Issues | Issue Tracker</title>
      </Helmet>
      <h2>Issue List</h2>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        children={<AddIssue closeModal={closeModal} viewIssues={viewIssues}/>}>
      </Modal>
      <FilterForm
        filter={filter}
        setFilter={setFilter}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedAssignee={selectedAssignee}
        setSelectedAssignee={setSelectedAssignee}
        assignees={assignees}
        handleGridClick={handleGridClick}
        handleBoxClick={handleBoxClick}
        gridView={gridView}
      />
      <button onClick={handleAddIssueButton} className="home-button">Add Issue</button>
      <ul className={`filtered-issues ${gridView ? "grid-view" : "box-view"}`}>
        {filteredIssues.map((issue) => (
            <IssueItem issue={issue} removeIssue={removeIssue} />
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
