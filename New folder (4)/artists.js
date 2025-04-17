document.addEventListener('DOMContentLoaded', function() {
  // Filter functionality
  const specialtyFilter = document.getElementById('specialty-filter');
  const locationFilter = document.getElementById('location-filter');
  const searchInput = document.querySelector('.search-bar input');
  const artistCards = document.querySelectorAll('.artist-card');
  
  // Filter artists based on selections
  function filterArtists() {
    const specialtyValue = specialtyFilter.value;
    const locationValue = locationFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    artistCards.forEach(card => {
      const matchesSpecialty = specialtyValue === 'all' || 
        card.getAttribute('data-specialty').includes(specialtyValue);
      const matchesLocation = locationValue === 'all' || 
        card.getAttribute('data-location') === locationValue;
      const artistName = card.querySelector('h3').textContent.toLowerCase();
      const matchesSearch = artistName.includes(searchValue);
      
      if (matchesSpecialty && matchesLocation && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Event listeners for filters
  specialtyFilter.addEventListener('change', filterArtists);
  locationFilter.addEventListener('change', filterArtists);
  searchInput.addEventListener('input', filterArtists);
  
  // Artist card click event
  artistCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't navigate if clicking on a button or link
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        return;
      }
      
      // In a real app, this would navigate to the artist's profile
      const artistName = this.querySelector('h3').textContent;
      console.log(`Navigating to ${artistName}'s profile`);
      // window.location.href = `artist.html?name=${encodeURIComponent(artistName)}`;
    });
  });
  
  // Mobile menu toggle (if not in shared script.js)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
});