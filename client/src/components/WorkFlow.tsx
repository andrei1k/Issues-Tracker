import React, { useEffect, useState } from "react";
import statusService, { Status } from "../services/StatusService.ts";
import WorkFlowForm from "./WorkFlowForm.tsx";
import RemoveStatus from "./RemoveStatus.tsx";
import AddStatus from "./AddStatus.tsx";

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