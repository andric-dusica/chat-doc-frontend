import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import dots from '../assets/img/dots_icon.svg';
import { ReactComponent as NoteIcon } from '../assets/img/note_icon.svg';
import { ReactComponent as NoteIconHover } from '../assets/img/note_icon_hover.svg';
import { useFileExplorer } from '../inputs/FileExplorerProvider'; 


const SessionNav = () => {
  const navigate = useNavigate();
  const { setNewSessionClicked } = useFileExplorer();
  const [activeSection, setActiveSection] = useState('session');
  const [hoverStatus, setHoverStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/session') {
      setActiveSection('sessionName');
    }
    else if (location.pathname === '/notes') {
      setActiveSection('session-note');
    }
  }, [location.pathname]); 

  const handleClick = (section) => {
    setActiveSection(section);
    setNewSessionClicked(true);
    if (section === 'sessionName') {
      navigate("/session"); 
    }
  };

  const addNewNoteAndNavigate = () => {
    setActiveSection('session-note');
    navigate("/notes"); 
  };

  return (
    <div className='session-nav'>
        <div className='nav-item'>
            <div
            className={`session-name ${activeSection === 'sessionName' ? 'active' : ''}`}
            onClick={() => handleClick('sessionName')}
            >
                <p>Session Name</p>
            </div>
            <div className='line'></div>
            <div
                className={`session-note ${activeSection === 'session-note' ? 'active' : ''}`}
                onMouseEnter={() => setHoverStatus(true)}
                onMouseLeave={() => setHoverStatus(false)}
                onClick={addNewNoteAndNavigate}
            >
               <p>
              {hoverStatus ? <NoteIconHover /> : <NoteIcon />}
                Notepad
              </p>
            </div>
        </div>
        <div className='options'>
            <img src={dots} alt='dots_icon' />
        </div>
    </div>
  );
};

export default SessionNav;
