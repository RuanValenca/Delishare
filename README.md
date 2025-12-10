# Delishare

Delishare é uma aplicação web para compartilhamento de receitas, com feed de postagens, perfil de usuário e gerenciamento de receitas. O projeto possui **frontend em React + TypeScript** e **backend em Node.js + Express**.

---

## Estrutura do Projeto

```
Delishare/
├── backend/       # API em Node.js/Express
├── FrontEnd/      # Aplicação React + TypeScript
└── README.md
```

---

## Tecnologias

### Frontend

- React.js
- TypeScript
- Styled Components
- Formik
- React Router
- Lucide Icons

### Backend

- Node.js
- Express
- PostgreSQL (Supabase)
- TypeScript
- API REST

---

## Funcionalidades

- Cadastro e login de usuários
- Perfil de usuário com foto, bio e dados
- CRUD de receitas (criar, listar)
- Feed de postagens com descrição e imagem
- Filtro de receitas por usuário, refeição e dificuldade

---

## Pré-requisitos

- Node.js >= 18
- Yarn
- PostgreSQL (ou Supabase)

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

3. Configure o `.env` com as credenciais do PostgreSQL/Supabase (veja exemplo abaixo):

   ```env
   # Opção 1: Use DATABASE_URL (recomendado para Supabase)
   DATABASE_URL=postgresql://usuario:senha@host:porta/database

   # Opção 2: Ou use as variáveis individuais
   # DB_HOST=localhost
   # DB_USER=postgres
   # DB_PASSWORD=sua_senha
   # DB_NAME=delishare
   # DB_PORT=5432
   # DB_SSL=false

   PORT=3000
   BACKEND_URL=http://localhost:3000
   ```

4. Inicie o servidor:

```bash
yarn dev
```

---

### Frontend

1. Entre na pasta do frontend:

```bash
cd FrontEnd
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure o `.env` com a URL da API (veja exemplo abaixo):

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

O frontend rodará normalmente em `http://localhost:5173` (ou porta configurada no Vite).

---

---

## Deploy para Produção

### Preparação

Antes de fazer deploy, você precisa configurar as variáveis de ambiente para produção:

#### Backend

1. Configure as variáveis de ambiente no seu serviço de hospedagem (Railway, Vercel, etc):

```env
# Opção 1: Use DATABASE_URL (recomendado para Supabase)
DATABASE_URL=postgresql://usuario:senha@host:porta/database

# Opção 2: Ou use as variáveis individuais
# DB_HOST=seu_host_postgres
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_NAME=delishare
# DB_PORT=5432
# DB_SSL=true

PORT=3000
BACKEND_URL=https://seu-dominio-backend.com
NODE_ENV=production
```

2. Build do backend:

```bash
cd backend
yarn install
yarn build
yarn start
```

#### Frontend

1. Crie um arquivo `.env` na pasta `FrontEnd/` com:

```env
VITE_API_URL=https://seu-dominio-backend.com
```

2. Build do frontend:

```bash
cd FrontEnd
yarn install
yarn build
```

O build será gerado na pasta `dist/`, que você pode servir com qualquer servidor estático (Netlify, Vercel, etc).

### Pontos Importantes para Deploy

1. **CORS**: Certifique-se de que a variável `FRONTEND_URL` no backend aponte para o domínio do seu frontend em produção.

2. **Banco de Dados**: Configure um banco PostgreSQL em produção (ex: Supabase, AWS RDS, Railway, ou outro serviço).

3. **Servir arquivos estáticos**: O backend já está configurado para servir imagens da pasta `public/images/`. Certifique-se de que essa pasta tenha as permissões corretas no servidor.

4. **Variáveis de ambiente**: Nunca commite arquivos `.env` com credenciais reais. Use variáveis de ambiente do seu provedor de hospedagem.

---

## Observações

- O backend deve estar rodando para que o frontend funcione corretamente.
- As imagens do feed e das receitas podem ser URLs externas ou base64.
- Para desenvolvimento local, o frontend usa `http://localhost:5173` e o backend `http://localhost:3000` como padrão.

---

## Contato

Desenvolvido por **Ruan Valença**
