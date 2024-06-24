import React from "react";
import IssueItem from "./IssueItem.tsx";
import { Issue } from "../services/IssueService.ts";
import "../styles/Column.css"

interface Props {
    issues: Issue[];
    statusName: string;
    removeIssue: (issueId: number) => void;
    viewIssues: () => Promise<void>;
  }

export default function Column({issues, statusName, removeIssue, viewIssues}: Props) {

    return (
        <div className="column">
            <h1>{statusName}</h1>
            {
                issues.map((issue) => <IssueItem key={issue.id} issue={issue} removeIssue={removeIssue} viewIssues={viewIssues}/>
            )}

        </div>
    )

}