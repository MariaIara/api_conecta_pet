document.addEventListener('DOMContentLoaded', () => {
  console.log('Página pet_not_found.html carregada.')
  localStorage.removeItem('redirection_flag') // Remove a flag ao carregar
  localStorage.removeItem('microchip') // Limpa o microchip
})
