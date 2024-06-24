import React, { useState, FormEvent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { getToken } from "../utils/Data.tsx";
import projectService from "../services/ProjectService.ts";

import "../styles/AddIssue.css";
import statusService, { Status } from "../services/StatusService.ts";

interface Issue {
  id?: number;
  title: string;
  description: string;
  priority: number;
  assignedTo: number;
  statusId: number;
  projectId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ModalProp {
  closeModal: () => void; 
  viewIssues: () => void;
}

function AddIssue({closeModal, viewIssues}: ModalProp ) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [assignedTo, setAssignedTo] = useState(0);
  const [users, setUsers] = useState<User[]>();
  const [statusId, setStatusId] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>()

  const { projectId } = useParams<{ projectId: string }>();

  const fetchStatuses = async () => {
    const statuses = await statusService.getStatuses()
    setStatuses(statuses)   
  }

  const getUsersForProject = async () => {
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
    getUsersForProject();
    fetchStatuses()
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!projectId) {
      console.error("Project ID is missing.");
      return;
    }

    const newIssue : Issue = {
      title,
      description,
      priority,
      assignedTo,
      statusId,
      projectId: parseInt(projectId),
    };
    
    
    try {
      const response = await fetch(`http://localhost:3001/projects/${projectId}/issues/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(newIssue),
      });

      if (!response.ok) {
        throw new Error("Failed to add issue");
      }

    } catch (error) {
      console.error("Error adding issue:", error);
    }
    viewIssues();
    closeModal();

  };

  return (
    <div className="add-issue-container">
      <Helmet>
        <title>Add Issue | Issue Tracker</title>
      </Helmet>
      <h2>Add New Issue</h2>
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
            {users?.map(user => (
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
            {
              statuses?.map(status => <option key={status.id} value={status.id}>{status.name}</option>)
            }
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Add Issue
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddIssue;