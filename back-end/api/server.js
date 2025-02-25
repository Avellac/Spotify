// API significa Application Programing Interface
// Ferramenta responsável por fazer a comunicação entre duas entidades ou sistemas
// No nosso caso está API vai, receber um chamado, se comunicar com o banco de dados e responder dados
// para o chamador 

import express from "express";
import cors from "cors";  // Middleware (função que fica no meio, entre o pedido de requisição e o destino)
import { db } from "./connect.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (request, response) => {
    response.send("Só vamos trabalhar com os endpoints '/artists' o '/songs'!");
})

app.get('/artists', async (request, response) => {
    response.send(await db.collection('artists').find({}).toArray());
})

app.get('/songs', async (request, response) => {
    response.send(await db.collection('songs').find({}).toArray());
})

app.listen(PORT, () => {
    console.log(`Servidor está escutando na porta ${PORT}`);
});