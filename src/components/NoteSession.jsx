import React, { useState } from 'react';
import SessionNav from './SessionNav'; 
import NewNote from '../inputs/NewNote'; 
import ChatBubble from './ChatBubble'; 

const NoteSession = () => {
    const [showChatBubble, setShowChatBubble] = useState(true);
    const [isNoteVisible, setIsNoteVisible] = useState(true);
  
    const closeNote = () => {
      setIsNoteVisible(false);
    };
  return (
    <div className="session-container">
      <SessionNav />
      <div className="content-wrapper" style={{ display: 'flex', height: '100%' }}>
        {isNoteVisible && (
            <NewNote onCloseNote={closeNote} />
            )}
        <ChatBubble
            onClose={() => setShowChatBubble(false)}
            isViewerVisible={isNoteVisible}
            onShowViewer={() => {}}
            expanded={showChatBubble}
            style={{ width: '50% !important' }}
        />
      </div>
    </div>
  );
};

export default NoteSession;
