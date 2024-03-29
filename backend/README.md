# Desafio Faster Backend

Bem-vindo ao Desafio Faster Backend, uma API que facilita a criação de perfis de usuário, autenticação e busca de bebidas, incluindo a opção de favoritar bebidas. Este projeto é voltado para desenvolvedores que buscam uma solução backend robusta para gerenciar usuários e dados relacionados a bebidas.

## Visão Geral

O objetivo principal do projeto é fornecer um backend MVC eficiente para criar e gerenciar perfis de usuários, autenticação segura e funcionalidades relacionadas a bebidas. Algumas funcionalidades chave incluem:

- **Criação de Perfil:** Os usuários podem criar perfis facilmente.
- **Autenticação Segura:** Sistema seguro de autenticação para proteger informações sensíveis.
- **Busca de Bebidas:** Recursos para buscar categorias e bebidas específicas.
- **Favoritos:** Os usuários podem marcar bebidas como favoritas.

## Documentação

Explore as documentações para entender melhor como usar a API:

- **Documentação Externa:** [Documentação Externa](http://localhost:3000/docs/public)
  ![Documentação Externa](./public/swagger.gif)
- **Documentação Interna:** [Documentação Interna](http://localhost:3000/docs/private)
  ![Documentação Interna](./public/interno.gif)

## Como Rodar o Projeto

Siga estes passos para configurar e iniciar o projeto:

1. Use `npm run docker:bash` para entrar no container.
2. Use `npm run project:first-setup` para configurar o projeto pela primeira vez (isso instalará dependencias, rodará migrações, e ira configurar o projeto)
3. Inicie o servidor local com `npm run start:dev`.

Para rodar em produção, utilize `npm run build` e, em seguida, `npm run start:prod`.

Explore, experimente e aproveite o Desafio Faster Backend!