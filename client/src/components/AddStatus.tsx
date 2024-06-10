import React, { useState } from "react";
import statusService, { Status } from "../services/StatusService.ts";

export default function AddStatus({statuses, fetchData}: {statuses: Status[], fetchData: () => Promise<void>}) {

    const [error, setError] = useState(false)
    const [inputValue, setInputValue] = useState('');

    const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (statuses.map(status => status.name.toLowerCase()).includes(inputValue.toLowerCase())) {

            setError(true)
            return
        }

        await statusService.addStatus(inputValue)
        setError(false)
        setInputValue('')
        fetchData()
        
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setInputValue(event.target.value);
    };

    return (
        <>
            {error && 'This status already exists.'}
            <form onSubmit={addHandler}>
                <input type="text" onChange={inputHandler} value={inputValue}/>
                
            </form>
        </>
    )
}