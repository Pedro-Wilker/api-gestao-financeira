import streamlit as st
import requests
import json
from typing import Dict, Any, List

st.set_page_config(page_title="Documentação da API de Gestão Financeira", layout="wide")

st.sidebar.title("Navegação")
page = st.sidebar.radio(
    "Seções",
    ["Introdução", "Como Usar", "Rotas", "Exemplos Práticos"]
)

BASE_URL: str = "http://localhost:3000/api"

def display_json(payload: Dict[str, Any] | List[Dict[str, Any]]) -> None:
    st.json(payload)

if page == "Introdução":
    st.title("Documentação da API de Gestão Financeira")
    st.markdown("""
    ## Bem-vindo à Documentação da API

    A **API de Gestão Financeira** é uma aplicação Node.js com TypeScript que permite gerenciar usuários, despesas e receitas de forma eficiente. Desenvolvida com Express, Sequelize (PostgreSQL) e autenticação JWT, a API oferece endpoints para:

    - **Gerenciamento de Usuários**: Criar, listar, atualizar e excluir usuários.
    - **Autenticação**: Login com JWT para acessar rotas protegidas.
    - **Despesas e Receitas**: Criar, listar, atualizar e excluir registros financeiros associados a um usuário.

    Esta documentação, construída com Streamlit, explica como configurar, usar e testar a API. Use o menu na barra lateral para navegar pelas seções.
    """)

elif page == "Como Usar":
    st.title("Como Usar a API")
    st.markdown("""
    ## Passo a Passo para Configurar e Usar a API

    ### 1. Clonar o Repositório
    Clone o repositório do GitHub:
    ```bash
    git clone https://github.com/Pedro-Wilker/api-gestao-financeira.git
    cd api-gestao-financeira
    ```

    ### 2. Instalar Dependências
    Instale as dependências do Node.js:
    ```bash
    npm install
    ```

    ### 3. Configurar o Arquivo `.env`
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=161011
    DB_NAME=financial_system
    JWT_SECRET=5abc456e5b9b1f63f9335a55bed7e747
    EMAIL_USER=chumeicraft@gmail.com
    EMAIL_PASS=p3w1lk3r
    ```

    ### 4. Configurar o Banco de Dados
    Certifique-se de que o PostgreSQL está rodando:
    ```bash
    net start postgresql
    ```

    Crie o banco de dados `financial_system`:
    ```bash
    psql -U postgres -c "CREATE DATABASE financial_system;"
    ```

    Execute as migrações para criar as tabelas:
    ```bash
    npx sequelize-cli db:migrate
    ```

    ### 5. Iniciar o Servidor
    Inicie o servidor com:
    ```bash
    npm run dev
    ```

    A API estará disponível em `http://localhost:3000/api`.

    ### 6. Testar as Rotas
    Use ferramentas como **Insomnia** ou **Postman** para testar as rotas. Consulte a seção "Rotas" para detalhes de cada endpoint.
    """)


