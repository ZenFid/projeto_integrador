import React, { useEffect, useState } from 'react';
import { useRegistration } from '../../context/RegistrationContext';
import { speakText } from '../../utils/speechUtils';
import { Check, X, User, MapPin, FileText, AlertCircle } from 'lucide-react';
import { submitRegistration } from '../../services/api';

const ConfirmationStep: React.FC = () => {
  const { student, setStep, isSpeaking, setIsSpeaking } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Read all information for confirmation
    const confirmationText = `Por favor, confirme se as informações estão corretas: 
                             Nome: ${student.name}. 
                             Endereço: ${student.address}. 
                             Documento foi enviado. 
                             Diga sim para confirmar ou não para corrigir.`;
    
    setIsSpeaking(true);
    speakText(confirmationText, () => {
      setIsSpeaking(false);
    });
  }, [student, setIsSpeaking]);

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      speakText("Enviando seu cadastro, por favor aguarde...");
      
      const formData = new FormData();
      formData.append('name', student.name);
      formData.append('address', student.address);
      if (student.documentImage) {
        formData.append('documentImage', student.documentImage);
      }

      await submitRegistration(formData);
      
      speakText("Cadastro realizado com sucesso! Obrigado por se registrar.");
      setStep(4); // Success step
    } catch (err) {
      console.error('Erro ao enviar cadastro:', err);
      setError('Ocorreu um erro ao enviar o cadastro. Por favor, tente novamente.');
      speakText("Ocorreu um erro ao enviar seu cadastro. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    speakText("Voltando ao início do cadastro para correção.");
    setStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg">
        <h3 className="text-xl font-bold mb-6 text-center">Confirme suas Informações</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="flex-shrink-0 text-blue-500 mt-1" />
            <div>
              <h4 className="font-semibold">Nome:</h4>
              <p className="text-lg">{student.name || "Não informado"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="flex-shrink-0 text-blue-500 mt-1" />
            <div>
              <h4 className="font-semibold">Endereço:</h4>
              <p className="text-lg">{student.address || "Não informado"}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FileText className="flex-shrink-0 text-blue-500 mt-1" />
            <div>
              <h4 className="font-semibold">Documento:</h4>
              <p className="text-lg">{student.documentImage ? "Enviado" : "Não enviado"}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleEdit}
          disabled={isSubmitting || isSpeaking}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors text-xl font-semibold disabled:opacity-50"
        >
          <X size={24} />
          <span>Corrigir</span>
        </button>
        
        <button
          onClick={handleConfirm}
          disabled={isSubmitting || isSpeaking}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors text-xl font-semibold disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          ) : (
            <Check size={24} />
          )}
          <span>{isSubmitting ? "Enviando..." : "Confirmar"}</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;