import React from 'react';
import arrowUp from '../assets/img/arrow_up.svg';
import arrowDown from '../assets/img/arrow_down.svg';
import folderIconPersona from '../assets/img/persona_folder_icon.svg';
import editIcon from '../assets/img/edit_icon.svg';
import { useSelectedContent } from '../inputs/SelectedContentContext';


function PromptItem({ name, content, index, isOpen, toggleDropdown }) {
    const { setSelectedContent } = useSelectedContent();

    const contentStyle = {
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'ease, transform 0.5s ease',
        height: isOpen ? 'auto' : 0,
        padding: isOpen ? '8px 16px' : '0px'
    };

    return (
        <div>
            <div 
            className={`folders-item ${index % 2 === 0 ? 'even' : 'odd'}`} 
            >
                <img src={folderIconPersona} alt="folder icon" />
                <span onClick={() => setSelectedContent(content)}>{name}</span>
                <img src={isOpen ? arrowUp : arrowDown} alt="toggle content" onClick={() => toggleDropdown(index)}/>
            </div>
            <div className='persona-prompt-content' style={contentStyle} onClick={() => setSelectedContent(content)}>
                 {isOpen && <p>{content}</p>}
                <div className='edit-icon'>
                    <img src={editIcon} alt="edit icon" />
                </div>
            </div>
        </div>
    );
}

export default PromptItem;