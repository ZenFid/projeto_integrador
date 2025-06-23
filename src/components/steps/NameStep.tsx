import React, { useState, useEffect } from 'react';
import { useRegistration } from '../../context/RegistrationContext';
import { startSpeechRecognition, stopSpeechRecognition } from '../../utils/speechUtils';
import { Mic, MicOff } from 'lucide-react';

const NameStep: React.FC = () => {
  const { student, setStudent, isListening, setIsListening } = useRegistration();
  const [transcript, setTranscript] = useState('');
  
  useEffect(() => {
    if (transcript) {
      setStudent(prev => ({ ...prev, name: transcript }));
    }
  }, [transcript, setStudent]);

  const handleStartListening = () => {
    setIsListening(true);
    startSpeechRecognition(
      (result) => {
        setTranscript(result);
        setIsListening(false);
      },
      () => setIsListening(false),
      'pt-BR'
    );
  };

  const handleStopListening = () => {
    stopSpeechRecognition();
    setIsListening(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <button 
          onClick={isListening ? handleStopListening : handleStartListening}
          className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          aria-label={isListening ? "Parar de ouvir" : "Começar a ouvir"}
        >
          {isListening ? (
            <MicOff size={64} className="text-white" />
          ) : (
            <Mic size={64} className="text-white" />
          )}
          
          {isListening && (
            <div className="absolute inset-0 rounded-full animate-ping-slow bg-red-400 opacity-75"></div>
          )}
        </button>
        <p className="mt-4 text-lg font-medium">
          {isListening ? 'Ouvindo...' : 'Clique para falar seu nome'}
        </p>
      </div>

      {student.name && (
        <div className="mt-6 p-4 border rounded-lg">
          <h4 className="font-semibold text-lg mb-2">Nome informado:</h4>
          <p className="text-xl">{student.name}</p>
        </div>
      )}
    </div>
  );
};

export default NameStep;