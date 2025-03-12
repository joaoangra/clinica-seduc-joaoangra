const uri = 'http://localhost:3000';
const titulo = document.querySelector('header h1');
const main = document.getElementById('cards');

//Obtendo o título da API para a tela (READ)
fetch(uri)
    .then(resp => resp.json())
    .then(resp => {
        titulo.innerHTML = resp.titulo
    })

//Obtendo da API e listando as consultas em forma de CARDS (READ)
fetch(uri + '/consultas')
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(consulta => {
            const card = document.createElement('div');
            card.innerHTML = `
            <h2>Consulta Agendada</h2>
            <p>Paciente: <label contenteditable=true>${consulta.nome_paciente}</label></p>
            <p>Médico: <label contenteditable=true>${consulta.nome_medico}</label></p>
            <p>Data: <label contenteditable=true>${new Date(consulta.data_hora).toLocaleDateString('pt-br')}</label></p>
            <p>Hora: <label contenteditable=true>${consulta.data_hora.split('T')[1].substring(0, 5)}</label></p>
            <div>
                <button onclick="deletar(${consulta.consulta_id})">-</button>
                <button onclick="alterar(${consulta.consulta_id},this)">*</button>
            </div>
            `;
            main.appendChild(card);
        });
    })

//Cadastrando nova conculta (CREATE)
const form = document.querySelector('#cadastro form')
form.addEventListener('submit', e => {
    e.preventDefault()
    const dados = {
        paciente: form.paciente.value,
        medico: form.medico.value,
        quando: form.quando.value,
    }

    fetch(uri + '/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 201)
                window.location.reload();
            else
                alert('Erro ao enviar dados para a API');
        })
})

//Alterando dados da consulta (UPDATE)
function alterar(id, e) {
    let data = e.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML;
    let hora = e.parentNode.parentNode.childNodes[9].childNodes[1].innerHTML;
    let dataBD = data.split('/').reverse().toString()
    let dataHora = dataBD.replaceAll(',', '-') + 'T' + hora + ':00.000Z'
    const dados = {
        paciente: e.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML,
        medico: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
        quando: dataHora
    }
    const cabecalho = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }
    fetch(uri + '/consultas/' + id, cabecalho)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 202) {
                window.location.reload();
            } else {
                alert("Erro ao alterar");
            }
        })
}

//Excluído uma consulta (DELETE)
function deletar(id) {
    fetch(uri + '/consultas/' + id, { method: 'DELETE' })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 204) {
                window.location.reload();
            } else {
                alert('Erro ao excluir');
            }
        })
}