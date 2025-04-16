# Estágio de build
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar todas as dependências incluindo as de desenvolvimento
RUN npm install

# Copiar o restante do código fonte
COPY . .

# Compilar o frontend com npx
RUN npx vite build

# Compilar o backend com npx
RUN npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Estágio de produção
FROM node:18-alpine

# Configurações de ambiente
ENV NODE_ENV=production
ENV PORT=5000
ENV NODE_OPTIONS=--experimental-specifier-resolution=node
# Variáveis de ambiente configuráveis via docker-compose
ENV VITE_LOGO_URL=https://ykrznbgxhdulsatplwnp.supabase.co/storage/v1/object/public/imagem//LOGO%203D%20SEM%20FUNDO.png
ENV VITE_WEBHOOK_URL=https://webhook.hubnexusai.com/webhook/meuportfolio
ENV DOMAIN=portfolio.hubnexusai.com

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm install --production

# Copiar arquivos compilados do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/server/vite.ts ./server/vite.ts

# Expor a porta padrão
EXPOSE 5000

# Iniciar a aplicação - usando node diretamente para evitar problemas com scripts npm
CMD ["node", "dist/index.js"]