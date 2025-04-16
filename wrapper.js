// Este é um wrapper simplificado para o servidor em produção
// Não tenta fazer imports complicados como o arquivo serve-prod.js

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { WebSocketServer } from 'ws';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Criação básica do servidor
const app = express();
app.use(express.json());
const server = http.createServer(app);

// Configurar WebSocket
const wss = new WebSocketServer({ server, path: '/ws' });
wss.on('connection', (ws) => {
  console.log('Nova conexão WebSocket estabelecida');
  
  ws.on('message', (message) => {
    try {
      console.log('Mensagem recebida:', message.toString());
      // Echo de resposta
      ws.send(JSON.stringify({ type: 'echo', message: 'Mensagem recebida pelo servidor' }));
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Conexão WebSocket fechada');
  });
});

// Servir arquivos estáticos
const distPath = path.resolve(__dirname, 'dist/public');
if (!fs.existsSync(distPath)) {
  throw new Error(`Diretório de build não encontrado: ${distPath}`);
}

app.use(express.static(distPath));

// Fallback para index.html
app.use('*', (_req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});