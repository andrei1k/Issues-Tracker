import React from 'react';
import '../styles/Home.css';
 
function Home() {
    return(
        <div className='home-div'>
            <h1>Issue Tracker</h1>
            <div className='description'>
                <h2>Welcome to the homepage of the IssueTracker website!</h2>
                <p>IssueTracker is a platform designed for managing tasks and projects.
                Combining functionalities for user, project, and ticket management, 
                IssueTracker provides you with an efficient way to handle your workflows.</p>
                <p>The system allows you to create and track various tickets associated with your projects.
                Each task can be assigned a specific status, accompanied by notes and metadata, 
                to help you monitor progress and coordinate your team's efforts.</p>
                <p>Additionally, this website offers the ability to define a workflow - 
                an allowable sequence of statuses that applies to the entire system but is 
                flexible enough to accommodate changes according to your organization's needs.
                This would enable you to tailor your processes to reflect exactly how you work.
                With this web application, you can review your projects, filter tasks by assignee or status, 
                and receive views of your current progress based on various criteria.
                This allows you to stay organized and informed about the status of your projects at all times.</p>
            </div>
        </div>
    )
}

export default Home;
