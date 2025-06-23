import React, { useEffect } from 'react';
import { useRegistration } from '../context/RegistrationContext';
import NameStep from './steps/NameStep';
import DocumentStep from './steps/DocumentStep';
import AddressStep from './steps/AddressStep';
import ConfirmationStep from './steps/ConfirmationStep';
import SuccessStep from './steps/SuccessStep';
import ProgressBar from './ui/ProgressBar';
import { speakText } from '../utils/speechUtils';

interface RegistrationFormProps {
  darkMode: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ darkMode }) => {
  const { step, setStep, student } = useRegistration();

  const steps = [
    { title: 'Nome', component: <NameStep /> },
    { title: 'Documento', component: <DocumentStep /> },
    { title: 'Endereço', component: <AddressStep /> },
    { title: 'Confirmação', component: <ConfirmationStep /> },
    { title: 'Sucesso', component: <SuccessStep /> }
  ];

  const getWelcomeMessage = () => {
    switch(step) {
      case 0:
        return 'Bem-vindo ao sistema de cadastro por voz. Vamos começar com o seu nome completo. Clique no botão e diga seu nome após o bipe.';
      case 1:
        return 'Agora precisamos de uma foto do seu documento. Clique no botão para abrir a câmera.';
      case 2:
        return 'Por favor, diga seu endereço completo. Clique no botão e fale após o bipe.';
      case 3:
        return 'Vamos revisar suas informações. Por favor, confirme se tudo está correto.';
      case 4:
        return 'Cadastro realizado com sucesso! Obrigado por usar nosso sistema.';
      default:
        return '';
    }
  };

  useEffect(() => {
    const welcomeMessage = getWelcomeMessage();
    if (welcomeMessage) {
      speakText(welcomeMessage);
    }
  }, [step]);

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden transition-colors duration-300`}>
      <div className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}>
        <h2 className="text-2xl font-bold text-center">Cadastro de Aluno</h2>
        <ProgressBar currentStep={step} totalSteps={steps.length - 1} />
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{steps[step].title}</h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {getWelcomeMessage()}
          </p>
        </div>
        
        {steps[step].component}
        
        <div className="flex justify-between mt-8">
          {step > 0 && step < steps.length - 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className={`px-6 py-3 text-lg rounded-lg ${
                darkMode 
                  ? 'bg-gray-600 text-white hover:bg-gray-500' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              Voltar
            </button>
          )}
          
          {step < steps.length - 1 && step !== 3 && (
            <button
              onClick={() => {
                if ((step === 0 && student.name) || 
                    (step === 1 && student.documentImage) || 
                    (step === 2 && student.address)) {
                  setStep(step + 1);
                } else {
                  speakText("Por favor, preencha todas as informações antes de continuar.");
                }
              }}
              className={`px-6 py-3 text-lg rounded-lg ml-auto ${
                darkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition-colors`}
            >
              Próximo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;