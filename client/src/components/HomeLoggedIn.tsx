import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeLoggedIn.css';

function HomeLoggedIn() {
  return (
    <div className="home-container"> 
      <h1 className="home-title">Issue Tracker App</h1> 
      <p className="home-description">Welcome to our issue tracker application!</p>
      <div className="home-buttons">
        <Link to="/add-issue" className="home-button">Add New Issue</Link>
        <Link to="/issues" className="home-button">View Issues</Link>
      </div> 
      <img src='./images/tasks.svg' className='image-tasks' alt="tasks"/>
    </div>
  );
}

export default HomeLoggedIn;
