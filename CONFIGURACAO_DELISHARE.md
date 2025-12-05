# Configuração do Delishare - Usando domínio customizado

Para usar "delishare" ao invés de "localhost", siga os passos abaixo:

## 1. Configurar o arquivo hosts do sistema

### Windows

Edite o arquivo `C:\Windows\System32\drivers\etc\hosts` como administrador e adicione:

```
127.0.0.1    delishare
```

### Linux/Mac

Edite o arquivo `/etc/hosts` e adicione:

```
127.0.0.1    delishare
```

## 2. Configurar variáveis de ambiente

### Backend (.env)

Crie um arquivo `.env` na pasta `backend/`:

```env
# Configuração do Banco de Dados
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=delishare

# URL do Backend (opcional)
BACKEND_URL=http://delishare:3000

# URL do Frontend para CORS (opcional)
FRONTEND_URL=http://delishare:5173

# Porta do servidor (opcional)
PORT=3000
```

### Frontend (.env)

Crie um arquivo `.env` na pasta `FrontEnd/`:

```env
# URL da API Backend
VITE_API_URL=http://delishare:3000

# Host do servidor de desenvolvimento (opcional)
VITE_HOST=delishare

# Porta do servidor de desenvolvimento (opcional)
VITE_PORT=5173
```

## 3. Acessar a aplicação

Após configurar, acesse:

- **Frontend**: http://delishare:5173
- **Backend**: http://delishare:3000

## Notas

- Se não configurar as variáveis de ambiente, o sistema usará "delishare" como padrão
- Certifique-se de que o arquivo hosts está configurado corretamente
- Reinicie os servidores após alterar as configurações
