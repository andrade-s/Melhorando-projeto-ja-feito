# Documentação - Minha Cozinha

## Visão Geral

**Minha Cozinha** é uma aplicação web para descobrir, compartilhar e organizar receitas culinárias. A plataforma permite aos usuários explorar receitas, adicionar novas receitas, pesquisar por ingredientes ou categorias, e gerenciar seu perfil.

## Funcionalidades Principais

### 1. **Página Inicial (Landing Page)**
- Apresentação do site com design atrativo
- Botões de call-to-action para registro e login
- Destaques das funcionalidades principais

### 2. **Sistema de Autenticação**
- Página de Login (`/login`)
- Página de Cadastro (`/cadastro`)
- Gerenciamento de sessão do usuário

### 3. **Catálogo de Receitas**
- Listagem de todas as receitas disponíveis (`/receitas`)
- Cards de receitas com imagem, título, ingredientes e categoria
- Busca em tempo real por título, ingredientes ou categoria
- Navegação para detalhes de cada receita

### 4. **Detalhes da Receita**
- Visualização completa de uma receita (`/receita/:id`)
- Imagem em destaque
- Lista de ingredientes
- Modo de preparo passo a passo
- Categoria da receita
- Data de criação

### 5. **Adicionar Nova Receita**
- Formulário para criar novas receitas (`/nova-receita`)
- Campos: título, imagem, ingredientes, modo de preparo, categoria
- Validação de dados
- Persistência local das receitas

