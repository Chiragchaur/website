document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle (if not in shared script.js)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // Filter functionality
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-by');
  const searchInput = document.querySelector('.search-box input');
  const priceSlider = document.querySelector('.price-slider');
  const categoryLinks = document.querySelectorAll('.category-list a');
  const brandCheckboxes = document.querySelectorAll('.brand-checkbox input');
  const productCards = document.querySelectorAll('.product-card');
  
  // Current filter values
  let currentFilters = {
    category: 'all',
    price: 200,
    brands: ['Kaladhiya Premium', 'Winsor & Newton', 'Liquitex', 'Daler-Rowney', 'Faber-Castell'],
    search: '',
    sort: 'popular'
  };
  
  // Update filters and products
  function updateFilters() {
    const maxPrice = currentFilters.price;
    
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardPrice = parseFloat(card.getAttribute('data-price'));
      const cardBrand = card.querySelector('.product-brand').textContent;
      const cardTitle = card.querySelector('.product-title').textContent.toLowerCase();
      
      // Check filters
      const matchesCategory = currentFilters.category === 'all' || 
        cardCategory.includes(currentFilters.category);
      const matchesPrice = cardPrice <= maxPrice;
      const matchesBrand = currentFilters.brands.includes(cardBrand);
      const matchesSearch = cardTitle.includes(currentFilters.search.toLowerCase());
      
      if (matchesCategory && matchesPrice && matchesBrand && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Sort products
    sortProducts();
  }
  
  // Sort products based on current sort option
  function sortProducts() {
    const productsContainer = document.querySelector('.products-grid');
    const products = Array.from(document.querySelectorAll('.product-card[style*="block"]'));
    
    products.sort((a, b) => {
      const aPrice = parseFloat(a.getAttribute('data-price'));
      const bPrice = parseFloat(b.getAttribute('data-price'));
      
      switch(currentFilters.sort) {
        case 'price-low':
          return aPrice - bPrice;
        case 'price-high':
          return bPrice - aPrice;
        case 'rating':
          // This would use actual rating data in a real implementation
          return 0;
        case 'newest':
          // This would use date data in a real implementation
          return 0;
        default: // 'popular'
          // This would use popularity data in a real implementation
          return 0;
      }
    });
    
    // Re-append sorted products
    products.forEach(product => {
      productsContainer.appendChild(product);
    });
  }
  
  // Event listeners for filters
  categoryFilter.addEventListener('change', function() {
    currentFilters.category = this.value;
    updateFilters();
  });
  
  sortFilter.addEventListener('change', function() {
    currentFilters.sort = this.value;
    sortProducts();
  });
  
  searchInput.addEventListener('input', function() {
    currentFilters.search = this.value;
    updateFilters();
  });
  
  priceSlider.addEventListener('input', function() {
    currentFilters.price = this.value;
    updateFilters();
  });
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      categoryLinks.forEach(l => l.parentNode.classList.remove('active'));
      this.parentNode.classList.add('active');
      currentFilters.category = this.getAttribute('data-category');
      updateFilters();
    });
  });
  
  brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const brand = this.nextElementSibling.textContent;
      
      if (this.checked) {
        if (!currentFilters.brands.includes(brand)) {
          currentFilters.brands.push(brand);
        }
      } else {
        currentFilters.brands = currentFilters.brands.filter(b => b !== brand);
      }
      
      updateFilters();
    });
  });
  
  // Quick View Modal
  const quickViewButtons = document.querySelectorAll('.quick-view');
  const quickViewModal = document.querySelector('.quick-view-modal');
  const closeModal = document.querySelector('.close-modal');
  
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const productCard = this.closest('.product-card');
      const productImage = productCard.querySelector('img').src;
      const productBrand = productCard.querySelector('.product-brand').textContent;
      const productTitle = productCard.querySelector('.product-title').textContent;
      const productRating = productCard.querySelector('.product-rating').innerHTML;
      const productPrice = productCard.querySelector('.product-price').innerHTML;
      
      // In a real app, this would fetch more detailed product info
      const productDescription = "This premium quality art supply is perfect for both beginners and professional artists. Made with the finest materials to ensure excellent performance and durability.";
      
      // Populate modal
      const modalBody = quickViewModal.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div class="modal-image">
          <img src="${productImage}" alt="${productTitle}">
        </div>
        <div class="modal-info">
          <span class="modal-brand">${productBrand}</span>
          <h3>${productTitle}</h3>
          <div class="modal-rating">
            ${productRating}
          </div>
          <div class="modal-price">
            ${productPrice}
          </div>
          <p class="modal-description">${productDescription}</p>
          <div class="modal-actions">
            <button class="btn-primary">Add to Cart</button>
            <button class="btn-outline">View Details</button>
          </div>
        </div>
      `;
      
      // Show modal
      quickViewModal.style.display = 'flex';
    });
  });
  
  closeModal.addEventListener('click', function() {
    quickViewModal.style.display = 'none';
  });
  
  window.addEventListener('click', function(e) {
    if (e.target === quickViewModal) {
      quickViewModal.style.display = 'none';
    }
  });
  
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.querySelector('.cart-count');
  let cartItems = 0;
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      cartItems++;
      cartCount.textContent = cartItems;
      
      // Animation
      cartCount.style.transform = 'scale(1.5)';
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
      }, 300);
      
      // Notification
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Item added to cart</span>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
      }, 2000);
    });
  });
  
  // Pagination
  const pageButtons = document.querySelectorAll('.page-btn');
  
  pageButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.classList.contains('next-btn')) return;
      
      pageButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // In a real app, this would load the appropriate page of products
      console.log(`Loading page ${this.textContent}`);
    });
  });
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('art-cart')) || [];

// Function to add item to cart
function addToCart(itemId, quantity = 1) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: itemId, quantity: quantity });
    }
    
    // Save to localStorage
    localStorage.setItem('art-cart', JSON.stringify(cart));
    
    // Update cart count display
    updateCartCount();
    
    // Show added notification
    showCartNotification(itemId);
}

// Function to update cart count in header
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        if (count > 0) {
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Function to show "added to cart" notification
function showCartNotification(itemId) {
    // Find the product in your products array
    const product = artWorks.find(item => item.id === itemId);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <img src="${product.image}" alt="${product.title}">
            <div>
                <p>Added to cart: <strong>${product.title}</strong></p>
                <p>$${product.price.toFixed(2)}</p>
            </div>
            <button class="view-cart-btn">View Cart</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // View cart button event
    notification.querySelector('.view-cart-btn').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

// Initialize cart count on page load
updateCartCount();