import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextareaAutosize from 'react-textarea-autosize';
import closeModalIcon from '../assets/img/close_modal_icon.svg';
import errorIcon from '../assets/img/error_icon.svg';
import { usePrompts } from './PromptContext';
import DiscardPromptModal from './DiscardPromptModal';

const NewPromptModal = ({ showModal, onClose, onSave, editingPrompt }) => {
    const { addPrompt } = usePrompts();
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [charCounts, setCharCounts] = useState({
        contentCount: 0,
    });
    const [isFormChanged, setIsFormChanged] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        background: '', 
    });

    const { prompts } = usePrompts();

    const isFormFilled = formData.name.trim() || formData.description.trim() || formData.background.trim();
    useEffect(() => {
        if (!editingPrompt) {
          setIsFormChanged(false); 
          return;
        }
      
        const hasChanged = editingPrompt.name !== formData.name ||
                           editingPrompt.description !== formData.description ||
                           editingPrompt.background !== formData.background;
        setIsFormChanged(hasChanged);
      }, [formData, editingPrompt]);
    

    const saveButtonStyle = {
        backgroundColor: (editingPrompt && isFormChanged) ? '#007bff' : '#E1E4EB', 
        cursor: (editingPrompt && isFormChanged) ? 'pointer' : 'not-allowed',
    };

    const addButtonStyle = {
        backgroundColor: isFormFilled ? '#2D5DE0' : '#E1E4EB', 
        cursor: isFormFilled ? 'pointer' : 'not-allowed',
    };

    useEffect(() => {
        if (editingPrompt) {
            setFormData({
                name: editingPrompt.name,
                description: editingPrompt.description,
                background: editingPrompt.background,
            });
    
            setCharCounts({
                nameCount: editingPrompt.name ? editingPrompt.name.length : 0,
                descriptionCount: editingPrompt.description ? editingPrompt.description.length : 0,
                backgroundCount: editingPrompt.background ? editingPrompt.background.length : 0,
            });
        } else {
            resetForm();
        }
    }, [editingPrompt]);

    const [isValid, setIsValid] = useState({
        name: true,
        description: true,
        background: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setIsValid(prevState => ({
            ...prevState,
            [name]: value.trim() !== '' && value.length <= getMaxChars(name)
        }));
        setCharCounts(prevState => ({
            ...prevState,
            [`${name}Count`]: value.length
        }));
    };

    const getMaxChars = (fieldName) => {
        if (fieldName === "name") return 100;
        if (fieldName === "description") return 500;
        return 1000; 
    };

    const handleSave = () => {
        setAttemptedSubmit(true); 

        const isNameEmpty = formData.name.trim() === '';
        const isDescriptionEmpty = formData.description.trim() === '';
        const isBackgroundEmpty = formData.background.trim() === '';
    
        const isNameTooLong = formData.name.length > 100;
        const isDescriptionTooLong = formData.description.length > 500;
        const isBackgroundTooLong = formData.background.length > 1000;
    
        setIsValid({
            name: !isNameEmpty && !isNameTooLong,
            description: !isDescriptionEmpty && !isDescriptionTooLong,
            background: !isBackgroundEmpty && !isBackgroundTooLong,
        });
    
        if (!isNameEmpty && !isDescriptionEmpty && !isBackgroundEmpty && !isNameTooLong && !isDescriptionTooLong && !isBackgroundTooLong) {
            const newPromptId = uuidv4();
            const newPrompt = {
                id: newPromptId,
                name: formData.name.trim(),
                description: formData.description.trim(),
                background: formData.background.trim(),
            };
            
            onSave(newPrompt); 
            addPrompt(newPrompt); 
            onClose(); 
    
            resetForm(); 
        }
    };

    
    
    const resetForm = () => {
        setFormData({
          name: '',
          description: '',
          background: '',
        });
      
        setCharCounts({
          nameCount: 0,
          descriptionCount: 0,
          backgroundCount: 0,
        });
      
        setAttemptedSubmit(false);
      };

    return showModal ? (
        <div className="modal-um">
            <div className={`modal-content-um persona ${showDiscardModal ? 'hidden' : ''}`}>
                <img className='x-icon' src={closeModalIcon} alt="Close" onClick={() => setShowDiscardModal(true)} />
                <h1>New Prompt</h1>
                <div className='user-informations'>
                    <div className='personal-info persona'>
                        <div className='personal-info-names'>
                            <p>Prompt Name *</p>
                            <TextareaAutosize
                                name="name"
                                className={`textarea-info ${!isValid.name ? 'textarea-invalid' : ''}`}
                                placeholder="Enter prompt name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <div className='characters-info'>
                                <p className={`small-info ${charCounts.nameCount > 100 ? 'text-error' : ''}`}>
                                    {charCounts.nameCount > 100 && <img src={errorIcon} alt='error icon' />}
                                    Easily remembered short title. <span className='small-info characters'>{charCounts.nameCount}/100</span> 
                                </p>
                            </div>
                            <div className='error-text' style={!isValid.name && attemptedSubmit ? {} : { display: 'none' }}>
                                <img src={errorIcon} alt='error icon' /> This field is required
                            </div>
                        </div>
                        <div className='personal-info-names'>
                            <p>Prompt Description *</p>
                            <TextareaAutosize
                                name="description"
                                minRows={2}
                                className={`textarea-info ${!isValid.description ? 'textarea-invalid' : ''}`}
                                placeholder="Enter prompt description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <div className='characters-info'>
                                <p className={`small-info ${charCounts.descriptionCount > 500 ? 'text-error' : ''}`}>
                                    {charCounts.descriptionCount > 500 && <img src={errorIcon} alt='error icon' />} 
                                    Short description of how Prompt Background will affect responses. <span className='small-info characters'>{charCounts.descriptionCount}/500</span>
                                </p>
                            </div>
                            <div className='error-text' style={!isValid.description && attemptedSubmit ? {} : { display: 'none' }}>
                                <img src={errorIcon} alt='error icon' /> This field is required
                            </div>
                        </div>
                        <div className='personal-info-names persona'>
                            <p>Prompt Background *</p>
                            <TextareaAutosize
                                name="background"
                                minRows={2}
                                className={`textarea-info ${!isValid.background ? 'textarea-invalid' : ''}`}
                                placeholder="Enter prompt background"
                                value={formData.background}
                                onChange={handleChange}
                            />
                            <div className='characters-info'>
                                <p className={`small-info ${charCounts.backgroundCount > 1000 ? 'text-error' : ''}`}>
                                    {charCounts.backgroundCount > 1000 && <img src={errorIcon} alt='error icon' />} 
                                    This will influence how prompt will influence tone of the response. <span className='small-info characters'>{charCounts.backgroundCount}/1000</span> 
                                </p>
                            </div>
                            <div className='error-text' style={!isValid.background && attemptedSubmit ? {} : { display: 'none' }}>
                                <img src={errorIcon} alt='error icon' /> This field is required
                            </div>
                        </div>
                    </div>
                </div>
                <div className='buttons-in-modal'>
                    <button className='discard' onClick={() => setShowDiscardModal(true)}>Discard</button>
                    <button 
                        className='invite-user' 
                        onClick={handleSave} 
                        style={editingPrompt ? saveButtonStyle : addButtonStyle} 
                        disabled={editingPrompt ? !isFormChanged : !isFormFilled}>
                        {editingPrompt ? 'Save Prompt' : 'Add Prompt'}
                    </button>
                </div>
            </div>
            {showDiscardModal && (
                <DiscardPromptModal
                    onDiscard={() => {
                        resetForm();
                        setShowDiscardModal(false);
                        onClose(); 
                    }}
                    onCancel={() => setShowDiscardModal(false)}
                />
            )}
        </div>
    ) : null;
};

export default NewPromptModal;
