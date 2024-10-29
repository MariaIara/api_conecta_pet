async function fetchData() {
  const data = {
    headers: [
      'ID',
      'Nome',
      'Sexo',
      'Cidade',
      'Microchip',
      'Responsável',
      'Ações',
    ],
    rows: [
      ['234567', 'Dudu', 'M', 'Juazeiro', '234567', 'José Eduardo'],
      ['234567', 'Bob', 'M', 'Juazeiro', '234567', 'José Eduardo'],
    ],
  }
  createTable(data.headers, data.rows)
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
