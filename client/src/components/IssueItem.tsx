import React, { useEffect, useState } from "react";
import { FaTrashCan, FaPen } from "react-icons/fa6";
import '../styles/IssueList.css';
import Modal from "./Modal.tsx";
import EditIssue from "./EditIssue.tsx";
import issueService from "../services/IssueService.ts";
import { getProjectInfo } from "../utils/Data.tsx";

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

interface Project {
  id: number;
  title: string;
}

const defaultProject = {id: 0, title: ''};


function IssueItem({ issue, removeIssue }: Props) {

  const handleClickRemove = (e) => {
    e.preventDefault();
    if (issue.id) {
      removeIssue(issue.id);
    }

  }

  const getPriorityText = (priority: string) => {
    switch (parseInt(priority)) {
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
  const [issues, setIssues] = useState<Issue[]>([]);
  const [project, setProject] = useState<Project>(defaultProject);
  const [issueId, setIssueId] = useState<number>(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload(); 
  };

  const viewIssues = async () => {
    try {
      const data =  await issueService.getIssues(project.id);
      console.log(data);
      setIssues(data);
    }
    catch(error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const crrProjectInfo = getProjectInfo();
    setProject({ id: parseInt(crrProjectInfo.crrProjectId), 
      title: crrProjectInfo.crrProjectName });
  }, []);

  const handleEditBtn = (e) => {
    e.preventDefault();
    setIssueId(e.currentTarget.getAttribute('data-issueid'));
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
          <FaTrashCan onClick={handleClickRemove}/>
          <FaPen data-issueid={issue.id} onClick={handleEditBtn}/>
          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            children={<EditIssue issueId={issue.id} closeModal={closeModal} viewIssues={viewIssues}/>}>
          </Modal>

        </li>
      </ul>
    </li>
    </>
  );
}

export default IssueItem;
