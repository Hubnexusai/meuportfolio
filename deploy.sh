#!/bin/bash

# Script para facilitar o deploy da aplicação no Docker Swarm

# Carregar variáveis de ambiente
if [ -f .env.production ]; then
  export $(cat .env.production | grep -v '^#' | xargs)
fi

# Construir a imagem
echo "Construindo a imagem Docker..."
docker build -t ${DOCKER_REGISTRY:-hub-nexus}/portfolio:${TAG:-latest} .

# Verificar se o build foi bem-sucedido
if [ $? -ne 0 ]; then
  echo "Erro ao construir a imagem Docker."
  exit 1
fi

# Implantar no Swarm
echo "Implantando no Docker Swarm..."
docker stack deploy -c docker-compose.yml portfolio

echo "Deploy concluído! Acesse a aplicação em: https://${DOMAIN:-portfolio.hubnexusai.com}"