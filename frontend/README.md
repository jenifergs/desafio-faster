# Projeto Nuxt com TypeScript
Este projeto é uma aplicação Vue.js com TypeScript. Ele utiliza o Nuxt.js e segue um padrão MVC

- src/: O diretório principal do código fonte.
- assets/: Contém arquivos estáticos como CSS.
- components/: Contém os componentes Vue.
- pages/: Contém as páginas Vue.
- services/: Contém os serviços para interagir com APIs.
- nuxt.config.js: Configuração do Nuxt.js.
- tsconfig.json: Configuração do TypeScript.
- package.json: Contém os scripts e dependências do projeto.

## Easy to Run
> Essa sessão explica como excutar rapidamente esse projeto
  
Consideramos que nesse ponto você já tenha executado o docker compose up -d na raiz do projeto, e partir dai então os passos são os seguintes:

1. Executar o script `npm run docker:bash` esse script deixará você acessar o projeto 
2. Executar o script `npm run project:first-setup` esse é o comando que você precisará executar para deixar o projeto pronto para subir
3. Executar o script `npm run dev` isso deixará o projeto ativo na porta 3001 [Bem-Aqui](http://localhost:3001)

## Scripts
> Os scripts do projeto estão definidos no arquivo package.json. Aqui estão alguns dos mais importantes:

- yarn dev: Inicia o servidor de desenvolvimento.
- yarn build: Compila o projeto para produção.
- yarn start: Inicia o servidor de produção.
- yarn test: Executa os testes do projeto.
## Dependências

> Algumas das principais dependências deste projeto incluem:

- vue: O framework Vue.js.
- nuxt: O framework Nuxt.js para Vue.js.
- typescript: O compilador TypeScript.
- babel: O compilador Babel para JavaScript moderno.
- eslint: O linter ESLint para JavaScript e TypeScript.
- prettier: O formatador de código Prettier.
- Para instalar as dependências, você pode usar o comando npm  install.
## Configuração
Este projeto usa várias ferramentas de configuração:

.babelrc: Configuração do Babel.
.eslintrc.js: Configuração do ESLint.
.prettierrc: Configuração do Prettier.
jest.config.js: Configuração do Jest.
tsconfig.json: Configuração do TypeScript.
## Docker
Este projeto também inclui um Dockerfile para a criação de um contêiner Docker para o projeto. Para construir a 

```