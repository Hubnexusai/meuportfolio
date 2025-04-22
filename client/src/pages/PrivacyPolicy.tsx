import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  color: #f8fafc;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #00CCFF;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #00CCFF;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.7;
`;

const List = styled.ul`
  margin-bottom: 1.5rem;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  line-height: 1.7;
`;

const BackLink = styled.a`
  display: inline-block;
  margin-top: 2rem;
  color: #00CCFF;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PrivacyPolicy: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Title>Política de Privacidade</Title>
        <Paragraph>
          <em>Última atualização: {currentDate}</em>
        </Paragraph>

        <Paragraph>
          A Hub Nexus AI ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. 
          Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações 
          pessoais quando você utiliza nosso site e serviços.
        </Paragraph>

        <SectionTitle>1. Informações que Coletamos</SectionTitle>
        <Paragraph>
          Podemos coletar os seguintes tipos de informação:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Informações pessoais:</strong> Nome, endereço de e-mail, número de telefone, 
            e outras informações de contato que você fornece voluntariamente através de formulários ou chat.
          </ListItem>
          <ListItem>
            <strong>Informações de uso:</strong> Dados sobre como você interage com nosso site, 
            incluindo páginas visitadas, tempo gasto no site, e ações realizadas.
          </ListItem>
          <ListItem>
            <strong>Informações de dispositivo:</strong> Tipo de dispositivo, sistema operacional, 
            navegador, endereço IP e outros dados técnicos.
          </ListItem>
          <ListItem>
            <strong>Comunicações:</strong> Registros de conversas quando você interage com nossos 
            agentes de IA através do chat ou outros meios de comunicação.
          </ListItem>
        </List>

        <SectionTitle>2. Como Usamos Suas Informações</SectionTitle>
        <Paragraph>
          Utilizamos suas informações para:
        </Paragraph>
        <List>
          <ListItem>Fornecer, manter e melhorar nossos serviços de agentes de IA;</ListItem>
          <ListItem>Personalizar sua experiência e entregar conteúdo relevante;</ListItem>
          <ListItem>Processar transações e gerenciar sua conta;</ListItem>
          <ListItem>Responder a suas solicitações e fornecer suporte ao cliente;</ListItem>
          <ListItem>Enviar informações técnicas, atualizações e alertas relacionados ao serviço;</ListItem>
          <ListItem>Proteger nossos serviços, prevenir atividades fraudulentas e garantir a segurança;</ListItem>
          <ListItem>Melhorar nossos algoritmos de IA e a qualidade das interações dos agentes.</ListItem>
        </List>

        <SectionTitle>3. Compartilhamento de Informações</SectionTitle>
        <Paragraph>
          Não vendemos suas informações pessoais a terceiros. Podemos compartilhar informações com:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Provedores de serviço:</strong> Empresas que nos ajudam a fornecer serviços, 
            como processamento de pagamentos, armazenamento em nuvem e análise de dados.
          </ListItem>
          <ListItem>
            <strong>Parceiros de negócios:</strong> Com seu consentimento, podemos compartilhar informações 
            com parceiros confiáveis para oferecer produtos ou serviços que possam ser de seu interesse.
          </ListItem>
          <ListItem>
            <strong>Conformidade legal:</strong> Quando exigido por lei, em resposta a processos legais, ou 
            para proteger nossos direitos.
          </ListItem>
        </List>

        <SectionTitle>4. Cookies e Tecnologias Semelhantes</SectionTitle>
        <Paragraph>
          Utilizamos cookies e tecnologias similares para coletar informações sobre seu uso do site, 
          personalizar conteúdo, fornecer recursos de mídia social e analisar nosso tráfego. 
          Você pode controlar o uso de cookies através das configurações do seu navegador.
        </Paragraph>

        <SectionTitle>5. Segurança de Dados</SectionTitle>
        <Paragraph>
          Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações 
          contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de 
          transmissão pela internet é 100% seguro, e não podemos garantir segurança absoluta.
        </Paragraph>

        <SectionTitle>6. Seus Direitos</SectionTitle>
        <Paragraph>
          Dependendo da sua localização, você pode ter direitos relacionados às suas informações pessoais, incluindo:
        </Paragraph>
        <List>
          <ListItem>Acessar as informações que temos sobre você;</ListItem>
          <ListItem>Corrigir informações imprecisas ou incompletas;</ListItem>
          <ListItem>Solicitar a exclusão de suas informações em determinadas circunstâncias;</ListItem>
          <ListItem>Restringir ou se opor ao processamento de suas informações;</ListItem>
          <ListItem>Solicitar a transferência de suas informações a outra organização;</ListItem>
          <ListItem>Retirar seu consentimento a qualquer momento.</ListItem>
        </List>
        <Paragraph>
          Para exercer qualquer um desses direitos, entre em contato conosco através dos canais listados na seção "Contato".
        </Paragraph>

        <SectionTitle>7. Retenção de Dados</SectionTitle>
        <Paragraph>
          Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos 
          nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
        </Paragraph>

        <SectionTitle>8. Crianças</SectionTitle>
        <Paragraph>
          Nossos serviços não são direcionados a crianças menores de 13 anos, e não coletamos intencionalmente 
          informações pessoais de crianças. Se tomarmos conhecimento de que coletamos informações de uma criança, 
          tomaremos medidas para excluir essas informações.
        </Paragraph>

        <SectionTitle>9. Alterações nesta Política</SectionTitle>
        <Paragraph>
          Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre 
          disponível em nosso site, com a data da última atualização. As alterações significativas serão 
          notificadas através de um aviso em nosso site ou por e-mail.
        </Paragraph>

        <SectionTitle>10. Contato</SectionTitle>
        <Paragraph>
          Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos 
          suas informações pessoais, entre em contato conosco:
        </Paragraph>
        <Paragraph>
          <strong>E-mail:</strong> contato@hubnexusai.com<br />
          <strong>WhatsApp:</strong> +55 81 98922-4862
        </Paragraph>

        <BackLink href="/">Voltar para a página inicial</BackLink>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default PrivacyPolicy;