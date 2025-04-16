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

# Compilar com vite e verificar conteúdo
RUN npm run build
RUN mkdir -p dist/server
RUN npx esbuild server/routes.ts server/storage.ts shared/schema.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/server
# Verificar se os arquivos foram gerados corretamente
RUN cat dist/server/routes.js > /dev/null 2>&1 || echo "ERRO: routes.js não foi gerado corretamente"
RUN ls -la dist/
RUN ls -la dist/public/
RUN ls -la dist/server/ || echo "Não existe pasta server"

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

# Copiar o wrapper simplificado para produção
COPY --from=builder /app/wrapper.js ./wrapper.js

# Iniciar o servidor com o wrapper simplificado
CMD ["node", "wrapper.js"]