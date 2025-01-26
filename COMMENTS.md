# Desafio Full Stack

Este projeto é uma aplicação full stack dividida em **front-end** e **back-end**, criada para atender aos requisitos do desafio proposto. A seguir, você encontrará informações sobre a arquitetura utilizada, bibliotecas empregadas, melhorias sugeridas e instruções adicionais.

# Preview
![ezgif-1-c15e870acc](https://github.com/user-attachments/assets/0b3e67c6-9f9b-444a-ae69-600f3899bf4d) <br>
[Vídeo](https://drive.google.com/file/d/1i9Vw2FKY93COQS3csDQfS6E4BuOnuFBA/view?usp=sharing)


## Arquitetura Utilizada

### Back-End
O back-end foi estruturado seguindo os princípios da **Clean Architecture**, com as seguintes camadas:

- **App**: Inicialização do servidor e configuração geral da aplicação.
- **Routes**: Definição das rotas e endpoints disponíveis na API.
- **Controller**: Camada responsável por processar as requisições e enviar respostas apropriadas.
- **Service**: Contém a lógica de negócios da aplicação.
- **Repositories**: Interação direta com o banco de dados.

Essa organização garante uma separação clara de responsabilidades, facilitando a escalabilidade e manutenção do código.

### Front-End
O front-end foi desenvolvido com **Vue 3** e **Vuetify**, utilizando **TypeScript** para tipagem estática e maior segurança no desenvolvimento. As principais características são:

- Interface amigável e responsiva com Vuetify.
- Comunicação com o back-end através de **Axios**.
- Organização de arquivos e componentes no padrão Vue.

### Banco de Dados
O banco de dados utilizado foi configurado com **PostgreSQL**, sendo gerenciado pelo **Prisma ORM**. Atualmente, o banco está em execução via Docker.

## Bibliotecas de Terceiros Utilizadas

### Back-End
- **Node.js** e **Express**: Para criação da API.
- **pg**: Biblioteca para interação com o PostgreSQL.
- **Prisma**: ORM para modelagem e manipulação de dados.
- **Jest**: Para testes unitários no back-end.

### Front-End
- **Vue 3**: Framework para construção da interface do usuário.
- **Vuetify**: Biblioteca de componentes para Vue.
- **Axios**: Para requisições HTTP.
- **Vite**: Ferramenta de build e desenvolvimento rápido.

## Melhorias Sugeridas
Se tivesse mais tempo, as seguintes melhorias seriam implementadas:

1. **Autenticação JWT**: Adicionar autenticação para proteger as rotas da API e gerenciar sessões de usuário.
2. **Testes no Front-End**: Criar testes unitários para os componentes e garantir a qualidade da interface.
3. **Dockerização Completa**: Configurar a aplicação inteira (front-end e back-end) para rodar no Docker.
4. **Documentação da API**: Utilizar uma ferramenta como Swagger para documentar os endpoints.

## Instruções para o rodar o projeto
- Para rodar este projeto, é necessário NodeJS, NPM e docker.
- Clone este repositório utilizando o link: `git clone <URL_DO_REPOSITORIO>`.
- Na pasta server, rode:
- docker-compose up -d | Para subir o banco postgres.
- npm i - para instalar as bibliotecas
- npx prisma migrate resolve | para setar as migrations no banco.
- npm run dev
- Na pasta client, rode:
- npm i - para instalar as bibliotecas.
- npm run dev

---
