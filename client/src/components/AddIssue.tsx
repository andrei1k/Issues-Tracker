import React, { useState, FormEvent } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddIssue.css";
import { getToken, getUserId } from "../utils/Data.tsx";

interface Issue {
  id?: number;
  title: string;
  description: string;
  priority: number;
  assignedTo: number;
  statusId: number;
  projectId: number;
}

interface Project {
  id: number;
  title: string;
}

const defaultProject: Project = { id: 0, title: '' };

function AddIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [assignedTo, setAssignedTo] = useState(0);
  const [statusId, setStatusId] = useState(0);

  const { projectId } = useParams<{ projectId: string }>();

  const navigate = useNavigate();

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

      // Issue added successfully
      console.log("Issue added successfully");
    } catch (error) {
      console.error("Error adding issue:", error);
    }

    // Clear form fields
    setTitle("");
    setDescription("");
    setPriority(0);
    setAssignedTo(0);
    setStatusId(0);

    navigate(`../${getUserId()}/projects/${projectId}`);
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
          >
            <option value="">Select priority</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assigned To</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(parseInt(e.target.value))}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={statusId}
            onChange={(e) => setStatusId(parseInt(e.target.value))}
            className="select-field"
          >
            <option value="0">Select status</option>
            <option value="1">TO DO</option>
            <option value="2">Doing</option>
            <option value="3">Done</option>
            <option value="4">Bug</option>
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