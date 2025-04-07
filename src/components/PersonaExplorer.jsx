import React, { useState, useEffect } from 'react';
import StartSession from './StartSessionNav';
import PersonasContainer from '../inputs/PersonaContainer';
import addIcon from '../assets/img/add_icon.svg';
import NewPersonaModal from '../inputs/NewPersonaModal';
import DeletePersonaModal from '../inputs/DeletePersonaModal';

const PersonaExplorer = ({ onCloseNote }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStartSession, setShowStartSession] = useState(false);
  const [isContainerClicked, setIsContainerClicked] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false); 
  const [editingPersona, setEditingPersona] = useState(null);
  const [personaToDelete, setPersonaToDelete] = useState(null);
  

  const handleDeletePersona = () => {
    if (personaToDelete) {
        const updatedPersonas = personas.filter(persona => persona.id !== personaToDelete.id);
        setPersonas(updatedPersonas);
        localStorage.setItem('personas', JSON.stringify(updatedPersonas));
        setShowDeleteModal(false); 
        setPersonaToDelete(null); 
    }
};

  const handleEditPersona = (persona) => {
    setEditingPersona(persona);
    setShowModal(true); 
  };

  const handleOpenModal = () => {
    setEditingPersona(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleSaveNewPersona = (newPersona) => {
    const updatedPersonas = [...personas, newPersona];
    setPersonas(updatedPersonas);
    localStorage.setItem('personas', JSON.stringify(updatedPersonas));
    setShowModal(false); 
  };


    const [folders, setFolders] = useState(() => {
        const savedFolders = localStorage.getItem('personaFolders');
        return savedFolders ? JSON.parse(savedFolders) : [];
    });
    const [personas, setPersonas] = useState(() => {
        const savedPersonas = localStorage.getItem('personas');
        return savedPersonas ? JSON.parse(savedPersonas) : [];
    });

    useEffect(() => {
        const savedFolders = JSON.parse(localStorage.getItem('personaFolders')) || [];
        setFolders(savedFolders);
    }, []);

    useEffect(() => {
        localStorage.setItem('personaFolders', JSON.stringify(folders));
    }, [folders]);

    const createNewPersona = () => {
        const newPersonaId = Date.now(); 
        const newPersonaName = `New Persona ${personas.length + 1}`;
        const newPersona = { id: newPersonaId, name: newPersonaName };
      
        const updatedPersonas = [...personas, newPersona];
        setPersonas(updatedPersonas);
        localStorage.setItem('personas', JSON.stringify(updatedPersonas));
    };


    const handleDiscardChanges = () => {
      setShowDiscardModal(false); 
      setShowModal(false); 
    };

    const handleCancelDiscard = () => {
      setShowDiscardModal(false); 
    };


    return (
        <div className={`file-explorer-container ${isContainerClicked ? 'container-clicked' : ''}`} style={{ paddingTop: sessionStarted ? '0px' : 'standardna vrednost' }}>
          {showStartSession && <StartSession />}
          <div className='fe-window'>
            <div className='file-explorer-btns'>
                <div className='file-explorer-btns'>
                  <button  onClick={handleOpenModal}>
                    <img src={addIcon} alt='add new persona icon' /> New Persona
                  </button>
                </div>
            </div>
            <PersonasContainer
              personas={personas} 
              onEditPersona={handleEditPersona}
              onDeletePersona={(persona) => {
                setPersonaToDelete(persona);
                setShowDeleteModal(true); 
              }}
            />
          </div>
          <NewPersonaModal showModal={showModal} onClose={handleCloseModal} onSave={handleSaveNewPersona} editingPersona={editingPersona} />
          <DeletePersonaModal showModal={showDeleteModal} onDiscard={handleDeletePersona} onCancel={() => setShowDeleteModal(false)} />
        </div>
      );
};

export default PersonaExplorer;
