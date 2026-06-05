# Documentação de Melhorias em Projeto Existente

## Informações Básicas

### Nome do Projeto Original
`Minha Cozinha`

### Nome da Iniciativa de Melhorias
`Minha Cozinha 2.0`

### Equipe de Melhorias
| Nome | GitHub | Papel Principal |
|------|--------|-----------------|
| Diogo Andrade Ferreira | @andrade-s | Desenvolvedor |
| Vinicius Pimentel da Silva | @Pxmentel | Desenvolvedor |
| Paulo Sérgio Inácio | @cibershaman | Desenvolvedor |
| Ryan Costa Pereira | @RyanCostaP | Desenvolvedor |

### Repositórios
- **Projeto Original**: Projeto pessoal (sem repositório público)
- **Fork/Novo Repositório**: `https://github.com/usuario/minha-cozinha`

---

## Contexto do Projeto Original

### 1. Descrição do Projeto Original

#### Propósito
O Minha Cozinha é uma aplicação web para descobrir, compartilhar e organizar receitas culinárias. O projeto original permitia explorar um catálogo de receitas, pesquisar por ingredientes ou categorias, criar novas receitas e gerenciar um perfil pessoal — tudo isso em uma SPA com persistência 100% em `localStorage`, sem backend.

#### Origem do Projeto
- [x] Projeto pessoal anterior
- [ ] Projeto de outra disciplina
- [ ] Projeto de trabalho/empresa
- [ ] Projeto open source
- [ ] Outro

**Detalhes:**
- **Quando foi criado:** 2024
- **Contexto:** Criado como aplicação para amantes da culinária organizarem e compartilharem receitas localmente.
- **Desenvolvedor(es) original(is):** Equipe atual do projeto
- **Status atual:** Em manutenção e evolução

### 2. Funcionalidades Existentes

#### Funcionalidades Implementadas (antes das melhorias)
- ✅ **Página Inicial**: Apresentação do site e chamada para explorar receitas
- ✅ **Autenticação (simulada)**: Páginas de login e cadastro com persistência local
- ✅ **Catálogo de Receitas**: Listagem com imagem, título, ingredientes e categoria
- ✅ **Busca em Tempo Real**: Pesquisa por título, ingredientes ou categoria
- ✅ **Detalhes da Receita**: Visualização completa com ingredientes e modo de preparo
- ✅ **Adicionar Receita**: Formulário para criação de novas receitas
- ✅ **Perfil do Usuário**: Visualização e edição de dados pessoais

#### Casos de Uso Existentes

1. **Explorar Receitas**
   - Ator: Visitante / Usuário logado
   - Fluxo: Acessa a home → navega para `/receitas` → filtra via busca → abre detalhes
   - Resultado: Visualiza ingredientes e modo de preparo da receita selecionada

2. **Cadastrar Nova Receita**
   - Ator: Usuário logado
   - Fluxo: Clica no botão flutuante "+" → preenche formulário → salva
   - Resultado: Receita persistida no `localStorage` e exibida no catálogo

3. **Gerenciar Perfil**
   - Ator: Usuário logado
   - Fluxo: Acessa `/perfil` → edita dados → salva
   - Resultado: Dados atualizados no `UserContext` e no `localStorage`

### 3. Stack Tecnológica Original

| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Frontend | React | 18.3.1 |
| Linguagem | TypeScript | 5.8.3 |
| Build Tool | Vite | 5.4.19 |
| Estilização | Tailwind CSS | 3.4.17 |
| Componentes UI | shadcn/ui | — |
| Roteamento | React Router DOM | 6.30.1 |
| Estado Assíncrono | TanStack Query | 5.83.0 |
| Ícones | Lucide React | 0.462.0 |
| Formulários | React Hook Form | 7.61.1 |
| Validação | Zod | 3.25.76 |
| Persistência | localStorage (Web Storage API) | nativo |

### 4. Arquitetura Atual

```
┌─────────────────────────────────┐
│     Frontend React + Vite       │
│   (SPA - Single Page App)       │
└───────────┬─────────────────────┘
            ↓
┌─────────────────────────────────┐
│   Context API (Estado Global)   │
│  RecipeContext + UserContext    │
└───────────┬─────────────────────┘
            ↓
┌─────────────────────────────────┐
│   localStorage (Persistência)   │
└─────────────────────────────────┘
```

