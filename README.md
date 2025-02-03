# Teste de Projeto com Spring Boot e Angular

Este projeto é um teste utilizando **Spring Boot (Java 21)** no backend e **Angular 19** no frontend.

## Tecnologias Utilizadas

- **Backend:** Java 21 com Spring Boot
- **Frontend:** Angular 19
- **Banco de Dados:** PostgreSQL
- **Ferramentas de Build:** Maven
- **Containerização:** Docker Compose

## Endpoints da API

A API expõe os seguintes endpoints:

### Autenticação

- **POST `/token`** - Gera um token JWT para autenticação.
  - **Resposta:**
    ```json
    {
      "sub": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub3h0ZWMiLCJpYXQiOjE3Mzg1NDM5NjQsImV4cCI6MTczODU0NzU2NH0.cV9FJx2CJanSbNmrylaYC1MK8CoCpHzErzE6GbmZ6Io"
    }
    ```
  - O token JWT deve ser enviado no cabeçalho `Authorization` como `Bearer <token>` em requisições protegidas.

### Contatos

- **GET `/contatos`** - Retorna a listagem de contatos.
- **POST `/contatos`** - Cria um novo contato.
  - **Payload:**
    ```json
    {
      "nome": "teste",
      "email": "test@gmail.com",
      "celular": "999999",
      "telefone": "",
      "snFavorito": "S",
      "snAtivo": "S"
    }
    ```
  - **Campos obrigatórios:** `nome`, `email`, `celular`
- **PUT `/contatos/{id}`** - Atualiza um contato existente.
  - **Payload:**
    ```json
    {
      "nome": "teste",
      "email": "test@gmail.com",
      "celular": "999999",
      "telefone": "",
      "snFavorito": "S",
      "snAtivo": "S"
    }
    ```
- **DELETE `/contatos/{id}`** - Exclui um contato pelo ID.
- **GET `/contatos/{id}`** - Retorna um contato específico pelo ID.

## Documentação da API

A documentação da API pode ser acessada via Swagger na seguinte URL:

[Swagger UI] `http://localhost:8080/swagger-ui.html`

## Como Executar o Projeto

### Backend

1. Certifique-se de ter o Java 21 instalado.
2. Clone este repositório.
3. Navegue até a pasta do backend.
4. Execute o seguinte comando para iniciar o servidor:
   ```sh
   mvn spring-boot:run
   ```

### Frontend

1. Certifique-se de ter o Node.js instalado.
2. Navegue até a pasta do frontend (agenda-app).
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Execute o seguinte comando para iniciar o servidor de desenvolvimento:
   ```sh
   ng serve
   ```
5. Acesse o frontend pelo navegador em `http://localhost:4200`.

### Banco de Dados esta no Docker Compose

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Na raiz do projeto, execute o seguinte comando para subir o banco de dados PostgreSQL:
   ```sh
   docker-compose up -d
   ```
3. O banco de dados estará disponível para conexão.

