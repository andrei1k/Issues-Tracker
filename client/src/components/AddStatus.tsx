import React, { useState } from "react";
import statusService, { Status } from "../services/StatusService.ts";
import "../styles/AddIssue.css";
import "../styles/Workflow.css";
import FloatingMessage from "./FloatingMessage.tsx";

interface Props {
    statuses: Status[],
    fetchData: () => Promise<void>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function AddStatus({statuses, fetchData, setErrorMessage}: Props) {

    const [inputValue, setInputValue] = useState('');

    const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (statuses.map(status => status.name.toLowerCase()).includes(inputValue.toLowerCase())) {

            setErrorMessage("This status already exists.")
            return
        }

        await statusService.addStatus(inputValue)
        setErrorMessage("")
        setInputValue('')
        fetchData()
        
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setInputValue(event.target.value);
    };

    return (
        <>
            <form className="status-io" onSubmit={addHandler}>
                <label form="inputStatus">Add new status:</label>
                <input id="inputStatus" className="input-field" type="text" onChange={inputHandler} value={inputValue}/>
            </form>
        </>
    )
}