// Script de inicialização para produção
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerRoutes } from './dist/server/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Função simples de log
function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Código para servir arquivos estáticos
function serveStatic(app) {
  const distPath = path.resolve(__dirname, 'dist', 'public');
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  
  app.use(express.static(distPath));
  
  // Fallback para index.html
  app.use('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

// Função principal
async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  // Logger middleware
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse = undefined;
  
    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };
  
    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
  
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }
  
        log(logLine);
      }
    });
  
    next();
  });
  
  // Rotas da API
  const server = await registerRoutes(app);
  
  // Error handler
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });
  
  // Servir conteúdo estático
  serveStatic(app);
  
  // Iniciar servidor
  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Servidor rodando na porta ${port}`);
  });
}

// Executar a aplicação
main().catch(console.error);