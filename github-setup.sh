#!/bin/bash

# Script para configurar e enviar o projeto para o GitHub
# Uso: ./github-setup.sh seu-usuario seu-token

if [ "$#" -lt 2 ]; then
  echo "Uso: ./github-setup.sh seu-usuario seu-token"
  echo "Exemplo: ./github-setup.sh joaosilva ghp_123456789abcdefghijklmnopqrstuvwxyz"
  exit 1
fi

GITHUB_USER=$1
GITHUB_TOKEN=$2
REPO_NAME="meuportfolio"

# Verificar se já existe uma configuração de git
if [ -d .git ]; then
  echo "Repositório Git já inicializado."
else
  echo "Inicializando repositório Git..."
  git init
fi

# Adicionar todos os arquivos
echo "Adicionando arquivos ao repositório..."
git add .

# Commit inicial
echo "Realizando commit inicial..."
git commit -m "Configuração inicial do portfólio Hub Nexus AI"

# Configurar o repositório remoto com autenticação embutida
echo "Configurando repositório remoto..."
git remote remove origin 2>/dev/null || true
git remote add origin https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git

# Enviar para o GitHub
echo "Enviando para o GitHub..."
git push -u origin main || git push -u origin master

echo "Repositório enviado com sucesso para https://github.com/$GITHUB_USER/$REPO_NAME"
echo "Você pode acessá-lo em: https://github.com/$GITHUB_USER/$REPO_NAME"