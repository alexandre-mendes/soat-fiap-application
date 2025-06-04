# 🍔 Fastfood - Backend

**Sistema de Autoatendimento para Lanchonete - Backend**

Este é o backend do sistema **Fastfood**, responsável por gerenciar clientes, produtos, pedidos e operações relacionadas. A API oferece endpoints RESTful para integração com o frontend e outros serviços.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (v22.12.0)
* **Express.js** (framework HTTP)
* **DynamoDB** (banco de dados NoSQL gerenciado pela AWS)
* **AWS SDK DocumentClient** (biblioteca para interação com DynamoDB)
* **Swagger/OpenAPI** (documentação interativa da API)
* **Jest** (testes automatizados)
* **TypeScript** (tipagem estática para JavaScript)

---

## 📝 Funcionalidades Principais

* ✅ **Clientes**: Cadastro e consulta de clientes por CPF.
* ✅ **Produtos**: CRUD completo com categorização.
* ✅ **Pedidos**: Checkout, atualização de status e listagem agrupada por status.

---

## 🔍 Principais Endpoints

Documentação completa disponível via [Swagger](http://localhost:3000/api-docs)

| Método | Endpoint                        | Função                       |
| ------ | ------------------------------- | ---------------------------- |
| POST   | `/clients`                      | Cadastra novo cliente        |
| GET    | `/clients/{cpf}`                | Busca cliente por CPF        |
| POST   | `/products`                     | Cria novo produto            |
| PUT    | `/products/{id}`                | Atualiza produto existente   |
| DELETE | `/products/{id}`                | Remove produto               |
| GET    | `/products/category/{category}` | Lista produtos por categoria |
| POST   | `/orders/checkout`              | Cria novo pedido             |
| PUT    | `/orders/{id}/progress`         | Atualiza status do pedido    |
| GET    | `/orders`                       | Lista pedidos por status     |

---

## 🚀 Instruções de Instalação

### Requisitos

* Node.js v22.12.0+
* Docker + Docker Compose
* Kubernetes (via Minikube)

### Execução Local

```bash
# Clonar o repositório
git clone https://github.com/alexandre-mendes/soat-fiap-application.git
cd soat-fiap-application

# Instalar dependências
npm install
```

### 📂 Configuração do .env

```env
AWS_REGION=us-east-1
AWS_DYNAMO_ENDPOINT=http://localhost:8000
AWS_ACCESS_KEY_ID=fake
AWS_SECRET_ACCESS_KEY=fake
```

### Rodar a aplicação

```bash
npm run dev
```

### Rodar os testes

```bash
npm run test
```

---

## 🚧 Rodando com Docker

```bash
docker-compose up
```

A aplicação estará disponível em:
[http://localhost:3000](http://localhost:3000)

---

## 🚧 Rodando com Kubernetes (Minikube)

### Build da imagem

```bash
docker build -t software-architecture-fiap-fastfood:latest .
```

### Deploy com kubectl

```bash
kubectl apply -f ./k8s/
```

A aplicação ficará acessível via:
[http://localhost:30300](http://localhost:30300)

---

## 🗂️ Estrutura de Diretórios

```bash
/src
├── /frameworks-and-drivers
│   ├── /config          # Configurações gerais (env, rotas, etc.)
│   ├── /database        # Integração com DynamoDB (DocumentClient)
│   └── /http            # Middlewares, rotas e servidor Express
│
├── /interface-adapter
│   ├── /controller      # Controladores HTTP
│   ├── /gateway         # Gateways para serviços externos
│   └── /repositories    # Repositórios com acesso a DynamoDB
│
├── /use-cases
│   ├── /input           # Entradas para casos de uso
│   └── /output          # Interfaces de saída usadas pelos casos de uso
│
├── /entities
│   ├── /vo              # Value Objects
│   └── /error           # Classes de erro do domínio
```

---


## 🛢️ Armazenamento DynamoDB
[Leia mais sobre a escolha do banco de dados](DATABASE.md)

## ☁️ Infraestrutura na Nuvem
[Leia mais sobre a infraestrtura na AWS](INFRA.md)
