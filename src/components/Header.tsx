import React from 'react';
import { Users, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`py-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Users size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">Sistema de Cadastro por Voz</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
          aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;