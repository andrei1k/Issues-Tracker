import React, { useEffect, useState } from "react";
import "../styles/AddIssue.css";
import { getProjectInfo, getToken, getUserId } from "../utils/Data.tsx";
import { Link } from "react-router-dom";

interface Project {
    id: number;
    title: string;
}

interface Issue {
    title: string;
    description: string;
    priority: string;
    deadline: string;
}

const defaultProject = {id: 0, title: ''};

function AddIssue() {
  const [project, setProject] = useState<Project>(defaultProject);
  const [newIssue, setNewIssue] = useState<Issue>();
  const [isProjectSet, setIsProjectSet] = useState(false);
//   const [project, setProject] = useState<Project>(defaultProject);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");
    const addIssue = async(newIssue: Issue | undefined) => {
        try {
          if (!newIssue) {
            return;
          } 
          // const response = await fetch(`http://0.0.0.0:3001/projects/${project.id}/issues/create/`, {
            const response = await fetch(`http://88.203.234.166:3001/projects/${project.id}/issues/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newIssue.title,
                    description: newIssue.description,
                    priority: 1,
                    statusId: 1,
                    assignedTo: getUserId()
                })
            });
    
            if (!response.ok) {
                throw new Error('Error fetching projects');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
  const handleSubmit = (event) => {
    event.preventDefault();

    // проверка за празни полета
    const currentDate = new Date().toLocaleDateString();
    const newIssue = {
      title: title || "No title provided",
      description: description || "No description provided",
      priority: priority || "No priority was set",
    //   assignedTo: assignedTo || "Not assigned",
      deadline: deadline || "No deadline provided"
    };

    const crrProject = getProjectInfo();
    setProject({ id: parseInt(crrProject.crrProjectId), title: crrProject.crrProjectName });
    setNewIssue(newIssue);
    setIsProjectSet(true);
    // addIssue(newIssue);

    // setTitle("");
    // setDescription("");
    // setPriority("");
    // setAssignedTo("");
    // setDeadline("");
  };


  useEffect(() => {
    if (isProjectSet) {
      addIssue(newIssue);
      setIsProjectSet(false); // Нулиране на isProjectSet след извикването на addIssue
    }

    setTitle("");
    setDescription("");
    setPriority("");
    setAssignedTo("");
    setDeadline("");
  }, [project, isProjectSet, newIssue]);
  return (
    <div className="add-issue-container">
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
            onChange={(e) => setPriority(e.target.value)}
            className="select-field"
          >
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assigned To</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-field"
          />
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