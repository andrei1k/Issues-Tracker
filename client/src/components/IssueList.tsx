import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import FilterForm from "./FilterForm.tsx";
import Modal from "./Modal.tsx";
import AddIssue from './AddIssue.tsx';
import issueService, { Issue } from "../services/IssueService.ts";
import projectService from "../services/ProjectService.ts";
import "../styles/IssueList.css";
import statusService, { Status } from "../services/StatusService.ts";
import Column from "./Column.tsx";

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
  const [statuses, setStatuses] = useState<Status[]>()

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const fetchStatuses = async (): Promise<void> => {
    const statuses = await statusService.getStatuses()
    setStatuses(statuses)
  }

  const getUsersForProject = async (): Promise<void> => {
    try {
      const users = await projectService.getUsersFromProject(parseInt(projectId ?? ''));
      setAssignees(users);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }

  const viewIssues = async (): Promise<void> => {
    try {
      const data = await issueService.getIssues(parseInt(projectId ?? ''));
      setIssues(data);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const filterIssues = (): Issue[] => {
    let filteredIssues = issues;

    if (issueSearch.trim() !== '') {
      filteredIssues = filteredIssues.filter((issue) =>
        issue.title.toLowerCase().includes(issueSearch.toLowerCase()) ||
        issue.description.toLowerCase().includes(issueSearch.toLowerCase())
      );
    }

    if (selectedPriority) {
      filteredIssues = filteredIssues.filter(issue => issue.priority.toString() === selectedPriority);
    }

    if (selectedAssignee) {
      filteredIssues = filteredIssues.filter(issue => issue.assignedTo === selectedAssignee);
    }

    return filteredIssues;
  };

  useEffect(() => {
    viewIssues();
    getUsersForProject();
    fetchStatuses();
  }, []);

  useEffect(() => {
    filterIssues();
  }, [issueSearch, selectedPriority, selectedAssignee]);

  useEffect(() => {
    if (!parseInt(selectedPriority)) {
      viewIssues();
    } else {
      filterIssues();
    }
  }, [selectedPriority]);

  useEffect(() => {
    if (!selectedAssignee) {
      viewIssues();
    } else {
      filterIssues();
    }
  }, [selectedAssignee]);

  const handleGridClick = (): void => {
    setGridView(true);
  };

  const handleBoxClick = () => {
    setGridView(false);
  }

  const removeIssue = async (issueId: number): Promise<void> => {
    try {
      await issueService.removeIssue(parseInt(projectId ?? ''), issueId);
      await viewIssues();
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const handleAddIssueButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
        children={<AddIssue closeModal={closeModal} viewIssues={viewIssues} />}>
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
      <button onClick={handleAddIssueButton} className="home-button">Add Issue</button>
      <ul className={`filtered-issues ${gridView ? "grid-view" : "box-view"}`}>
        {
          statuses?.map(status => {
            return <Column
              key={status.id}
              issues={filterIssues().filter(issue =>status.id === issue.status?.id)}
              statusName={status.name}
              removeIssue={removeIssue}
              viewIssues={viewIssues}></Column>
          })
        }
      </ul>
    </div>
  );
}

export default IssueList;
