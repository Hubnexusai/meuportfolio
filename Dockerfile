# Imagem de produção direta - sem estágios de build
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

# Copiar todo o código
COPY . .

# Instalar dependências e compilar o frontend
RUN npm install
RUN npm run build

# Expor a porta padrão
EXPOSE 5000

# Iniciar o servidor diretamente
CMD ["node", "dist/index.js"]