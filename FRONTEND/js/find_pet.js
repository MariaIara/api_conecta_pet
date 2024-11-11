document
  .getElementById('microchipForm')
  .addEventListener('submit', function (event) {
    event.preventDefault() 
    const microchip = document.getElementById('id-pet').value
    if (microchip) {
      localStorage.setItem('microchip', microchip)
      window.location.href = './pet_found.html' 
    } else {
      alert('Por favor, insira um número de microchip válido.')
    }
  })