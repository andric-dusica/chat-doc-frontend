import React, { useEffect } from 'react';
import { useFileExplorer } from '../inputs/FileExplorerProvider';


const Breadcrumbs = ({ isFolderClicked, breadcrumbs, onGetLastFolderName }) => {
  const { newSessionClicked } = useFileExplorer();
  useEffect(() => {
    if (breadcrumbs.length > 0) {
      const lastFolderName = breadcrumbs[breadcrumbs.length - 1];
      onGetLastFolderName(lastFolderName);
    }
  }, [breadcrumbs, onGetLastFolderName]);

  return (
    <div className='breadcrumbs'>
      {isFolderClicked && <span>File Explorer / </span>}
      {breadcrumbs.map((crumb, index) => (
        <span key={index}>{crumb}</span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
