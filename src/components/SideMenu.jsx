import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo/logo.png';
import collapseLeft from '../assets/img/collapse_left_icon.svg';
import collapseRight from '../assets/img/collapse_right_icon.svg';
import searchIcon from '../assets/img/search_icon.svg';
import clearIcon from '../assets/img/clear_icon.svg';
import addIcon from '../assets/img/add_icon_blue.svg';
import userImg from '../assets/img/user_img.svg';
import { useUser } from '../inputs/UserContext';




export default function SideMenu() {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); 
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSubSubMenuOpen, setIsSubSubMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const [inactive, setInactive] = useState(false);
  const { userName } = useUser();

  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname.includes('/personaExplorer')) {
      setActiveMenu('personaExplorer'); 
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname.includes('/promptExplorer')) {
      setActiveMenu('promptExplorer'); 
    }
  }, [location]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/myAccount')) {
        setActiveMenu('myAccount');
    }
  }, [location]);
  
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSidebarClick = () => {
    setShowOverlay(true);
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
    inputRef.current && inputRef.current.focus();
  };

  const currentIcon = inactive ? searchIcon : (inputValue || isFocused ? clearIcon : searchIcon);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleSubMenuClick = (itemId) => {
    setActiveSubMenu(itemId); 
  };

  const handleItemClick = (menuId) => {
    setActiveMenu(menuId);
    setIsSubMenuOpen(false);
    setIsSubSubMenuOpen(false);
  
    if (inactive) {
      setInactive(false); 
      document.body.classList.remove("body-sidebar-collapsed");
    }
  };
  

  const toggleSubMenu = () => {
    const newStatus = !isSubMenuOpen;
    setIsSubMenuOpen(newStatus);
  
    
    if (inactive) {
      setInactive(false); 
      document.body.classList.remove("body-sidebar-collapsed");
    }
  
    setActiveMenu(newStatus ? 'newSession' : null);
  };
  

  const toggleSubSubMenu = () => {
    setIsSubSubMenuOpen(!isSubSubMenuOpen);
    if (inactive) setInactive(false);
  };


  const handleFocus = () => {
    setIsFocused(true);
    if (inactive) setInactive(false);
  };
 
  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`} onClick={handleSidebarClick}>
      {/* Top Menu Content */}
      <div className='top-menu'>
        {/* Logo and Collapse Button */}
        <div className='top-section'>
          <div className='logo'>
            <img src={logo} alt='Akawin-logo' />
          </div>
          <div onClick={() => {
            const shouldBeInactive = !inactive;
            setInactive(shouldBeInactive);
            document.body.classList.toggle("body-sidebar-collapsed", shouldBeInactive);
          }} className='toggle-menu-btn'>
            <img src={inactive ? collapseRight : collapseLeft} alt='collapse-menu-icon' />
          </div>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className='bottom-menu'>
        <Link to="/fileExplorer" style={{ textDecoration: 'none' }} className='btn-session'>
          <button className="new-session-btn">
              <img src={addIcon} alt='add new session icon' />
              <span>Start New Session</span> 
          </button>
        </Link>
        <div className={`side-menu-footer ${activeMenu === 'myAccount' ? 'active' : ''}`} onClick={() => handleItemClick('myAccount')}>
          <Link to="/myAccount" style={{ textDecoration: 'none' }} className='user-profile'>
              <div className='avatar'><img src={userImg} alt='user profile photo' /></div>
              <div className='user-info'>
                <span className="account-name">{userName}</span>
              </div>
          </Link>
        </div>
      </div>
      {(activeMenu === 'fileExplorer' || activeSubMenu === 'item1')}
    </div>
  );
}