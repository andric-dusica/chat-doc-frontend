import React, { useState } from 'react';
import PersonaItem from './PersonaItem';
import DeletePersonaModal from './DeletePersonaModal';

const PersonasContainer = ({ personas, onEditPersona, onDeletePersona }) => {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const toggleDropdown = (index) => {
    setOpenedIndex(prevIndex => prevIndex === index ? null : index); 
  };

  const handleDeleteClick = (persona) => {
    setSelectedPersona(persona);
    setShowDeleteModal(true);
  };

  return (
    <div className='folders-files-container-fe persona'>
      <div className='folders-file-explorer-container'>
        <div className='folders-file-explorer'>
          <span>Personas</span>
        </div>
        {personas.map((persona, index) => (
          <PersonaItem
            key={persona.id}
            persona={persona}
            onEdit={() => onEditPersona(persona)}
            onDelete={onDeletePersona}
            index={index}
            isOpen={openedIndex === index} 
            toggleDropdown={() => toggleDropdown(index)} 
            />
        ))}
        {showDeleteModal && 
          <DeletePersonaModal 
            onDiscard={() => {
              onDeletePersona(selectedPersona);
              setShowDeleteModal(false);
            }} 
            onCancel={() => setShowDeleteModal(false)}
          />
        }
      </div>
    </div>
  );
};

export default PersonasContainer;
