import React, { useState, useEffect } from 'react';
import NewUserModal from './NewUserModal'; 
import addIcon from '../assets/img/add_icon.svg';
import StartSession from '../components/StartSessionNav'; 
import Breadcrumbs from '../inputs/Breadcrumbs'; 
import UserContainer from '../inputs/UserContainer'; 
import { useUserManagement } from '../inputs/UserManagementProvider'; 

const UserManagement = ({ onNewSessionClicked }) => {
    const [showStartSession] = useState(false);
    const [sessionStarted] = useState(false);
    const [isContainerClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [toggles, setToggles] = useState({
        files: false,
        personas: false,
        prompts: false,
    });
    const [tempUser, setTempUser] = useState(null);

    const openNewUserModal = () => {
        setTempUser({ name: `User ${users.length + 1}` }); 
        setShowModal(true);
    };

    const onEditUser = (userId) => {
        const userToEdit = users.find(user => user.id === userId);
        setTempUser(userToEdit);
        setShowModal(true);
    };

    const [role, setRole] = useState(''); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const togglePermission = (permission) => {
        setToggles(prev => ({...prev, [permission]: !prev[permission]}));
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prevIsDropdownOpen => !prevIsDropdownOpen);
    };

    const selectRole = (newRole) => {
        setRole(newRole);
        setIsDropdownOpen(false);
    };

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem('users'));
        if (savedUsers) {
            setUsers(savedUsers);
        }
    }, []);

    const inviteUser = (userData) => {
        const userExists = users.find(user => user.id === userData.id);
        let updatedUsers;
    
        if (userExists) {
            updatedUsers = users.map(user => user.id === userData.id ? userData : user);
        } else {
            const newUser = {
                ...userData,
                id: userData.id || Date.now(), 
            };
            updatedUsers = [...users, newUser];
        }
    
        setUsers(updatedUsers); 
        setShowModal(false); 
    };
    
    
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const { breadcrumbs: sharedBreadcrumbs, setBreadcrumbs: setSharedBreadcrumbs } = useUserManagement();

    const handleSaveUser = (userData) => {
        if (userData.id) {
            const updatedUsers = users.map(user => user.id === userData.id ? { ...user, ...userData } : user);
            setUsers(updatedUsers);
        } else {
            const newUser = { ...userData, id: Date.now() };
            setUsers([...users, newUser]);
        }
        setShowModal(false); 
    };

    return (
        <div className={`file-explorer-container ${isContainerClicked ? 'container-clicked' : ''}`}>
            <NewUserModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveUser} 
                user={tempUser}
                toggles={toggles}
                togglePermission={togglePermission}
                role={role}
                setRole={setRole}
                isDropdownOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
                selectRole={selectRole}
            />
            {showStartSession && <StartSession />}
            <div className='fe-window'>
                <div className='file-explorer-btns'>
                    <Breadcrumbs 
                        breadcrumbs={sharedBreadcrumbs} 
                        onNewSessionClicked={onNewSessionClicked} 
                        sessionStarted={sessionStarted} 
                    />
                    <div className='file-explorer-btns'>
                        <button onClick={openNewUserModal}>
                            <img src={addIcon} alt='add new user icon' /> New User
                        </button>
                    </div>
                </div>
                <UserContainer users={users} onEditUser={onEditUser} />
            </div>
        </div>
    );
};

export default UserManagement;