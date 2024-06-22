import React, { useEffect, useState } from "react";
import statusService, { Status } from "../services/StatusService.ts";
import WorkFlowForm from "../components/WorkFlowForm.tsx";
import RemoveStatus from "../components/RemoveStatus.tsx";
import AddStatus from "../components/AddStatus.tsx";
import { Helmet } from "react-helmet";
import '../styles/Workflow.css';
import StatusLink from "../components/StatusLink.tsx";
import FloatingMessage from "../components/FloatingMessage.tsx";

export function WorkFlow() {

    const [statuses, setStatuses] = useState<Status[]>()
    const [errorMessage, setErrorMessage] = useState('')


    const fetchData = async () => {
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