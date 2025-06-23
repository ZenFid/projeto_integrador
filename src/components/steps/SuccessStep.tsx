import React, { useEffect } from 'react';
import { useRegistration } from '../../context/RegistrationContext';
import { speakText } from '../../utils/speechUtils';
import { CheckCircle } from 'lucide-react';

const SuccessStep: React.FC = () => {
  const { resetForm } = useRegistration();

  useEffect(() => {
    speakText("Seu cadastro foi realizado com sucesso! Agradecemos por utilizar nosso sistema. Em breve, entraremos em contato.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-bounce mb-6">
        <CheckCircle size={80} className="text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-4">Cadastro Concluído!</h2>
      <p className="text-lg text-center mb-8">
        Suas informações foram enviadas com sucesso.
        <br />Em breve, entraremos em contato.
      </p>
      
      <button 
        onClick={resetForm}
        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xl font-semibold transition-colors"
      >
        Novo Cadastro
      </button>
    </div>
  );
};

export default SuccessStep;