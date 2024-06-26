import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import AddStatus from "../components/AddStatus.tsx";
import StatusLink from "../components/StatusLink.tsx";
import WorkFlowForm from "../components/WorkFlowForm.tsx";
import RemoveStatus from "../components/RemoveStatus.tsx";
import FloatingMessage from "../components/FloatingMessage.tsx";

import statusService, { Status } from "../services/StatusService.ts";

import '../styles/Workflow.css';

export function WorkFlow() {

    const [statuses, setStatuses] = useState<Status[]>()
    const [errorMessage, setErrorMessage] = useState('')


    const fetchData = async (): Promise<void> => {
            const statuses = await statusService.getStatuses()
            setStatuses(statuses)
            // console.log(statuses);
            
        }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="work-flow">
            {errorMessage !== '' && <FloatingMessage message={errorMessage} />}
            {statuses && <AddStatus statuses={statuses} fetchData={fetchData} setErrorMessage={setErrorMessage}/>}
            {statuses && <RemoveStatus statuses={statuses} fetchData={fetchData} setErrorMessage={setErrorMessage}/>}
            {statuses && <WorkFlowForm statuses={statuses} fetchData={fetchData} setErrorMessage={setErrorMessage}/>}
            
            <div>
            <Helmet>
                <title>Workflow | Issue Tracker</title>
            </Helmet>
                {
                    statuses?.map(status => {
                        return status.followingStatuses?.map(followingStatus => 
                            <StatusLink
                                key={`${status.id}${followingStatus.id}`}
                                fromStatus={status.name}
                                toStatus={followingStatus.name}>
                            </StatusLink>)
                    })
                }
            </div>
            
        </div>


    )

    
}