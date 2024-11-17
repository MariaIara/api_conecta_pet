async function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('password').value

  if (!email || !senha) {
    alert('Preencha todos os campos')
    return
  }

  const body = JSON.stringify({ email: email, senha: senha })

  try {
    const response = await fetch('http://localhost:8080/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('token', data.token)
      alert('Login realizado com sucesso!')
      window.location.href = './administrative_panel.html'
    } else {
      alert(data.error || 'Erro ao fazer login')
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
    alert('Erro de rede. Verifique sua conexão.')
  }
}

function togglePassword() {
  const passwordField = document.getElementById('password')
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password'
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