import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getUserId } from '../utils/Data.tsx';

import '../styles/HomeLoggedIn.css';

function HomeLoggedIn() {
  return (
    
    <div className="home-container">
      <Helmet>
        <title>Home | Issue Tracker</title>
      </Helmet>
      <h1 className="home-title">Issue Tracker App</h1> 
      <p className="home-description">Welcome to our issue tracker application!</p>
      <div className="home-buttons">
        <Link to={`/${getUserId()}/dashboard`} className="home-button">View Projects</Link>
        <Link to="/profile" className="home-button">View Profile</Link>
      </div> 
      <img src='./images/tasks.svg' className='image-tasks' alt="tasks"/>
    </div>
  );
}

export default HomeLoggedIn;
