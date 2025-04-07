import React, { useState, useEffect, useRef } from 'react';
import folderIconPersona from '../assets/img/persona_folder_icon.svg';
import dotsIcon from '../assets/img/dots_icon.svg';

const FolderItem = ({ folder }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [folderName, setFolderName] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        console.log(`Folder ID: ${folder.id}`); 
        const savedFolderName = localStorage.getItem(`folderName_${folder.id}`) || folder.name;
        setFolderName(savedFolderName);
    }, [folder.id, folder.name]);

    const toggleMenu = () => setShowMenu(!showMenu);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRename = () => {
        setIsEditing(true);
        setShowMenu(false);
    };

    const handleNameChange = (e) => {
        setFolderName(e.target.value);
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(`folderName_${folder.id}`, folderName);
        setIsEditing(false);
    };

    return (
        <div className='folders-file-explorer-item' ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            <img src={folderIconPersona} alt='folder icon' />
            {!isEditing ? (
                <span onClick={handleRename}>{folderName}</span>
            ) : (
                <form onSubmit={handleNameSubmit}>
                    <input
                        type="text"
                        value={folderName}
                        onChange={handleNameChange}
                        onBlur={handleNameSubmit}
                        autoFocus
                    />
                </form>
            )}
            <img className='folder-options' src={dotsIcon} alt='options icon' onClick={toggleMenu} />

            {showMenu && (
                <div className="user-options-menu">
                    <ul>
                        <li onClick={handleRename}>Rename</li>
                        <li onClick={() => console.log("Download folder", folderName)}>Download</li>
                        <li onClick={() => console.log("Delete folder", folderName)}>Delete</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FolderItem;
