import './assets/scss/components/index.scss';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { FileExplorerProvider } from './inputs/FileExplorerProvider';
import React, { useState } from 'react';
import SideMenu from './components/SideMenu';
import NoteSession from './components/NoteSession';
import FileExplorer from './components/FileExplorer'

import NewNote from './inputs/NewNote';
import NewSession from './components/NewSession';
import MyAccount from './components/MyAccount';
import { UserProvider } from './inputs/UserContext';
import { UserManagementProvider } from './inputs/UserManagementProvider';
import { SelectedNameProvider } from './inputs/SelectedNameContext';
import { SelectedContentProvider } from './inputs/SelectedContentContext';
import { PersonaProvider } from './inputs/PersonaContext';
import { PromptProvider } from './inputs/PromptContext';
import { PdfProvider } from './inputs/PdfContext';

function AppWithSideMenu() {
  const location = useLocation();

  const routesWithSidebar = [];

  const shouldShowSidebar = !routesWithSidebar.includes(location.pathname);

  return (
    <>
    <UserProvider>
      {shouldShowSidebar && <SideMenu />}
        <div className={`content ${shouldShowSidebar ? '' : 'no-sidebar'}`}>
          <Routes>
            <Route path="/notes" element={<NoteSession />} />
            <Route path="/newNote" element={<NewNote />} />
            <Route path="/" element={<NewSession />} />
            <Route path="/fileExplorer" element={<FileExplorer />} />
            <Route path="/newSession" element={<NewSession />} />
            <Route path="/myAccount" element={<MyAccount />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserManagementProvider>
          <PdfProvider>
            <FileExplorerProvider> 
              <SelectedNameProvider>
                <SelectedContentProvider>
                  <PersonaProvider>
                    <PromptProvider>
                      <AppWithSideMenu />
                    </PromptProvider>
                  </PersonaProvider>
                </SelectedContentProvider>
              </SelectedNameProvider>
            </FileExplorerProvider>
          </PdfProvider>
        </UserManagementProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

