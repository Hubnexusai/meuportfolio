import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";

// Versão simplificada do vite.ts para produção (sem dependências de vite)
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Esta função não é usada em produção, mantida apenas para compatibilidade
export async function setupVite(app: Express, server: Server) {
  console.log("setupVite é ignorado em produção");
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}