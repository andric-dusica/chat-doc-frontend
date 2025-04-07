import React from 'react';
import arrowUp from '../assets/img/arrow_up.svg';
import arrowDown from '../assets/img/arrow_down.svg';
import editIcon from '../assets/img/edit_icon.svg';
import { useSelectedName } from '../inputs/SelectedNameContext';


function PersonaItem({ name, content, index, isOpen, toggleDropdown  }) {
    const { setSelectedName } = useSelectedName();
    const handleClick = (name) => {
        setSelectedName(name);
    };


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
            <div className={`folders-item ${index % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handleClick(name)}>
                <span>{name}</span>
                <img src={isOpen ? arrowUp : arrowDown} alt="toggle content" onClick={() => toggleDropdown(index)} />
            </div>
            <div className='persona-prompt-content' style={contentStyle}>
                {isOpen && <p>{content}</p>}
                <div className='edit-icon'>
                    <img src={editIcon} alt="edit icon" />
                </div>
            </div>
        </div>
    );
}

export default PersonaItem;