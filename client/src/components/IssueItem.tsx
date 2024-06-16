import React from "react";

import { FaTrashCan } from "react-icons/fa6";
import '../styles/IssueList.css';

interface Issue {
  id?: number;
  title: string;
  description: string;
  priority: string;
  assignedTo: string;
}

interface Props {
  issue: Issue;
  removeIssue: (issueId: number) => void;
}



function IssueItem({ issue, removeIssue }: Props) {

  const handleClickRemove = (e) => {
    e.preventDefault();
    if (issue.id) {
      removeIssue(issue.id);
    }

  }

  return (
    <li className="issue-item">
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
        <li className="button-field">
          <FaTrashCan onClick={handleClickRemove}/>
        </li>
      </ul>
    </li>
  );
}

export default IssueItem;
