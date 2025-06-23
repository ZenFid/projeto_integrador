import React, { useState } from 'react';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import { RegistrationProvider } from './context/RegistrationContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <RegistrationProvider>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container mx-auto px-4 py-8">
          <RegistrationForm darkMode={darkMode} />
        </main>
        <footer className={`py-4 text-center ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} shadow-inner`}>
          <p>Sistema de Cadastro por Voz - Versão 1.0</p>
        </footer>
      </RegistrationProvider>
    </div>
  );
}

export default App;