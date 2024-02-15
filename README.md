# 🛒 Audiophile Ecommerce

![TypeScript badge](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Mongodb badge](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

<img width="800px" src="https://github.com/nalbertcerqueira/nalbertcerqueira/assets/105606295/0013671f-449a-4ad2-919d-c6baba8bfd77">

## 📋 Descrição

Audiophile ecommerce se trata de um projeto desenvolvido a partir de um dos desafios encontrados na página da [Frontend Mentor](https://www.frontendmentor.io), tendo como principal objetivo o desenvolvimento de uma aplicação fullstack em Next.js, como também, consolidar conceitos relacionados a autenticação e autorização pelo protocolo OAuth e o uso de sessões anônimas.

⚡ Link da aplicação! 🔗 [Audiophile ecommerce](https://audiophile-ecommerce-delta.vercel.app/)


### Principais funcionalidades

-   🟢 Login tradicional
-   🟢 Cadastro de usuários
-   🟢 OAuth login
-   🟢 Sessão anônima
-   🟢 Carrinho de compras (adição e remoção de produtos)
-   🟢 Checkout do carrinho
-   ⚪ Painel do usuário (em breve...)
  
### Rotas da API

#### Rotas privadas 🔐

| **Método** | **Rota**                   | **Descrição**                             |
| ---------- | -------------------------- | ----------------------------------------- |
| GET        | `/api/auth/user`           | Obtém os dados do usuário ao inciar a sessão  |
| GET        | `/api/auth/cart`           | Obtém o carrinho de compras do usuário    |
| DELETE     | `/api/auth/cart`           | Remove todos os produtos do carrinho      |
| POST       | `/api/auth/cart/items`     | Adiciona um item ao carrinho              |
| DELETE     | `/api/auth/cart/items/:id` | Remove o item cujo id = ':id' do carrinho |
| POST       | `/api/auth/checkout`       | Efetua o checkout da compra               |
| GET       | `/api/auth/checkout/taxes` | Obtém as taxas relacionadas a compra      |

#### Rotas públicas 🛤️

| **Método** | **Rota**                  | **Descrição**                                           |
| ---------- | ------------------------- | ------------------------------------------------------- |
| POST       | `/api/signin`             | Efetua o login do usuário retornando um token de acesso |
| POST       | `/api/signup`             | Cadastra um usuário na aplicação                        |
| POST       | `/api/auth/signin/google` | Efetua o login através do google                        |
| POST       | `/api/auth/signin/github` | Efetua o login através do github                        |

## 🎮 Iniciando o projeto

1. Clone este repositório;
2. Baixe as dependências deste projeto com `npm install`;
3. Crie um arquivo `.env` na raiz do projeto contendo as variáveis de ambiente em `.env.sample` com valores de sua preferência.
4. Inicie a aplicação com `npm run dev`;
5. Navegue até `http://localhost:3000` para visualizar a aplicação.

## 🚀 Tecnologias utilizadas

-   Typescript
-   React
-   Next.js
-   Mongodb
-   Next auth
-   Zod
-   React hook form
-   Sass
-   Jose
-   Bcrypt

## 📝 Licença

MIT License © [MIT License ](./LICENSE)
