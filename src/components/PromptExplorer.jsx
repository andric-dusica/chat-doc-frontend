import React, { useState, useEffect } from 'react';
import PromptsContainer from '../inputs/PromptsContainer';
import addIcon from '../assets/img/add_icon.svg';
import NewPromptModal from '../inputs/NewPromptModal';
import DeletePromptModal from '../inputs/DeletePromptModal';

const PromptExplorer = ({ onCloseNote }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingPrompt, setEditingPrompt] = useState(null);
    const [promptToDelete, setPromptToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [prompts, setPrompts] = useState(() => {
        const savedPrompts = localStorage.getItem('prompts');
        return savedPrompts ? JSON.parse(savedPrompts) : [];
    });

    const handleDeletePrompt = () => {
      if (promptToDelete) {
          const updatedPrompts = prompts.filter(prompt => prompt.id !== promptToDelete.id);
          setPrompts(updatedPrompts);
          localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
          setShowDeleteModal(false);
          setPromptToDelete(null); 
      }
  };

    const handleEditPrompt = (prompt) => {
        setEditingPrompt(prompt);
        setShowModal(true);
    };

    const handleOpenModal = () => {
        setEditingPrompt(null); 
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveNewPrompt = (newPrompt) => {
        const updatedPrompts = editingPrompt ? prompts.map(prompt => {
            if (prompt.id === editingPrompt.id) return newPrompt;
            return prompt;
        }) : [...prompts, newPrompt];

        setPrompts(updatedPrompts);
        localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
        setShowModal(false);
    };

    useEffect(() => {
        const savedPrompts = JSON.parse(localStorage.getItem('prompts')) || [];
        setPrompts(savedPrompts);
    }, []);

    useEffect(() => {
        localStorage.setItem('prompts', JSON.stringify(prompts));
    }, [prompts]);

    return (
        <div className='file-explorer-container'>
            <div className='fe-window'>
                <div className='file-explorer-btns'>
                    <button onClick={handleOpenModal}>
                        <img src={addIcon} alt='Add new prompt' /> New Prompt
                    </button>
                </div>
                <PromptsContainer
                  prompts={prompts}
                  onEditPrompt={handleEditPrompt}
                  onDeletePrompt={(prompt) => {
                    setPromptToDelete(prompt);
                    setShowDeleteModal(true);
                }}
                />
            </div>
            <NewPromptModal showModal={showModal} onClose={handleCloseModal} onSave={handleSaveNewPrompt} editingPrompt={editingPrompt} />
            <DeletePromptModal
              showModal={showDeleteModal}
              onDiscard={handleDeletePrompt} 
              onCancel={() => setShowDeleteModal(false)}
              promptToDelete={promptToDelete}
            />
        </div>
    );
};

export default PromptExplorer;
