# Documentacao de Melhorias em Projeto Existente

## Informacoes Basicas

### Nome do Projeto Original
`Minha Cozinha`

### Nome da Iniciativa de Melhorias
`Minha Cozinha 2.0`

### Equipe de Melhorias
| Nome | GitHub | Papel Principal |
|------|--------|-----------------|
| Diogo Andrade Ferreira | andrade-s | Desenvolvedor |
| Vinicius Pimentel da Silva | Pxmentel | Desenvolvedor |
| Paulo Sérgio Inácio | cibershaman | Desenvolvedor |
| Ryan Costa Pereira | RyanCostaP | Desenvolvedor |

### Repositorios
- **Projeto Original**: Projeto pessoal

---

## Contexto do Projeto Original

### 1. Descrição do Projeto Original

#### Propósito
O projeto Minha Cozinha e uma aplicação web para descobrir, compartilhar e organizar receitas culinárias. Permite aos usuarios explorar receitas, adicionar novas criações, pesquisar por ingredientes ou categorias e gerenciar seu perfil pessoal.

#### Origem do Projeto
- [ ] Projeto pessoal anterior
- [x] Projeto de outra disciplina
- [ ] Projeto de trabalho/empresa
- [ ] Projeto open source
- [ ] Outro

**Detalhes:**
- **Quando foi criado:** 2025
- **Contexto:** Criado para usuários organizarem suas proprías receitas
- **Desenvolvedor(es) original(is):** Diogo Andrade, Vinicius Pimentel, Paulo Sérgio, Ryan Costa
- **Status atual:** Em manutenção e evolução

### 2. Funcionalidades Existentes

#### Funcionalidades Implementadas
- ✅ **Pagina Inicial**: Landing page com apresentação do site e botões de login / registro
- ✅ **Sistema de Autenticação**: Páginas de login e cadastro com gerenciamento de sessão
- ✅ **Catálogo de Receitas**: Listagem de receitas com cards contendo imagem, título, ingredientes e categoria
- ✅ **Busca em Tempo Real**: Pesquisa por título, ingredientes ou categoria
- ✅ **Detalhes da Receita**: Visualização completa com imagem, ingredientes, modo de preparo e categoria
- ✅ **Adicionar Receita**: Formulário para criar novas receitas com validação
- ✅ **Perfil do Usuário**: Visualização e edição de dados pessoais

#### Casos de Uso Existentes

1. **Explorar Receitas**
   - Ator: Usuário visitante
   - Fluxo: Acessa a página de receitas, visualiza os cards, usa a busca para filtrar
   - Resultado: Encontra receitas de interesse

2. **Criar Nova Receita**
   - Ator: Usuário autenticado
   - Fluxo: Clica no botao flutuante "+", preencha o formulário, salva
   - Resultado: Nova receita adicionada ao catálogo

3. **Gerenciar Perfil**
   - Ator: Usuário autenticado
   - Fluxo: Acessa a página de perfil, edita informacões pessoais
   - Resultado: Dados do perfil atualizados

### 3. Stack Tecnologica Original

| Componente | Tecnologia | Versao |
|------------|------------|--------|
| **Frontend** | React | 18.3.1 |
| **Linguagem** | TypeScript | 5.8.3 |
| **Build Tool** | Vite | 5.4.19 |
| **Estilizacao** | Tailwind CSS | 3.4.17 |
| **Componentes UI** | shadcn/ui | - |
| **Roteamento** | React Router DOM | 6.30.1 |
| **Estado Assincrono** | TanStack Query | 5.83.0 |
| **Ícones** | Lucide React | 0.462.0 |
| **Formularios** | React Hook Form | 7.61.1 |
| **Validação** | Zod | 3.25.76 |

### 4. Arquitetura Atual

```
┌─────────────────────────────────┐
│     Frontend React + Vite       │
│   (SPA - Single Page App)       │
└───────────┬─────────────────────┘
            │
            ↓
┌─────────────────────────────────┐
│   Context API (Estado Global)   │
│  RecipeContext + UserContext    │
└───────────┬─────────────────────┘
            │
            ↓
┌─────────────────────────────────┐
│   localStorage (Persistencia)   │
└─────────────────────────────────┘
```

