const con = require('../connect')

const create = (req, res) => {
    const { paciente, medico, quando } = req.body;
    con.query('INSERT INTO consultas(nome_paciente, nome_medico, data_hora)VALUES(?,?,?)', [paciente, medico, quando], (err, result) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(result);
        }
    });
}

const read = (req, res) => {
    con.query('SELECT * FROM consultas', (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
}

const update = (req, res) =>{
    const { paciente, medico, quando } = req.body;
    const id = req.params.id;
    con.query('UPDATE consultas SET nome_paciente = ?, nome_medico = ?, data_hora = ? WHERE consulta_id = ?',
        [paciente, medico, quando, id], (error, result) =>{
            if(error){
                res.status(400).json(error).end();
            }else{
                res.status(202).json(result).end();
            }
        });
}

const del = (req, res) =>{
    con.query('DELETE FROM consultas WHERE consulta_id = ?',
        [req.params.id],(error, result)=>{
            if(error){
                res.status(400).json(error).end();
            }else{
                res.status(204).end();
            }
        });
}

module.exports = {
    create,
    read,
    update,
    del
}