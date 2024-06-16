import React from "react";
import { CiGrid41, CiBoxList } from "react-icons/ci";
import { User } from "./IssueList.tsx";


interface FilterFormProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedPriority: string;
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>;
  selectedAssignee: string;
  setSelectedAssignee: React.Dispatch<React.SetStateAction<string>>;
  assignees: User[];
  handleGridClick: () => void;
  handleBoxClick: () => void;
  gridView: boolean;
}

function FilterForm({
  filter,
  setFilter,
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
        <option value="3">High</option>
        <option value="2">Medium</option>
        <option value="1">Low</option>
      </select>
      <select
        value={selectedAssignee}
        onChange={(e) => setSelectedAssignee(e.target.value)}
        className="assignee-select"
      >
        <option value="">All Assignees</option>
        {assignees?.map(user => (
          <option 
            key={user.id} 
            value={`${user.firstName} ${user.lastName}`}>
              {user.firstName} {user.lastName} - {user.email}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterForm;
