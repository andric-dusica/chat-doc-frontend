import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pdfFile from '../assets/img/pdf_file.svg';
import fileUploaded from '../assets/img/file_uploaded.svg';
import StartSession from './StartSessionNav';
import Breadcrumbs from '../inputs/Breadcrumbs';
import FoldersFilesContainer from '../inputs/FoldersFilesContainer';
import folderIconPersona from '../assets/img/persona_folder_icon.svg';
import uploadIcon from '../assets/img/upload_icon.svg';
import closeFile from '../assets/img/close_icon.svg';
import { useFileExplorer } from '../inputs/FileExplorerProvider';
import addIcon from '../assets/img/add_icon.svg';
import newSessionIcon from '../assets/img/new_session_icon.svg';

const FileExplorer = ({ newSessionClicked, onCloseNote }) => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState([]);
    const [uploadComplete, setUploadComplete] = useState([]);
    const [showUploadedMessage, setShowUploadedMessage] = useState({});
    const [fileTypeIcons, setFileTypeIcons] = useState({});
    const [isFolderClicked, setIsFolderClicked] = useState(false);
    const [showStartSession, setShowStartSession] = useState(false);
    const [isContainerClicked, setIsContainerClicked] = useState(false);
    const [sessionStarted, setSessionStarted] = useState(false);
    const location = useLocation();
    const [showAddButtonOnly, setShowAddButtonOnly] = useState(false);
    const [lastFolderName, setLastFolderName] = useState('');
    const [folders, setFolders] = useState(() => {
        const savedFolders = localStorage.getItem('folders');
        return savedFolders ? JSON.parse(savedFolders) : [];
    });
    

      const handleGetLastFolderName = (name) => {
        setLastFolderName(name);
      };

    const { breadcrumbs: sharedBreadcrumbs, setBreadcrumbs: setSharedBreadcrumbs } = useFileExplorer();

    useEffect(() => {
        const savedFiles = JSON.parse(localStorage.getItem('files'));
        if (savedFiles) {
            setFiles(savedFiles);
            const progress = Array(savedFiles.length).fill(0);
            setUploadProgress(progress);
            setUploadComplete(Array(savedFiles.length).fill(true));
            setShowUploadedMessage(Array(savedFiles.length).fill(false));
            const savedFolders = JSON.parse(localStorage.getItem('folders')) || [];
        setFolders(savedFolders);
        
        }
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setShowAddButtonOnly(query.get('sessionStarted') === 'true');
      }, [location]);
      
    useEffect(() => {
        localStorage.setItem('folders', JSON.stringify(folders));
    }, [folders]);

    useEffect(() => {
        localStorage.setItem('files', JSON.stringify(files));
        localStorage.setItem('folders', JSON.stringify(folders));
    }, [files]);

    const createNewFolder = () => {
        const newFolderName = `Folder ${folders.length + 1}`;
        const newFolder = { name: newFolderName, icon: folderIconPersona };
        setFolders(folders.concat(newFolder));
    };

    const handleFileUpload = (e) => {
        const newFile = e.target.files[0];
        const fileSize = newFile.size;
        const newFiles = [...files, newFile];
        const newFileIndex = files.length;

        setFiles(newFiles);
        setUploadProgress([...uploadProgress, 0]);
        setUploadComplete([...uploadComplete, false]);
        setShowUploadedMessage(prevState => ({ ...prevState, [newFileIndex]: false }));

        const totalDuration = fileSize < 5000000 ? 5000 : 10000;
        const updateInterval = 100;
        const increments = totalDuration / updateInterval;
        const progressIncrement = 100 / increments;

        const interval = setInterval(() => {
            setUploadProgress(currentProgress => {
                const updatedProgress = [...currentProgress];
                if (updatedProgress[newFileIndex] < 100) {
                    updatedProgress[newFileIndex] += progressIncrement;
                } else {
                    clearInterval(interval);
                    setUploadComplete(currentComplete => {
                        const updatedComplete = [...currentComplete];
                        updatedComplete[newFileIndex] = true;
                        return updatedComplete;
                    });
                    setShowUploadedMessage(prevState => ({ ...prevState, [newFileIndex]: true }));
                    setTimeout(() => {
                        setShowUploadedMessage(prevState => ({ ...prevState, [newFileIndex]: false }));
                        const isPdf = newFiles[newFileIndex].type === 'application/pdf';
                        setFileTypeIcons(prevIcons => ({ ...prevIcons, [newFileIndex]: isPdf ? pdfFile : fileUploaded }));
                    }, 3000);
                }
                return updatedProgress;
            });
        }, updateInterval);
    };

    const openFileDialog = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';
        input.onchange = handleFileUpload;
        input.click();
    };

    const handleFolderClick = (folderName) => {
        setSharedBreadcrumbs(prevBreadcrumbs => {
            if (!isFolderClicked) {
                setIsFolderClicked(true);
                return [...prevBreadcrumbs, folderName];
            } else {
                return [...prevBreadcrumbs.slice(0, -1), folderName];
            }
        });
    };

    const handleStartSession = () => {
        setShowStartSession(true);
        setSessionStarted(true); 
    };

    return (
        <div className={`file-explorer-container ${isContainerClicked ? 'container-clicked' : ''}`} style={{ paddingTop: sessionStarted ? '0px' : 'standardna vrednost' }}>
          {showStartSession && <StartSession />}
          <div className='fe-window'>
            <div className='file-explorer-btns'>
                <Breadcrumbs 
                    isFolderClicked={sharedBreadcrumbs.length > 0} 
                    breadcrumbs={sharedBreadcrumbs} 
                    onGetLastFolderName={handleGetLastFolderName}
                    sessionStarted={sessionStarted} 
                    newSessionClicked={newSessionClicked} 
                    />
                {showAddButtonOnly ? (
                <div className='file-explorer-btns file-explorer-btns-modified'>
                    {/* <span className='folder-name'>{lastFolderName}</span> */}
                    <button className='add-btn' onClick={() => {/* dodati */}}>
                        <img src={addIcon} alt='add new session icon' /> Add
                    </button>
                  <img src={closeFile} alt="Close" onClick={onCloseNote}  className='close-fe' />
                </div>
              ) : (
                <div className='file-explorer-btns'>
                  {/* <button onClick={openFileDialog}>
                    <img src={uploadIcon} alt='upload file icon' /> Upload
                  </button> */}
                  {/* <button onClick={createNewFolder}>
                    <img src={addIcon} alt='add new session icon' /> Make New
                  </button> */}
                  <button className='start-session' onClick={handleStartSession}>
                    <img src={newSessionIcon} alt='start new session icon' /> Start Session
                  </button>
                </div>
              )}
            </div>
            <FoldersFilesContainer
              folders={folders}
              files={files}
              handleFolderClick={handleFolderClick}
              uploadComplete={uploadComplete}
              fileTypeIcons={fileTypeIcons}
              showUploadedMessage={showUploadedMessage}
              uploadProgress={uploadProgress}
            />
          </div>
        </div>
      );
    };
    
    export default FileExplorer;