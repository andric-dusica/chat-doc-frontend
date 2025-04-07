import React from 'react';
import { Link } from 'react-router-dom';
import DashboardImg from '../assets/img/dashboard_img.svg';
import ArrowRightDash from '../assets/img/arrow_right_dash.svg';
import BackgroundSVG from '../assets/img/dashboard_bg.svg';
import { useUser } from '../inputs/UserContext';


const Dashboard = () => {
    const { userName } = useUser();
    return (
        <div className='dashboard-container' style={{ backgroundImage: `url(${BackgroundSVG})` }}>
            <h3 className='welcome-user'>
                Welcome {userName},
            </h3>
            <div className='dashboard-box'>
                <div className='dashboard-content'>
                <h2>Browse files and start a conversation</h2>
                <Link to="/fileExplorer" style={{ textDecoration: 'none' }}>
                    <button className='dashboard-button'>Browse Files  <img src={ArrowRightDash} alt='arrow icon' /></button>
                </Link>
                </div>
                <div className='dashboard-image-container'>
                    <img src={DashboardImg} alt='dashboard icon' />
                </div>
            </div>
            <div className='dashboard-data'>
                <p>Available files: <span>3,000</span></p>
                <p>Active Sessions: <span>23</span></p>
            </div>
        </div>
      );
    };


export default Dashboard;