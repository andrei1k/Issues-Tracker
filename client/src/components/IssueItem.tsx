import React, { useState } from "react";
import { FaTrashCan, FaPen } from "react-icons/fa6";

import Modal from "./Modal.tsx";
import EditIssue from "./EditIssue.tsx";
import { Issue } from "../services/IssueService.ts";

import "../styles/IssueList.css";

interface Props {
  issue: Issue;
  removeIssue: (issueId: number) => Promise<void>;
  viewIssues: () => Promise<void>;
}

function IssueItem({ issue, removeIssue, viewIssues }: Props) {
  const handleClickRemove = async (e: React.MouseEvent<SVGElement>): Promise<void> => {
    e.preventDefault();
    if (issue.id) {
      await removeIssue(issue.id);
    }
  };

  const getPriorityText = (priority: number): string => {
    switch (priority) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Unknown";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleEditBtn = (e: React.MouseEvent<SVGElement>): void => {
    e.preventDefault();
    openModal();
  };

  return (
    <>
      <li className="issue-item">
        <ul className="issues">
          <div>
            <li className="issue-field">
              <span className="field-label">Title:</span>
              <span className="field-value">{issue.title}</span>
            </li>
          </div>
          <li className="issue-field">
            <span className="field-label">Priority:</span>
            <span className="field-value">
              {getPriorityText(issue.priority)}
            </span>
          </li>
          <li className="issue-field">
            <span className="field-label">Assigned To:</span>
            <span className="field-value">{issue.assignedTo}</span>
          </li>
          <div className="info-description">
            <li className="issue-field">
              <span className="field-label">Description:</span>
              <span className="field-value">{issue.description}</span>
            </li>
          </div>

          <li className="button-field">
            <FaPen data-issueid={issue.id} onClick={handleEditBtn} />
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              children={
                <EditIssue
                  issueId={issue.id}
                  closeModal={closeModal}
                  viewIssues={viewIssues}
                />
              }
            ></Modal>
            <FaTrashCan onClick={handleClickRemove} />
          </li>
        </ul>
      </li>
    </>
  );
}

export default IssueItem;
