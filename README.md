# API de teste

Uma API de gerenciamento de tarefas com autenticação de usuários, construída com Node.js, Express e MongoDB. Permite que usuários criem contas, façam login e gerenciem suas tarefas utilizando autenticação JWT.

---

## Índice

- [Ideia do Projeto](#ideia-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Como Utilizar a API](#como-utilizar-a-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Melhorias Futuras](#melhorias-futuras)

---

## Ideia do Projeto

O FlowTask nasceu com a ideia de ser uma aplicação simples de **lista de tarefas** (To-do List) com **autenticação**, oferecendo uma base sólida para construir sistemas mais robustos. Foi criado com foco em aprendizado, boas práticas e segurança básica utilizando JWT e validações de entrada.

---

## Funcionalidades

- Registro de usuários com validação de dados
- Login com geração de token JWT
- Middleware para rotas protegidas
- CRUD completo de tarefas:
  - Criar tarefa
  - Listar tarefas do usuário autenticado
  - Atualizar tarefa
  - Deletar tarefa
- Proteção básica contra ataques com express-rate-limit

---

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Banco de Dados**: MongoDB, Mongoose
- **Autenticação**: JSON Web Token (JWT)
- **Validação**: express-validator
- **Criptografia**: bcrypt
- **Segurança**: express-rate-limit, CORS

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- MongoDB local ou Atlas
- Um arquivo `.env` com as seguintes variáveis:

```env
MONGO_URL="Sua url mongo db"
SECRET=sua_chave_secreta_jwt
```

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/WilliamAlmeida1/TesteAPINodeJS.git
cd TesteAPINodeJS
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

---

## Como Utilizar a API

### Teste rápido

Você pode testar com ferramentas como **Insomnia** ou **Postman**.

### Endpoints principais

#### Registro

`POST /api/auth/register`

```json
{
  "name": "Usuário Teste",
  "email": "teste@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

#### Login

`POST /api/auth/login`

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```

Retorna um token JWT que deve ser usado nas demais rotas protegidas.

#### Criar Tarefa

`POST /api/tasks`  
**Headers**: Authorization: `Bearer <token>`

```json
{
  "title": "Nova tarefa",
  "description": "Descrição da tarefa"
}
```

#### Listar Tarefas

`GET /api/tasks`  
**Headers**: Authorization: `Bearer <token>`

#### Atualizar Tarefa

`PUT /api/tasks/:id`  
**Headers**: Authorization: `Bearer <token>`

```json
{
  "title": "Título atualizado",
  "description": "Nova descrição",
  "completed": true
}
```

#### Deletar Tarefa

`DELETE /api/tasks/:id`  
**Headers**: Authorization: `Bearer <token>`

---

## Estrutura do Projeto

```
.
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── checkToken.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── auth.js
│   └── tasks.js
├── app.js
├── .env
└── package.json
```

---

## Melhorias Futuras

- Implementar refresh tokens
- Validação mais robusta de entrada
- Reset de senha
- Paginação nas tarefas
- Interface Frontend integrada (React)

---

> Projeto desenvolvido como estudo de arquitetura backend segura com autenticação, validação e integração com banco de dados MongoDB.