**Descrição dos componentes:**
- **Frontend**: SPA em React + Vite com Tailwind e shadcn/ui, organizada em páginas (`src/pages`) e componentes reutilizáveis (`src/components`).
- **Estado Global**: `RecipeContext` (receitas e CRUD) e `UserContext` (perfil do usuário).
- **Persistência**: `localStorage` — todas as receitas, comentários e dados do perfil ficam no navegador, sem backend.

---

## Análise de Limitações

### 1. Limitações Identificadas

#### Limitação 1: Ausência de Interação Social
- **Categoria**: [x] Funcional
- **Descrição**: As receitas eram conteúdo estático; não havia espaço para o usuário comentar, opinar ou trocar experiências.
- **Impacto**: Plataforma sem engajamento e sem motivos para retorno do usuário ao mesmo conteúdo.
- **Evidências**: Página de detalhes contendo apenas ingredientes e modo de preparo.
- **Frequência**: [x] Alto

#### Limitação 2: Receitas com Informações Incompletas
- **Categoria**: [x] Funcional
- **Descrição**: Não havia campos de porções nem tempo de preparo; também não existia estimativa de tempo de leitura.
- **Impacto**: Dificultava o planejamento culinário e a tomada de decisão rápida.
- **Evidências**: Formulário de criação só pedia título, ingredientes, categoria e modo de preparo.
- **Frequência**: [x] Médio

#### Limitação 3: Sem Distinção entre Receitas do Sistema e do Usuário
- **Categoria**: [x] Funcional
- **Descrição**: Receitas pré-cadastradas e criadas pelo usuário eram tratadas de forma idêntica; não havia edição nem exclusão.
- **Impacto**: Risco de alteração indevida de conteúdo do sistema e falta de controle do usuário sobre o próprio conteúdo.
- **Frequência**: [x] Médio

#### Limitação 4: Home pouco informativa
- **Categoria**: [x] Usabilidade
- **Descrição**: A página inicial não comunicava o volume de conteúdo e tinha hierarquia visual confusa.
- **Impacto**: Primeira impressão fraca para novos usuários.
- **Frequência**: [x] Baixo

### 2. Feedback de Usuários

| Usuário/Fonte | Feedback | Prioridade |
|---------------|----------|------------|
| Testes internos | "Poderia dar pra comentar nas receitas" | Alta |
| Testes internos | "Não sei quanto tempo demora pra fazer" | Média |

### 3. Análise SWOT do Projeto Original

#### Forças
- Interface limpa e responsiva
- Busca em tempo real eficiente
- Formulários com validação robusta (Zod + React Hook Form)
- Código bem organizado com TypeScript

#### Fraquezas
- Ausência de qualquer interação social
- Receitas com poucos metadados
- Autenticação simulada e persistência apenas local

#### Oportunidades
- Camada social por meio de comentários
- Enriquecimento dos metadados das receitas
- Personalização visual do perfil
- Refino da identidade visual da home

#### Ameaças
- Perda de dados por limpeza de cache

---

## Melhorias Propostas

### 1. Objetivos das Melhorias

1. **Implementar interação social entre usuários**
   - Justificativa: principal objetivo nosso do projeto original; a plataforma sem isso parece bastante somente um catálogo estático.
   - Métricas de sucesso: comentários sendo criados, curtidos e excluídos com persistência local.

2. **Enriquecer a experiência ao redor das receitas**
   - Justificativa: usuários precisam de mais contexto (tempo, porções, leitura) e controle (editar/excluir).
   - Métricas de sucesso: campos exibidos em todas as receitas; ações de edição/exclusão funcionando sem regressões.

### 2. Melhorias Planejadas

#### Melhoria 1: Sistema de Comentários nas Receitas

**Categoria**: [x] Nova Funcionalidade

**Problema que resolve:** Ausência de interação social — Limitação 1.

**Solução proposta:** Componente `RecipeComments` integrado à página de detalhes, permitindo criar, curtir e excluir comentários, com `AlertDialog` para confirmação e persistência no `localStorage` sob a chave `recipe-comments`, segmentada por `recipeId`.

