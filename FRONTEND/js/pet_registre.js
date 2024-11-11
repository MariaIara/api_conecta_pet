document.getElementById('petForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  const petData = {
    nome: document.getElementById('nome').value,
    raca: document.getElementById('raca').value,
    sexo: document.querySelector('input[name="sexo"]:checked').value,
    animal: document.querySelector('input[name="tipo"]:checked').value === 'Gato' ? 1 : 0,
    microchip: document.getElementById('microchip').value,
    cliente_cpf: document.getElementById('cpf').value,
  }

  console.log('Dados do pet:', petData) // Verifica os dados antes do envio

  try {
    const response = await fetch('http://localhost:8080/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petData),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Pet registrado com sucesso!')
      window.location.href = 'administrative_panel.html' // Redireciona para o painel administrativo
    } else {
      console.error('Erro do backend:', data.error)
      alert(`Erro ao registrar pet: ${data.error}`)
    }
  } catch (error) {
    console.error('Erro ao registrar pet:', error)
    alert('Erro ao registrar pet.')
  }
})
