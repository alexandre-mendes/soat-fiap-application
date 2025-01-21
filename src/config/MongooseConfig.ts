import mongoose from "mongoose";
import { Product } from "../adapter/outbound/database/mongo/ProductMongoDatabase";

export class MongooseConfig {

    constructor() {
        mongoose.connection.on('connected', () => {
            console.log('Conectado ao banco de dados.');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Desconectado do banco de dados.');
        });

        mongoose.connection.on('error', (err) => {
            console.log('Erro de conexão:', err);
        });

        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || '27017';
        const user = process.env.DB_USER || 'admin';
        const password = process.env.DB_PASSWORD || 'admin';

        const uri = `mongodb://${user}:${password}@${host}:${port}`;
        mongoose.connect(uri, { autoCreate: true, dbName: 'fastfood' });
    }

    async executeScripts() {
        const products = [{
            name: "Big Mac Bacon",
            description: "Dois hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles, bacon e pão com gergelim",
            price: 18.90,
            category: "LANCHE"
        },
        {
            name: "Big Mac Duplo",
            description: "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergelim",
            price: 20.90,
            category: "LANCHE"
        },
        {
            name: "McFritas Grande",
            description: "Deliciosas batatas selecionadas, fritas, crocantes por fora, macias por dentro, douradas, irresistíveis, saborosas, famosas, e todos os outros adjetivos positivos que você quiser dar",
            price: 14.50,
            category: "ACOMPANHAMENTO"
        },
        {
            name: "Chicken McNuggets",
            description: "Crocantes, leves e deliciosos. Os frangos empanados mais irresistíveis do McDonald’s agora na versão Mega, ideal para compartilhar. Composto por 15 unidades de Chicken McNuggets",
            price: 20.00,
            category: "ACOMPANHAMENTO"
        },
        {
            name: "Coca-Cola 300ml",
            description: "Bebida gelada na medida certa para matar sua sede. Refrescante Coca-Cola 300ml",
            price: 10.50,
            category: "BEBIDA"
        },
        {
            name: "Sprite Sem Açúcar 500ml",
            description: "Bebida gelada na medida certa para matar sua sede. Refrescante Sprite Sem Açúcar 500ml",
            price: 15.00,
            category: "BEBIDA"
        },
        {
            name: "McShake Ovomaltine 400ml",
            description: "O novo McShake é feito com leite e batido na hora com o delicioso Ovomaltine",
            price: 15.00,
            category: "SOBREMESA"
        },
        {
            name: "McFlurry KitKat Triple Chocolate",
            description: "Sobremesa composta por bebida láctea sabor chocolate, cobertura sabor chocolate e tablete de KitKat Triple Chocolate",
            price: 15.90,
            category: "SOBREMESA"
        }];

        const count = await Product.countDocuments();

        if (count === 0)
            await Product.insertMany(products);
    }
}