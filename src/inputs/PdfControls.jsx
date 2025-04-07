import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import PdfSearchInput from './PdfSearchInput';
import arrowLeft from '../assets/img/arrow_left.svg';
import arrowRight from '../assets/img/arrow_right.svg';
import zoomInImg from '../assets/img/zoom_in.svg';
import zoomOutImg from '../assets/img/zoom_out.svg';
// import optionsIcon from '../assets/img/options_icon.svg';


const PdfControls = ({ scale, setScale, pageNumber, setPageNumber, numPages, handlePageChangeDirectly, onSearch, containerWidth, containerHeight, pdfWidth, pdfHeight, onPageChange }) => {
  const [inputPageNumber, setInputPageNumber] = useState(pageNumber.toString());
  const [zoomPercentage, setZoomPercentage] = useState(Math.round(scale * 100));
  const [isAutoFitSelected, setIsAutoFitSelected] = useState(false); 
  const predefinedZoomLevels = [50, 75, 100, 125, 150, 200, 300];
  const [viewport, setViewport] = useState(null);

  useEffect(() => {
    if (viewport && viewport.scale) {
        document.documentElement.style.setProperty('--scale-factor', viewport.scale);
    }
}, [viewport]);

  const autoFitScale = () => {
  // const pdfContainer = document.querySelector('.pdf-container'); 
  const containerWidth = 600;
  const containerHeight = 800;

  const pdfWidth = 600; 
  const pdfHeight = 800; 

  const widthScale = containerWidth / pdfWidth;
  const heightScale = containerHeight / pdfHeight;
  const newScale = Math.min(widthScale, heightScale);

  setScale(newScale);
  setZoomPercentage(Math.round(newScale * 100));
};


  useEffect(() => {
    setInputPageNumber(pageNumber.toString());
  }, [pageNumber]);

  useEffect(() => {
    setZoomPercentage(Math.round(scale * 100)); 
  }, [scale]);

  const fitWidthScale = () => {
    const widthScale = containerWidth / pdfWidth;
    setScale(widthScale);
    setZoomPercentage(Math.round(widthScale * 100));
  };
  
  
  const handleScaleChange = (e) => {
    if (e.target.value === "auto") {
      autoFitScale();
      setIsAutoFitSelected(true);
    } else if (e.target.value === "actual") {
      setScale(1.0);
      setIsAutoFitSelected(false);
      setZoomPercentage(100); 
    } else if (e.target.value === "fitWidth") {
      fitWidthScale();
      setIsAutoFitSelected(true);
    } else {
      const newScale = parseInt(e.target.value, 10) / 100;
      setScale(newScale);
      setZoomPercentage(parseInt(e.target.value, 10));
      setIsAutoFitSelected(false);
    }
  };
  
  
  const zoomIn = () => {
    const newZoomLevel = Math.min(zoomPercentage + 10, 300);
    setZoomPercentage(newZoomLevel);
    setScale(newZoomLevel / 100);
  };

  const zoomOut = () => {
    const newZoomLevel = Math.max(zoomPercentage - 10, 50);
    setZoomPercentage(newZoomLevel);
    setScale(newZoomLevel / 100);
  };

  const goToNextPage = () => {
    const newPageNumber = Math.min(pageNumber + 1, numPages);
    onPageChange(newPageNumber);
};

const goToPrevPage = () => {
    const newPageNumber = Math.max(pageNumber - 1, 1);
    onPageChange(newPageNumber);
};
  
  const handlePageInput = (e) => {
    setInputPageNumber(e.target.value);
  };

  const applyPageChange = (e) => {
    e.preventDefault(); 
    const newPageNum = parseInt(inputPageNumber, 10);
    if (!isNaN(newPageNum) && newPageNum >= 1 && newPageNum <= numPages) {
      setPageNumber(newPageNum);
    }
  };


  return (
    <div className='controls-pdf'>
        {/* <div className='options-controls'>
            <img className='controls' src={optionsIcon} alt='options' />
        </div> */}
         <div className='zoom-controls'>
            <img className='controls' src={zoomOutImg} alt='zoom out' onClick={zoomOut} />
            <select value={isAutoFitSelected ? "auto" : zoomPercentage.toString()} onChange={handleScaleChange} style={{ backgroundColor: 'transparent', color: '#9095A3', borderColor: 'transparent', borderRadius: '4px' }}>
              {predefinedZoomLevels.map(level => (
                <option key={level} value={level}>{level}%</option>
              ))}
              <option value="auto">Auto Fit</option>
              <option value="fitWidth">Fit Width</option>
              {!predefinedZoomLevels.includes(zoomPercentage) && !isAutoFitSelected && <option value={zoomPercentage}>{zoomPercentage}%</option>}
            </select>

            <img className='controls' src={zoomInImg} alt='zoom in' onClick={zoomIn} />
        </div>
        <div className='page-controls'>
            <img className='controls' src={arrowLeft} alt='prev page' onClick={goToPrevPage} />
            <input
                type="number"
                value={inputPageNumber}
                onChange={handlePageInput}
                onBlur={applyPageChange} 
                onKeyDown={(e) => { if(e.key === 'Enter') applyPageChange(e); }}
                min="1"
                max={numPages}
                style={{width: '50px', textAlign: 'center', backgroundColor: '#09132E', borderRadius: '4px', color: '#EBF0FF', borderColor: 'transparent'}}
            />
            of {numPages}
            <img className='controls' src={arrowRight} alt='next page' onClick={goToNextPage} />
        </div>
        {/* <div className='search-controls'>
            <PdfSearchInput onSearch={onSearch} />
        </div> */}
    </div>
  );
};

export default PdfControls;