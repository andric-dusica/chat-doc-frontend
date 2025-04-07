import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePdf } from './PdfContext';
import dotsIcon from '../assets/img/dots_icon.svg';
import fileUploaded from '../assets/img/file_uploaded.svg';

const FileItem = ({ file, uploadComplete, fileTypeIcon, showUploadedMessage, uploadProgress, folder }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    const { setPdfState } = usePdf(); 
    const navigate = useNavigate(); // Koristi se za programsko navigiranje

    const handleFileClick = () => {
        if (!file || file.type !== 'application/pdf') return;
        
        setPdfState({ selectedPdfFile: file });
        navigate('/session');
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    return (
        <div className='folders-file-explorer-item' ref={dropdownRef}>
            {uploadComplete ? (
                <>
                    <img src={fileTypeIcon || fileUploaded} alt='file icon' />
                    {showUploadedMessage && <span className='file-uploaded-msg'>File uploaded</span>}
                </>
            ) : (
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" stroke="#ddd" strokeWidth="1" fill="transparent"/>
                    <circle cx="8" cy="8" r="6" stroke="#2D5DE0" strokeWidth="2" fill="transparent" strokeDasharray="37.68" strokeDashoffset={`${37.68 - (0.3768 * uploadProgress)}`} style={{transition: 'stroke-dashoffset 0.5s linear', transform: 'rotate(-90deg)', transformOrigin: 'center'}} />
                </svg>
            )}
            <span className='file-item' onClick={handleFileClick}>{file.name}</span>
            <img className='folder-options' src={dotsIcon} alt='options icon' onClick={toggleMenu} />

            {showMenu && (
                <div className="user-options-menu">
                    <ul>
                      <li className='admin' onClick={() => console.log("Rename folder", folder.name)}>Rename</li>
                      <li style={{display: 'inline-block',width: '100%', borderBottom: '1px solid #E1E4EB'}} onClick={() => console.log("Download folder", folder.name)}>Download</li>
                      <li className='admin' onClick={() => console.log("Delete folder", folder.name)}>Delete</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileItem;
