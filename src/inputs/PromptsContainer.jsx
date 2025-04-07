import React, { useState } from 'react';
import PromptItem from './PromptItem';
import DeletePromptModal from './DeletePromptModal';

const PromptsContainer = ({ prompts, onEditPrompt, onDeletePrompt }) => {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const toggleDropdown = (index) => {
    setOpenedIndex(prevIndex => prevIndex === index ? null : index);
  };

  const handleDeleteClick = (prompt) => {
    setSelectedPrompt(prompt);
    setShowDeleteModal(true);
  };

  return (
    <div className='folders-files-container-fe persona'>
      <div className='folders-file-explorer-container'>
        <div className='folders-file-explorer'>
          <span>Prompts</span>
        </div>
        {prompts.map((prompt, index) => (
          <PromptItem
            key={prompt.id}
            prompt={prompt}
            onEdit={() => onEditPrompt(prompt)}
            onDelete={() => handleDeleteClick(prompt)}
            index={index}
            isOpen={openedIndex === index}
            toggleDropdown={() => toggleDropdown(index)}
          />
        ))}
        {showDeleteModal && 
          <DeletePromptModal 
          showModal={showDeleteModal}
            onDiscard={() => {
              onDeletePrompt(selectedPrompt);
              setShowDeleteModal(false);
            }} 
            onCancel={() => setShowDeleteModal(false)}
            selectedPrompt={selectedPrompt} 
          />
        }
      </div>
    </div>
  );
};

export default PromptsContainer;
