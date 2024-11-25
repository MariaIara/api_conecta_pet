// document
//   .getElementById('adminForm')
//   .addEventListener('submit', async function (e) {
//     e.preventDefault()

//     // Verificar se o token está armazenado no localStorage
//     const token = localStorage.getItem('authToken')
//     console.log('Token armazenado:', token)

//     if (!token) {
//       alert(
//         'Token de autenticação não encontrado. Certifique-se de ter feito login.'
//       )
//       console.error(
//         'Token ausente no localStorage. Certifique-se de ter feito login.'
//       )
//       window.location.href = '/login.html' // Redireciona para a página de login
//       return
//     }

//     // Verificar a validade do token (opcional, mas recomendado)
//     try {
//       const decodedToken = jwt_decode(token)
//       console.log('Token decodificado:', decodedToken)

//       if (decodedToken.exp * 1000 < Date.now()) {
//         alert('O token expirou. Faça login novamente.')
//         window.location.href = '/login.html'
//         return
//       }
//     } catch (error) {
//       console.error('Erro ao decodificar o token:', error)
//       alert('Token inválido. Faça login novamente.')
//       window.location.href = '/login.html'
//       return
//     }

//     // Recuperar dados do formulário
//     const nome = document.getElementById('nome').value.trim()
//     const cpf = document.getElementById('cpf').value.replace(/\D/g, '').trim()
//     const email = document.getElementById('email').value.trim()
//     const senha = document.getElementById('senha').value.trim()
//     const tipo = document.querySelector(
//       'input[name="adminType"]:checked'
//     )?.value

//     // Validar campos obrigatórios
//     if (!nome || !cpf || !email || !senha || !tipo) {
//       alert('Por favor, preencha todos os campos.')
//       return
//     }

//     // Criar o objeto do novo administrador
//     const novoAdmin = {
//       nome,
//       cpf,
//       email,
//       senha,
//       tipo: parseInt(tipo),
//     }

//     try {
//       // Enviar requisição ao servidor
//       const response = await fetch('http://localhost:8080/admin/cadastro', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(novoAdmin),
//       })

//       // Processar a resposta do servidor
//       const result = await response.json().catch(() => ({})) // Evita erro com respostas vazias

//       if (response.ok) {
//         alert('Novo administrador criado com sucesso!')
//         console.log('Novo administrador:', result)
//         window.location.href = 'administrative_panel.html' // Redireciona para o painel administrativo
//       } else {
//         const errorMessage = result.error || 'Erro ao criar o administrador.'
//         alert(errorMessage)
//         console.error('Erro:', errorMessage)
//       }
//     } catch (error) {
//       console.error('Erro ao conectar com o servidor:', error)
//       alert('Erro ao conectar com o servidor.')
//     }
//   })

// function togglePassword() {
//   const passwordField = document.getElementById('senha')
//   passwordField.type = passwordField.type === 'password' ? 'text' : 'password'
// }

// function formatCPF(cpfField) {
//   let cpf = cpfField.value.replace(/\D/g, '')
//   cpf = cpf.slice(0, 11)
//   cpfField.value = cpf
//     .replace(/(\d{3})(\d)/, '$1.$2')
//     .replace(/(\d{3})(\d)/, '$1.$2')
//     .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
// }


document
  .getElementById('adminForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Você precisa estar autenticado para realizar esta ação.')
      window.location.href = '/login.html'
      return
    }

    let nivelUsuario = '1' // Nível padrão para usuários comuns
    try {
      const decodedToken = jwt_decode(token)
      nivelUsuario = decodedToken.data.nivel
    } catch (error) {
      console.error('Erro ao decodificar o token:', error)
      alert('Token inválido. Faça login novamente.')
      window.location.href = '/login.html'
      return
    }

    if (nivelUsuario !== '2') {
      alert('Você não tem permissão para criar novos administradores.')
      return
    }

    const nome = document.getElementById('nome').value.trim()
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '').trim()
    const email = document.getElementById('email').value.trim()
    const senha = document.getElementById('senha').value.trim()
    const tipo = document.querySelector(
      'input[name="adminType"]:checked'
    )?.value

    if (!nome || !cpf || !email || !senha || !tipo) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    const novoAdmin = { nome, cpf, email, senha, tipo: parseInt(tipo) }

    try {
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
        window.location.href = 'administrative_panel.html'
      } else {
        alert(result.error || 'Erro ao criar o administrador.')
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error)
      alert('Erro ao conectar com o servidor.')
    }
  })

function togglePassword() {
  const passwordField = document.getElementById('senha')
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password'
}

function formatCPF(cpfField) {
  let cpf = cpfField.value.replace(/\D/g, '')
  cpf = cpf.slice(0, 11)
  cpfField.value = cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}