**Descrição dos componentes:**
- **Frontend**: Aplicação React com TypeScript, usando componentes shadcn/ui e Tailwind CSS
- **Estado Global**: Context API do React para gerenciar receitas e dados do usuário
- **Persistência**: localStorage do navegador para armazenar dados localmente

---

## Análise de Limitações

### 1. Limitações Identificadas

#### Limitação 1: Sem Interações Sociais
- **Categoria**: [x] Funcional
- **Descrição**: Não existe sistema de comentários entre usuários
- **Impacto**: A plataforma não promove interações entre os usuários a respeito da receita
- **Frequência**: [x] Médio

### 2. Análise SWOT do Projeto Original

#### Forças (Strengths)
- Interface limpa e minimalista
- Design responsívo para todos os dispositivos
- Busca em tempo real eficiente
- Formulários com validação robusta (Zod + React Hook Form)
- Código bem organizado com TypeScript

#### Fraquezas (Weaknesses)
- Persistência apenas local
- Sem interações sociais
  
#### Oportunidades (Opportunities)
- Funcionalidades sociais
  
#### Ameaças (Threats)
- Perda de dados por limpeza de cache do navegador
- Sem proteção contra manipulação de dados no localStorage

---

## Melhorias Propostas

### 1. Objetivos das Melhorias

1. **Objetivo 1**: Aba de comentários e uma forma de favoritar as receitas
   - Justificativa: Permitir usuários comentarem sobre a receita, comentando sobre como ela poderia ser melhor, e uma forma de salvar as receitas que você já fez, se o números de receitas subir demais
   - Metricas de sucesso: Usuario consegue comentar e favoritar sem erros
     
### 2. Melhorias Planejadas

#### Melhoria 1: Aba de comentários

**Categoria**: [x] Nova Funcionalidade

**Problema que resolve:**
> Usuários poderão comentar a respetio de uma receita e poder salvar ela

**Solucão proposta:**
> criar uma aba de comentário com sistema de curtidas

**Justificativa técnica:**
> Uma maneira dos usuários saberem o que os outros usuários acharam da receita

**Impacto esperado:**
> Um aumento nas interações sociais 

**Complexidade**: [x] Baixa

**Tempo estimado**: 1-2 semanas

**Responsável**: [Grupo todo em conjunto]


### 3. Melhorias Consideradas mas NÃO Incluidas

| Melhoria | Por que nao sera implementada agora |
|----------|-------------------------------------|
| Backend com banco de dados | Mantemos a arquitetura 100% local por escopo acadêmico |
| Modo offline | Complexidade adicional fora do escopo atual |

---

## Especificações Tecnicas das Melhorias

### 1. Mudancas na Arquitetura

A arquitetura geral permanece a mesma, com adição de novas funções no contexto existente:

```
┌─────────────────────────────────────────┐
│         Frontend React + Vite           │
└───────────┬─────────────────────────────┘
            │
            ↓
┌─────────────────────────────────────────┐
│      Context API (Estado Global)        │
│      RecipeContext (+ comentários)      │
│      UserContext                        │
└───────────┬─────────────────────────────┘
            │
            ↓
┌─────────────────────────────────────────┐
│   localStorage (Persistência Local)     │
└─────────────────────────────────────────┘
```

**Mudancas principais:**
- Adição da aba de comentários
- Adição do tempo médio de leitura

### 2. Novas Tecnologias/Bibliotecas

Liste novas dependências que serão adicionadas:

Nenhuma nova biblioteca será adicionada. Todas as melhorias usam APIs nativas do navegador e as tecnologias já presentes no projeto.

### 3. Migracoes Necessarias

à decidir 

---

## Plano de Implementacao

### Cronograma