### 6. **Perfil do Usuário**
- Visualização e edição de dados do usuário (`/perfil`)
- Informações: nome, email, data de entrada, biografia
- Persistência de dados do usuário

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                    # Componentes UI do shadcn
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── FloatingAddButton.tsx  # Botão flutuante para adicionar receitas
│   ├── RecipeCard.tsx         # Card de exibição de receita
│   └── SearchBar.tsx          # Barra de busca
│
├── context/
│   ├── RecipeContext.tsx      # Gerenciamento de estado das receitas
│   └── UserContext.tsx        # Gerenciamento de estado do usuário
│
├── pages/
│   ├── Index.tsx              # Página inicial (landing page)
│   ├── Login.tsx              # Página de login
│   ├── Cadastro.tsx           # Página de cadastro
│   ├── Receitas.tsx           # Listagem de receitas
│   ├── RecipeDetail.tsx       # Detalhes de uma receita
│   ├── NovaReceita.tsx        # Formulário de nova receita
│   ├── PerfilUsuario.tsx      # Perfil do usuário
│   └── NotFound.tsx           # Página 404
│
├── hooks/
│   ├── use-mobile.tsx         # Hook para detectar dispositivos móveis
│   └── use-toast.ts           # Hook para notificações toast
│
├── lib/
│   └── utils.ts               # Funções utilitárias
│
├── App.tsx                    # Componente raiz com rotas
├── main.tsx                   # Ponto de entrada da aplicação
└── index.css                  # Estilos globais e design system
```

## Design System

O projeto utiliza um design system baseado em tokens CSS definidos em `index.css` e `tailwind.config.ts`:

### Cores Principais
- **Primary**: Cor principal da marca
- **Secondary**: Cor secundária
- **Accent**: Cor de destaque
- **Background**: Cor de fundo
- **Foreground**: Cor de texto
- **Muted**: Cores suavizadas para elementos secundários

### Componentes Temáticos
- Gradientes personalizados para cards
- Estilos responsivos
- Suporte a modo escuro/claro
- Animações e transições suaves

## Gerenciamento de Estado

### RecipeContext
Gerencia o estado global das receitas:
- **recipes**: Array de todas as receitas
- **addRecipe(recipe)**: Adiciona uma nova receita
- **getRecipeById(id)**: Busca uma receita por ID
- Persistência em `localStorage`

```typescript
interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  preparation: string;
  category: string;
  createdAt: string;
}
```

### UserContext
Gerencia o estado do usuário:
- **user**: Dados do usuário atual
- **updateUser(userData)**: Atualiza dados do usuário
- Persistência em `localStorage`

```typescript
interface User {
  name: string;
  email: string;
  joinDate: string;
  bio: string;
}
```

## Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | Index | Página inicial |
| `/login` | Login | Página de login |
| `/cadastro` | Cadastro | Página de cadastro |
| `/receitas` | Receitas | Listagem de receitas |
| `/receita/:id` | RecipeDetail | Detalhes de uma receita |
| `/receita/:id/editar` | EditarReceita | Editar receita existente |
| `/nova-receita` | NovaReceita | Criar nova receita |
| `/perfil` | PerfilUsuario | Perfil do usuário |
| `*` | NotFound | Página 404 |

## Componentes Principais

### RecipeCard
Card reutilizável para exibir receitas:
- Imagem com efeito hover
- Título da receita
- Lista de ingredientes (resumida)
- Badge de categoria
- Navegação para detalhes ao clicar

### SearchBar
Barra de busca com:
- Input de texto
- Ícone de busca
- Atualização em tempo real

### FloatingAddButton
Botão de ação flutuante:
- Posicionamento fixo no canto inferior direito
- Navegação para página de nova receita
- Ícone de "+"

## Tecnologias Utilizadas

- **React 18**: Biblioteca para construção de interfaces
- **TypeScript**: Superset JavaScript com tipagem estática
- **Vite**: Build tool e dev server
- **React Router DOM**: Roteamento de páginas
- **Tailwind CSS**: Framework de estilização utilitária
- **shadcn/ui**: Componentes UI acessíveis e customizáveis
- **Lucide React**: Biblioteca de ícones
- **TanStack Query**: Gerenciamento de estado assíncrono
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm

### Instalação

1. Clone o repositório ou baixe o projeto

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

### Informações Adicionais

Para instruções detalhadas de instalação e solução de problemas, consulte o arquivo `COMO-RODAR.txt` na raiz do projeto.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria build de produção
- `npm run preview`: Visualiza build de produção localmente
- `npm run lint`: Executa linter

## Persistência de Dados

O projeto utiliza `localStorage` para persistir dados localmente no navegador:

- **Receitas**: Armazenadas em `localStorage` com chave definida no `RecipeContext`
- **Usuário**: Dados armazenados em `localStorage` com chave `"user"`

### Dados Iniciais

O projeto vem com 3 receitas de exemplo:
1. Pizza Margherita
2. Macarrão à Carbonara
3. Torta de Limão

## SEO e Metadados

O arquivo `index.html` inclui:
- Meta tags para SEO
- Open Graph tags para compartilhamento em redes sociais
- Twitter Card tags
- Descrição e autor
- Viewport configurado para responsividade

## Responsividade

O site é totalmente responsivo, com breakpoints configurados para:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## Segurança

**Nota importante**: Este projeto é uma demonstração frontend e não possui autenticação real. Para implementar autenticação segura em produção, considere:

- Integrar com um backend real
- Implementar autenticação JWT
- Adicionar validação server-side
- Implementar HTTPS
- Sanitizar inputs do usuário

## Melhorias Futuras

Possíveis melhorias para o projeto:

1. **Backend Real**
   - Integração com banco de dados
   - API REST ou GraphQL
   - Autenticação segura

2. **Funcionalidades Adicionais**
   - Sistema de avaliações e comentários
   - Favoritar receitas
   - Compartilhamento em redes sociais
   - Upload de imagens
   - Categorias dinâmicas
   - Sistema de tags

3. **Melhorias de UX**
   - Modo escuro/claro toggle
   - Animações mais elaboradas
   - Loading states
   - Error boundaries
   - Paginação de receitas

4. **Performance**
   - Lazy loading de imagens
   - Code splitting
   - Service Workers / PWA
   - Otimização de bundle

## Licença

Este projeto é um exemplo educacional.

## Contribuindo

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

