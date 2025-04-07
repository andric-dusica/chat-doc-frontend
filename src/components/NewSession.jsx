import React, { useState } from 'react';
import SessionNav from './SessionNav'; 
import ChatBubble from './ChatBubble'; 
import FileExplorer from './FileExplorer';

const NewSession = () => {
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
          <div style={{ borderRight: '1px solid var(--Text-AW-Type-5, #9095A3)', width: '100%', height: '100%' }}>
              <FileExplorer onCloseNote={closeNote} />
          </ div>
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

export default NewSession;
