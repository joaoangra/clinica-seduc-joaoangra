const express = require('express');
const rota = express.Router();

const Consultas = require('./controllers/consulta');

//Rota de testes
rota.get('/', (req, res)=>{
    res.json({'titulo':'Clínica médica'});
})

//Rotas de consultas
rota.get('/consultas', Consultas.read);
rota.post('/consultas', Consultas.create);
rota.put('/consultas/:id', Consultas.update);
rota.delete('/consultas/:id', Consultas.del);

module.exports = rota;