import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import "../styles/Issues.css";

import { getProjectInfo, getToken, getUserId } from '../utils/Data.tsx';
import { Link } from "react-router-dom";

interface Issue {
  id?: number,
  title: string;
  description: string;
  priority: string;
  assignedTo: string;
  deadline: string;
}

interface Project {
    id: number;
    title: string;
}

const defaultProject = {id: 0, title: ''};

function Issues() {
  const [project, setProject] = useState<Project>(defaultProject);
  const [filter, setFilter] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);

  useEffect(() => {
    const crrProjectInfo = getProjectInfo();
    setProject({ id: parseInt(crrProjectInfo.crrProjectId), title: crrProjectInfo.crrProjectName });
  }, []);
  
  useEffect(() => {
    if (project.id !== defaultProject.id) {
      viewIssues();
    }
  }, [project]);

  const removeIssue = async (event) => {
    try {
      const currentIssueId = event.currentTarget.getAttribute('data-issueId');
      const response = await fetch(`http://0.0.0.0:3001/projects/${project.id}/issues/remove/${currentIssueId}`, {
      // const response = await fetch(`http://88.203.234.166:3001/projects/${project.id}/issues/remove/${currentIssueId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error removing project');
        }

        await viewIssues();
    } catch (error) {
        console.log(error.message);
    }
  }
  const viewIssues = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:3001/projects/${project.id}/issues/all/`, {
      // const response = await fetch(`http://88.203.234.166:3001/projects/${project.id}/issues/all/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching projects');
        }

        const data = await response.json();
        console.log();
        setIssues(data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
  }
  // филтриране на issues
  const filterIssues = () => {
    let filtered: Issue[] = issues.filter((issue: Issue) => {
    if (!issues) return;
      // подреждане по текстово съдържание
      const textMatch: boolean =
        issue.title.toLowerCase().includes(filter.toLowerCase()) ||
        issue.description.toLowerCase().includes(filter.toLowerCase());
      // подреждане по приоритет
      const priorityMatch: boolean =
        selectedPriority === "" ||
        issue.priority.toLowerCase() === selectedPriority.toLowerCase();
      // подреждане по asignee
      const assigneeMatch: boolean =
        selectedAssignee === "" ||
        issue.assignedTo.toLowerCase() === selectedAssignee.toLowerCase();
      // подреждане по избрана дата за краен срок
      const dateMatch: boolean = selectedDate === "" || issue.deadline === selectedDate;

      return textMatch && priorityMatch && assigneeMatch && dateMatch;
    });

    setFilteredIssues(filtered);
  };

  //филтриране на issues при избор на филтър 
//   useEffect(() => {
//     filterIssues();
//   }, [filter, selectedPriority, selectedAssignee, selectedDate, issues]);

  return (
    <div className="issue-list">
    <Helmet>
      <title>Issues | Issue Tracker</title>
    </Helmet>
    <h2>Issue List</h2>
    <Link to={`/dashboard/${getUserId()}`} className='back-button'>Back</Link>
    <input
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search..."
      className="filter-input"
    />
    <select
      value={selectedPriority}
      onChange={(e) => setSelectedPriority(e.target.value)}
      className="priority-select"
    >
      <option value="">All Priorities</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <select
      value={selectedAssignee}
      onChange={(e) => setSelectedAssignee(e.target.value)}
      className="assignee-select"
    >
      <option value="">All Assignees</option>
      {assignees.map((assignee: string, index: number) => (
        <option key={index} value={assignee}>
          {assignee}
        </option>
      ))}
    </select>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="date-input"
    />
      <ul className="filtered-issues">
        {issues  && issues.length > 0? (
          issues.map((issue: Issue, index: number) => (
            <li key={index} className="issue-item">
              <ul className="issues">
                <li className="issue-field">
                  <span className="field-label">Title:</span>
                  <span className="field-value">{issue.title}</span>
                </li>
                <li className="issue-field">
                  <span className="field-label">Description:</span>
                  <span className="field-value">{issue.description}</span>
                </li>
                <li className="issue-field">
                  <span className="field-label">Priority:</span>
                  <span className="field-value">{issue.priority}</span>
                </li>
                <li className="issue-field">
                  <span className="field-label">Assigned To:</span>
                  <span className="field-value">{issue.assignedTo}</span>
                </li>
                <li className="issue-field">
                  <span className="field-label">Deadline:</span>
                  <span className="field-value">{issue.deadline}</span>
                </li>
                <li className="issue-field">
                <button className="remove-button"
                          // data-issueId={issue.id}
                  >Edit</button>
                  <button className="remove-button" 
                          onClick={removeIssue}
                          data-issueId={issue.id}
                  >Remove</button>
                </li>
              </ul>
            </li>
          ))
        ) : (
          <p>No issues available</p>
        )}
      </ul>
  </div>
  );
}

export default Issues;
