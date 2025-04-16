# Hub Nexus AI - Portfólio

Um site de portfólio dinâmico criado com React, TypeScript e tecnologias modernas para apresentar agentes de IA.

## Características

- Efeito de partículas interativo no background
- Chat integrado com webhook para comunicação com agentes de IA
- Suporte para diferentes tipos de mídia (áudio, texto, imagens)
- Design responsivo e moderno
- Integração fácil com qualquer API de IA via webhook

## Configuração e Deploy

### Pré-requisitos

- Docker Swarm configurado
- Traefik configurado como proxy reverso
- Rede `traefik_public` já criada

### Variáveis de Ambiente

As principais configurações podem ser alteradas via variáveis de ambiente:

| Variável | Descrição | Valor padrão |
|----------|-----------|--------------|
| `DOMAIN` | Domínio onde a aplicação será disponibilizada | portfolio.hubnexusai.com |
| `VITE_LOGO_URL` | URL da logo a ser usada no cabeçalho | Logo padrão do Hub Nexus AI |
| `VITE_WEBHOOK_URL` | URL do webhook para processamento do chat | https://webhook.hubnexusai.com/webhook/meuportfolio |
| `DOCKER_REGISTRY` | Registry Docker para armazenar a imagem | hub-nexus |
| `TAG` | Tag da imagem Docker | latest |

Você pode configurar estas variáveis no arquivo `.env` que já está pré-configurado.

### Deploy no Docker Swarm

Para implantar a aplicação no Docker Swarm, utilize o script `deploy.sh`:

```bash
./deploy.sh
```

Ou manualmente:

```bash
# Construir a imagem
docker build -t seu-registry/portfolio:latest .

# Implantar no Swarm
docker stack deploy -c docker-compose.yml portfolio
```

### Estrutura da Aplicação

- `client/`: Frontend React/TypeScript
- `server/`: Servidor Node.js/Express
- `shared/`: Tipos e esquemas compartilhados
- `docker-compose.yml`: Configuração para Docker Swarm
- `Dockerfile`: Instruções para construção da imagem Docker
- `.env`: Variáveis de ambiente já pré-configuradas

## Customização

Para customizar a aparência ou comportamento:

1. Altere as variáveis de ambiente conforme necessário
2. Reconstrua a imagem Docker
3. Reimplante a aplicação

## Recursos Adicionais

- Suporte para gravação e envio de áudio
- Animações fluidas e responsivas
- Balões de chat interativos
- Efeito de digitação durante resposta dos agentes