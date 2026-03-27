# Minha Cozinha

**Minha Cozinha** é uma aplicação web moderna para descobrir, compartilhar e organizar receitas culinárias. 

## Sobre o Projeto

Uma plataforma completa para amantes da culinária que permite explorar receitas, adicionar suas próprias criações, pesquisar por ingredientes, e gerenciar seu perfil pessoal.

## Início Rápido

Consulte o arquivo **[COMO-RODAR.txt](COMO-RODAR.txt)** para instruções detalhadas de como executar o projeto localmente.

Para documentação completa das funcionalidades e arquitetura do projeto, veja **[DOCUMENTATION.md](DOCUMENTATION.md)**.

## Como editar o código

Existem várias formas de editar a aplicação:

### Usar seu IDE preferido

Se você deseja trabalhar localmente usando seu próprio IDE, você pode clonar este repositório e fazer push das mudanças.

O único requisito é ter Node.js e npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto
git clone <SUA_URL_GIT>

# Passo 2: Navegue até o diretório do projeto
cd <NOME_DO_SEU_PROJETO>

# Passo 3: Instale as dependências necessárias
npm i

# Passo 4: Inicie o servidor de desenvolvimento com auto-reload e preview instantâneo
npm run dev
```

### Editar um arquivo diretamente no GitHub

- Navegue até o(s) arquivo(s) desejado(s)
- Clique no botão "Edit" (ícone de lápis) no canto superior direito da visualização do arquivo
- Faça suas alterações e commit as mudanças

### Usar GitHub Codespaces

- Navegue até a página principal do seu repositório
- Clique no botão "Code" (botão verde) próximo ao canto superior direito
- Selecione a aba "Codespaces"
- Clique em "New codespace" para iniciar um novo ambiente Codespace
- Edite os arquivos diretamente dentro do Codespace e faça commit e push das suas alterações quando terminar

## Tecnologias

Este projeto foi construído com:

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI
- **React Router DOM** - Roteamento
- **TanStack Query** - Gerenciamento de estado
- **Lucide React** - Ícones

## Funcionalidades

- Catálogo de receitas com busca em tempo real
- Visualização detalhada de receitas
- Adicionar e editar receitas
- Sistema de autenticação (login/cadastro)
- Perfil de usuário personalizável
- Design responsivo para todos os dispositivos
- Persistência de dados local (localStorage)

## Documentação

- **[COMO-RODAR.txt](COMO-RODAR.txt)** - Guia passo a passo para rodar localmente
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Documentação técnica completa
