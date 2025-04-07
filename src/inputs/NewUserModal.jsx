import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import closeModalIcon from '../assets/img/close_modal_icon.svg';
import dropdownArrow from '../assets/img/dropdown_arrow.svg';
import toggleIcon from '../assets/img/toggle_icon.svg';
import toggleIconG from '../assets/img/toggle_icon_g.svg';
import errorIcon from '../assets/img/error_icon.svg';
import DiscardChangesModal from './DiscardChangesModal';

const NewUserModal = ({ showModal, onClose, onSave, toggles, togglePermission, role, setRole }) => {
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);

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

    const handleTogglePermission = (permission) => {
        togglePermission(permission);
        const anyPermissionSelected = Object.values({ ...toggles, [permission]: !toggles[permission] }).some(value => value);
        setIsValid(prevIsValid => ({
            ...prevIsValid,
            permissions: anyPermissionSelected
        }));
    };

    const [isValid, setIsValid] = useState({
        firstName: true,
        lastName: true,
        email: true,
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setIsValid(prevState => ({
            ...prevState,
            [name]: true
        }));
    };

    const handleInvite = () => {
        setAttemptedSubmit(true);
        // setShowDiscardModal(true);

        const newIsValid = {
            ...isValid,
            firstName: formData.firstName.trim() !== '',
            lastName: formData.lastName.trim() !== '',
            email: formData.email.trim() !== '',
            role: role.trim() !== '',
            permissions: Object.values(toggles).some(value => value)
        };

        setIsValid(newIsValid);

        const allValid = Object.values(newIsValid).every(valid => valid);

        if (allValid) {
            const newUser = {
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`,
                role,
                permissions: Object.keys(toggles).filter(key => toggles[key]) 
            };

            onSave(newUser); 
            onClose();
        }
    };

    return showModal ? (
        <div className="modal-um">
            <div className={`modal-content-um ${showDiscardModal ? 'hidden' : ''}`}>
                <img className='x-icon' src={closeModalIcon} alt="Close" onClick={() => setShowDiscardModal(true)} />
                <h1>New User</h1>
                <div className='user-informations'>
                    <div className='personal-info'>
                        <h2>Personal info</h2>
                        <div className='personal-info-names'>
                            <p>First Name *</p>
                            <TextareaAutosize
                                name="firstName"
                                className={`textarea-info ${!isValid.firstName ? 'textarea-invalid' : ''}`}
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <div className='error-text' style={!isValid.firstName ? {} : { display: 'none' }}>
                                <img src={errorIcon} alt='error icon' className='' /> This field is required
                            </div>
                        </div>
                        <div className='personal-info-names'>
                            <p>Last Name *</p>
                            <TextareaAutosize
                                name="lastName"
                                className={`textarea-info ${!isValid.lastName ? 'textarea-invalid' : ''}`}
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <div className='error-text' style={!isValid.lastName ? {} : { display: 'none' }}>
                                <img src={errorIcon} alt='error icon' className='' /> This field is required
                            </div>
                        </div>
                        <div className='personal-info-names'>
                            <p>Email *</p>
                            <TextareaAutosize
                                name="email"
                                className={`textarea-info ${!isValid.email ? 'textarea-invalid' : ''}`}
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div className='error-text' style={!isValid.email ? {} : { display: 'none' }}>
                                <img src={errorIcon} alt='error icon' className='' /> This field is required
                            </div>
                        </div>
                    </div>
                    <div className='personal-info'>
                        <h2>Organization info</h2>
                        <div className='personal-info-names'>
                            <p>Organization name</p>
                            <TextareaAutosize className='textarea-info-org' placeholder="University of Southern California" />
                            <p className='small-info'>Informational Text</p>
                        </div>
                        <div className='personal-info-names'>
                            <p>Role *</p>
                            <div className="textarea-info role" onClick={toggleDropdown}>
                                {role || "Select Role"} <img src={dropdownArrow} alt='dropdown icon' className='dd_icon' />
                            </div>
                            {isDropdownOpen && (
                                <div className="dropdown-menu-info" ref={dropdownRef}>
                                    <div className="dropdown-item-info" onClick={() => handleSelectRole('Admin')}>Admin</div>
                                    <div className="dropdown-item-info" onClick={() => handleSelectRole('Coach')}>Coach</div>
                                </div>
                            )}
                            <p className='small-info'>Informational Text</p>
                            {attemptedSubmit && !isValid.role && (
                                <div className='error-text'>
                                    <img src={errorIcon} alt='error icon' /> Choose at least one
                                </div>
                            )}
                        </div>
                        <div className='personal-info-names'>
                            <p>Permissions *</p>
                            <div className='permitions-toggles'>
                                <div className='files-personas-prompts' onClick={() => handleTogglePermission('files')}>
                                    <img src={toggles.files ? toggleIconG : toggleIcon} alt='toggle icon' /> Files
                                </div>
                                <div className='files-personas-prompts' onClick={() => handleTogglePermission('personas')}>
                                    <img src={toggles.personas ? toggleIconG : toggleIcon} alt='toggle icon' /> Personas
                                </div>
                                <div className='files-personas-prompts' onClick={() => handleTogglePermission('prompts')}>
                                    <img src={toggles.prompts ? toggleIconG : toggleIcon} alt='toggle icon' /> Prompts
                                </div>
                            </div>
                            {attemptedSubmit && !isValid.permissions && (
                                <div className='error-text'>
                                    <img src={errorIcon} alt='error icon' /> At least one permission is required
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='buttons-in-modal'>
                    <button className='discard' onClick={() => setShowDiscardModal(true)}>Discard</button>
                    <button className='invite-user' onClick={handleInvite}>Invite User</button>
                </div>
            </div>
            {showDiscardModal && (
                <DiscardChangesModal
                    onDiscard={() => {
                        setShowDiscardModal(false); 
                        onClose(); 
                    }}
                    onCancel={() => setShowDiscardModal(false)}
                />
            )}
        </div>
    ) : null;
};

export default NewUserModal;
