import React from 'react';
import loader1 from '../assets/img/akawin_loader1.svg';
import loader2 from '../assets/img/akawin_loader2.svg';

const fadeInOutKeyframes = `
  @keyframes fadeInOut {
    0%, 50%, 100% { opacity: 0; }
    25%, 75% { opacity: 1; }
  }
`;

const SVGLoader = () => (
    <div className="svg-loader-container" style={{ width: '24px', height: '24px', position: 'relative' }}>
        <style>{fadeInOutKeyframes}</style>
        <img src={loader1} alt='loader icon' style={{ position: 'absolute', animation: 'fadeInOut 1.6s infinite' }} />
        <img src={loader2} alt='loader icon' style={{ position: 'absolute', animation: 'fadeInOut 1.6s infinite', animationDelay: '0.4s' }} />
    </div>
);

export default SVGLoader;



