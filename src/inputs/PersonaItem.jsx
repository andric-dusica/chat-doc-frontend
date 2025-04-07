import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import arrowUp from '../assets/img/arrow_up.svg';
import arrowDown from '../assets/img/arrow_down.svg';
import editIcon from '../assets/img/edit_icon.svg';
import deleteIcon from '../assets/img/delete_icon.svg';
import { useSelectedName } from './SelectedNameContext';

const PersonaItem = ({ persona, onUpdate, index, isOpen, toggleDropdown, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(persona.name);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateSelectedName } = useSelectedName();

  const handleNameClick = () => {
    updateSelectedName(persona.name);
  };
  

  const handleEditStart = (e) => {
    e.stopPropagation();
    if (!location.pathname.includes('/personaExplorer')) {
        navigate('/personaExplorer');
    } else {
        if (onEdit) {
            onEdit(persona);
        } else {
            setIsEditing(true);
        }
    }
};

const handleDeletePersona = (e) => {
    e.stopPropagation(); 
    if (!location.pathname.includes('/personaExplorer')) {
        navigate('/personaExplorer');
    } else {
        if (onDelete) {
            onDelete(persona);
        }
    }
};

  const handleEditSave = (e) => {
    e.preventDefault();
    if (editedName.trim() !== '') {
      onUpdate(persona.id, editedName.trim());
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
            <span onClick={handleNameClick}>{persona.name}</span>
          </>
        ) : (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleEditSave}
          />
        )}
        <img className='toggle-arrow' src={isOpen ? arrowUp : arrowDown} alt="Toggle content" onClick={(e) => { e.stopPropagation(); toggleDropdown(index); }} />
      </div>
      {isOpen && (
        <div className='persona-prompt-content' style={contentStyle}>
            <p className='description'>Description</p>
            <p>{persona.description}</p>
        </div>
      )}
      {isOpen && (
        <div className='persona-prompt-content' style={contentStyle}>
            <p className='description'>Background</p>
            <p>{persona.background}</p>
            <div className='delete-edit-options'>
                <img src={editIcon} alt="Edit" onClick={handleEditStart} className="folder-options" /> 
                <img src={deleteIcon} onClick={handleDeletePersona} alt="Delete" className="folder-options" /> 
            </div>
        </div>
      )}
    </div>
  );
};

export default PersonaItem;
