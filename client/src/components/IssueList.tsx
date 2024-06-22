import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import FilterForm from "./FilterForm.tsx";
import IssueItem from "./IssueItem.tsx";
import Modal from "./Modal.tsx";
import AddIssue from './AddIssue.tsx';
import issueService, { Issue } from "../services/IssueService.ts";
import projectService from "../services/ProjectService.ts";

import "../styles/IssueList.css";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

function IssueList() {
  const [issueSearch, setIssueSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedAssignee, setSelectedAssignee] = useState<number>(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [assignees, setAssignees] = useState<User[]>([]);
  const [gridView, setGridView] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { projectId } = useParams<{ projectId: string }>();


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUsersForProject = async () => {
    try {
      const users = await projectService.getUsersFromProject(parseInt(projectId!));
      setAssignees(users);
    } catch(error) {
      console.error("Error fetching users: ", error);
    }
  }

  const filterByAssignee = async (userId: number) => {
    try {
      const data = await issueService.getIssuesByAssignee(parseInt(projectId!), userId);
      setIssues(data);
    } catch(err) {
      console.log(err.message);
    }
  }

  const filterByPriority = async (priority: string) => {
    try {
      const data =  await issueService.getIssuesByPriority(parseInt(projectId!), parseInt(priority));
      setIssues(data);
    } catch(err) {
      console.log(err.message);
    }
  }

  const filterIssues = (): Issue[] => {
    if (issueSearch.trim() === '') {
      return issues;
    }
    return issues.filter((issue) => 
      issue.title.toLowerCase().includes(issueSearch.toLowerCase()) ||
      issue.description.toLowerCase().includes(issueSearch.toLowerCase())
    );
  };
  
  useEffect(() => {
    viewIssues();
    getUsersForProject();
  }, []);

  useEffect(() => {
    filterIssues();
  }, [issueSearch]);

  useEffect(() => {
    if (!parseInt(selectedPriority)) {
      viewIssues();
    } else {
      filterByPriority(selectedPriority);
    }
  }, [selectedPriority]);

  useEffect(() => {
    if (!selectedAssignee) {
      viewIssues();
    } else {
      filterByAssignee(selectedAssignee);
    }
  }, [selectedAssignee]);

  const handleGridClick = () => {
    setGridView(true);
  };

  const handleBoxClick = () => {
    setGridView(false);
  }

  const removeIssue = async (issueId: number ) => {
    try {
      await issueService.removeIssue(parseInt(projectId!), issueId);
      await viewIssues();
    }
    catch(error) {
      console.log(error.message);
    }
  }

  const viewIssues = async () => {
    try {
      const data =  await issueService.getIssues(parseInt(projectId!));
      setIssues(data);
    }
    catch(error) {
      console.log(error.message);
    }
  }
  
  const handleAddIssueButton = (e) => {
    e.preventDefault();
    openModal();
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
        issueSearch={issueSearch}
        setIssueSearch={setIssueSearch}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedAssignee={selectedAssignee}
        setSelectedAssignee={setSelectedAssignee}
        assignees={assignees}
        handleGridClick={handleGridClick}
        handleBoxClick={handleBoxClick}
        gridView={gridView}
      />
      <button onClick={
        handleAddIssueButton} className="home-button">Add Issue</button>
      <ul className={`filtered-issues ${gridView ? "grid-view" : "box-view"}`}>
        {filterIssues().map((issue) => (
            <IssueItem issue={issue} removeIssue={removeIssue} viewIssues={viewIssues}/>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
