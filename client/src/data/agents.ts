export interface Agent {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    icon: 'fas fa-hospital',
    title: 'Agente de Clínicas',
    description: 'Otimize o gerenciamento de pacientes e consultas. Este agente organiza agendamentos, envia lembretes e facilita a comunicação entre equipe médica e pacientes.'
  },
  {
    id: 2,
    icon: 'fas fa-shopping-cart',
    title: 'Agente de Loja',
    description: 'Melhore a experiência de compra e gestão de produtos. Este agente auxilia na organização de estoque, atendimento ao cliente e automação de processos de venda.'
  },
  {
    id: 3,
    icon: 'fas fa-home',
    title: 'Agente de Imobiliária',
    description: 'Transforme a experiência de compra e venda de imóveis. Este agente gerencia listagens, organiza visitas e qualifica leads para corretores, aumentando a eficiência do negócio.'
  },
  {
    id: 4,
    icon: 'fas fa-pen-fancy',
    title: 'Agente de Copywrite',
    description: 'Potencialize sua estratégia de conteúdo. Este agente auxilia na criação de textos persuasivos, analisa métricas e otimiza a comunicação com seu público-alvo.'
  },
  {
    id: 5,
    icon: 'fas fa-briefcase',
    title: 'Agente de Comercial (SDR)',
    description: 'Automatize prospecção e qualificação de leads. Este agente gerencia o funil de vendas, agenda reuniões e mantém interações personalizadas com potenciais clientes.'
  },
  {
    id: 6,
    icon: 'fas fa-graduation-cap',
    title: 'Agente de Escola',
    description: 'Modernize a gestão escolar e comunicação. Este agente organiza cronogramas, facilita a comunicação entre professores, alunos e pais, e ajuda na gestão de tarefas.'
  },
  {
    id: 7,
    icon: 'fas fa-chart-line',
    title: 'Agente de Financeiro',
    description: 'Otimize análises financeiras e recomendações. Este agente processa dados, gera insights sobre investimentos e ajuda na gestão orçamentária para decisões estratégicas.'
  },
  {
    id: 8,
    icon: 'fas fa-cut',
    title: 'Agente de Barbearia',
    description: 'Simplifique a gestão do seu negócio. Este agente gerencia agendamentos, organiza cadastro de clientes e facilita a comunicação, elevando a experiência do seu estabelecimento.'
  },
  {
    id: 9,
    icon: 'fas fa-spa',
    title: 'Agente de Salão de Beleza',
    description: 'Otimize o gerenciamento do seu salão. Este agente cuida de agendamentos, fidelização de clientes e gerenciamento de serviços, melhorando a produtividade do seu negócio.'
  },
  {
    id: 10,
    icon: 'fas fa-motorcycle',
    title: 'Agente de Delivery',
    description: 'Transforme a logística de entregas. Este agente otimiza rotas, gerencia pedidos e melhora a comunicação com clientes, aumentando a eficiência das suas entregas.'
  },
  {
    id: 11,
    icon: 'fas fa-balance-scale',
    title: 'Agente para Advocacia',
    description: 'Aumente a produtividade do escritório jurídico. Este agente organiza casos, pesquisa jurisprudência e facilita a comunicação com clientes e documentação.'
  },
  {
    id: 12,
    icon: 'fas fa-calendar-check',
    title: 'Agente para Agendamentos',
    description: 'Simplifique sua gestão de compromissos. Este agente automatiza marcações, envia lembretes e organiza sua agenda de forma inteligente, otimizando seu tempo.'
  }
];
