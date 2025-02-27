// API significa Application Programing Interface
// Ferramenta responsável por fazer a comunicação entre duas entidades ou sistemas
// No nosso caso está API vai, receber um chamado, se comunicar com o banco de dados e responder dados
// para o chamador 

import express from "express";
import cors from "cors";  // Middleware (função que fica no meio, entre o pedido de requisição e o destino)
import { db } from "./connect.js";
import path from "path";

const __dirname = path.resolve();
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/', (request, response) => {
    response.send("Só vamos trabalhar com os endpoints '/api/artists' o '/api/songs'!");
})

app.get('/api/artists', async (request, response) => {
    response.send(await db.collection('artists').find({}).toArray());
})

app.get('/api/songs', async (request, response) => {
    response.send(await db.collection('songs').find({}).toArray());
})

// configura este caminho para ser acessado pela URL 
// (note que o "serve.js" está no back-end e o arquivo que queremos abrir está no front-end)
app.use(express.static(path.join(__dirname, "../front-end/dist")));

// qualquer coisa diferente dos caminhos anteriores, caem neste arquivo
app.get('*', async (request, response) => {
    response.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
})

app.listen(PORT, () => {
    console.log(`Servidor está escutando na porta ${PORT}`);
});