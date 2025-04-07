import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const DownloadDocx = ({ editorRef }) => {
  const handleDownloadContentAsDocx = () => {
    if (!editorRef.current) return;
    const delta = editorRef.current.getEditor().getContents();

    let paragraphs = [];
    let currentParagraphChildren = [];

    const parseFontSize = (fontSize) => {
      const sizeMap = {
        small: 20, 
        normal: 26, 
        large: 38, 
        huge: 64,
      };
      return sizeMap[fontSize] || 26; 
    };

    const mapFontName = (font, size) => {
      const defaultFont = size === 64 ? 'Courier New' : 'Arial';
      const fontMap = {
        'times-new-roman': 'Times New Roman',
        'arial': 'Arial',
        'courier-new': 'Courier New',
      };
      return fontMap[font] || defaultFont;
    };

    delta.ops.forEach((op) => {
      if (op.insert && typeof op.insert === 'string') {
        const segments = op.insert.split('\n');

        segments.forEach((segment, index) => {
          const style = op.attributes || {};
          const textRunOptions = {
            text: segment,
            bold: style.bold,
            italic: style.italic,
            underline: style.underline,
            size: style.size ? parseFontSize(style.size) : 26, 
            font: style.font ? mapFontName(style.font) : 'Arial',
          };

          currentParagraphChildren.push(new TextRun(textRunOptions));

          if (index < segments.length - 1) {
            paragraphs.push(new Paragraph({ children: [...currentParagraphChildren] }));
            currentParagraphChildren = []; 
          }
        });
      }
    });

    if (currentParagraphChildren.length > 0) {
      paragraphs.push(new Paragraph({ children: [...currentParagraphChildren] }));
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs, 
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "document.docx");
    });
  };

  return (
    <button onClick={handleDownloadContentAsDocx}>DOCX</button>
  );
};

export default DownloadDocx;
