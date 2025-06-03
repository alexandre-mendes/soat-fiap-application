# Documentação da Modelagem de Dados com DynamoDB

## Justificativa da Escolha

Inicialmente, o sistema utilizava o MongoDB como banco de dados NoSQL. Com a evolução da arquitetura para uma solução 100% serverless baseada na AWS, optou-se pela adoção do **Amazon DynamoDB** por oferecer:

* Integração nativa com serviços AWS (Lambda, API Gateway, IAM);
* Alta disponibilidade e escalabilidade automática;
* Baixa latência com modelo key-value/documento;
* Redução de complexidade operacional e eliminação de containers para banco de dados.

## Modelagem das Tabelas

### Tabela: `client`

* **Chave Primária**: `id` (UUID)

```json
{
  "id": "prod-123",
  "cpf": "12345678900",
  "name": "João da Silva",
  "email": "joao@email.com"
}
```

---

### Tabela: `product`

* **Chave Primária**: `id` (UUID)

```json
{
  "id": "prod-123",
  "name": "X-Burguer",
  "description": "Hambúrguer artesanal com queijo",
  "price": 25.00,
  "category": "Lanche"
}
```

---

### Tabela: `order`

* **Chave Primária**: `id` (UUID)

```json
{
  "id": "order-456",
  "number": 1001,
  "client": {
    "id": "cli-001",
    "name": "João da Silva",
    "email": "joao@email.com",
    "cpf": "12345678900"
  },
  "items": [
    {
      "product": {
        "id": "prod-123",
        "name": "X-Burguer",
        "description": "Hambúrguer artesanal com queijo",
        "price": 25.00,
        "category": "Lanche"
      },
      "quantity": 2,
      "observation": "Sem cebola"
    }
  ],
  "total": 50.00,
  "paymentPending": true,
  "status": "PENDING",
  "createdAt": "2025-06-02T20:10:00.000Z"
}
```

---
