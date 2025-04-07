import React, { useState, useEffect } from 'react';
import { useUser } from '../inputs/UserContext';
import editAccountIcon from '../assets/img/edit_account_icon.svg';
import logoutIcon from '../assets/img/logout_icon.svg';
import TextareaAutosize from 'react-textarea-autosize';
import closeIcon from '../assets/img/close_icon.svg';

const OrganizationAccount = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [organizationData, setOrganizationData] = useState({
        organization: '',
        role: 'Organization', 
        email: '',
        password: '',
    });
    const { setOrganizationName } = useUser();

    const { setUserName } = useUser();

    useEffect(() => {
        const savedOrganizationData = JSON.parse(localStorage.getItem('organizationData'));
        if (savedOrganizationData) {
            setOrganizationData(savedOrganizationData);
        }
    }, []);

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrganizationData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        localStorage.setItem('organizationData', JSON.stringify(organizationData));
        setOrganizationName(organizationData.organization); 
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const formatKey = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    return (
        <div className='modal-um account organization'>
            <div className="modal-content-um account organization">
                <div className='my-account-edit'>
                <h1>Organization Account</h1>
                    {isEditing ? (
                        <img className='x-icon' src={closeIcon} alt="Close" onClick={handleCancelEdit} />
                    ) : (
                        <p className='edit-account' onClick={handleEdit}><img src={editAccountIcon} alt="Edit" />Edit account</p>
                    )}
                </div>
                <div className='account-info'>
                    <p className='title-info'>Organization *</p>
                    {isEditing ? (
                        <TextareaAutosize
                            name="organization"
                            className="account-content-textarea"
                            value={organizationData.organization}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className='account-content'>{organizationData.organization}</p>
                    )}
                </div>
                <div className='account-info'>
                    <p className='title-info'>Role</p>
                    <button className='admin-btn'>{organizationData.role}</button>
                </div>
                {['email', 'password'].map((key) => (
                    <div className='account-info' key={key}>
                        <p className='title-info'>{formatKey(key)} *</p>
                        {key !== 'password' ? (
                            isEditing ? (
                                <TextareaAutosize
                                    name={key}
                                    className="account-content-textarea"
                                    value={organizationData[key]}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className='account-content'>{organizationData[key]}</p>
                            )
                        ) : (
                            <div className='password-field'>
                                {isEditing ? (
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name={key}
                                        className="account-content-textarea"
                                        value={organizationData[key]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className='account-content'>{showPassword ? organizationData[key] : '************'}</p>
                                )}
                                <span className='show-password' onClick={handleTogglePassword}>{showPassword ? "Hide" : "Show"}</span>
                            </div>
                        )}
                    </div>
                ))}
                {isEditing ? (
                    <>
                        <div className='btns-account'>
                            <button onClick={handleCancelEdit} className="cancel-changes-btn">Cancel</button>
                            <button onClick={handleSaveChanges} className="save-changes-btn">Save Changes</button>
                        </div>
                    </>
                ) : (
                    !isEditing && <button className='discard-account'>Logout <img src={logoutIcon} alt="Logout" className="logout icon" /></button>
                )}
            </div>
        </div>
    );
};

export default OrganizationAccount;