**Justificativa técnica:** Componente isolado, sem dependências externas, mantendo arquitetura 100% local. Reaproveita o `UserContext` para identidade (nome e avatar).

**Impacto esperado:** Transformar o catálogo em plataforma social, com engajamento e retorno do usuário.

**Complexidade**: [x] Média
**Tempo estimado**: 1 a 2 semana
**Responsável**: Equipe em conjunto

---

#### Melhoria 2: Metadados de Receita (tempo de leitura, porções e tempo de preparo)

**Categoria**: [x] Nova Funcionalidade

**Problema que resolve:** Limitação 2 — receitas sem informações suficientes.

**Solução proposta:**
- Campos `servings` e `prepTime` no formulário de criação/edição, exibidos em cards e detalhes.
- Cálculo automático do tempo de leitura (≈200 palavras/min) com base no modo de preparo, exibido nos detalhes.

**Justificativa técnica:** Campos opcionais na interface `Recipe`, com migração automática para receitas antigas. Cálculo de leitura como função pura.

**Impacto esperado:** Leitura mais informada e melhor planejamento culinário.

**Complexidade**: [x] Baixa
**Tempo estimado**: 3 dias

---

### 3. Melhorias Consideradas mas NÃO Incluídas

| Melhoria | Por que não será implementada agora |
|----------|-------------------------------------|
| Backend real com autenticação completa | Fora do escopo; o projeto mantém arquitetura 100% local |
| Sincronização entre dispositivos | Complecidade alta e pouco tempo para estudar mais a fundo |

---

## Especificações Técnicas das Melhorias

### 1. Mudanças na Arquitetura

A arquitetura geral permanece a mesma (SPA + Context API + localStorage). Adições:

```
RecipeContext: addRecipe, updateRecipe, deleteRecipe, getRecipeById
UserContext:   updateUser (inclui avatar em base64)
Componentes:   RecipeComments, EditarReceita
localStorage: chave "recipe-comments" segmentada por recipeId
```

**Mudanças principais:**
- [x] Adição de novos componentes (`RecipeComments`, página `EditarReceita`)
- [x] Refatoração de componentes existentes (`RecipeCard`, `NovaReceita`, `PerfilUsuario`, `Index`, `RecipeDetail`)
- [ ] Mudança de tecnologias
- [ ] Nova arquitetura

### 2. Novas Tecnologias/Bibliotecas

Nenhuma. Todas as melhorias utilizam tecnologias já presentes (React, FileReader API nativa, `localStorage`).

### 3. Migrações Necessárias

- [x] Migração automática de receitas antigas no `RecipeContext`, aplicando valores-padrão para `isUserRecipe`, `servings` e `prepTime`.

---

## Plano de Implementação

### Cronograma Detalhado

#### Fase 1: Análise e Preparação
- [x] Análise do código existente
- [x] Documentação da arquitetura atual
- [x] Planejamento do sistema de comentários e melhorias complementares
- [x] Definição de testes manuais para evitar regressões

#### Fase 2: Implementação — Parte 1
- [x] Sistema de comentários (objetivo principal)
- [x] Tempo estimado de leitura
- [x] Campos de porções e tempo de preparo

#### Fase 3: Implementação — Parte 2
- [x] Contador de receitas na home

#### Fase 4: Finalização
- [x] Documentação completa
- [x] Testes manuais

### Estratégia de Testes
- [x] Testes manuais de todas as funcionalidades existentes
- [x] Comparação lado a lado (versão antiga vs nova)
- [ ] Testes automatizados
- [ ] Testes com usuários reais

---

## Comparação Antes/Depois

### 1. Comparativo de Funcionalidades

| Funcionalidade | Versão Original | Versão Melhorada | Status |
|----------------|-----------------|------------------|--------|
| Comentários | Não existia | Comentários por receita, com curtidas e exclusão | Novo |
| Tempo de leitura | Não existia | Estimativa automática nos detalhes | Novo |
| Cards de receita | Imagem, título, ingredientes | + porções e tempo de preparo | Melhorado |
| Contador de receitas | Não existia | Exibido na home | Novo |
| Receitas pré-prontas | Sem proteção | Protegidas (IDs 1–3) | Corrigido |

### 2. Métricas de Melhoria

