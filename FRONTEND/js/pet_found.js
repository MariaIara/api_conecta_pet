// document.addEventListener('DOMContentLoaded', async () => {
//   const microchip = localStorage.getItem('microchip')

//   if (microchip) {
//     try {
//       const response = await fetch(`http://localhost:8080/pets/${microchip}`)

//       if (response.ok) {
//         const pet = await response.json()

//         if (pet && pet.length > 0) {
//           const petData = pet[0]

//           document.getElementById('resultId').innerText =
//             petData.ID || 'Não disponível'
//           document.getElementById('resultNome').innerText =
//             petData.nome || 'Não disponível'
//           document.getElementById('resultSexo').innerText =
//             petData.sexo || 'Não disponível'
//           document.getElementById('resultAnimal').innerText =
//             petData.animal === 0 ? 'Cachorro' : 'Gato'
//           document.getElementById('resultMicrochip').innerText =
//             petData.microchip || 'Não disponível'
//           document.getElementById('resultResponsavel').innerText =
//             petData.cliente_cpf || 'Não disponível'
//         } else {
//           document.getElementById('petNotFoundModal').style.display = 'flex'
//         }
//       } else {
//         const errorData = await response.json()
//         console.error(errorData.error || 'Erro ao buscar pet.')
//         document.getElementById('petNotFoundModal').style.display = 'flex'
//       }
//     } catch (error) {
//       console.error('Erro ao buscar animal:', error)
//       document.getElementById('petNotFoundModal').style.display = 'flex'
//     }
//   } else {
//     alert('Nenhum microchip foi fornecido.')
//     window.location.href = './find_pet.html'
//   }

//   document.getElementById('searchAnotherChip').addEventListener('click', () => {
//     window.location.href = './find_pet.html'
//   })

//   document.getElementById('closeModal').addEventListener('click', () => {
//     window.location.href = '../index.html'
//   })
// })

document.addEventListener('DOMContentLoaded', async () => {
  const microchip = localStorage.getItem('microchip')
  const redirectionFlag = localStorage.getItem('redirection_flag')

  console.log('Microchip recebido:', microchip)

  if (microchip) {
    try {
      const response = await fetch(`http://localhost:8080/pets/${microchip}`)
      console.log('Status da resposta:', response.status)

      if (response.ok) {
        const pet = await response.json()
        console.log('Dados do pet:', pet)

        if (pet && pet.length > 0) {
          const petData = pet[0]

          // Preenche os dados do pet
          document.getElementById('resultId').innerText =
            petData.ID || 'Não disponível'
          document.getElementById('resultNome').innerText =
            petData.nome || 'Não disponível'
          document.getElementById('resultSexo').innerText =
            petData.sexo || 'Não disponível'
          document.getElementById('resultAnimal').innerText =
            petData.animal === 0 ? 'Cachorro' : 'Gato'
          document.getElementById('resultMicrochip').innerText =
            petData.microchip || 'Não disponível'
          document.getElementById('resultResponsavel').innerText =
            petData.cliente_cpf || 'Não disponível'

          // Limpa as flags após sucesso
          localStorage.removeItem('redirection_flag')
        } else {
          console.log(
            'Pet não encontrado. Redirecionando para pet_not_found.html.'
          )

          if (!redirectionFlag) {
            localStorage.setItem('redirection_flag', 'pet_not_found')
            window.location.href = './pet_not_found.html'
          }
        }
      } else {
        console.log('Resposta não OK. Redirecionando para pet_not_found.html.')

        if (!redirectionFlag) {
          localStorage.setItem('redirection_flag', 'pet_not_found')
          window.location.href = './pet_not_found.html'
        }
      }
    } catch (error) {
      console.error('Erro ao buscar animal:', error)

      if (!redirectionFlag) {
        localStorage.setItem('redirection_flag', 'pet_not_found')
        window.location.href = './pet_not_found.html'
      }
    }
  } else {
    console.log(
      'Nenhum microchip encontrado. Redirecionando para find_pet.html.'
    )

    if (!redirectionFlag) {
      localStorage.setItem('redirection_flag', 'find_pet')
      window.location.href = './find_pet.html'
    }
  }
})
