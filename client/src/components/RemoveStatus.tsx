import React, { useState } from "react"
import statusService, { Status } from "../services/StatusService.ts"
import "../styles/AddIssue.css";
import "../styles/Workflow.css";

interface Props {
    statuses: Status[],
    fetchData: () => Promise<void>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}


export default function RemoveStatus({statuses, fetchData, setErrorMessage}: Props) {

    const [status, setStatus] = useState(statuses[0].id)


    const removeHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        try{

            await statusService.removeStatus(status)
            setErrorMessage("")
            fetchData()
        } catch {
            setErrorMessage("Issues with this status exist. Can not delete it.")
        }
    }

    return (
        <>
            <form className="status-io">
                <label form="removeStatus">Remove status:</label>
                <select id="removeStatus" className="select-field" value={status} onChange={e => 
                    {
                        setStatus(Number.parseInt(e.currentTarget.value))
                        setErrorMessage("")
                    }}>
                        {
                            statuses?.map(status => <option key={status.id} value={status.id}>{status.name}</option>)
                        }
                </select>
                <input className="button" type="submit" value="Remove" onClick={removeHandler}></input>

            </form>
        </>
    )
}