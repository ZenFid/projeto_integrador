# Sistema de Cadastro por Voz

Um sistema web moderno que permite cadastro de informações através de comandos de voz, com reconhecimento de texto via OCR e interface intuitiva construída com React e TypeScript.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca para construção de interfaces
- **TypeScript 5.6.3** - Superset tipado do JavaScript
- **Vite 5.4.2** - Build tool e dev server ultrarrápido
- **Tailwind CSS 3.4.13** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express 4.21.2** - Framework web para Node.js
- **Express FileUpload** - Middleware para upload de arquivos
- **CORS** - Middleware para Cross-Origin Resource Sharing

### Processamento
- **Tesseract.js 5.1.1** - OCR (Optical Character Recognition)
- **Axios** - Cliente HTTP para requisições
- **UUID** - Geração de identificadores únicos

### Desenvolvimento
- **ESLint** - Linter para qualidade de código
- **Autoprefixer** - PostCSS plugin para prefixos CSS
- **Concurrently** - Execução paralela de scripts
- **Nodemon** - Monitor de arquivos para desenvolvimento

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** (vem com o Node.js)
- **Git** (para clonagem do repositório)

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd voice-guided-registration
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente (se necessário)**
   ```bash
   # Crie um arquivo .env na raiz do projeto se houver configurações específicas
   touch .env
   ```

## 🚀 Como Executar

### Desenvolvimento

Para rodar o projeto em modo de desenvolvimento (frontend + backend):

```bash
npm start
```

Este comando executa:
- Frontend (Vite dev server) na porta padrão (geralmente 5173)
- Backend (Express server) na porta configurada

### Comandos Individuais

**Frontend apenas:**
```bash
npm run dev
```

**Backend apenas:**
```bash
npm run server
```

**Build para produção:**
```bash
npm run build
```

**Preview da build:**
```bash
npm run preview
```

**Linting:**
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
voice-guided-registration/
├── public/                 # Arquivos públicos estáticos
├── src/                   # Código fonte do frontend
│   ├── components/        # Componentes React reutilizáveis
│   ├── pages/            # Páginas da aplicação
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Funções utilitárias
│   ├── types/            # Definições de tipos TypeScript
│   ├── styles/           # Arquivos de estilo
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Ponto de entrada da aplicação
│   └── index.css         # Estilos globais
├── server/               # Código fonte do backend
│   ├── routes/           # Rotas da API
│   ├── middleware/       # Middlewares do Express
│   ├── controllers/      # Controladores da API
│   ├── utils/            # Utilitários do servidor
│   └── index.js          # Servidor Express
├── uploads/              # Diretório para arquivos enviados
├── docs/                 # Documentação adicional
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── tailwind.config.js    # Configuração Tailwind CSS
├── vite.config.ts        # Configuração Vite
└── README.md            # Este arquivo
```

## ⚡ Funcionalidades Principais

### 🎤 Reconhecimento de Voz
- Captura e processamento de comandos de voz
- Conversão speech-to-text em tempo real
- Suporte a múltiplos idiomas

### 📄 OCR (Reconhecimento Óptico de Caracteres)
- Extração de texto de imagens
- Suporte a múltiplos formatos de arquivo
- Processamento inteligente de documentos

### 📁 Upload de Arquivos
- Interface drag-and-drop
- Validação de tipos de arquivo
- Processamento em background

### 💾 Sistema de Cadastro
- Formulários dinâmicos
- Validação em tempo real
- Persistência de dados

### 🎨 Interface Responsiva
- Design moderno e intuitivo
- Compatível com dispositivos móveis
- Tema claro/escuro (se implementado)

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia frontend e backend simultaneamente |
| `npm run dev` | Inicia apenas o frontend em modo desenvolvimento |
| `npm run server` | Inicia apenas o servidor backend |
| `npm run build` | Gera build otimizada para produção |
| `npm run preview` | Visualiza a build de produção |
| `npm run lint` | Executa verificação de código com ESLint |

## 🌐 Endpoints da API

### Upload de Arquivos
```http
POST /api/upload
Content-Type: multipart/form-data

# Resposta
{
  "success": true,
  "fileId": "uuid-do-arquivo",
  "extractedText": "texto extraído via OCR"
}
```

### Processamento de Voz
```http
POST /api/voice/process
Content-Type: application/json

{
  "audioData": "base64-encoded-audio",
  "language": "pt-BR"
}

# Resposta
{
  "success": true,
  "transcription": "texto transcrito",
  "confidence": 0.95
}
```

## 🔒 Segurança

- Validação de tipos de arquivo no upload
- Sanitização de dados de entrada
- CORS configurado adequadamente
- Limitação de tamanho de arquivos

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dispositivos
- Desktop (Windows, macOS, Linux)
- Tablets
- Smartphones (iOS, Android)

## 🚀 Deploy

### Desenvolvimento Local
O projeto está configurado para rodar localmente com hot-reload.

### Produção
Para deploy em produção:

1. Execute o build:
   ```bash
   npm run build
   ```

2. Configure variáveis de ambiente de produção

3. Execute o servidor:
   ```bash
   npm run server
   ```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para tipagem
- Siga as regras do ESLint configurado
- Mantenha componentes pequenos e reutilizáveis
- Documente funções complexas
- Escreva commits descritivos

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE). Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Solução de Problemas

### Problemas Comuns

**Erro: "Module not found"**
```bash
# Limpe o cache e reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

**Erro de permissão no upload**
```bash
# Verifique se o diretório uploads existe e tem permissões adequadas
mkdir uploads
chmod 755 uploads
```

**Erro de CORS**
- Verifique se o servidor está configurado corretamente
- Confirme se as URLs estão corretas no frontend

### Logs e Debug

Para habilitar logs detalhados:
```bash
DEBUG=app:* npm start
```

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no repositório
- Consulte a documentação técnica em `/docs`
- Verifique os logs de erro no console do navegador
