import React, { useState, useEffect, FormEvent } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getToken } from "../utils/Data.tsx";
import projectService from "../services/ProjectService.ts";
import "../styles/AddIssue.css";
import issueService from "../services/IssueService.ts";

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
  issueId?: number;
  closeModal: () => void; 
  viewIssues: () => Promise<void>;
}

function EditIssue({issueId, closeModal, viewIssues}: ModalProp ) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [assignedTo, setAssignedTo] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [statusId, setStatusId] = useState(0);

  const { projectId } = useParams<{ projectId: string }>();

  const fetchIssueDetails = async () => {
    try {
      console.log("blalalla");
      console.log(projectId);
      console.log(issueId);
      if (!projectId || !issueId) {
        return;
      }
      console.log("hahahhaha");
      const issue = await issueService.getIssue(issueId);
      console.log(issue);
      setTitle(issue.title);
      setDescription(issue.description);
      setPriority(parseInt(issue.priority));
      setAssignedTo(parseInt(issue.assignedTo));
      setStatusId(issue.statusId);
    } catch (error) {
      console.error("Error fetching issue details: ", error);
    }
  }

  const fetchUsersForProject = async () => {
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

    const updatedIssue : Issue = {
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
            <option value="1">TO DO</option>
            <option value="2">Doing</option>
            <option value="3">Done</option>
            <option value="4">Bug</option>
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
