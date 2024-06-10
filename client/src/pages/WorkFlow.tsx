import React, { useEffect, useState } from "react";
import statusService, { Status } from "../services/StatusService.ts";
import WorkFlowForm from "../components/WorkFlowForm.tsx";
import RemoveStatus from "../components/RemoveStatus.tsx";
import AddStatus from "../components/AddStatus.tsx";
import { Helmet } from "react-helmet";

export function WorkFlow() {

    const [statuses, setStatuses] = useState<Status[]>()


    const fetchData = async () => {
            const statuses = await statusService.getStatuses()
            setStatuses(statuses)
            // console.log(statuses);
            
        }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            {statuses && <AddStatus statuses={statuses} fetchData={fetchData} />}
            {statuses && <RemoveStatus statuses={statuses} fetchData={fetchData} />}
            {statuses && <WorkFlowForm statuses={statuses} fetchData={fetchData} />}
            
            <div>
            <Helmet>
                <title>Workflow | Issue Tracker</title>
            </Helmet>
                {
                    statuses?.map(status => {
                        return status.followingStatuses?.map(followingStatus => 
                            <p key={`${status.id}${followingStatus.id}`}>
                                {status.name} -&gt; {followingStatus.name}
                            </p>)
                    })
                }
            </div>
        </>


    )

    
}