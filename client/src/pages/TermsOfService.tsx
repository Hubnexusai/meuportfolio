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

const TermsOfService: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Title>Termos de Uso</Title>
        <Paragraph>
          <em>Última atualização: {currentDate}</em>
        </Paragraph>

        <Paragraph>
          Bem-vindo aos Termos de Uso da Hub Nexus AI ("nós", "nosso" ou "empresa"). Este documento 
          estabelece os termos e condições para o uso de nosso site e serviços de agentes de inteligência artificial.
        </Paragraph>
        
        <Paragraph>
          Ao acessar ou utilizar nossa plataforma, você concorda com estes Termos de Uso. Se você não 
          concordar com alguma parte destes termos, pedimos que não utilize nossos serviços.
        </Paragraph>

        <SectionTitle>1. Uso dos Serviços</SectionTitle>
        
        <SectionTitle>1.1. Elegibilidade</SectionTitle>
        <Paragraph>
          Para utilizar nossos serviços, você deve ter no mínimo 18 anos de idade ou possuir autorização 
          de um representante legal. Ao utilizar nossos serviços, você declara e garante que tem a capacidade 
          legal para celebrar este acordo.
        </Paragraph>
        
        <SectionTitle>1.2. Registro e Conta</SectionTitle>
        <Paragraph>
          Alguns de nossos serviços podem exigir que você crie uma conta. Você é responsável por manter 
          a confidencialidade de suas credenciais de acesso e por todas as atividades que ocorrem sob 
          sua conta. Comprometemo-nos a proteger sua privacidade conforme descrito em nossa Política de Privacidade.
        </Paragraph>
        
        <SectionTitle>1.3. Uso Aceitável</SectionTitle>
        <Paragraph>
          Você concorda em utilizar nossos serviços apenas para fins lícitos e de acordo com estes Termos. 
          Especificamente, você concorda em não:
        </Paragraph>
        <List>
          <ListItem>Violar quaisquer leis ou regulamentos aplicáveis;</ListItem>
          <ListItem>Infringir direitos de propriedade intelectual ou privacidade de terceiros;</ListItem>
          <ListItem>Distribuir malware, vírus ou qualquer código projetado para danificar ou interferir no funcionamento de sistemas;</ListItem>
          <ListItem>Tentar obter acesso não autorizado aos nossos sistemas ou interferir em sua operação;</ListItem>
          <ListItem>Enviar conteúdo ofensivo, difamatório, pornográfico ou que promova discriminação ou violência;</ListItem>
          <ListItem>Utilizar nossos serviços para enviar comunicações não solicitadas (spam);</ListItem>
          <ListItem>Automatizar o uso de nossos serviços sem autorização expressa.</ListItem>
        </List>

        <SectionTitle>2. Propriedade Intelectual</SectionTitle>
        
        <SectionTitle>2.1. Nosso Conteúdo</SectionTitle>
        <Paragraph>
          Todo o conteúdo disponibilizado em nosso site, incluindo textos, gráficos, logotipos, ícones, 
          imagens, clipes de áudio, downloads digitais, e software, é propriedade da Hub Nexus AI ou de 
          nossos licenciadores e está protegido por leis de propriedade intelectual. Nossos agentes de IA, 
          seus algoritmos e funcionamento também constituem nossa propriedade intelectual.
        </Paragraph>
        
        <SectionTitle>2.2. Licença Limitada</SectionTitle>
        <Paragraph>
          Concedemos a você uma licença limitada, não exclusiva, não transferível e revogável para acessar 
          e utilizar nossos serviços para fins pessoais ou empresariais. Esta licença não inclui o direito 
          de copiar ou modificar o conteúdo, usar o conteúdo para fins comerciais, ou utilizar técnicas de 
          mineração de dados, robôs ou ferramentas similares de coleta e extração de dados.
        </Paragraph>
        
        <SectionTitle>2.3. Seu Conteúdo</SectionTitle>
        <Paragraph>
          Você mantém todos os direitos sobre o conteúdo que compartilha através de nossos serviços. 
          Ao enviar conteúdo para nossa plataforma, você nos concede uma licença mundial, não exclusiva, 
          isenta de royalties, sublicenciável e transferível para usar, reproduzir, modificar, adaptar, publicar, 
          traduzir e distribuir esse conteúdo em conexão com a operação e provisão de nossos serviços.
        </Paragraph>

        <SectionTitle>3. Serviços de IA e Limitação de Responsabilidade</SectionTitle>
        
        <SectionTitle>3.1. Natureza dos Serviços de IA</SectionTitle>
        <Paragraph>
          Nossos agentes de inteligência artificial são projetados para fornecer assistência e automação, 
          mas podem não ser perfeitos. As respostas e ações dos agentes são baseadas em algoritmos e dados de 
          treinamento, e podem não ser adequadas para todas as situações ou necessidades.
        </Paragraph>
        
        <SectionTitle>3.2. Sem Garantias</SectionTitle>
        <Paragraph>
          Os serviços são fornecidos "como estão" e "conforme disponíveis", sem garantias de qualquer tipo, 
          expressas ou implícitas. Não garantimos que nossos serviços serão ininterruptos, seguros ou livres 
          de erros, nem que quaisquer defeitos serão corrigidos.
        </Paragraph>
        
        <SectionTitle>3.3. Limitação de Responsabilidade</SectionTitle>
        <Paragraph>
          Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, 
          especiais, consequenciais ou punitivos, incluindo, mas não se limitando a, perda de lucros, dados, 
          uso, reputação ou outras perdas intangíveis, resultantes do uso ou da incapacidade de usar nossos serviços.
        </Paragraph>
        <Paragraph>
          Você reconhece que as decisões tomadas com base nas informações fornecidas por nossos agentes de IA 
          são de sua exclusiva responsabilidade. Recomendamos sempre verificar criticamente as informações e 
          consultar especialistas humanos para decisões importantes.
        </Paragraph>

        <SectionTitle>4. Modificações dos Serviços e Termos</SectionTitle>
        <Paragraph>
          Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto de nossos serviços 
          a qualquer momento, com ou sem aviso prévio. Também podemos atualizar estes Termos de Uso periodicamente. 
          As mudanças entrarão em vigor assim que forem publicadas em nosso site. O uso contínuo dos serviços 
          após tais alterações constituirá sua aceitação dos novos termos.
        </Paragraph>

        <SectionTitle>5. Rescisão</SectionTitle>
        <Paragraph>
          Podemos encerrar ou suspender seu acesso aos nossos serviços imediatamente, sem aviso prévio ou 
          responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes Termos de Uso. 
          Após a rescisão, seu direito de usar os serviços cessará imediatamente.
        </Paragraph>

        <SectionTitle>6. Lei Aplicável</SectionTitle>
        <Paragraph>
          Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa 
          decorrente ou relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais de Recife, Pernambuco.
        </Paragraph>

        <SectionTitle>7. Disposições Gerais</SectionTitle>
        <Paragraph>
          Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível, tal disposição 
          será limitada ou eliminada na medida mínima necessária, e as demais disposições destes Termos de Uso 
          permanecerão em pleno vigor e efeito.
        </Paragraph>
        <Paragraph>
          Nossa falha em aplicar qualquer direito ou disposição destes Termos de Uso não será considerada uma 
          renúncia a tais direitos. A renúncia a qualquer direito ou disposição só será efetiva se for feita 
          por escrito e assinada por um representante autorizado da empresa.
        </Paragraph>

        <SectionTitle>8. Contato</SectionTitle>
        <Paragraph>
          Se você tiver dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco:
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

export default TermsOfService;