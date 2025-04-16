#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js não encontrado. Por favor, instale o Node.js antes de continuar."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "npm não encontrado. Por favor, instale o npm antes de continuar."
    exit 1
fi

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
fi

# Iniciar o ambiente de desenvolvimento
echo "Iniciando o ambiente de desenvolvimento..."
npm run dev

echo "Servidor encerrado."