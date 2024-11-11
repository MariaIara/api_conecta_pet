async function login() {
  // Capture os valores dos campos de entrada
  const email = document.getElementById('email').value
  const senha = document.getElementById('password').value

  // Verifique se os campos estão preenchidos
  if (!email || !senha) {
    alert('Preencha todos os campos')
    return
  }

  // Prepare os dados para o backend
  const body = JSON.stringify({ email: email, senha: senha })

  try {
    // Envie a requisição para o backend
    const response = await fetch('http://localhost:8080/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })

    // Verifique a resposta do servidor
    const data = await response.json()
    if (response.ok) {
      // Armazene o token JWT no localStorage
      localStorage.setItem('token', data.token)
      alert('Login realizado com sucesso!')
      // Redirecione para o painel administrativo
      window.location.href = './administrative_panel.html'
    } else {
      // Exiba uma mensagem de erro
      alert(data.error || 'Erro ao fazer login')
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
    alert('Erro de rede. Verifique sua conexão.')
  }
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   someAsyncFunction()
//     .then((result) => {
//       sendResponse(result)
//     })
//     .catch((error) => {
//       console.error('Erro:', error)
//       sendResponse({ error: 'Ocorreu um erro' })
//     })
//   return true
// })
