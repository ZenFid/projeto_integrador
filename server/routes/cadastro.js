import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { processDocument } from '../utils/ocr.js';

// Handle ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Database path
const dbPath = join(__dirname, '..', 'data', 'db.json');
const documentDir = join(__dirname, '..', 'uploads', 'documents');

// Get all registrations
router.get('/', (req, res) => {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(dbData.students);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Erro ao buscar cadastros' });
  }
});

// Get a single registration by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    const student = dbData.students.find(s => s.id === id);
    
    if (!student) {
      return res.status(404).json({ message: 'Cadastro não encontrado' });
    }
    
    res.json(student);
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ message: 'Erro ao buscar cadastro' });
  }
});

// Create a new registration
router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;
    
    // Validate required fields
    if (!name || !address) {
      return res.status(400).json({ 
        message: 'Nome e endereço são obrigatórios' 
      });
    }
    
    // Handle document image upload
    let documentPath = null;
    let documentText = '';
    
    if (req.files && req.files.documentImage) {
      const documentImage = req.files.documentImage;
      const id = uuidv4();
      const fileExt = documentImage.name.split('.').pop();
      const fileName = `${id}.${fileExt}`;
      documentPath = join('documents', fileName);
      
      // Move file to uploads directory
      await documentImage.mv(join(documentDir, fileName));
      
      // Process document with OCR
      try {
        documentText = await processDocument(join(documentDir, fileName));
      } catch (ocrError) {
        console.error('OCR processing error:', ocrError);
        documentText = 'Erro na extração de texto';
      }
    }
    
    // Create new student record
    const newStudent = {
      id: uuidv4(),
      name,
      address,
      documentPath,
      documentText,
      createdAt: new Date().toISOString()
    };
    
    // Update database
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    dbData.students.push(newStudent);
    
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ message: 'Erro ao criar cadastro' });
  }
});

export default router;