# Delishare

Delishare é uma aplicação web para compartilhamento de receitas, com feed de postagens, perfil de usuário e gerenciamento de receitas. O projeto possui **frontend em React + TypeScript** e **backend em Node.js + Express**.

---

## Estrutura do Projeto

```
Delishare/
├── backend/       # API em Node.js/Express
├── frontend/      # Aplicação React + TypeScript
└── README.md
```

---

## Tecnologias

### Frontend

* React.js
* TypeScript
* Styled Components
* Formik
* React Router
* Lucide Icons

### Backend

* Node.js
* Express
* MySQL2
* TypeScript
* API REST

---

## Funcionalidades

* Cadastro e login de usuários
* Perfil de usuário com foto, bio e dados
* CRUD de receitas (criar, listar)
* Feed de postagens com descrição e imagem
* Filtro de receitas por usuário, refeição e dificuldade

---

## Pré-requisitos

* Node.js >= 18
* Yarn
* MySQL

---

## Setup

### Backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure o `.env` com as credenciais do MySQL.

4. Inicie o servidor:

```bash
yarn dev
```

---

### Frontend

1. Entre na pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

O frontend rodará normalmente em `http://localhost:5173` (ou porta configurada no Vite).

---

## Observações

* O backend deve estar rodando para que o frontend funcione corretamente.
* As imagens do feed e das receitas podem ser URLs externas ou base64.

---

## Contato

Desenvolvido por **Ruan Valença**
