import React, { useState, useEffect } from 'react';
import editAccountIcon from '../assets/img/edit_account_icon.svg';
import logoutIcon from '../assets/img/logout_icon.svg';
import TextareaAutosize from 'react-textarea-autosize';
import { useUser } from '../inputs/UserContext'; 
import closeIcon from '../assets/img/close_icon.svg';

const MyAccount = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [accountData, setAccountData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        organization: '',
    });

    const { setUserName } = useUser();

    useEffect(() => {
        const savedAccountData = JSON.parse(localStorage.getItem('accountData'));
        if (savedAccountData) {
            setAccountData(savedAccountData);
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
        setAccountData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        localStorage.setItem('accountData', JSON.stringify(accountData));
        setUserName(accountData.firstName);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const formatKey = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    return (
        <div className='modal-um account admin'>
            <div className="modal-content-um account">
                <div className='my-account-edit'>
                <h1>My Account</h1>
                    {isEditing ? (
                        <img className='x-icon' src={closeIcon} alt="Close" onClick={handleCancelEdit} />
                    ) : (
                        <p className='edit-account' onClick={handleEdit}><img src={editAccountIcon} alt="Edit" />Edit account</p>
                    )}
                </div>
                {Object.entries(accountData).map(([key, value]) => (
                    key !== 'role' && (
                        <div className='account-info' key={key}>
                            <p className='title-info'>{formatKey(key)}{key !== 'role' ? ' *' : ''}</p>
                            {key === 'password' ? (
                                <div className='password-field'>
                                    {isEditing ? (
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name={key}
                                            className="account-content-textarea"
                                            value={value}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <p className='account-content'>{showPassword ? value : '************'}</p>
                                    )}
                                    <span className='show-password' onClick={handleTogglePassword}>{showPassword ? "Hide" : "Show"}</span>
                                    {!isEditing && key === 'password' && <div className="account-info line"></div>}
                                </div>
                            ) : (
                                isEditing ? (
                                    <TextareaAutosize
                                        name={key}
                                        className="account-content-textarea"
                                        value={value}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className='account-content'>{value}</p>
                                )
                            )}
                        </div>
                    )
                ))}
                {isEditing ? (
                    <>
                        <div className='btns-account'>
                            <button onClick={handleCancelEdit} className="cancel-changes-btn">Cancel</button>
                            <button onClick={handleSaveChanges} className="save-changes-btn">Save Changes</button>
                        </div>
                    </>
                ) : (
                    <div className='account-info'>
                        <p className='title-info'>Role</p>
                        <button className='admin-btn'>Admin</button>
                    </div>
                )}
                {!isEditing && (
                    <button className='discard-account'>Logout <img src={logoutIcon} alt="Logout" className="logout icon" /></button>
                )}
            </div>
        </div>
    );
};

export default MyAccount;
