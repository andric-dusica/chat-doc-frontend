import React from 'react';
import closeModalIcon from '../assets/img/close_modal_icon.svg';

const DeletePromptModal = ({ showModal, onDiscard, onCancel, selectedPrompt }) => {
    if (!showModal) {
        return null;
    }
    return (
        <div className='modal-um'>
            <div className="discard-modal-background">
                <div className="discard-modal-content">
                    <img className='x-icon discard' onClick={onCancel} src={closeModalIcon} alt='close modal icon' />
                    <div className='discard-modal-h'>
                        <h1>Delete Prompt?</h1>
                        <p>If you continue, this prompt will be deleted forever.</p>
                    </div>
                    <div className='discard-btns'>
                        <button className='discard-user-btn' onClick={onDiscard}>Delete Prompt</button>
                        <button className='continue-editing-btn' onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default DeletePromptModal;
