import React from 'react';
import UserItem from './UserItem'; 

const UsersContainer = ({ users, onEditUser }) => {
  return (
    <div className='folders-files-container-fe'>
      <div className='folders-file-explorer-container'>
        <div className='folders-file-explorer'>
          <span>Users</span> 
        </div>
        {
            users.map(user => (
                <UserItem key={user.id} user={user} onEditUser={() => onEditUser(user.id)} />
            ))
        }
      </div>
    </div>
  );
};

export default UsersContainer;
