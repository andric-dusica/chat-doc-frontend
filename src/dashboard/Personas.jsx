import React, { useEffect, useRef, useState } from 'react';
import blueLine from '../assets/img/blue_line.svg';
import addIcon from '../assets/img/add_icon_blue.svg';
import folderIconPersona from '../assets/img/persona_folder_icon.svg';
import PersonaItem from '../inputs/PersonaItem';

const Persona = ({ onEditPersona, openedIndex, toggleDropdown }) => {
    const personaRef = useRef(null);
    const foldersRef = useRef(null);
    const [personas, setPersonas] = useState([
        { id: 'persona1', name: 'Item Name 1', content: 'Content for Persona 1', isOpen: false },
    ]);

    const addNewPersona = () => {
        const newId = `persona${personas.length + 1}`;
        const newPersona = {
            id: newId,
            name: `Item Name ${personas.length + 1}`,
            content: `Content for Persona ${personas.length + 1}`,
            isOpen: false
        };
        const newPersonas = [...personas, newPersona];
        setPersonas(newPersonas);
        localStorage.setItem('personas', JSON.stringify(newPersonas));

        if (foldersRef.current) {
            foldersRef.current.scrollTop = foldersRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const savedPersonas = JSON.parse(localStorage.getItem('personas'));
        if (savedPersonas) {
            setPersonas(savedPersonas);
        }

        const adjustFoldersHeight = () => {
            if (!personaRef.current || !foldersRef.current) return;

            foldersRef.current.style.minHeight = `590px`;
            foldersRef.current.style.maxHeight = `590px`;
            foldersRef.current.style.overflowY = 'auto';
        };

        adjustFoldersHeight();
        window.addEventListener('resize', adjustFoldersHeight);

        return () => {
            window.removeEventListener('resize', adjustFoldersHeight);
        };

    }, []);

    const [openIndex, setOpenIndex] = useState(null);

    const handleToggleDropdown = (index) => {
        if (openIndex === index) {
            setOpenIndex(null); 
        } else {
            setOpenIndex(index); 
        }
    };

    return (
        <div ref={personaRef} className="persona-prompt-container">
            <div className='personas-prompts'>Personas</div>
            <div className='persona-prompt-explorer'>
                <p>Persona Explorer</p>
                <img src={blueLine} alt='blue line' />
            </div>
            <div className='new-persona-prompt'>
                <button className='new-persona-prompt-btn' onClick={addNewPersona}>
                    <span><img src={addIcon} alt='add new persona icon' /> New Persona </span>
                </button>
            </div>
            <div ref={foldersRef}  className='folders-personas-prompts-container'>
                <div className='folders-persona-prompt'>
                    <span>
                        Folders
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPersona} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPersona} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPersona} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPersona} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>

                <div className='folders-persona-prompt'>
                    <span>
                        Personas
                    </span>
                </div>
                {personas.map((persona, index) => (
                    <PersonaItem
                    key={persona.id}
                    persona={persona}
                    onEdit={() => onEditPersona(persona)}
                    index={index}
                    isOpen={openedIndex === index} 
                    toggleDropdown={() => toggleDropdown(index)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Persona;
