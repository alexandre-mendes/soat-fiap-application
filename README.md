# Fastfood

**Descrição do Projeto Backend**

Este é o backend do sistema **Fastfood**. Ele foi desenvolvido para gerenciar  clientes, produtos, pedidos, etc. A API fornece endpoints RESTful para realizar as operações.

## Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- **Node.js** (versão 22.12.0)
- **Express.js** (framework para Node.js)
- **MongoDB** (banco de dados NoSQL)
- **Mongoose** (ODM para MongoDB)
- **Swagger/OpenAPI** (documentação da API)
- **Jest** (testes automatizados)
- **Typescript** (para tipagem estática)

## Funcionalidades

O sistema permite o gerenciamento de **clientes**, **produtos**, **pedidos**, incluindo as seguintes funcionalidades:

- **Clientes**: Cadastro de informações como nome, email e CPF. Consulta cliente existente pelo CPF.
- **Produtos**: Cadastrar, listar, atualizar e remover produtos no sistema.
- **Pedidos**: Criar, atualizar e listar pedidos, incluindo status do pedido.

## Endpoints da API

A API oferece endpoints para a manipulação dos dados. Você pode consultar a documentação da API através do **Swagger** [aqui](http://localhost:3000/api-docs).

### Exemplos de Endpoints

1. **POST /clients**: Cria um novo cliente.
2. **GET /clients/{cpf}**: Busca um cliente pelo CPF.
3. **POST /products**: Cria um novo produto.
4. **PUT /products/{id}**: Atualiza um produto existente.
5. **DELETE /products/{id}**: Remove um produto existente.
6. **GET /products/category/{category}**: Lista produtos por categoria.
7. **POST /orders/checkout**: Cria um pedido.
8. **PUT /orders/{id}/progress**: Atualiza o progresso de um pedido.
9. **GET /orders**: Lista pedidos agrupados por status.

## Instruções de Instalação

### Requisitos

- **Node.js** (versão 22.12.0 ou superior)
- **Docker** (para rodar no contêiner)
- **Docker Compose** 
- **Kubernates (Minikube)** (para orquestrar os contêineres)

### Passos para rodar o projeto localmente

1. **Clone o repositório**

   ```bash
   git clone https://github.com/alexandre-mendes/software-architecture-fiap.git
   cd software-architecture-fiap

2. **Instale as dependências**

    ```bash
    npm install

3. **Configurar os dados de conexão com Mongo no arquivo .env**

    ```bash
    DB_HOST = 'localhost'
    DB_PORT = '27017'
    DB_USER = 'admin'
    DB_PASSWORD = 'admin'

4. **Executar aplicação**

    ```bash
    npm run dev

5. **Rodando os testes**
    ```bash
    npm run test

## Rodando o Projeto com Docker

Se você preferir rodar o projeto utilizando Docker, siga os passos abaixo. O projeto já possui um Dockerfile e um docker-compose.yaml configurados para facilitar a execução.

### Pré-requisitos

- **Docker** e **Docker Compose** instalados no seu computador.

## Passos para rodar o projeto com Docker:

1. **Construindo e rodando os containers**
Na raiz do seu projeto (onde o Dockerfile e docker-compose.yaml estão localizados), execute o seguinte comando:
    ```bash
    docker-compose up

Esse comando irá construir a imagem do Docker definida no `Dockerfile` e iniciar os containers conforme configurado no `docker-compose.yaml`.

2. **Acessando a aplicação**
Após os containers estarem em funcionamento, sua aplicação estará disponível na porta configurada (por padrão, 3000). Para acessar a API, você pode usar:
    ```bash
    http://localhost:3000

## Rodando o Projeto com Kubernates

### Pré-requisitos

- **Docker** e **Minikube** instalados no seu computador.

## Passos para rodar o projeto com Kubernates:

1. **Construindo e rodando os containers**
Na raiz do seu projeto (onde o Dockerfile está localizado), execute o seguinte comando:
    ```bash
    docker build -t software-architecture-fiap-fastfood:latest .

Esse comando irá construir a imagem do Docker definida no `Dockerfile`.

Após gerar a imagem, ainda na raiz do projeto, execute o seguinte comando:
    ```bash
    kubectl apply -f .\k8s\

Esse comando irá construir todo o ambiente necessário para utilização da aplicação via Kubernates, incluindo deployments, services, pv, pvc, configmap, secrets e hpa.

2. **Acessando a aplicação**
Após os pods estarem em funcionamento, sua aplicação estará disponível na porta configurada (por padrão, 30300). Para acessar a API, você pode usar:
    ```bash
    http://localhost:30300

## Estrutura de Diretórios
/src
    ├── /frameworks-and-drivers   # Implementações específicas de frameworks e drivers
    │   ├── /config               # Arquivos de configuração (banco, controllers, etc.)
    │   ├── /database             # Implementação do banco de dados (ORM, migrations, etc.)
    │   └── /http                 # Implementações HTTP (servidores, rotas, middlewares)
    │
    ├── /interface-adapter        # Adaptadores entre a camada de entrada e a lógica de aplicação
    │   ├── /controller           # Controladores (recebem as requisições e invocam os casos de uso)
    │   ├── /gateway              # Adaptadores de gateway (conectam a lógica de aplicação a fontes externas)
    │   └── /repositories         # Repositórios (interagem com o banco ou outros serviços de armazenamento)
    │
    ├── /use-cases                # Casos de uso (lógica de aplicação)
    │   ├── /input                # Entradas (dados que chegam para acionar o caso de uso)
    │   └── /output               # Saídas (dados externos ao caso de uso, que ele necessita para executar sua lógica)
    │
    ├── /entities                 # Entidades do domínio (modelos principais e regras de negócio)
    │   ├── /vo                   # Objetos de valor (Value Objects, para representar dados imutáveis)
    │   └── /error                # Erros específicos do domínio

