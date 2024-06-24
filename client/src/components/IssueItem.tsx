import React, { useState } from "react";
import { FaTrashCan, FaPen } from "react-icons/fa6";
import '../styles/IssueList.css';
import Modal from "./Modal.tsx";
import EditIssue from "./EditIssue.tsx";
import { Issue } from "../services/IssueService.ts";

interface Props {
  issue: Issue;
  removeIssue: (issueId: number) => void;
  viewIssues: () => Promise<void>;
}

function IssueItem({ issue, removeIssue, viewIssues }: Props) {

  const handleClickRemove = (e) => {
    e.preventDefault();
    if (issue.id) {
      removeIssue(issue.id);
    }

  }

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      default:
        return 'Unknown';
    }
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditBtn = (e) => {
    e.preventDefault();
    openModal();
  }
  
  return (
    <> 
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
          <span className="field-value">{getPriorityText(issue.priority)}</span>
        </li>
        <li className="issue-field">
          <span className="field-label">Assigned To:</span>
          <span className="field-value">{issue.assignedTo}</span>
        </li>
        <li className="button-field">
          <FaPen data-issueid={issue.id} onClick={handleEditBtn}/>
          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            children={<EditIssue issueId={issue.id} closeModal={closeModal} viewIssues={viewIssues}/>}>
          </Modal>
          <FaTrashCan onClick={handleClickRemove}/>
        </li>
      </ul>
    </li>
    </>
  );
}

export default IssueItem;
