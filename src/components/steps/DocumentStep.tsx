import React, { useState, useRef } from 'react';
import { useRegistration } from '../../context/RegistrationContext';
import { speakText } from '../../utils/speechUtils';
import { FileImage, Camera, RefreshCw } from 'lucide-react';

const DocumentStep: React.FC = () => {
  const { student, setStudent } = useRegistration();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Update state
      setStudent(prev => ({
        ...prev,
        documentImage: file
      }));
      
      speakText('Documento enviado com sucesso! Clique em próximo para continuar.');
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      speakText('Selecione uma foto do seu documento de identidade.');
    }
  };

  const handleRetake = () => {
    setPreviewUrl(null);
    setStudent(prev => ({
      ...prev,
      documentImage: null
    }));
    speakText('Vamos tentar novamente. Selecione uma nova foto do seu documento.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          capture="environment"
        />
        
        {!previewUrl ? (
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className="relative w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
            aria-label="Fazer upload de documento"
          >
            {isUploading ? (
              <RefreshCw size={48} className="text-blue-500 animate-spin" />
            ) : (
              <>
                <Camera size={64} className="text-blue-500 mb-3" />
                <p className="text-lg font-medium text-gray-600">Tirar foto do documento</p>
                <p className="text-sm text-gray-500 mt-2">RG ou CNH</p>
              </>
            )}
          </button>
        ) : (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Prévia do documento"
              className="max-w-full h-auto max-h-64 rounded-lg shadow-lg"
            />
            <button
              onClick={handleRetake}
              className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Tirar nova foto"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        )}

        <p className="mt-4 text-lg font-medium">
          {previewUrl 
            ? 'Documento enviado! Clique em Próximo para continuar.' 
            : 'Clique para enviar uma foto do seu documento'}
        </p>
      </div>
    </div>
  );
};

export default DocumentStep;