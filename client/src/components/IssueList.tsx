import React, { useState, useEffect } from "react";
import "../styles/IssueList.css";
import FilterForm from "./FilterForm.tsx";
import IssueItem from "./IssueItem.tsx";
import { Helmet } from "react-helmet";
import { getProjectInfo, getToken } from "../utils/Data.tsx";

interface Issue {
  id?: number;
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


function IssueList() {
  const [project, setProject] = useState<Project>(defaultProject);
  const [filter, setFilter] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [gridView, setGridView] = useState<boolean>(true);

  // useEffect(() => {
  //   const issuesFromLocalStorage: Issue[] = JSON.parse(localStorage.getItem("issues") || "[]");
  //   setIssues(issuesFromLocalStorage);
  //   setFilteredIssues(issuesFromLocalStorage);
  
  //   const uniqueAssignees: string[] = Array.from(
  //     new Set(issuesFromLocalStorage.map((issue) => issue.assignedTo))
  //   );
  //   setAssignees(uniqueAssignees);
  // }, []);

  useEffect(() => {
    const crrProjectInfo = getProjectInfo();
    setProject({ id: parseInt(crrProjectInfo.crrProjectId), title: crrProjectInfo.crrProjectName });
  }, []);
  
  useEffect(() => {
    if (project.id !== defaultProject.id) {
      viewIssues();
    }
  }, [project]);

  

  useEffect(() => {
    const filterIssues = () => {
      let filtered: Issue[] = issues.filter((issue) => {
        const textMatch: boolean = issue.title.toLowerCase().includes(filter.toLowerCase()) ||
          issue.description.toLowerCase().includes(filter.toLowerCase());
        const priorityMatch: boolean = selectedPriority === "" ||
          issue.priority.toLowerCase() === selectedPriority.toLowerCase();
        const assigneeMatch: boolean = selectedAssignee === "" ||
          issue.assignedTo.toLowerCase() === selectedAssignee.toLowerCase();

        return textMatch && priorityMatch && assigneeMatch;
      });

      setFilteredIssues(filtered);
    };

    filterIssues();
  }, [filter, selectedPriority, selectedAssignee, issues]);

  useEffect(() => {
    if (project.id !== defaultProject.id) {
      viewIssues();
    }
  }, [project]);  

  const handleGridClick = () => {
    setGridView(true);
  };

  const handleBoxClick = () => {
    setGridView(false);
  }

  const removeIssue = async (event) => {
    try {
      const currentIssueId = event.currentTarget.getAttribute('data-issueId');
      const response = await fetch(`http://0.0.0.0:3001/projects/${project.id}/issues/remove/${currentIssueId}`, {
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
        console.log(data);
        setIssues(data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className="issue-list">
      <Helmet>
        <title>Issues | Issue Tracker</title>
      </Helmet>
      <h2>Issue List</h2>
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
      <ul className={`filtered-issues ${gridView ? "grid-view" : "box-view"}`}>
        {filteredIssues.map((issue, index) => (
          <IssueItem key={index} issue={issue} />
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
