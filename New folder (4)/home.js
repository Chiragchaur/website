 document.addEventListener('DOMContentLoaded', function() {
      // Mobile menu toggle
      const menuToggle = document.querySelector('.menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      
      menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      });

      // Cart functionality
      let cartCount = 0;
      const cartButtons = document.querySelectorAll('.add-to-cart');
      const cartCountElement = document.querySelector('.cart-count');
      
      cartButtons.forEach(button => {
        button.addEventListener('click', function() {
          cartCount++;
          cartCountElement.textContent = cartCount;
          cartCountElement.style.animation = 'none';
          void cartCountElement.offsetWidth; // Trigger reflow
          cartCountElement.style.animation = 'bounce 0.5s';
          
          // Show added to cart notification
          const notification = document.createElement('div');
          notification.textContent = 'Added to cart!';
          notification.style.position = 'fixed';
          notification.style.bottom = '20px';
          notification.style.right = '20px';
          notification.style.backgroundColor = 'var(--primary)';
          notification.style.color = 'white';
          notification.style.padding = '10px 20px';
          notification.style.borderRadius = '5px';
          notification.style.zIndex = '1000';
          document.body.appendChild(notification);
          
          setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
          }, 2000);
        });
      });

      // Modal functionality
      const modal = document.getElementById('artModal');
      const artCards = document.querySelectorAll('.art-card');
      
      artCards.forEach(card => {
        card.addEventListener('click', function() {
          const imgSrc = this.querySelector('img').src;
          const title = this.querySelector('h3').textContent;
          const price = this.querySelector('p').textContent;
          
          document.getElementById('modalImage').src = imgSrc;
          document.getElementById('modalTitle').textContent = title;
          document.getElementById('modalPrice').textContent = price;
          document.getElementById('modalDescription').textContent = "This beautiful artwork is hand-painted by our talented artists using premium quality materials.";
          
          modal.style.display = 'flex';
        });
      });

      document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });

      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
    });