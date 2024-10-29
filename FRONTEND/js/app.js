async function fetchData() {
  try {
    const response = await fetch('http://localhost:8080/pets')
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`)
    }

    const data = await response.json()

    const headers = [
      'ID',
      'Nome',
      'Sexo',
      'Cidade',
      'Microchip',
      'Responsável',
      'Ações',
    ]
    const rows = data.map((pet) => [
      pet.id,
      pet.nome,
      pet.sexo,
      pet.cidade,
      pet.microchip,
      pet.responsavel,
    ])

    createTable(headers, rows)
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
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
                    <button class="action-btn delete-btn"><i class="ph-fill ph-trash"></i></button>
                    <button class="action-btn edit-btn"><i class="ph-fill ph-pencil-simple"></i></button>
                `
    row.appendChild(actionTd)
    tbody.appendChild(row)
  })

  table.appendChild(thead)
  table.appendChild(tbody)
  tableContainer.appendChild(table)
}

document.addEventListener('DOMContentLoaded', fetchData)
