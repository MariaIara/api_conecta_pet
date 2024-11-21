function verificarNivelAcesso() {
  const token = localStorage.getItem('token')

  if (!token) {
    alert('Token não encontrado. Faça login novamente.')
    window.location.href = '../login.html'
    return
  }

  try {
    const decodedToken = jwt_decode(token)
    const tipo = decodedToken.data.nivel

    if (tipo === '1') {
      document.querySelector('a[href="./create_adm.html"]').style.display =
        'none'
      document.querySelector('a[href="./tutor_registre.html"]').style.display =
        'none'
      document.querySelector('a[href="./pet_registre.html"]').style.display =
        'none'

      document.querySelectorAll('.delete-btn').forEach((btn) => {
        btn.disabled = true
        btn.classList.add('disabled')
      })
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error)
    alert('Erro ao validar token. Faça login novamente.')
    window.location.href = './login.html'
  }
}

async function buscarPets() {
  try {
    const response = await fetch('http://localhost:8080/pets')
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Dados recebidos da API:', data)

    const headers = [
      'ID',
      'Nome',
      'Sexo',
      'Microchip',
      'Raça',
      'Animal',
      'Responsável',
      'Ações',
    ]

    const rows = data.map((pet) => {
      const animalString =
        pet.animal === 0 || pet.animal === '0' ? 'Cachorro' : 'Gato'

      const petId = pet.ID || pet.id || '—'

      console.log(`ID processado: ${petId}`)

      return [
        petId,
        pet.nome,
        pet.sexo,
        pet.microchip,
        pet.raca,
        animalString,
        formatCPF(pet.cliente_cpf),
      ]
    })

    createTable(headers, rows)
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
}

function formatCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function createTable(headers, rows) {
  const tableContainer = document.getElementById('table-container')
  tableContainer.innerHTML = ''
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')

  const headerRow = document.createElement('tr')
  headers.forEach((header) => {
    const th = document.createElement('th')
    th.textContent = header
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)

  rows.forEach((rowData) => {
    const row = document.createElement('tr')
    rowData.forEach((cellData, index) => {
      const td = document.createElement('td')
      td.textContent = cellData !== undefined ? cellData : '—'
      row.appendChild(td)

      if (index === 0) {
        console.log(`Exibindo ID na tabela: ${cellData}`)
      }
    })

    const actionTd = document.createElement('td')

    const token = localStorage.getItem('token')
    let nivelUsuario = '1'
    if (token) {
      try {
        const decodedToken = jwt_decode(token)
        nivelUsuario = decodedToken.data.nivel
      } catch (error) {
        console.error('Erro ao decodificar o token:', error)
      }
    }

    if (nivelUsuario === '2') {
      actionTd.innerHTML = `
        <button class="action-btn delete-btn" data-id="${rowData[0]}">
          <i class="ph-fill ph-trash"></i>
        </button>
        <button class="action-btn edit-btn" data-id="${rowData[0]}">
          <i class="ph-fill ph-pencil-simple"></i>
        </button>
      `
    } else {
      actionTd.textContent = 'Sem permissões'
    }

    row.appendChild(actionTd)
    tbody.appendChild(row)

    const deleteButton = actionTd.querySelector('.delete-btn')
    if (deleteButton) {
      deleteButton.addEventListener('click', (event) => {
        const button = event.target.closest('.delete-btn')
        const id = button.getAttribute('data-id')
        console.log(`ID capturado pelo evento: ${id}`)
        deletarPet(id, row)
      })
    }
  })

  table.appendChild(thead)
  table.appendChild(tbody)
  tableContainer.appendChild(table)
}

async function deletarPet(id, rowElement) {
  console.log(`ID recebido em deletarPet: ${id}`)

  const confirmacao = confirm('Tem certeza de que deseja deletar este pet?')
  if (!confirmacao) return

  try {
    const response = await fetch(`http://localhost:8080/pets/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erro ao deletar pet')
    }

    alert('Pet deletado com sucesso!')
    rowElement.remove()
  } catch (error) {
    console.error('Erro ao deletar o pet:', error.message)
    alert('Não foi possível deletar o pet. Tente novamente.')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  verificarNivelAcesso()
  buscarPets()
})

function formatCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

document.getElementById('search-icon').addEventListener('click', function () {
  const searchInput = document.getElementById('search-input')
  const isVisible = searchInput.style.display === 'block'
  searchInput.style.display = isVisible ? 'none' : 'block'
  if (searchInput.style.display === 'block') {
    searchInput.focus()
  }
})

const logoutBtn = document.querySelector('.ph-sign-out')
const logoutModal = document.getElementById('logoutModal')
const confirmLogout = document.getElementById('confirmLogout')
const cancelLogout = document.getElementById('cancelLogout')

logoutBtn.addEventListener('click', () => {
  logoutModal.classList.remove('hidden')
})

confirmLogout.addEventListener('click', () => {
  localStorage.removeItem('authToken')
  window.location.href = '../views/login.html'
})

cancelLogout.addEventListener('click', () => {
  logoutModal.classList.add('hidden')
})