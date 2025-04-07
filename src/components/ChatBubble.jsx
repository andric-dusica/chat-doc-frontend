import React, { useState } from 'react';
import Messages from '../inputs/Messages';
import NewMessageInput from '../inputs/NewMessageInput';
import closeFile from '../assets/img/close_icon.svg';
import fileIcon from '../assets/img/file_icon.svg';
import studentImg from '../assets/img/student_img.svg';
import botImg from '../assets/logo/logo.png';
import SVGLoader from '../inputs/SvgLoader';

const ChatBubble = ({ onClose, isViewerVisible, isPdfViewerVisible, onShowViewer, expanded }) => {
  const [messages, setMessages] = useState([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [showPersona, setShowPersona] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);



  const messageBoxStyle = isViewerVisible ? { width: '100%' } : { width: '566px' };

  const togglePersona = () => {
    setShowPersona(!showPersona);
    setShowPrompts(false); 
  };

  const togglePrompts = () => {
    setShowPrompts(!showPrompts);
    setShowPersona(false); 
  };

  const handleSendMessage = (newMessage) => {
    if (isWaitingForResponse) {
      return;
    }

    const newUserMessage = {
      id: Date.now(),
      type: 'student',
      content: newMessage,
      img: studentImg,
    };
    setMessages(messages => [...messages, newUserMessage]);

    const tempMessageId = Date.now() + 1;
    const loadingMessage = {
      id: tempMessageId,
      type: 'loading',
      content: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={botImg} alt="Bot" style={{ marginRight: '10px', width: '20px', height: '20px' }} />
          <SVGLoader />
        </div>
      ),
      img: '', 
    };
    setMessages(messages => [...messages, loadingMessage]);
    setIsWaitingForResponse(true);

    setTimeout(() => {
      setMessages(currentMessages => {
        return currentMessages.filter(msg => msg.id !== tempMessageId) 
          .concat({
            id: Date.now(),
            type: 'knowledgebase',
            content: "This is the answer.",
            img: botImg,
          });
      });
      setIsWaitingForResponse(false);
    }, 4000);
  };

  const chatViewStyle = {
    display: 'flex',
    justifyContent: isPdfViewerVisible ? 'end' : 'space-between',
  };

  return (
    <div className={`chat-bubble ${expanded ? 'chat-bubble-expanded' : ''}`}>
      <div className='chatView'>
        {!isViewerVisible && (
          <img src={fileIcon} alt='Open Viewer' onClick={onShowViewer} className='openFile' style={{ marginRight: 'auto' }} />
        )}
        <img src={closeFile} alt='Close' onClick={onClose} className='close-pdf' style={{ marginLeft: 'auto' }} />
      </div>
      <div className={`chatBg ${showPersona || showPrompts ? 'no-scroll' : ''}`}>
        <div className={`messageBox ${!isViewerVisible ? 'messageBoxCustom' : ''}`} style={messageBoxStyle}>
          <Messages showPrompts={showPrompts} showPersona={showPersona} messages={messages} />
          <NewMessageInput 
            onTogglePersona={togglePersona} 
            onTogglePrompts={togglePrompts} 
            onSendMessage={handleSendMessage} 
            isWaitingForResponse={isWaitingForResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
