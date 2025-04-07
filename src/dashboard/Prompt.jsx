import React, { useEffect, useRef, useState } from 'react';
import blueLine from '../assets/img/blue_line.svg';
import addIcon from '../assets/img/add_icon_blue.svg';
import folderIconPrompt from '../assets/img/persona_folder_icon.svg';
import PromptItem from '../inputs/PromptItem';

const Prompt = ({ onEditPrompt }) => {
    const personaRef = useRef(null);
    const foldersRef = useRef(null);
    const [prompts, setPrompts] = useState([
        { id: 'prompt1', name: 'Item Name 1', content: 'Content for Prompt 1', isOpen: false },
    ]);

    const addNewPrompt = () => {
        const newId = `prompt${prompts.length + 1}`;
        const newPrompt = {
            id: newId,
            name: `Item Name ${prompts.length + 1}`,
            content: `Content for Prompt ${prompts.length + 1}`,
            isOpen: false
        };
        const newPrompts = [...prompts, newPrompt];
        setPrompts(newPrompts);
        localStorage.setItem('prompts', JSON.stringify(newPrompts));

        if (foldersRef.current) {
            foldersRef.current.scrollTop = foldersRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const savedPrompts = JSON.parse(localStorage.getItem('prompts'));
        if (savedPrompts) {
            setPrompts(savedPrompts);
        }

        const adjustFoldersHeight = () => {
            if (!personaRef.current || !foldersRef.current) return;

            const extraHeightAboveFolders = 140;
            const availableHeight = window.innerHeight - personaRef.current.offsetTop - extraHeightAboveFolders;
            foldersRef.current.style.minHeight = `${availableHeight}px`;
            foldersRef.current.style.maxHeight = `${availableHeight}px`;
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
        setOpenIndex((prevIndex) => prevIndex === index ? null : index);
    };

    return (
        <div ref={personaRef} className="persona-prompt-container">
            <div className='personas-prompts'>Prompts</div>
            <div className='persona-prompt-explorer'>
                <p>Prompt Explorer</p>
                <img src={blueLine} alt='blue line' />
            </div>
            <div className='new-persona-prompt'>
                <button className='new-persona-prompt-btn' onClick={addNewPrompt}>
                    <span><img src={addIcon} alt='add new prompt icon' /> New Prompt </span>
                </button>
            </div>
            <div ref={foldersRef} className='folders-personas-prompts-container'>
                <div className='folders-persona-prompt'>
                    <span>
                        Folders
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPrompt} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPrompt} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPrompt} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>
                <div className='folders-item'>
                    <img src={folderIconPrompt} alt='folder icon' /> 
                    <span>
                        Item Name
                    </span>
                </div>

                <div className='folders-persona-prompt'>
                    <span>
                        Prompts
                    </span>
                </div>
                {prompts.map((prompt, index) => (
                    <PromptItem
                        key={prompt.id}
                        prompt={prompt}
                        onEdit={() => onEditPrompt(prompt)}
                        index={index}
                        isOpen={openIndex === index}
                        toggleDropdown={(isOpen) => handleToggleDropdown(index, isOpen)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Prompt;
