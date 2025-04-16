import { useState, useEffect } from 'react';

// Hook para obter o logotipo da variável de ambiente
export const useLogoFromEnv = () => {
  const [logoUrl, setLogoUrl] = useState<string>('');
  
  useEffect(() => {
    const envLogo = import.meta.env.VITE_LOGO_URL;
    // URL da logo fornecida pelo cliente
    const clientLogo = 'https://ykrznbgxhdulsatplwnp.supabase.co/storage/v1/object/public/imagem//LOGO%203D%20SEM%20FUNDO.png';
    
    const logoSrc = envLogo || clientLogo;
    console.log('Logo carregada:', logoSrc);
    setLogoUrl(logoSrc);
  }, []);
  
  return logoUrl;
};

// Hook para obter a URL do webhook da variável de ambiente
export const useWebhookUrl = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  
  useEffect(() => {
    // Usar apenas a URL fornecida pelo cliente
    const webhookURL = 'https://webhook.hubnexusai.com/webhook/meuportfolio';
    
    console.log('Usando webhook URL:', webhookURL);
    setWebhookUrl(webhookURL);
  }, []);
  
  return webhookUrl;
};