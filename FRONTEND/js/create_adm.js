// document
//   .getElementById('adminForm')
//   .addEventListener('submit', async function (e) {
//     e.preventDefault()

//     const email = document.getElementById('email').value
//     const senha = document.getElementById('senha').value
//     const tipo = document.querySelector('input[name="adminType"]:checked').value

//     const novoAdmin = {
//       email: email,
//       senha: senha,
//       tipo: parseInt(tipo),
//     }

//     try {
//       const response = await fetch('http://localhost:8080/admin/cadastro', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(novoAdmin),
//       })

//       const result = await response.json()

//       if (response.ok) {
//         alert('Novo administrador criado com sucesso!')
//         console.log('Novo administrador:', result)
//         window.location.href = 'administrative_panel.html'
//       } else {
//         alert(result.error || 'Erro ao criar o administrador.')
//         console.error('Erro:', result.error)
//       }
//     } catch (error) {
//       console.error('Erro ao conectar com o servidor:', error)
//       alert('Erro ao conectar com o servidor.')
//     }
//   })

document
  .getElementById('adminForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    const email = document.getElementById('email').value.trim()
    const senha = document.getElementById('senha').value.trim()
    const tipo = document.querySelector(
      'input[name="adminType"]:checked'
    )?.value

    if (!email || !senha || !tipo) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    const novoAdmin = {
      email,
      senha,
      tipo: parseInt(tipo),
    }

    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        alert('Token de autenticação não encontrado. Faça login novamente.')
        window.location.href = '/login.html'
        return
      }

      const response = await fetch('http://localhost:8080/admin/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novoAdmin),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Novo administrador criado com sucesso!')
        console.log('Novo administrador:', result)
        window.location.href = 'administrative_panel.html'
      } else {
        const errorMessage = result.error || 'Erro ao criar o administrador.'
        alert(errorMessage)
        console.error('Erro:', errorMessage)
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error)
      alert('Erro ao conectar com o servidor.')
    }
  })
