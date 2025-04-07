import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dots from '../assets/img/dots_icon.svg';
import { ReactComponent as NoteIcon } from '../assets/img/note_icon.svg';
import { ReactComponent as NoteIconHover } from '../assets/img/note_icon_hover.svg'; 
import { useFileExplorer } from '../inputs/FileExplorerProvider';




const StartSessionNav = () => {
  const navigate = useNavigate(); 
  const { setNewSessionClicked } = useFileExplorer();
  const [activeSection, setActiveSection] = useState('session');
  const [hoverStatus, setHoverStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/session') {
      setActiveSection('sessionName');
    }
  }, [location.pathname]);

  const handleClick = (section) => {
    setActiveSection(section);
    setNewSessionClicked(true);
    if (section === 'sessionName') {
      setNewSessionClicked(true); 
      navigate("/newSession?sessionStarted=true"); 
    }
  };

  const addNewNoteAndNavigate = () => {
    navigate("/notes");
  };

  return (
    <div className='session-nav'>
        <div className='nav-item'>
            <div
            className={`session-name ${activeSection === 'sessionName' ? 'active' : ''}`}
            onClick={() => handleClick('sessionName')}
            >
                <p>New Session</p>
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

export default StartSessionNav;