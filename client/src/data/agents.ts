export interface Agent {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    icon: 'fas fa-user-md',
    title: 'Atendente de Clínica',
    description: 'Otimize o agendamento de consultas e atendimento aos pacientes. Este assistente gerencia horários, confirmações e lembretes, além de fornecer informações sobre exames e procedimentos.'
  },
  {
    id: 2,
    icon: 'fas fa-mobile-alt',
    title: 'Vendedor de iPhone',
    description: 'Auxilie clientes na escolha do modelo ideal de iPhone. Este assistente fornece informações técnicas, compara modelos, explica benefícios e ajuda a encontrar o melhor plano ou condição de pagamento.'
  },
  {
    id: 3,
    icon: 'fas fa-home',
    title: 'Corretor de Imóveis',
    description: 'Encontre o imóvel perfeito para seus clientes. Este assistente apresenta opções personalizadas, agenda visitas, esclarece dúvidas sobre financiamento e conecta compradores com as melhores oportunidades do mercado.'
  },
  {
    id: 4,
    icon: 'fas fa-pen-nib',
    title: 'Copywriter',
    description: 'Crie textos persuasivos que convertem. Este assistente ajuda a elaborar headlines impactantes, landing pages otimizadas, emails que vendem e conteúdos que geram engajamento para sua marca.'
  },
  {
    id: 5,
    icon: 'fas fa-university',
    title: 'Secretária Acadêmica',
    description: 'Gerencie processos acadêmicos com eficiência. Este assistente cuida de matrículas, históricos escolares, agendamento de aulas e fornece informações sobre cursos e procedimentos institucionais.'
  },
  {
    id: 6,
    icon: 'fas fa-calculator',
    title: 'Assistente Financeiro',
    description: 'Organize e otimize suas finanças. Este assistente ajuda no controle de contas a pagar e receber, análise de fluxo de caixa, elaboração de relatórios gerenciais e auxílio em planejamento financeiro.'
  },
  {
    id: 7,
    icon: 'fas fa-cut',
    title: 'Atendente de Barbearia',
    description: 'Transforme a experiência dos seus clientes. Este assistente gerencia agendamentos, sugere cortes e tratamentos, envia lembretes de horários e ajuda a fidelizar clientes com promoções personalizadas.'
  },
  {
    id: 8,
    icon: 'fas fa-motorcycle',
    title: 'Atendente de Delivery',
    description: 'Agilize pedidos e entregas com eficiência. Este assistente recebe e confirma pedidos, fornece informações sobre cardápio, acompanha status de entregas e resolve dúvidas sobre produtos e formas de pagamento.'
  },
  {
    id: 9,
    icon: 'fas fa-gavel',
    title: 'Secretária Jurídica',
    description: 'Organize a rotina do escritório de advocacia. Este assistente gerencia documentos, agenda reuniões e audiências, mantém clientes informados sobre andamento de processos e auxilia em pesquisas jurídicas básicas.'
  }
];
