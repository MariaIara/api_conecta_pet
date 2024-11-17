document.addEventListener('DOMContentLoaded', async () => {
  const microchip = localStorage.getItem('microchip')

  if (microchip) {
    try {
      const response = await fetch(`http://localhost:8080/pets/${microchip}`)

      if (response.ok) {
        const animal = await response.json()
        console.log(animal)

        if (animal && animal.length > 0) {
          const pet = animal[0]

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
          window.location.href = './find_pet.html' 
        }
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Erro ao buscar pet.')
      }
    } catch (error) {
      console.error('Erro ao buscar animal:', error)
      alert('Microchip não encontrado.')
      window.location.href = './find_pet.html' 
    }
  } else {
    alert('Nenhum microchip foi fornecido.')
    window.location.href = './find_pet.html' 
  }
})