# Estágio de build
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar todas as dependências incluindo as de desenvolvimento
RUN npm ci

# Copiar o restante do código fonte
COPY . .

# Compilar o frontend com Vite
RUN npm run build
RUN ls -la dist/
RUN ls -la dist/public/

# Estágio de produção
FROM node:18-alpine

# Configurações de ambiente
ENV NODE_ENV=production
ENV PORT=5000
ENV NODE_OPTIONS="--experimental-specifier-resolution=node"

# Variáveis de ambiente configuráveis via docker-compose
ENV VITE_LOGO_URL=https://ykrznbgxhdulsatplwnp.supabase.co/storage/v1/object/public/imagem//LOGO%203D%20SEM%20FUNDO.png
ENV VITE_WEBHOOK_URL=https://webhook.hubnexusai.com/webhook/meuportfolio
ENV DOMAIN=portfolio.hubnexusai.com

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar todas as dependências (incluindo as dev) para ter o Vite disponível
RUN npm ci

# Copiar arquivos compilados do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.ts ./vite.config.ts
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# Verificar a estrutura final
RUN ls -la dist/
RUN ls -la dist/public/ || echo "Não existe pasta public"

# Expor a porta padrão
EXPOSE 5000

# Iniciar o servidor
CMD ["node", "dist/index.js"]