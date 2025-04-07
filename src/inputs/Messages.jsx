import React, { useEffect, useRef, useState } from 'react';
import filePages from '../assets/img/file_pages.svg'; 
import Persona from '../dashboard/Personas';
import Prompt from '../dashboard/Prompt';


const Messages = ({ showPrompts, showPersona, messages }) => {
    const containerRef = useRef(null);
    const [openedIndex, setOpenedIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenedIndex(prevIndex => prevIndex === index ? null : index);
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={containerRef} className={`chat-messages-container ${showPersona ? 'no-scroll' : ''}`} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse'}}>
            {showPersona && <Persona openedIndex={openedIndex} toggleDropdown={toggleDropdown} />}
            {showPrompts && <Prompt />}
            {messages.slice().reverse().map((message) => (
                <div key={message.id} className={message.type === 'student' ? 'studentMessage' : 'knowledgebase'}>
                    {message.img && (
                        <div className='profileImg'>
                            <img src={message.img} alt="Profile" style={{ width: '20px', height: '20px' }} />
                        </div>
                    )}
                    <div className="messageContent" style={{ whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {message.content}
                        </div>
                        {message.type === 'knowledgebase' && (
                            <div className='filePages' style={{ marginTop: '8px' }}>
                                <img src={filePages} alt='file_pages' /> 
                                <p className='pages'>
                                    <span>1</span>
                                    <span>2</span> 
                                    <span>3</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Messages;

