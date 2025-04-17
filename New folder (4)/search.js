        // Sample art data
        const artworks = [
            {
                id: 1,
                title: "Starry Night",
                artist: "Vincent Van Gogh",
                price: 1200,
                image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "painting",
                tags: ["impressionism", "landscape", "oil"]
            },
            // ... (keep your existing artwork data)
        ];

        // DOM elements
        const searchTrigger = document.getElementById('search-trigger');
        const searchBox = document.getElementById('search-box');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Current filter state
        let currentFilter = 'all';
        let currentSearchTerm = '';

        // Toggle search box visibility
        searchTrigger.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && e.target !== searchTrigger) {
                searchBox.classList.remove('active');
            }
        });

        // Initialize the page
        function init() {
            renderArtworks(artworks);
            setupEventListeners();
        }

        // Set up event listeners
        function setupEventListeners() {
            // Search input
            searchInput.addEventListener('input', (e) => {
                currentSearchTerm = e.target.value.toLowerCase();
                filterArtworks();
            });

            // Filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    currentFilter = button.dataset.filter;
                    filterArtworks();
                });
            });
        }

        // Filter and render artworks (keep your existing implementation)
        function filterArtworks() {
            let filtered = artworks;

            if (currentFilter !== 'all') {
                filtered = filtered.filter(art => art.category === currentFilter);
            }

            if (currentSearchTerm) {
                filtered = filtered.filter(art => 
                    art.title.toLowerCase().includes(currentSearchTerm) ||
                    art.artist.toLowerCase().includes(currentSearchTerm) ||
                    art.tags.some(tag => tag.includes(currentSearchTerm))
                );
            }

            renderArtworks(filtered);
        }

        function renderArtworks(artworksToRender) {
            if (artworksToRender.length === 0) {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-palette"></i>
                        <h3>No artworks found</h3>
                        <p>Try adjusting your search or filter</p>
                    </div>
                `;
                return;
            }

            searchResults.innerHTML = artworksToRender.map(art => `
                <div class="artwork-card" data-id="${art.id}">
                    <img src="${art.image}" alt="${art.title}" class="artwork-image">
                    <div class="artwork-details">
                        <h3 class="artwork-title">${art.title}</h3>
                        <p class="artwork-artist">By ${art.artist}</p>
                        <p class="artwork-price">$${art.price.toFixed(2)}</p>
                        <button class="add-to-cart" onclick="addToCart(${art.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Add to cart function (keep your existing implementation)
        function addToCart(itemId) {
            const artwork = artworks.find(art => art.id === itemId);
            let cart = JSON.parse(localStorage.getItem('art-cart')) || [];
            
            const existingItem = cart.find(item => item.id === itemId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ 
                    id: artwork.id,
                    title: artwork.title,
                    price: artwork.price,
                    image: artwork.image,
                    quantity: 1 
                });
            }
            
            localStorage.setItem('art-cart', JSON.stringify(cart));
            alert(`${artwork.title} added to cart!`);
        }

        // Initialize the page
        init();