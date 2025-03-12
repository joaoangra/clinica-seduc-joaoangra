const uri = 'http://localhost:3000';
const titulo = document.querySelector('header h1');
const main = document.getElementById('cards');

fetch(uri)
    .then(resp => resp.json())
    .then(resp => {
        titulo.innerHTML = resp.titulo
    })

fetch(uri + '/consultas')
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(consulta => {
            const card = document.createElement('div');
            card.innerHTML = `
            <h2>Consulta Agendada</h2>
            <p>Paciente: ${consulta.nome_paciente}</p>
            <p>Médico: ${consulta.nome_medico}</p>
            <p>Data: ${new Date(consulta.data_hora).toLocaleDateString('pt-br')}</p>
            <p>Hora: ${consulta.data_hora.split('T')[1].substring(0, 5)}</p>
            `;
            main.appendChild(card);
        });
    })

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