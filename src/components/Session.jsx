
import React, { useState, useEffect } from 'react';
import SessionNav from './SessionNav';
import PdfViewer from '../inputs/PdfViewer';
import ChatBubble from './ChatBubble';
import { usePdf } from '../inputs/PdfContext'; 

const Session = () => {
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [isPdfViewerVisible, setIsPdfViewerVisible] = useState(true); 
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const { pdfState } = usePdf(); // Koristimo globalno stanje za PDF

  useEffect(() => {
    // Postavite isFileUploaded na true ako je PDF već odabran (npr. postoji u pdfState)
    setIsFileUploaded(!!pdfState.selectedPdfFile);
}, [pdfState.selectedPdfFile]);

  const toggleChatBubble = () => {
    setShowChatBubble(!showChatBubble);
  };

  const togglePdfVisibility = () => {
    setIsPdfViewerVisible(!isPdfViewerVisible);
  };

  const showPdfViewer = () => {
    console.log('Prikazujem PdfViewer');
    setIsPdfViewerVisible(true);
  };

  const onFileUploaded = (isUploaded) => {
    console.log('File uploaded:', isUploaded);
  };
  

  return (
    <div className="session-container">
       {isFileUploaded && <SessionNav />}
      <div className="content-wrapper" style={{ display: 'flex', height: '100%' }}>
        <PdfViewer
          toggleChatBubble={toggleChatBubble}
          isChatBubbleVisible={showChatBubble}
          onVisibilityChange={setIsPdfViewerVisible}
          isPdfViewerVisible={isFileUploaded}
                    onFileUploaded={setIsFileUploaded}
        />
        {showChatBubble && (
          <ChatBubble
          onClose={toggleChatBubble}
          isViewerVisible={isPdfViewerVisible}
          onShowViewer={showPdfViewer}
          expanded={showChatBubble}
        />
        )}
      </div>
    </div>
  );
};

export default Session;