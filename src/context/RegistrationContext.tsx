import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StudentData {
  id?: string;
  name: string;
  address: string;
  documentImage: File | null;
  documentText: string;
}

interface RegistrationContextType {
  student: StudentData;
  setStudent: React.Dispatch<React.SetStateAction<StudentData>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  resetForm: () => void;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  isSpeaking: boolean;
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialStudentData: StudentData = {
  name: '',
  address: '',
  documentImage: null,
  documentText: '',
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentData>(initialStudentData);
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const resetForm = () => {
    setStudent(initialStudentData);
    setStep(0);
  };

  return (
    <RegistrationContext.Provider
      value={{
        student,
        setStudent,
        step,
        setStep,
        resetForm,
        isListening,
        setIsListening,
        isSpeaking,
        setIsSpeaking
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};