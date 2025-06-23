import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { createWorker } = require('tesseract.js');

export const processDocument = async (imagePath) => {
  try {
    console.log('Processing document with OCR:', imagePath);
    
    const worker = await createWorker('por');
    
    const { data: { text } } = await worker.recognize(imagePath);
    
    console.log('OCR extracted text:', text.substring(0, 100) + '...');
    
    await worker.terminate();
    
    return text;
  } catch (error) {
    console.error('Error in OCR processing:', error);
    throw new Error('Falha ao processar o documento com OCR');
  }
};