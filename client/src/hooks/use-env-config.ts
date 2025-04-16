import { useState, useEffect } from 'react';

// Valores padrão que podem ser sobrescritos por variáveis de ambiente
const DEFAULT_LOGO_URL = 'https://ykrznbgxhdulsatplwnp.supabase.co/storage/v1/object/public/imagem//LOGO%203D%20SEM%20FUNDO.png';
const DEFAULT_WEBHOOK_URL = 'https://webhook.hubnexusai.com/webhook/meuportfolio';

// Hook para obter o logotipo da variável de ambiente ou usar o valor padrão
export const useLogoFromEnv = () => {
  const [logoUrl, setLogoUrl] = useState<string>('');
  
  useEffect(() => {
    // Tenta obter da variável de ambiente, senão usa o valor padrão
    const logoSrc = import.meta.env.VITE_LOGO_URL || DEFAULT_LOGO_URL;
    console.log('Logo carregada:', logoSrc);
    setLogoUrl(logoSrc);
  }, []);
  
  return logoUrl;
};

// Hook para obter a URL do webhook da variável de ambiente ou usar o valor padrão
export const useWebhookUrl = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  
  useEffect(() => {
    // Tenta obter da variável de ambiente, senão usa o valor padrão
    const webhookURL = import.meta.env.VITE_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
    
    console.log('Usando webhook URL:', webhookURL);
    setWebhookUrl(webhookURL);
  }, []);
  
  return webhookUrl;
};