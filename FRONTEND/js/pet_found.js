document.addEventListener('DOMContentLoaded', async () => {
  const microchip = localStorage.getItem('microchip') // Recupera o microchip do localStorage

  if (microchip) {
    try {
      // Busca os dados do pet pela API usando o microchip
      const response = await fetch(`http://localhost:8080/pets/${microchip}`)

      if (response.ok) {
        const animal = await response.json() // Converte a resposta para JSON
        console.log(animal) // Veja o que está sendo retornado

        // Verifica se a resposta é válida e preenche os campos
        if (animal && animal.length > 0) {
          const pet = animal[0] // Acessa o primeiro pet do array

          document.getElementById('resultId').innerText =
            pet.ID || 'Não disponível'
          document.getElementById('resultNome').innerText =
            pet.nome || 'Não disponível'
          document.getElementById('resultSexo').innerText =
            pet.sexo || 'Não disponível'
          document.getElementById('resultAnimal').innerText =
            pet.animal === 0 ? 'Cachorro' : 'Gato'
          document.getElementById('resultMicrochip').innerText =
            pet.microchip || 'Não disponível'
          document.getElementById('resultResponsavel').innerText =
            pet.cliente_cpf || 'Não disponível'
        } else {
          alert('Pet não encontrado.')
        }
      } else {
        const errorData = await response.json() // Pega a resposta de erro em JSON
        alert(errorData.error || 'Erro ao buscar pet.')
      }
    } catch (error) {
      console.error('Erro ao buscar animal:', error)
      alert('Erro ao buscar pet.')
    }
  } else {
    alert('Nenhum microchip foi fornecido.') // Caso não haja microchip no localStorage
  }
})
