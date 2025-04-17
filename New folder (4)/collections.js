document.addEventListener('DOMContentLoaded', function() {
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const collectionCards = document.querySelectorAll('.collection-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter collections
      collectionCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
        } else {
          const categories = card.getAttribute('data-category').split(' ');
          if (categories.includes(filterValue)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
        
        // Trigger reflow for animation
        void card.offsetWidth;
      });
    });
  });

  // Collection card click event
  collectionCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't navigate if clicking on a button or link
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        return;
      }
      
      // In a real app, this would navigate to the collection page
      const collectionName = this.querySelector('h3').textContent;
      console.log(`Navigating to ${collectionName} collection`);
      // window.location.href = `collection.html?name=${encodeURIComponent(collectionName)}`;
    });
  });

  // Mobile menu toggle (if not in shared script.js)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
});