elif page == "Rotas":
    st.title("Rotas da API")
    st.markdown("""
    ## Endpoints da API

    A API possui endpoints para gerenciar usuários, autenticação, despesas e receitas. Todas as rotas protegidas requerem um token JWT no header `Authorization: Bearer <token>`.

    ### Usuários
    #### `POST /api/users`
    Cria um novo usuário.
    - **Headers**: `Content-Type: application/json`
    - **Body**:
    """)
    display_json({
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123",
        "phone": "1234567890",
        "profession": "Developer",
        "profile_photo": "https://example.com/photo.jpg"
    })
    st.markdown("""
    - **Resposta (201)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "name": "Test User",
        "email": "test@example.com",
        "phone": "1234567890",
        "profession": "Developer",
        "profile_photo": "https://example.com/photo.jpg",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:00:00.000Z"
    })
    st.markdown("""
    #### `GET /api/users`
    Lista todos os usuários (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (200)**:
    """)
    display_json([
        {
            "id": "uuid-gerado",
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",
            "profession": "Developer",
            "profile_photo": "https://example.com/photo.jpg",
            "created_at": "2025-09-10T21:00:00.000Z",
            "updated_at": "2025-09-10T21:00:00.000Z"
        }
    ])
    st.markdown("""
    #### `GET /api/users/:id`
    Busca um usuário por ID (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (200)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "name": "Test User",
        "email": "test@example.com",
        "phone": "1234567890",
        "profession": "Developer",
        "profile_photo": "https://example.com/photo.jpg",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:00:00.000Z"
    })
    st.markdown("""
    #### `PUT /api/users/:id`
    Atualiza um usuário (protegida).
    - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
    - **Body**:
    """)
    display_json({
        "name": "Updated User",
        "phone": "0987654321",
        "profession": "Senior Developer"
    })
    st.markdown("""
    - **Resposta (200)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "name": "Updated User",
        "email": "test@example.com",
        "phone": "0987654321",
        "profession": "Senior Developer",
        "profile_photo": "https://example.com/photo.jpg",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:05:00.000Z"
    })
    st.markdown("""
    #### `DELETE /api/users/:id`
    Exclui um usuário (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (204)**: Sem conteúdo.

    ### Autenticação
    #### `POST /api/login`
    Autentica um usuário e retorna um token JWT.
    - **Headers**: `Content-Type: application/json`
    - **Body**:
    """)
    display_json({
        "email": "test@example.com",
        "password": "password123"
    })
    st.markdown("""
    - **Resposta (200)**:
    """)
    display_json({
        "token": "jwt-token-gerado"
    })
    st.markdown("""
    ### Despesas
    #### `POST /api/expenses`
    Cria uma nova despesa (protegida).
    - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
    - **Body**:
    """)
    display_json({
        "description": "Grocery shopping",
        "amount": 150.50,
        "date": "2025-09-10",
        "category": "food",
        "is_recurring": False, 
        "currency": "BRL"
    })
    st.markdown("""
    - **Resposta (201)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "user_id": "uuid-do-usuario",
        "description": "Grocery shopping",
        "amount": 150.50,
        "date": "2025-09-10",
        "category": "food",
        "is_recurring": False,  
        "currency": "BRL",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:00:00.000Z"
    })
    st.markdown("""
    #### `GET /api/expenses`
    Lista todas as despesas do usuário autenticado (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (200)**:
    """)
    display_json([
        {
            "id": "uuid-gerado",
            "user_id": "uuid-do-usuario",
            "description": "Grocery shopping",
            "amount": 150.50,
            "date": "2025-09-10",
            "category": "food",
            "is_recurring": False,  
            "currency": "BRL",
            "created_at": "2025-09-10T21:00:00.000Z",
            "updated_at": "2025-09-10T21:00:00.000Z"
        }
    ])
    st.markdown("""
    #### `GET /api/expenses/:id`
    Busca uma despesa por ID (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (200)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "user_id": "uuid-do-usuario",
        "description": "Grocery shopping",
        "amount": 150.50,
        "date": "2025-09-10",
        "category": "food",
        "is_recurring": False,  
        "currency": "BRL",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:00:00.000Z"
    })
    st.markdown("""
    #### `PUT /api/expenses/:id`
    Atualiza uma despesa (protegida).
    - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
    - **Body**:
    """)
    display_json({
        "description": "Updated grocery shopping",
        "amount": 200.00,
        "date": "2025-09-10",
        "category": "food",
        "is_recurring": True,  
        "currency": "BRL"
    })
    st.markdown("""
    - **Resposta (200)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "user_id": "uuid-do-usuario",
        "description": "Updated grocery shopping",
        "amount": 200.00,
        "date": "2025-09-10",
        "category": "food",
        "is_recurring": True,  
        "currency": "BRL",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:05:00.000Z"
    })
    st.markdown("""
    #### `DELETE /api/expenses/:id`
    Exclui uma despesa (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (204)**: Sem conteúdo.

    ### Receitas
    #### `POST /api/incomes`
    Cria uma nova receita (protegida).
    - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
    - **Body**:
    """)
    display_json({
        "description": "Salary",
        "amount": 5000.00,
        "date": "2025-09-10",
        "source": "salary",
        "is_recurring": True,  
        "currency": "BRL"
    })
    st.markdown("""
    - **Resposta (201)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "user_id": "uuid-do-usuario",
        "description": "Salary",
        "amount": 5000.00,
        "date": "2025-09-10",
        "source": "salary",
        "is_recurring": True,  
        "currency": "BRL",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:00:00.000Z"
    })
    st.markdown("""
    #### `GET /api/incomes`
    Lista todas as receitas do usuário autenticado (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (200)**:
    """)
    display_json([
        {
            "id": "uuid-gerado",
            "user_id": "uuid-do-usuario",
            "description": "Salary",
            "amount": 5000.00,
            "date": "2025-09-10",
            "source": "salary",
            "is_recurring": True,  
            "currency": "BRL",
            "created_at": "2025-09-10T21:00:00.000Z",
            "updated_at": "2025-09-10T21:00:00.000Z"
        }
    ])
    st.markdown("""
    #### `GET /api/incomes/:id`
    Busca uma receita por ID (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (200)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "user_id": "uuid-do-usuario",
        "description": "Salary",
        "amount": 5000.00,
        "date": "2025-09-10",
        "source": "salary",
        "is_recurring": True,  
        "currency": "BRL",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:00:00.000Z"
    })
    st.markdown("""
    #### `PUT /api/incomes/:id`
    Atualiza uma receita (protegida).
    - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
    - **Body**:
    """)
    display_json({
        "description": "Updated Salary",
        "amount": 5500.00,
        "date": "2025-09-10",
        "source": "salary",
        "is_recurring": True,  
        "currency": "BRL"
    })
    st.markdown("""
    - **Resposta (200)**:
    """)
    display_json({
        "id": "uuid-gerado",
        "user_id": "uuid-do-usuario",
        "description": "Updated Salary",
        "amount": 5500.00,
        "date": "2025-09-10",
        "source": "salary",
        "is_recurring": True,  
        "currency": "BRL",
        "created_at": "2025-09-10T21:00:00.000Z",
        "updated_at": "2025-09-10T21:05:00.000Z"
    })
    st.markdown("""
    #### `DELETE /api/incomes/:id`
    Exclui uma receita (protegida).
    - **Headers**: `Authorization: Bearer <token>`
    - **Resposta (204)**: Sem conteúdo.
    """)

elif page == "Exemplos Práticos":
    st.title("Exemplos Práticos")
    st.markdown("""
    ## Testando a API com Python (requests)

    Abaixo estão exemplos de como usar a biblioteca `requests` para interagir com a API. Certifique-se de que a API está rodando em `http://localhost:3000/api`.

    ### Criar um Usuário
    ```python
    import requests

    url = "http://localhost:3000/api/users"
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123"
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    print(response.status_code)  # 201
    print(response.json())  # Resposta com os dados do usuário
    ```

    ### Fazer Login
    ```python
    import requests

    url = "http://localhost:3000/api/login"
    payload = {
        "email": "test@example.com",
        "password": "password123"
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    token = response.json().get("token")
    print(response.status_code)  # 200
    print(token)  # Token JWT
    ```

    ### Listar Usuários (Protegida)
    ```python
    import requests

    url = "http://localhost:3000/api/users"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(url, headers=headers)
    print(response.status_code)  # 200
    print(response.json())  # Lista de usuários
    ```

    ### Criar uma Despesa (Protegida)
    ```python
    import requests

    url = "http://localhost:3000/api/expenses"
    payload = {
        "description": "Grocery shopping",
        "amount": 150.50,
        "date": "2025-09-10",
        "category": "food",
        "is_recurring": False,
        "currency": "BRL"
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    response = requests.post(url, json=payload, headers=headers)
    print(response.status_code)  # 201
    print(response.json())  # Resposta com os dados da despesa
    ```

    ### Criar uma Receita (Protegida)
    ```python
    import requests

    url = "http://localhost:3000/api/incomes"
    payload = {
        "description": "Salary",
        "amount": 5000.00,
        "date": "2025-09-10",
        "source": "salary",
        "is_recurring": True,
        "currency": "BRL"
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    response = requests.post(url, json=payload, headers=headers)
    print(response.status_code)  # 201
    print(response.json())  # Resposta com os dados da receita
    ```

    ### Teste Interativo
    Insira um token JWT para testar a rota `GET /api/users` diretamente:
    """)
    token: str = st.text_input("Token JWT", type="password")
    if token:
        try:
            headers: Dict[str, str] = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}"
            }
            response = requests.get(f"{BASE_URL}/users", headers=headers)
            st.write(f"**Status Code**: {response.status_code}")
            st.json(response.json())
        except requests.RequestException as e:
            st.error(f"Erro ao chamar a API: {e}")
