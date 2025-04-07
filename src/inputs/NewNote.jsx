import React, { useState, useEffect, useRef } from 'react';
import closeFile from '../assets/img/close_icon.svg';
import arrowDownDownload from '../assets/img/arrow_down_download.svg'
import arrowUpDownload from '../assets/img/arrow_up_download.svg'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DownloadDocx from './DownloadDocx';
import DownloadPdf from './DownloadPdf';

var Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['times-new-roman', 'arial', 'courier-new'];
ReactQuill.Quill.register(Font, true);

const NewNote = ({ onCloseNote }) => {
  const [editorContent, setEditorContent] = useState(() => {
    const savedContent = localStorage.getItem('editorContentDelta');
    return savedContent ? JSON.parse(savedContent) : '';
  });

  const quillRef = useRef(null);
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleSaveContent = () => {
    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      localStorage.setItem('editorContentDelta', JSON.stringify(delta));
      setShowSavedAlert(true);
      setTimeout(() => setShowSavedAlert(false), 3000);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format('bold', false); 
    }
  }, []);

  const editorContainerRef = useRef(null); 

  useEffect(() => {
    if (editorContent) {
      localStorage.setItem('editorContentDelta', JSON.stringify(editorContent));
    }
  }, [editorContent]);

  function toggleDropdown(event) {
    event.stopPropagation();

    setIsDropdownOpen(!isDropdownOpen); 

    var dropdownContent = document.querySelector('.dropdown-download-as-content');
    dropdownContent.style.display = isDropdownOpen ? 'none' : 'flex';

    if (!isDropdownOpen) {
      document.addEventListener('click', closeDropdownOnOutsideClick);
    } else {
      document.removeEventListener('click', closeDropdownOnOutsideClick);
    }
  }

  function closeDropdownOnOutsideClick(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdownContent = document.querySelector('.dropdown-download-as-content');
      dropdownContent.style.display = 'none';
      setIsDropdownOpen(false); 
      document.removeEventListener('click', closeDropdownOnOutsideClick);
    }
  }

  return (
    <div className='notepad-container'>
      <div className="note-controls">
        <button className='save-btn' onClick={handleSaveContent}>Save</button>
          <div className="dropdown-download-as">
            <button className={`dropbtn ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                Download As {isDropdownOpen ? <img src={arrowUpDownload} alt="arrow up" /> : <img src={arrowDownDownload} alt="arrow down" />}
            </button>
            <div className="dropdown-download-as-content" style={{display: 'none'}}>
              <DownloadDocx editorRef={quillRef} parseFontSize={parseFontSize} mapFontName={mapFontName} />
              <DownloadPdf editorRef={quillRef} editorContainerRef={editorContainerRef} />
            </div>
          </div>
        <img src={closeFile} alt="Close Note" onClick={() => onCloseNote()} className="close-note" />
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorContent}
        onChange={(content, delta, source, editor) => setEditorContent(editor.getContents())}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'font': ['times-new-roman', 'arial', 'courier-new'] }],
            [{ 'align': [] }],
          ]
        }}
        style={{ fontFamily: '"Source Sans 3", sans-serif', fontSize: '16px' }}
      />
      {showSavedAlert && <span className='alert-saved' style={{ visibility: 'visible' }}>Saved</span>}
    </div>
  );
};

const parseFontSize = (fontSize) => {
  const sizeMap = {
    small: 10,
    normal: 13,
    large: 19,
    huge: 32,
  };
  return sizeMap[fontSize] || 24;
};

const mapFontName = (font) => {
  const fontMap = {
    'times-new-roman': 'Times New Roman',
    'arial': 'Arial',
    'courier-new': 'Courier New',
  };
  return fontMap[font] || 'Times New Roman';
};

export default NewNote;


