import React, { useState, useEffect } from 'react';
import { usePdf } from './PdfContext';
import { useNavigate } from 'react-router-dom';
import closeFile from '../assets/img/close_icon.svg';
import chatIcon from '../assets/img/chat_icon.svg';
import CustomPdfViewer from './CustomPdfViewer'; 
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PdfControls from './PdfControls';
import UploadFileBtn from '../assets/img/upload_file_btn.svg';

const PdfViewer = ({ toggleChatBubble, isChatBubbleVisible, onVisibilityChange, viewport, isPdfViewerVisible }) => {
    const { pdfState } = usePdf(); // Koristi PdfContext za globalno stanje
    const navigate = useNavigate(); 
    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    // Osluškuje promene u globalnom PDF stanju i ažurira lokalno stanje komponente
    useEffect(() => {
        if (pdfState.selectedPdfFile) {
            // Signalizira da je fajl uspešno "uploadovan" i spreman za prikaz
            onVisibilityChange(true);
        }
    }, [pdfState.selectedPdfFile, onVisibilityChange]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1); // Resetuje na prvu stranicu kada se učita novi dokument
    };
    const onPageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };
    
    
    const handleDocumentLoadSuccess = (numPages) => {
          setNumPages(numPages);
          setPageNumber(1); 
      };
    
    const [pdfVisible, setPdfVisible] = useState(isPdfViewerVisible);
    
      useEffect(() => {
          setPdfVisible(isPdfViewerVisible);
      }, [isPdfViewerVisible]);
    
    const togglePdfVisibility = () => {
          const newVisibility = !pdfVisible;
          setPdfVisible(newVisibility);
          onVisibilityChange(newVisibility);
      };
    
    const openChatBubble = () => {
          toggleChatBubble();
      };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            // Ažurira globalno stanje sa novim odabranim PDF fajlom
            // Nema potrebe za navigate('/session'), jer se pretpostavlja da smo već na toj stranici
        } else {
            alert("Please choose a PDF file.");
        }
    };

    if (!pdfState.selectedPdfFile) {
        // Prikazuje opciju za upload ako PDF nije odabran
        return (
            <div className='chat_n_doc'>
                <span className='upload-file-span'>Upload a file to start this session</span>
                <div className='upload-file-btn'>
                    <label className="file-input-container">
                        <img src={UploadFileBtn} alt='upload file icon'/> Upload File
                        <input type="file" className="file-input-hidden" onChange={handleFileChange} accept="application/pdf"/>
                    </label>
                </div>
            </div>
        );
    }

    // Ako postoji odabran PDF fajl, prikazuje PDF viewer sa kontrolama
    return (
        <div className='pdfFile' style={{ 
            display: pdfVisible ? 'block' : 'none', 
            width: isChatBubbleVisible ? '50%' : '100%', 
            height: pdfState.selectedPdfFile ? 'calc(100% - 47px)' : '105%'
        }}>
        { pdfState.selectedPdfFile && (
            <div>
                <div className='fileView'>
                    <PdfControls 
                        scale={scale} 
                        setScale={setScale} 
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        numPages={numPages}
                        onPageChange={onPageChange}
                    />
                    <img className='close-pdf' src={closeFile} alt='close_icon' onClick={togglePdfVisibility} />
                    {!isChatBubbleVisible && (
                        <div className='chat-icon-container' onClick={openChatBubble}>
                            <img className='chat-icon' src={chatIcon} alt='chat_icon' />
                        </div>
                    )}
                </div>
            </div>
        )}
    
        { pdfState.selectedPdfFile && (
            <div className='chat_n_doc'>
                <span className='upload-file-span'>Upload a file to start this session</span>
                <div className='upload-file-btn'>
                    <label className="file-input-container"><img src={UploadFileBtn} alt='upload file icon' />Upload File
                        <input type="file" className="file-input-hidden" onChange={handleFileChange} accept="application/pdf" />
                    </label>
                </div>
            </div>
        )}
             
              { pdfState.selectedPdfFile && (
                  <div className='pdfView'>
                      <div className='file_pdf' style={{ width: isChatBubbleVisible ? '100%' : '654px' }}>
                        <CustomPdfViewer
                          pdfFile={pdfState.selectedPdfFile}
                          onDocumentLoadSuccess={onDocumentLoadSuccess}
                          scale={scale}
                          numPages={numPages}
                          onPageChange={onPageChange}
                          pageNumber={pageNumber} 
                        />
                      </div>
                  </div>
              )}
          </div>
      );
    };
    

export default PdfViewer;
