#!/bin/bash
echo "Iniciando processo de build para produção..."

# Construindo frontend com Vite
echo "Construindo frontend..."
npm run build

# Construindo routes.ts para produção
echo "Construindo arquivos do servidor..."
npx esbuild server/routes.ts server/storage.ts shared/schema.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completo!"