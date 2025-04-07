import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePersonas } from './PersonaContext';
import TextareaAutosize from 'react-textarea-autosize';
import closeModalIcon from '../assets/img/close_modal_icon.svg';
import errorIcon from '../assets/img/error_icon.svg';
import DiscardPersonaModal from './DiscardPersonaModal';

const NewPersonaModal = ({ showModal, onClose, onSave, role, setRole, editingPersona }) => {
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const { addPersona } = usePersonas();
    const [charCounts, setCharCounts] = useState({
        nameCount: 0,
        descriptionCount: 0,
        backgroundCount: 0,
    });
    const [isFormChanged, setIsFormChanged] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        background: '', 
    });

    const isFormFilled = formData.name.trim() || formData.description.trim() || formData.background.trim();
    useEffect(() => {
        if (!editingPersona) {
          setIsFormChanged(false); 
          return;
        }
      
        const hasChanged = editingPersona.name !== formData.name ||
                           editingPersona.description !== formData.description ||
                           editingPersona.background !== formData.background;
        setIsFormChanged(hasChanged);
      }, [formData, editingPersona]);

      const saveButtonStyle = {
        backgroundColor: (editingPersona && isFormChanged) ? '#007bff' : '#E1E4EB', 
        cursor: (editingPersona && isFormChanged) ? 'pointer' : 'not-allowed',
      };


    const addButtonStyle = {
        backgroundColor: isFormFilled ? '#2D5DE0' : '#E1E4EB', 
        cursor: isFormFilled ? 'pointer' : 'not-allowed',
    };
    const dropdownRef = useRef(null);

    const handleSelectRole = (selectedRole) => {
        setRole(selectedRole);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const [isValid, setIsValid] = useState({
        name: true,
        description: true,
        background: true,
    });

    const getMaxChars = (fieldName) => {
        if (fieldName === "name") return 100;
        if (fieldName === "description") return 500;
        return 1000; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newCounts = { ...charCounts, [`${name}Count`]: value.length };
    
        setCharCounts(newCounts);
    
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        setIsValid(prevState => ({
            ...prevState,
            [name]: value.trim() !== '' && value.length <= getMaxChars(name)
        }));
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
            const newPersonaId = uuidv4();
            const newPersona = {
                id: newPersonaId,
                name: formData.name.trim(),
                description: formData.description.trim(),
                background: formData.background.trim(),
            };
            
            onSave(newPersona); 
            addPersona(newPersona); 
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

      useEffect(() => {
        if (editingPersona !== null) {
            setFormData({
                name: editingPersona.name || '',
                description: editingPersona.description || '',
                background: editingPersona.background || '',
            });
    
            setCharCounts({
                nameCount: (editingPersona.name || '').length,
                descriptionCount: (editingPersona.description || '').length,
                backgroundCount: (editingPersona.background || '').length,
            });
        } else {
            resetForm();
        }
    }, [editingPersona]);
    

    return showModal ? (
        <div className="modal-um">
            <div className={`modal-content-um persona ${showDiscardModal ? 'hidden' : ''}`}>
                <img className='x-icon' src={closeModalIcon} alt="Close" onClick={() => setShowDiscardModal(true)} />
                <h1>New Persona</h1>
                <div className='user-informations'>
                    <div className='personal-info persona'>
                        <div className='personal-info-names'>
                            <p>Persona Name *</p>
                            <TextareaAutosize
                                name="name"
                                className={`textarea-info ${!isValid.name ? 'textarea-invalid' : ''}`}
                                placeholder="Enter persona name"
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
                            <p>Persona Description *</p>
                            <TextareaAutosize
                                name="description"
                                minRows={2}
                                className={`textarea-info ${!isValid.description ? 'textarea-invalid' : ''}`}
                                placeholder="Enter persona description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <div className='characters-info'>
                                <p className={`small-info ${charCounts.descriptionCount > 500 ? 'text-error' : ''}`}>
                                    {charCounts.descriptionCount > 500 && <img src={errorIcon} alt='error icon' />} 
                                    Short description of how Persona Background will affect responses. <span className='small-info characters'>{charCounts.descriptionCount}/500</span>
                                </p>
                            </div>
                            <div className='error-text' style={!isValid.description && attemptedSubmit ? {} : { display: 'none' }}>
                                <img src={errorIcon} alt='error icon' /> This field is required
                            </div>
                        </div>
                        <div className='personal-info-names persona'>
                            <p>Persona Background *</p>
                            <TextareaAutosize
                                name="background"
                                minRows={2}
                                className={`textarea-info ${!isValid.background ? 'textarea-invalid' : ''}`}
                                placeholder="Enter persona backround"
                                value={formData.background}
                                onChange={handleChange}
                            />
                            <div className='characters-info'>
                                <p className={`small-info ${charCounts.backgroundCount > 1000 ? 'text-error' : ''}`}>
                                    {charCounts.backgroundCount > 1000 && <img src={errorIcon} alt='error icon' />} 
                                    This will influence how persona will influence tone of the response. <span className='small-info characters'>{charCounts.backgroundCount}/1000</span> 
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
                        style={editingPersona ? saveButtonStyle : addButtonStyle} 
                        disabled={editingPersona ? !isFormChanged : !isFormFilled}>
                        {editingPersona ? 'Save Persona' : 'Add Persona'}
                    </button>
                </div>
            </div>
            {showDiscardModal && (
                <DiscardPersonaModal
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

export default NewPersonaModal;
