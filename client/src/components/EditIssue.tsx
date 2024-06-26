import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, FormEvent } from "react";

import { getToken } from "../utils/Data.ts";
import { Status } from "../services/StatusService.ts";
import issueService from "../services/IssueService.ts";
import projectService from "../services/ProjectService.ts";

import "../styles/AddIssue.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ModalProp {
  issueId?: number;
  closeModal: () => void; 
  viewIssues: () => Promise<void>;
}

const defaultStatus: Status = {id: 0, name: "", createdAt: new Date(), followingStatuses: [] as Status[]}

function EditIssue({issueId, closeModal, viewIssues}: ModalProp ) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [assignedTo, setAssignedTo] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [statusId, setStatusId] = useState(0);
  const [currStatus, setCurrStatus] = useState<Status>();

  const { projectId } = useParams<{ projectId: string }>();

  const fetchIssueDetails = async (): Promise<void> => {
    try {
      if (!projectId || !issueId) {
        return;
      }
      const issue = await issueService.getIssue(issueId);
      setTitle(issue.title);
      setDescription(issue.description);
      setPriority(issue.priority);
      setAssignedTo(issue.assignedTo);
      setStatusId(issue.status?.id as number);
      setCurrStatus(issue.status as Status);

      console.log(issue.status)
    } catch (error) {
      console.error("Error fetching issue details: ", error);
    }
  }

  const fetchUsersForProject = async (): Promise<void> => {
    try {
      if (!projectId) {
        return;
      }
      const users = await projectService.getUsersFromProject(parseInt(projectId));
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }


  useEffect(() => {
    fetchIssueDetails();
    fetchUsersForProject();
  }, [projectId, issueId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!projectId || !issueId) {
      console.error("Project ID or Issue ID is missing.");
      return;
    }

    const updatedIssue = {
      title,
      description,
      priority,
      assignedTo,
      statusId,
      projectId: parseInt(projectId),
      id: issueId,
    };

    try {
      const response = await fetch(`http://localhost:3001/projects/${projectId}/issues/edit/${issueId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(updatedIssue),
      });

      if (!response.ok) {
        throw new Error("Failed to update issue");
      }

    } catch (error) {
      console.error("Error updating issue:", error);
    }
    
    await viewIssues();
    closeModal();
  };

  return (
    <div className="edit-issue-container">
      <Helmet>
        <title>Edit Issue | Issue Tracker</title>
      </Helmet>
      <h2>Edit Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            className="select-field"
            required
          >
            <option value="">Select priority</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assigned To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(parseInt(e.target.value))}
            className="select-field"
            required
          >
            <option value="">Select user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName} - {user.email}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={statusId}
            onChange={(e) => setStatusId(parseInt(e.target.value))}
            className="select-field"
            required
          >
            <option value="">Select status</option>
            
            <option value={currStatus?.id}>{currStatus?.name}</option>
            {currStatus?.followingStatuses?.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
                ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Update Issue
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditIssue;
