interface IssueProps {
    id: number,
    status: string,
    description: string,
}

export function Issue({id, status, description}: IssueProps) {

    return (
        <>
           <p>{id}</p> 
           <p>{description}</p> 
           <p>{status}</p> 
        </>
    )
}