#### Código
| Métrica | Antes | Depois |
|---------|-------|--------|
| Componentes de interação social | 0 | 1 (`RecipeComments`) |
| Funções no `RecipeContext` | 2 | 4 |
| Campos na interface `Recipe` | 7 | 9 |
| Páginas | 7 | 8 (`EditarReceita`) |

### 3. Evidências Visuais

#### Screenshots - Antes
```
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/54b82bd3-8e89-4fec-9150-6a0d7d6d0297" />

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/b6c8b9eb-c60d-4e14-ae6f-2ae3cabe6e4e" />

```

**Problemas visíveis:**
- Faltando o tempo de leitura da receita
- Aaixo da receita sem uma parte de comentários

#### Screenshots - Depois
```
<img width="1918" height="935" alt="image" src="https://github.com/user-attachments/assets/5b1cf05b-9775-4029-85c0-469fce76734f" />
<img width="1918" height="927" alt="image" src="https://github.com/user-attachments/assets/5eb4d797-41c4-4663-b9e0-4d74ee6bb3e1" />

```

**Melhorias visíveis:**
- Melhor visão sobre o tempo de leitura
- Aba de comentários funcionando normalmente

### 4. Vídeos Demonstrativos

- Demo Versão Original: (https://drive.google.com/file/d/11bHZsCKWE8RyK8yPQQS1eatzn2m5Hj63/view?pli=1)
- Demo Versão Melhorada: (https://drive.google.com/file/d/1SUwa2pxarg8B0l8toRi_axsU9yrq4bNe/view?usp=sharing)

---

## Aprendizados e Desafios

### 1. Principais Desafios Encontrados

#### Desafio 1: Persistência de comentários sem backend
- **Natureza**: Arquitetural
- **Como foi resolvido**: Armazenamento em uma única chave `recipe-comments` no `localStorage`, segmentada por `recipeId`.
- **Lição aprendida**: Sem backend, a modelagem de chaves precisa ser pensada para escalar com o conteúdo.

#### Desafio 2: Vincular identidade do usuário aos comentários
- **Natureza**: Integração
- **Como foi resolvido**: `RecipeComments` consome `UserContext` para nome e avatar.
- **Lição aprendida**: Centralizar identidade em um único contexto facilita novas funcionalidades sociais.

#### Desafio 3: Compatibilidade de dados antigos
- **Natureza**: Técnico
- **Como foi resolvido**: Migração automática no `RecipeContext` para receitas sem `isUserRecipe`, `servings` ou `prepTime`.
- **Lição aprendida**: Toda mudança de schema exige um plano de migração, mesmo no `localStorage`.

### 2. Decisões Técnicas Importantes

| Decisão | Alternativas | Escolha Final | Justificativa |
|---------|--------------|---------------|---------------|
| Persistência dos comentários | Backend, serviço externo | `localStorage` por receita | Alinhado à arquitetura local |
| Porções/tempo | Obrigatórios | Opcionais | Não quebrar receitas existentes |
| Confirmação de exclusão | Toast | `AlertDialog` | Prevenir exclusões acidentais |

### 3. O Que Faríamos Diferente
- Planejar o schema de receitas com todos os campos desde o início.
- Adicionar testes automatizados antes de iniciar as melhorias.

---

## Considerações de Segurança

### Vulnerabilidades do Projeto Original

| Vulnerabilidade | Severidade | Status |
|-----------------|------------|--------|
| Autenticação simulada | Alta | Limitação aceita |
| Dados sensíveis no `localStorage` | Média | Limitação da arquitetura |

### Melhorias de Segurança Implementadas
- ✅ Diálogo de confirmação antes de excluir receitas e comentários
- ✅ Proteção de receitas do sistema contra edição/exclusão
- ✅ Validação de tamanho dos campos de comentário (nome até 50, texto até 500)

---

## Impacto das Melhorias

### 1. Benefícios para Usuários Existentes
- Espaço para interagir socialmente em cada receita.
- Leitura mais informada (tempo de leitura, porções, tempo de preparo).

### 2. Novos Usuários Alcançados
- Usuários que buscam trocar experiências e dicas em torno das receitas.

### 3. Impacto Social Ampliado
A introduçao dos comentários transforma a plataforma em um espaço de troca culinária, incentivando o compartilhamento de variações, dicas e tradições em torno de cada receita.

---

## Referências

### Projeto Original
1. Documentação interna do Minha Cozinha (`DOCUMENTATION.md`, `README.md`)
2. Histórico de evolução do projeto local

### Referências Técnicas
1. Documentação React: https://react.dev
2. Documentação TypeScript: https://www.typescriptlang.org/docs
3. Documentação Tailwind CSS: https://tailwindcss.com/docs
4. Documentação shadcn/ui: https://ui.shadcn.com
5. Documentação React Router: https://reactrouter.com
6. Documentação Vite: https://vitejs.dev
7. FileReader API (MDN): https://developer.mozilla.org/docs/Web/API/FileReader
8. Web Storage API (MDN): https://developer.mozilla.org/docs/Web/API/Web_Storage_API

### Literatura Acadêmica
1. FOWLER, Martin. **Refactoring: Improving the Design of Existing Code**. 2ª ed. Addison-Wesley, 2018.
2. MARTIN, Robert C. **Código Limpo**. Alta Books, 2009.

---

## Validação das Melhorias

### Funcionalidades Originais
- [x] Todas as funcionalidades originais continuam funcionando
- [x] Nenhuma regressão introduzida
- [x] Dados existentes compatíveis (migração automática)

### Novas Funcionalidades/Melhorias
- [x] Sistema de comentários implementado (objetivo central)
- [x] Todas as melhorias complementares implementadas
- [x] Testadas manualmente
- [x] Código segue boas práticas

### Documentação
- [x] Documentação antiga do projeto passado (https://github.com/andrade-s/Melhorando-projeto-ja-feito/blob/main/DOCUMENTATION.md)
- [x] Documentação feita no início e fim das mudanças, atualizada para ficar totalmente de acordo.

### Qualidade Técnica
- [x] TypeScript em todo o código
- [x] Performance mantida
- [x] Validação com Zod
- [ ] Testes automatizados

---

## Changelog

### Versão 2.0 — maio de 2026

#### Adicionado
- Sistema de comentários por receita (objetivo principal), com curtidas, exclusão e persistência local
- Tempo estimado de leitura na página de detalhes
- Campos de porções e tempo de preparo nas receitas
- Exclusão de receitas com `AlertDialog` de confirmação
- Contador de receitas na home
- Funções `updateRecipe` e `deleteRecipe` no `RecipeContext`

#### Melhorado
- Página inicial com layout minimalista e maior espaçamento
- Cards de receitas exibem porções e tempo de preparo
- Documentação completa do projeto

#### Corrigido
- Receitas pré-prontas (IDs 1–3) não mostram opção de edição/exclusão
- Migração automática de receitas antigas sem `isUserRecipe`, `servings` ou `prepTime`

#### Segurança
- Diálogo de confirmação antes de excluir receitas e comentários
- Proteção de receitas do sistema contra modificação
- Validação de tamanho dos campos de comentário

#### Removido
- Sessões complexas e desnecessárias do perfil
- Abas de filtro redundantes

---

## Colaboração com Projeto Original

- [ ] Projeto original é open source
- [ ] Pull Request planejado
- [x] Equipe atual é também a autora original
- [x] Licença respeitada

---

## Conclusão

### Resumo das Conquistas

**Estatísticas Gerais:**
- ✅ 1 objetivo central concluído (sistema de comentários)
- ✅ 3 melhorias complementares implementadas (tempo de leitura, quantas receitas tem na home, sistema de curtir comentários)
- ✅ 2 correções relevantes (proteção de receitas do sistema e migração de dados)
- ✅ Nenhuma nova dependência adicionada

**Impacto:**
A iniciativa cumpriu seu objetivo principal — dar aos usuários um espaço de interação social em cada receita — e ainda entregou refinamentos (tempo de leitura, metadados, controle sobre o próprio conteúdo, perfil personalizável e redesign da home) que melhoraram a experiência geral do Minha Cozinha, mantendo a arquitetura 100% local.

### Próximos Passos (Pós-Disciplina)
- [ ] Testes automatizados
- [ ] Backend opcional para sincronização entre dispositivos
- [ ] Notificações de novos comentários
