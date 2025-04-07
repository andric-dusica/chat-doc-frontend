import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import arrowUp from '../assets/img/arrow_up.svg';
import arrowDown from '../assets/img/arrow_down.svg';
import editIcon from '../assets/img/edit_icon.svg';
import deleteIcon from '../assets/img/delete_icon.svg';
import { useSelectedContent } from './SelectedContentContext';

const PromptItem = ({ prompt, onUpdate, index, isOpen, toggleDropdown, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(prompt.content); 
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedContent } = useSelectedContent(); 

  const handleSpanClick = () => {
    setSelectedContent(prompt.description);
};
  

  const handleEditStart = (e) => {
    e.stopPropagation();
    if (!location.pathname.includes('/promptExplorer')) { 
        navigate('/promptExplorer');
    } else {
        if (onEdit) {
            onEdit(prompt);
        } else {
            setIsEditing(true);
        }
    }
  };

  const handleDeletePrompt = (e) => {
    e.stopPropagation();
    if (!location.pathname.includes('/promptExplorer')) {
        navigate('/promptExplorer');
    } else {
        if (onDelete) {
            onDelete(prompt);
        }
    }
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    if (editedContent.trim() !== '') {
      onUpdate(prompt.id, editedContent.trim());
      setIsEditing(false);
    }
  };

  const contentStyle = {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
    transformOrigin: 'top',
    transition: 'ease, transform 0.5s ease',
    height: isOpen ? 'auto' : 0,
    padding: isOpen ? '8px' : '0px'
  };

  return (
    <div>
      <div className={`folders-item persona ${index % 2 === 0 ? 'even' : 'odd'}`}>
        {!isEditing ? (
          <>
            <span onClick={handleSpanClick}>{prompt.name}</span>
          </>
        ) : (
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onBlur={handleEditSave}
          />
        )}
        <img className='toggle-arrow' src={isOpen ? arrowUp : arrowDown} alt="Toggle content" onClick={(e) => { e.stopPropagation(); toggleDropdown(index); }} />
      </div>
      {isOpen && (
        <div className='persona-prompt-content' style={contentStyle}>
            <p className='description'>Description</p>
            <p>{prompt.description}</p>
            </div>
      )}
       {isOpen && (
         <div className='persona-prompt-content' style={contentStyle}>
            <p className='description'>Background</p>
            <p>{prompt.background}</p>
            <div className='delete-edit-options'>
                <img src={editIcon} alt="Edit" onClick={handleEditStart} className="folder-options" /> 
                <img src={deleteIcon} onClick={handleDeletePrompt} alt="Delete" className="folder-options" /> 
            </div>
        </div>
      )}
    </div>
  );
};

export default PromptItem;
