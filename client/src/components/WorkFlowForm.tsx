import React, { useState } from "react";
import statusService, { Status } from "../services/StatusService.ts";
import '../styles/Workflow.css';
import '../styles/AddIssue.css';



export default function WorkFlowForm({statuses, fetchData}: {statuses: Status[], fetchData: () => Promise<void>}) {

    const [fromStatus, setFromStatus] = useState(statuses[0].id)
    const [toStatus, setToStatus] = useState(statuses[0].id)
    const [errorMessage, setErrorMessage] = useState('')

    const addHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        let isExistingFlow = statuses.find(status => status.id === fromStatus)?.followingStatuses
                             ?.map(status => status.id).includes(toStatus)

        // console.log(fromStatus, toStatus)
        if (fromStatus === toStatus) {
            setErrorMessage('Can not create flow between one status')
            return
        } else if (isExistingFlow) {
            setErrorMessage('This flow already exists.')
            return
        }

        setErrorMessage('')
        await statusService.addWorkFlowConnection(fromStatus, toStatus)
        fetchData()
    }
    const removeHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        // console.log(fromStatus, toStatus)
        let isExistingFlow = statuses.find(status => status.id === fromStatus)?.followingStatuses
                             ?.map(status => status.id).includes(toStatus)

        if (!isExistingFlow) {
            setErrorMessage('This flow does not exist.')
            return
        }

        setErrorMessage('')
        await statusService.removeWorkFlowConnection(fromStatus, toStatus)
        fetchData()

    }

    return (
        <>
            <form className='work-flow-form'>
                {errorMessage !== '' && <p>{errorMessage}</p>}
                <label form="fromStatus">From:</label>
                <select id="fromStatus" className="select-field" value={fromStatus} onChange={e => 
                {
                    setFromStatus(Number.parseInt(e.currentTarget.value))
                    setErrorMessage('')
                }}>
                    {
                        statuses?.map(status => <option key={`from${status.id}`} value={status.id}>{status.name}</option>)
                    }
                </select>
                <label form="toStatus">To:</label>
                <select id="toStatus" className="select-field" value={toStatus} onChange={e => 
                {
                    setToStatus(Number.parseInt(e.currentTarget.value))
                    setErrorMessage('')
                }}>
                    {
                        statuses?.map(status => <option key={`to${status.id}`} value={status.id}>{status.name}</option>)
                    }
                </select>
                <input className="submit-button" type="submit" value="Add" onClick={addHandler}></input>
                <input className="submit-button" type="submit" value="Remove" onClick={removeHandler}></input>
            </form>
        </>
    )

}