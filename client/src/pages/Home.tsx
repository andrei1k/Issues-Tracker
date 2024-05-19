import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

import { getUserId } from '../utils/Data.tsx';

function Home() {
    return (
        <div className='home-container'> 
            <Helmet>
                <title>Home | Issue Tracker</title>
            </Helmet>
            <h1 className='home-title'>Issue Tracker App</h1> 
            <p className='home-description'>Welcome to our issue tracker application!</p>
            <div className='home-buttons'>
            <Link to={`/dashboard/${getUserId()}`} className='home-button'>Dashboard</Link>
            <Link to='/issues' className='home-button'>View Issues</Link>
            </div> 
            <img src='./images/tasks.svg' className='image-tasks'/>
        </div>
    );
  }

  export default Home;