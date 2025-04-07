import React, { useState, useEffect, useRef } from 'react';
// import settingsIcon from '../assets/img/settings_icon.svg';
import personaIcon from '../assets/img/persona_icon.svg';
import promptsIcon from '../assets/img/prompts_icon.svg';
import sendIcon from '../assets/img/send_icon.svg';
import sendIconActive from '../assets/img/send_icon_active.svg';
import { useSelectedName } from './SelectedNameContext';
import { useSelectedContent } from './SelectedContentContext';


const NewMessageInput = ({ onTogglePrompts, onTogglePersona, onSendMessage, isWaitingForResponse }) => {
    const { selectedName } = useSelectedName();
    const { selectedContent } = useSelectedContent(); 
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef(null);
    const [isPromptOpen, setIsPromptOpen] = useState(false); 
    const [isPersonaOpen, setIsPersonaOpen] = useState(false);

    useEffect(() => {
        setInputValue(selectedContent); 
    }, [selectedContent]);


    const handleChange = (e) => {
        setInputValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        onSendMessage(inputValue);
        setInputValue('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; 
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            handleSendMessage(); 
        }
    };

    const sendButtonStyle = {
        backgroundColor: inputValue.trim() ? '#2D5DE0' : '#F0F1F5', 
        cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
    };

    const icon = inputValue.trim() ? sendIconActive : sendIcon;

    const personaBtnRef = useRef(null); 

    const togglePrompt = () => {
        setIsPromptOpen(!isPromptOpen);
        if(isPersonaOpen) setIsPersonaOpen(false); 
        onTogglePrompts(); 
    };

    const togglePersona = () => {
        setIsPersonaOpen(!isPersonaOpen);
        if(isPromptOpen) setIsPromptOpen(false);
        onTogglePersona();
    };

    return (
        <div className='new-messages'>
            <div className='new-messages-input-container'>
                <textarea
                    ref={textareaRef}
                    disabled={isWaitingForResponse}
                    className={`chat-input ${isWaitingForResponse ? 'disabled' : ''}`}
                    placeholder='Type your message or select a prompt...'
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} 
                    style={{ minHeight: '56px' }}
                />
                <div className='chat-icons'>
                    <div className='chat-persona'>
                        {/* <div className='settings-icon'>
                            <img src={settingsIcon} alt='settings_icon' />
                        </div> */}
                        <button className='persona-btn' onClick={togglePersona} style={{ backgroundColor: isPersonaOpen ? '#FFD985' : '#E1E4EB' }}>
                            <img src={personaIcon} alt='persona_icon' />  <span>{selectedName}</span>
                        </button>
                    </div>
                    <div className='chat-prompts'>
                        <div className='prompt-icon' style={{ backgroundColor: isPromptOpen ? '#FFD985' : 'transparent' }} onClick={togglePrompt}>
                            <img src={promptsIcon} alt='prompts_icon' />
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className='send-btn'
                            style={sendButtonStyle}
                            disabled={!inputValue.trim() || isWaitingForResponse}
                        >
                            <img src={icon} alt='send_icon' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewMessageInput;