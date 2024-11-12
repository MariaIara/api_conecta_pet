document
  .querySelector('.form')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    const data = {
      nome: document.getElementById('nomeTutor').value,
      cpf: document.getElementById('cpfTutor').value,
      cep: document.getElementById('cepTutor').value,
      cidade: document.getElementById('cidadeTutor').value,
      UF: document.getElementById('UFTutor').value,
      bairro: document.getElementById('bairroTutor').value,
      rua: document.getElementById('ruaTutor').value,
      numero: document.getElementById('numeroTutor').value,
      telefone: document.getElementById('telefoneTutor').value,
    }

    try {
      const response = await fetch('http://localhost:8080/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        alert(result.success)
        window.location.href = 'administrative_panel.html'
      } else {
        alert(result.error || 'Erro ao registrar o tutor.')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      alert('Erro na conexão com o servidor')
    }
  })

//formatador cpf e cep
function formatCPF(cpfField) {
  let cpf = cpfField.value.replace(/\D/g, '')
  cpf = cpf.slice(0, 11)
  cpfField.value = cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function formatCEP(cepField) {
  let cep = cepField.value.replace(/\D/g, '')
  cep = cep.slice(0, 8)
  cepField.value = cep.replace(/(\d{5})(\d)/, '$1-$2')
}
