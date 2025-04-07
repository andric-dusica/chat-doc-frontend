import React from 'react';
import FolderItem from './FolderItem';
import FileItem from './FileItem';

const FoldersFilesContainer = ({ folders, files, handleFolderClick, uploadComplete, fileTypeIcons, showUploadedMessage, uploadProgress }) => {
  return (
    <div className='folders-files-container-fe'>
      <div className='folders-file-explorer-container'>
        <div className='folders-file-explorer'>
          <span>Folders</span>
        </div>
        {folders.map((folder, index) => (
          <FolderItem key={index} folder={folder} handleFolderClick={handleFolderClick} />
        ))}
        <div className='folders-file-explorer'>
          <span>Files</span>
        </div>
        {files.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            uploadComplete={uploadComplete[index]}
            fileTypeIcon={fileTypeIcons[index]}
            showUploadedMessage={showUploadedMessage[index]}
            uploadProgress={uploadProgress[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default FoldersFilesContainer;
