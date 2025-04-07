import React from 'react';
import closeModalIcon from '../assets/img/close_modal_icon.svg';

const DiscardPersonaModal = ({ onDiscard, onCancel }) => {
    return (
        <div className="discard-modal-background">
            <div className="discard-modal-content">
                <img className='x-icon discard' onClick={onCancel} src={closeModalIcon} alt='close modal icon' />
                <div className='discard-modal-h'>
                    <h1>Discard Changes?</h1>
                    <p>You will lose all changes you made to this persona.</p>
                </div>
                <div className='discard-btns'>
                    <button className='discard-user-btn' onClick={onDiscard}>Discard Persona</button>
                    <button className='continue-editing-btn' onClick={onCancel}>Continue Editing</button>
                </div>
            </div>
        </div>
    );
};

export default DiscardPersonaModal;
