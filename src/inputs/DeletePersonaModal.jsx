import React from 'react';
import closeModalIcon from '../assets/img/close_modal_icon.svg';

const DeletePersonaModal = ({ showModal, onDiscard, onCancel }) => {
    if (!showModal) {
        return null;
    }
    return (
        <div className='modal-um'>
            <div className="discard-modal-background">
                <div className="discard-modal-content">
                    <img className='x-icon discard' onClick={onCancel} src={closeModalIcon} alt='close modal icon' />
                    <div className='discard-modal-h'>
                        <h1>Delete Persona?</h1>
                        <p>If you continue this persona will be deleted forever.</p>
                    </div>
                    <div className='discard-btns'>
                        <button className='discard-user-btn' onClick={onDiscard}>Delete Persona</button>
                        <button className='continue-editing-btn' onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default DeletePersonaModal;