#### Fase 1: Analise e Preparacao
- [x] Analise do código existente
- [x] Documentação da arquitetura atual
- [x] Identificação de pontos críticos
- [x] Planejamento das melhorias

#### Fase 2: Implementacao das Melhorias - Parte 1

#### Fase 3: Implementação - Parte 2

#### Fase 4: Finalização
- [x] Testes manuais de todas as funcionalidades (antigas e novas)
- [x] Atualização da documentação
- [x] Revisão final
  
### Estrategia de Testes

**Como garantir que não quebramos o que já funcionava:**
- [x] Testes manuais de todas funcionalidades existentes
- [x] Comparacao lado a lado (versao antiga vs nova)
- [ ] Testes automatizados
- [ ] Testes com usuários reais

---

#### 1. Comparativo de Funcionalidades

| Funcionalidade | Versão Original | Versão melhorada | Status |
|----------------|-----------------|------------------|--------| 

#### 2. Metricas de Melhoria

#### Perfomance

#### Usabilidade

#### Código

#### 3. Evidências Visuais

### Screenshots - Antes

### Problemas visíveis:

### Screenshots - Depois

### Melhorias visíveis:

#### Comparacao Antes/Depois

#### 4. Vídeos Demonstrativos

Demo Versão Original: [Link]
Demo Versão Melhorada: [Link]
Comparação Lado a Lado: [Link]

---

## Aprendizados e Desafios

### 1. Principais Desafios Encontrados

#### Desafio 1: 
- **Natureza do problema**:
- **Como foi resolvido**:
- **Lição aprendida**: 
 
### 2. Decisões Técnicas Importantes

| Decisão | Alternativas Consideradas | Escolha Final | Justificativa |
|---------|---------------------------|---------------|---------------|

### 3. O Que Fariamos Diferente

- 
- 
- 

---

## Consideracoes de Seguranca

### Vulnerabilidades do Projeto Original

| Vulnerabilidade | Severidade | Status |
|Dados sensíveis no localStorage|Média|Não corrigido (limitação da arquitetura)|

### Melhorias de Segurança Implementadas

-
-
-

---

## Impacto das Melhorias

### 1. Benefícios para Usuários Existentes
- 
- 
- 

### 2. Novos Usuarios Alcancados
- 
- 

### 3. Impacto Social Ampliado
-

---

## Referencias

### Projeto Original
1. Projeto pessoal atualizado em 2026

### Pesquisa para melhorias
1. (a preencher)

### Referências Técnicas
1. Documentação React: https://react.dev
2. Documentação TypeScript: https://www.typescriptlang.org/docs
3. Documentação Tailwind CSS: https://tailwindcss.com/docs
4. MDN Web Docs - FileReader API: https://developer.mozilla.org/docs/Web/API/FileReader
5. MDN Web Docs - Blob: https://developer.mozilla.org/docs/Web/API/Blob 

### Literaturas Acadêmicas
1. FOWLER, Martin. Refactoring: Improving the Design of Existing Code. 2ª ed. Addison-Wesley, 2018.
2. MARTIN, Robert C. Código Limpo. Alta Books, 2009.

---

## Validação das Melhorias

### Checklist de Qualidade

#### Funcionalidades Originais

#### Novas Funcionalidades/Melhorias

#### Documentação

#### Qualidade Técnica

---

## Changelog

### Versao 2.0 - maio de 2026

#### Adicionado
- Parte de comentários da receita
- Tempo de leitura da receita
  
#### Corrigindo
- Aparecendo o total de receitas no perfil ao invês das receitas que o usuário adicionou

#### Melhorado
- Interações sociais na página da receita
- Tempo médio de leitura da receita

#### Segurança
- 

#### Removido
- 

#### Deprecated
-

---

## Conclusão

### Resumo das Conquistas

**Estatisticas Gerais:**
- ✅ [3] melhorias implementadas
- ✅ [1] bugs corrigidos
- ✅ [100]% melhoria de perfomance
- ✅ [2] novas funcionalidades

**Impacto:**
-

### Proximos Passos

- 
