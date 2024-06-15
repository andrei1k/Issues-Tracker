import React, { useState } from "react"
import statusService, { Status } from "../services/StatusService.ts"
import "../styles/AddIssue.css";


export default function RemoveStatus({statuses, fetchData}: {statuses: Status[], fetchData: () => Promise<void>}) {

    const [status, setStatus] = useState(statuses[0].id)
    const [error, setError] = useState(false)


    const removeHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        try{

            await statusService.removeStatus(status)
            setError(false)
            fetchData()
        } catch {
            setError(true)
        }
    }

    return (
        <>
            <form>
                {error && 'Issues with this status exist. Can not delete it.'}
                <select className="select-field" value={status} onChange={e => 
                    {
                        setStatus(Number.parseInt(e.currentTarget.value))
                        setError(false)
                    }}>
                        {
                            statuses?.map(status => <option key={status.id} value={status.id}>{status.name}</option>)
                        }
                </select>
                <input className="submit-button" type="submit" value="Remove" onClick={removeHandler}></input>

            </form>
        </>
    )
}