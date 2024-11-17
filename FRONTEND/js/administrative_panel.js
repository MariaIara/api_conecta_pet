async function buscarPets() {
  try {
    const response = await fetch('http://localhost:8080/pets')
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`)
    }

    const data = await response.json()

    const headers = [
      'Nome',
      'Sexo',
      'Microchip',
      'Raça',
      'Animal',
      'Responsável',
      'Ações',
    ]
    const rows = data.map((pet) => [
      pet.nome,
      pet.sexo,
      pet.microchip,
      pet.raca,
      pet.animal,
      formatCPF(pet.cliente_cpf),
    ])

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
    rowData.forEach((cellData) => {
      const td = document.createElement('td')
      td.textContent = cellData
      row.appendChild(td)
    })

    const actionTd = document.createElement('td')
    actionTd.innerHTML = `
      <button class="action-btn delete-btn" data-microchip="${rowData[2]}">
        <i class="ph-fill ph-trash"></i>
      </button>
      <button class="action-btn edit-btn">
        <i class="ph-fill ph-pencil-simple"></i>
      </button>
    `
    row.appendChild(actionTd)
    tbody.appendChild(row)
  })

  table.appendChild(thead)
  table.appendChild(tbody)
  tableContainer.appendChild(table)


  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
      alert('Em breve')
    })
  })
}

document.addEventListener('DOMContentLoaded', buscarPets)

document.getElementById('search-icon').addEventListener('click', function () {
  const searchInput = document.getElementById('search-input')
  const isVisible = searchInput.style.display === 'block'
  searchInput.style.display = isVisible ? 'none' : 'block'
  if (searchInput.style.display === 'block') {
    searchInput.focus()
  }
})