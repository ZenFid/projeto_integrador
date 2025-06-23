// Types for SpeechRecognition which are not in standard TypeScript defs
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechGrammarList {
  addFromString(string: string, weight?: number): void;
  addFromURI(src: string, weight?: number): void;
  item(index: number): SpeechGrammar;
  [index: number]: SpeechGrammar;
  readonly length: number;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  grammars: SpeechGrammarList;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

let recognition: SpeechRecognition | null = null;

// Initialize speech recognition
const initSpeechRecognition = (lang: string = 'pt-BR') => {
  try {
    window.SpeechRecognition = 
      window.SpeechRecognition || 
      (window as any).webkitSpeechRecognition;
    
    recognition = new window.SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;
    
    return recognition;
  } catch (e) {
    console.error('Speech recognition not supported:', e);
    return null;
  }
};

export const startSpeechRecognition = (
  onResult: (transcript: string) => void,
  onEnd: () => void,
  lang: string = 'pt-BR'
) => {
  try {
    stopSpeechRecognition();
    
    const rec = initSpeechRecognition(lang);
    
    if (!rec) {
      alert('Seu navegador não suporta reconhecimento de voz. Por favor, tente outro navegador.');
      onEnd();
      return;
    }
    
    rec.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    
    rec.onerror = (event) => {
      console.error('Speech recognition error:', event);
      onEnd();
    };
    
    rec.onend = () => {
      onEnd();
    };
    
    rec.start();
  } catch (e) {
    console.error('Error starting speech recognition:', e);
    onEnd();
  }
};

export const stopSpeechRecognition = () => {
  if (recognition) {
    recognition.onresult = null;
    recognition.onend = null;
    recognition.onerror = null;
    
    try {
      recognition.stop();
    } catch (e) {
      console.log('Recognition was not running');
    }
  }
};

// Speech synthesis
export const speakText = (text: string, onEnd?: () => void) => {
  try {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }
    
    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1;
    
    if (onEnd) {
      utterance.onend = onEnd;
    }
    
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Error in speech synthesis:', e);
    if (onEnd) onEnd();
  }
};

// Add missing types to Window interface
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}