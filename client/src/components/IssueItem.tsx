import React from "react";

interface Issue {
  title: string;
  description: string;
  priority: string;
  assignedTo: string;
  deadline: string;
}

interface Props {
  issue: Issue;
}

function IssueItem({ issue }: Props) {
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
        <li className="issue-field">
          <span className="field-label">Deadline:</span>
          <span className="field-value">{issue.deadline}</span>
        </li>
      </ul>
    </li>
  );
}

export default IssueItem;