import React from "react";
import '../styles/Workflow.css';

 export default function StatusLink({fromStatus, toStatus}: {fromStatus: string, toStatus: string}) {


    return (
        <div className="status-link">
            <p className="box">{fromStatus}</p>
            <div className="bar"><div className="arrow" /></div>
            
            <p className="box">{toStatus}</p>
            
        </div>
    )
 }