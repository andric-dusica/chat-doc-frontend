import React, { useState, useEffect, useRef } from 'react';
import dotsIcon from '../assets/img/dots_icon.svg';

const UserItem = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null); 

  
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]); 
    
    const optionsClass = showMenu ? "folder-options-active" : "folder-options";

    return (
        <div className='folders-file-explorer-item' ref={dropdownRef}>
            <span>{user.name}</span>
            <img className={optionsClass} src={dotsIcon} alt='options icon' onClick={toggleMenu} />

            {showMenu && (
                <div className="user-options-menu">
                    <ul>
                        <li onClick={() => console.log("Edit user", user.name)}>Edit</li>
                        <li onClick={() => console.log("Delete user", user.name)}>Delete</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserItem;
