export const templates = {
  blank: {
    id: 'blank',
    name: '📄 Documento em Branco',
    category: 'Geral',
    description: 'Comece do zero com um documento vazio',
    content: ''
  },
  
  readme: {
    id: 'readme',
    name: '📘 README.md',
    category: 'Desenvolvimento',
    description: 'Template para documentação de projetos no GitHub',
    content: `# Nome do Projeto

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)

> Uma breve descrição do seu projeto

## 📋 Sobre

Descreva aqui o propósito e funcionalidades principais do seu projeto. Explique o problema que ele resolve e por que é útil.

## ✨ Funcionalidades

- ✅ Funcionalidade 1
- ✅ Funcionalidade 2
- ✅ Funcionalidade 3
- 🚧 Funcionalidade 4 (em desenvolvimento)

## 🚀 Começando

### Pré-requisitos

\`\`\`bash
node >= 14.0.0
npm >= 6.0.0
\`\`\`

### Instalação

\`\`\`bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-projeto.git

# Entre no diretório
cd seu-projeto

# Instale as dependências
npm install

# Execute o projeto
npm start
\`\`\`

## 💻 Uso

\`\`\`javascript
import { MinhaFuncao } from 'meu-projeto';

const resultado = MinhaFuncao('parametro');
console.log(resultado);
\`\`\`

## 📸 Screenshots

![Screenshot 1](./screenshots/exemplo.png)

## 🛠️ Tecnologias

- [React](https://reactjs.org/) - Biblioteca JavaScript
- [Node.js](https://nodejs.org/) - Ambiente de execução
- [Express](https://expressjs.com/) - Framework web

## 📦 Estrutura do Projeto

\`\`\`
projeto/
├── src/
│   ├── components/
│   ├── utils/
│   └── App.js
├── public/
├── tests/
└── package.json
\`\`\`

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! 

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/MinhaFeature\`)
3. Commit suas mudanças (\`git commit -m 'Adiciona nova feature'\`)
4. Push para a branch (\`git push origin feature/MinhaFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Seu Nome**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://linkedin.com/in/seu-perfil)
- Email: seu.email@exemplo.com

## 🙏 Agradecimentos

- Obrigado a todos que contribuíram para este projeto
- Inspirado por [projeto-exemplo](https://github.com/exemplo)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!`
  },

  blogPost: {
    id: 'blogPost',
    name: '✍️ Post de Blog',
    category: 'Conteúdo',
    description: 'Template para artigos e posts de blog',
    content: `# Título do Seu Artigo

**Data:** ${new Date().toLocaleDateString('pt-BR')}  
**Autor:** Seu Nome  
**Tempo de leitura:** ~5 minutos

![Banner do artigo](https://via.placeholder.com/1200x400)

## Introdução

Comece com um parágrafo envolvente que capture a atenção do leitor. Explique brevemente o que será abordado neste artigo e por que é importante.

## O Problema

Descreva o problema ou desafio que você está resolvendo. Use exemplos práticos para tornar mais tangível:

- Ponto importante 1
- Ponto importante 2
- Ponto importante 3

## A Solução

Apresente sua solução ou abordagem de forma clara e estruturada.

### Passo 1: Preparação

Explique o primeiro passo em detalhes. Inclua código quando relevante:

\`\`\`javascript
const exemplo = () => {
  console.log('Código de exemplo');
  return 'resultado';
};
\`\`\`

### Passo 2: Implementação

Continue explicando os próximos passos de forma didática.

### Passo 3: Otimização

Mostre como melhorar e otimizar a solução.

## Exemplos Práticos

### Exemplo 1

\`\`\`javascript
// Código do exemplo 1
function exemplo1() {
  return 'resultado';
}
\`\`\`

### Exemplo 2

\`\`\`javascript
// Código do exemplo 2
function exemplo2() {
  return 'outro resultado';
}
\`\`\`

## Dicas e Boas Práticas

> 💡 **Dica:** Use blockquotes para destacar informações importantes.

1. **Prática 1:** Descrição da primeira boa prática
2. **Prática 2:** Descrição da segunda boa prática
3. **Prática 3:** Descrição da terceira boa prática

## Conclusão

Recapitule os pontos principais do artigo e encerre com uma reflexão ou call-to-action.

### Próximos Passos

- Sugestão de leitura complementar
- Exercício prático para o leitor
- Link para recursos adicionais

---

## Referências

1. [Referência 1](https://exemplo.com)
2. [Referência 2](https://exemplo.com)
3. [Referência 3](https://exemplo.com)

---

**Tags:** #desenvolvimento #programação #tutorial

💬 **O que você achou?** Deixe seu comentário abaixo!

🔗 **Compartilhe:** [Twitter](https://twitter.com) | [LinkedIn](https://linkedin.com) | [Facebook](https://facebook.com)`
  },

  documentation: {
    id: 'documentation',
    name: '📚 Documentação Técnica',
    category: 'Desenvolvimento',
    description: 'Template para documentação de APIs e projetos técnicos',
    content: `# Documentação Técnica - API v1.0

## Visão Geral

Esta documentação descreve os endpoints, parâmetros e respostas da API.

**Base URL:** \`https://api.exemplo.com/v1\`

**Autenticação:** Bearer Token

## Índice

- [Autenticação](#autenticação)
- [Endpoints](#endpoints)
  - [Usuários](#usuários)
  - [Posts](#posts)
- [Códigos de Erro](#códigos-de-erro)
- [Rate Limiting](#rate-limiting)

## Autenticação

Todas as requisições devem incluir um token de autenticação no header:

\`\`\`
Authorization: Bearer SEU_TOKEN_AQUI
\`\`\`

### Obter Token

\`\`\`http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "sua_senha"
}
\`\`\`

**Resposta de Sucesso:**

\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário"
  }
}
\`\`\`

## Endpoints

### Usuários

#### Listar Usuários

\`\`\`http
GET /users
\`\`\`

**Parâmetros de Query:**

| Parâmetro | Tipo   | Obrigatório | Descrição                    |
|-----------|--------|-------------|------------------------------|
| page      | number | Não         | Número da página (padrão: 1) |
| limit     | number | Não         | Itens por página (padrão: 10)|
| search    | string | Não         | Buscar por nome ou email     |

**Exemplo de Requisição:**

\`\`\`bash
curl -X GET "https://api.exemplo.com/v1/users?page=1&limit=10" \\
  -H "Authorization: Bearer SEU_TOKEN"
\`\`\`

**Resposta de Sucesso (200):**

\`\`\`json
{
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
\`\`\`

#### Criar Usuário

\`\`\`http
POST /users
Content-Type: application/json
\`\`\`

**Body:**

\`\`\`json
{
  "name": "Novo Usuário",
  "email": "novo@exemplo.com",
  "password": "senha_segura",
  "role": "user"
}
\`\`\`

**Resposta de Sucesso (201):**

\`\`\`json
{
  "id": 2,
  "name": "Novo Usuário",
  "email": "novo@exemplo.com",
  "role": "user",
  "created_at": "2025-01-07T10:00:00Z"
}
\`\`\`

#### Obter Usuário por ID

\`\`\`http
GET /users/:id
\`\`\`

#### Atualizar Usuário

\`\`\`http
PUT /users/:id
Content-Type: application/json
\`\`\`

#### Deletar Usuário

\`\`\`http
DELETE /users/:id
\`\`\`

### Posts

#### Listar Posts

\`\`\`http
GET /posts
\`\`\`

#### Criar Post

\`\`\`http
POST /posts
Content-Type: application/json

{
  "title": "Título do Post",
  "content": "Conteúdo do post...",
  "tags": ["javascript", "react"]
}
\`\`\`

## Códigos de Erro

| Código | Descrição                    | Solução                        |
|--------|------------------------------|--------------------------------|
| 400    | Bad Request                  | Verifique os parâmetros        |
| 401    | Unauthorized                 | Token inválido ou expirado     |
| 403    | Forbidden                    | Sem permissão                  |
| 404    | Not Found                    | Recurso não encontrado         |
| 429    | Too Many Requests            | Aguarde antes de tentar novamente |
| 500    | Internal Server Error        | Erro no servidor               |

**Formato de Resposta de Erro:**

\`\`\`json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Email já está em uso",
    "details": {
      "field": "email"
    }
  }
}
\`\`\`

## Rate Limiting

- **Limite:** 100 requisições por minuto
- **Header de Resposta:** \`X-RateLimit-Remaining\`

Se exceder o limite, receberá erro 429.

## Webhooks

Configure webhooks para receber eventos em tempo real:

\`\`\`http
POST /webhooks
Content-Type: application/json

{
  "url": "https://seu-site.com/webhook",
  "events": ["user.created", "post.updated"]
}
\`\`\`

## SDKs Disponíveis

- [JavaScript/Node.js](https://github.com/exemplo/sdk-js)
- [Python](https://github.com/exemplo/sdk-python)
- [PHP](https://github.com/exemplo/sdk-php)

## Suporte

- Email: suporte@exemplo.com
- Discord: [discord.gg/exemplo](https://discord.gg)
- Documentação: [docs.exemplo.com](https://docs.exemplo.com)

---

**Última atualização:** ${new Date().toLocaleDateString('pt-BR')}`
  },

  meetingNotes: {
    id: 'meetingNotes',
    name: '📝 Notas de Reunião',
    category: 'Negócios',
    description: 'Template para atas e notas de reuniões',
    content: `# Notas de Reunião

**Data:** ${new Date().toLocaleDateString('pt-BR')}  
**Horário:** 00:00 - 00:00  
**Local:** Sala de Reuniões / Zoom  
**Facilitador:** Nome do Facilitador  

## Participantes

- ✅ João Silva (Presente)
- ✅ Maria Santos (Presente)
- ✅ Pedro Costa (Presente)
- ❌ Ana Lima (Ausente)

## Agenda

1. Revisão da sprint anterior
2. Planejamento da próxima sprint
3. Discussão de bloqueios
4. Definição de próximos passos

## Discussões

### 1. Revisão da Sprint Anterior

**Resumo:** Discussão sobre o que foi completado e desafios enfrentados.

**Pontos Principais:**
- ✅ Completamos 8 das 10 tarefas planejadas
- 🔄 2 tarefas foram movidas para próxima sprint
- 📈 Velocity da equipe aumentou 15%

**Decisões:**
- Ajustar estimativas para tarefas similares
- Implementar code review mais cedo no processo

### 2. Planejamento da Próxima Sprint

**Objetivos:**
- Implementar nova feature X
- Corrigir bugs críticos
- Melhorar performance

**Tarefas Priorizadas:**
1. **Alta:** Implementar autenticação OAuth
2. **Alta:** Corrigir bug de performance no dashboard
3. **Média:** Adicionar testes unitários
4. **Baixa:** Atualizar documentação

### 3. Bloqueios e Impedimentos

| Bloqueio | Responsável | Prazo | Status |
|----------|-------------|-------|--------|
| Acesso ao servidor de produção | João | 08/01 | 🔄 Em andamento |
| Aprovação do design | Maria | 10/01 | ⏳ Pendente |
| Licença da ferramenta X | Pedro | 12/01 | ✅ Resolvido |

## Action Items

| Tarefa | Responsável | Prazo | Prioridade |
|--------|-------------|-------|------------|
| Configurar ambiente de staging | João | 09/01 | Alta |
| Revisar PR #123 | Maria | 08/01 | Alta |
| Documentar API endpoints | Pedro | 11/01 | Média |
| Agendar reunião com cliente | Ana | 10/01 | Média |

## Próximos Passos

1. João entrará em contato com TI sobre acesso ao servidor
2. Maria agendará reunião com time de design
3. Pedro começará implementação da feature X
4. Próxima reunião: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString('pt-BR')}

## Notas Adicionais

> 💡 **Lembrete:** Prazo final do projeto é 31/01/2025

**Feedback da Equipe:**
- Equipe solicitou mais tempo para code review
- Sugestão de implementar pair programming
- Pedido para atualizar dependências do projeto

## Anexos

- [Link para apresentação](https://exemplo.com/apresentacao)
- [Documentos relacionados](https://exemplo.com/docs)
- [Gravação da reunião](https://exemplo.com/recording)

---

**Próxima Reunião:**  
📅 Data: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString('pt-BR')}  
⏰ Horário: 00:00  
📍 Local: A definir

---

*Notas compiladas por: [Seu Nome]*`
  },

  projectProposal: {
    id: 'projectProposal',
    name: '💼 Proposta de Projeto',
    category: 'Negócios',
    description: 'Template para propostas comerciais e de projetos',
    content: `# Proposta de Projeto

**Cliente:** Nome do Cliente  
**Projeto:** Nome do Projeto  
**Data:** ${new Date().toLocaleDateString('pt-BR')}  
**Validade:** 30 dias  
**Versão:** 1.0

---

## Sumário Executivo

Breve resumo do projeto, objetivos principais e benefícios esperados. Esta seção deve ser concisa e impactante, destacando o valor que o projeto trará para o cliente.

## Contexto e Necessidade

### Situação Atual

Descreva a situação atual do cliente e os desafios que estão enfrentando.

### Oportunidade

Explique a oportunidade identificada e como este projeto pode resolver os problemas atuais.

## Objetivos do Projeto

### Objetivos Principais

1. **Objetivo 1:** Descrição detalhada do primeiro objetivo
2. **Objetivo 2:** Descrição detalhada do segundo objetivo
3. **Objetivo 3:** Descrição detalhada do terceiro objetivo

### Resultados Esperados

- ✅ Resultado mensurável 1
- ✅ Resultado mensurável 2
- ✅ Resultado mensurável 3

## Escopo do Projeto

### Incluído no Escopo

- Feature/Funcionalidade 1
  - Subitem 1.1
  - Subitem 1.2
- Feature/Funcionalidade 2
- Feature/Funcionalidade 3

### Fora do Escopo

- Item não incluído 1
- Item não incluído 2

## Metodologia

### Abordagem

Descrição da metodologia que será utilizada (Agile, Waterfall, etc.) e justificativa.

### Processo de Desenvolvimento

1. **Fase 1: Descoberta e Planejamento** (2 semanas)
   - Levantamento de requisitos
   - Definição de arquitetura
   - Criação de protótipos

2. **Fase 2: Desenvolvimento** (8 semanas)
   - Sprint 1: Features principais
   - Sprint 2: Integrações
   - Sprint 3: Refinamentos
   - Sprint 4: Testes

3. **Fase 3: Implantação** (2 semanas)
   - Deploy em ambiente de homologação
   - Testes de aceitação
   - Deploy em produção
   - Treinamento da equipe

4. **Fase 4: Suporte** (4 semanas)
   - Suporte pós-lançamento
   - Correções de bugs
   - Ajustes finos

## Cronograma

| Fase | Atividade | Duração | Início | Término |
|------|-----------|---------|--------|---------|
| 1 | Descoberta | 2 semanas | 15/01 | 29/01 |
| 2 | Desenvolvimento | 8 semanas | 01/02 | 26/03 |
| 3 | Implantação | 2 semanas | 29/03 | 12/04 |
| 4 | Suporte | 4 semanas | 15/04 | 10/05 |

**Duração Total:** 16 semanas

## Equipe

| Função | Nome | Responsabilidades |
|--------|------|-------------------|
| Gerente de Projeto | Nome | Coordenação geral |
| Tech Lead | Nome | Arquitetura técnica |
| Desenvolvedor Frontend | Nome | Interface do usuário |
| Desenvolvedor Backend | Nome | APIs e integrações |
| Designer UX/UI | Nome | Design e experiência |
| QA Engineer | Nome | Testes e qualidade |

## Tecnologias

### Stack Proposta

**Frontend:**
- React.js
- TypeScript
- Tailwind CSS

**Backend:**
- Node.js
- PostgreSQL
- Redis

**Infraestrutura:**
- AWS / Azure
- Docker
- CI/CD Pipeline

## Investimento

### Custos do Projeto

| Item | Descrição | Valor |
|------|-----------|-------|
| Desenvolvimento | 16 semanas × 40h × R$ 150/h | R$ 96.000,00 |
| Design | 80 horas × R$ 120/h | R$ 9.600,00 |
| Infraestrutura | Servidor e serviços (6 meses) | R$ 3.600,00 |
| Licenças | Ferramentas e softwares | R$ 2.400,00 |

**Subtotal:** R$ 111.600,00  
**Desconto (10%):** R$ 11.160,00  
**Total do Investimento:** R$ 100.440,00

### Formas de Pagamento

- **Opção 1:** 50% início + 25% meio + 25% entrega
- **Opção 2:** 30% início + 40% meio + 30% entrega
- **Opção 3:** Parcelamento em 6× sem juros

## Garantias e Suporte

- ✅ 90 dias de garantia após entrega
- ✅ Suporte técnico por 30 dias incluído
- ✅ Documentação completa do projeto
- ✅ Treinamento da equipe (8 horas)

## Riscos e Mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Mudança de escopo | Alto | Média | Controle de mudanças formal |
| Atraso em aprovações | Médio | Baixa | Timeline com buffer |
| Problemas técnicos | Médio | Baixa | Testes contínuos |

## Próximos Passos

1. ✅ Revisão desta proposta
2. ⏳ Reunião de alinhamento
3. ⏳ Assinatura do contrato
4. ⏳ Kickoff do projeto

## Termos e Condições

- Proposta válida por 30 dias
- Preços em reais (BRL)
- Impostos não inclusos
- Contrato formal será enviado após aprovação

---

## Aceite

**Cliente:**

Nome: ___________________________  
Assinatura: ___________________________  
Data: ___/___/___

**Fornecedor:**

Nome: ___________________________  
Assinatura: ___________________________  
Data: ___/___/___

---

**Contato:**  
📧 Email: contato@exemplo.com  
📱 Telefone: (00) 0000-0000  
🌐 Website: www.exemplo.com`
  }
};

// Função para obter categorias únicas
export const getCategories = () => {
  const categories = [...new Set(Object.values(templates).map(t => t.category))];
  return ['Todos', ...categories];
};

// Função para filtrar templates por categoria
export const getTemplatesByCategory = (category) => {
  if (category === 'Todos') {
    return Object.values(templates);
  }
  return Object.values(templates).filter(t => t.category === category);
};
