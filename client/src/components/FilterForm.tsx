import React, {useRef} from "react";
import { CiGrid41, CiBoxList } from "react-icons/ci";

import { User } from "./IssueList.tsx";

interface FilterFormProps {
  issueSearch: string;
  setIssueSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedPriority: string;
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>;
  selectedAssignee: number;
  setSelectedAssignee: React.Dispatch<React.SetStateAction<number>>;
  assignees: User[];
  handleGridClick: () => void;
  handleBoxClick: () => void;
  gridView: boolean;
}

function FilterForm({
  issueSearch,
  setIssueSearch,
  selectedPriority,
  setSelectedPriority,
  selectedAssignee,
  setSelectedAssignee,
  assignees,
  handleGridClick,
  handleBoxClick,
  gridView,
}: FilterFormProps) {

  return (
    <div className="filter-form">
      <CiGrid41
        className={gridView ? "icon clicked" : "icon"}
        onClick={handleGridClick}
      />
      <CiBoxList
        className={!gridView ? "icon clicked" : "icon"}
        onClick={handleBoxClick}
      />
      <input
        type="text"
        value={issueSearch}
        onChange={(e) => setIssueSearch(e.target.value)}
        placeholder="Search..."
        className="filter-input"
      />
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className="priority-select"
      >
        <option value="">All Priorities</option>
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <select
        value={selectedAssignee}
        onChange={(e) => setSelectedAssignee(parseInt(e.target.value))}
        className="assignee-select"
      >
        <option value="0">All Assignees</option>
        {assignees?.map(user => (
          <option 
            key={user.id} 
            value={user.id}>
              {user.firstName} {user.lastName} - {user.email}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterForm;
