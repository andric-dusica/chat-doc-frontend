import React from 'react';
import closeModalIcon from '../assets/img/close_modal_icon.svg';


const DiscardChangesModal = ({ onDiscard, onCancel, onClose }) => {
    return (
        <div className="discard-modal-background">
            <div className="discard-modal-content">
            <img className='x-icon' onClick={onCancel} src={closeModalIcon} alt='close modal icon' />
                <div className='discard-modal-h'>
                    <h1>Discard Changes?</h1>
                    <p>You will lose all changes you made to this user.</p>
                </div>
                <div className='discard-btns'>
                    <button className='discard-user-btn' onClick={onDiscard}>Discard User</button>
                    <button className='continue-editing-btn' onClick={onCancel}>Continue Editing</button>
                </div>
            </div>
        </div>
    );
};

export default DiscardChangesModal;
