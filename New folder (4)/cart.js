        // Sample art data (in a real app, this would come from your database)
        const artWorks = [
            {
                id: 1,
                title: "Starry Night",
                artist: "Vincent Van Gogh",
                price: 1200,
                image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 2,
                title: "Mona Lisa",
                artist: "Leonardo da Vinci",
                price: 2500,
                image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 3,
                title: "The Scream",
                artist: "Edvard Munch",
                price: 1800,
                image: "https://images.unsplash.com/photo-1610220941051-3c79a8ddb0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            }
        ];

        // Cart functionality
        let cart = JSON.parse(localStorage.getItem('art-cart')) || [];

        // DOM elements
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');
        const shippingElement = document.getElementById('shipping');

        // Render cart items
        function renderCart() {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-palette"></i>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any artwork yet</p>
                        <button class="empty-cart-btn">
                            <i class="fas fa-brush"></i> Browse Artworks
                        </button>
                    </div>
                `;
                cartSummary.style.display = 'none';
                return;
            }

            cartItemsContainer.innerHTML = cart.map(item => {
                const artwork = artWorks.find(art => art.id === item.id);
                return `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${artwork.image}" alt="${artwork.title}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h3 class="cart-item-title">${artwork.title}</h3>
                            <p class="cart-item-artist">By ${artwork.artist}</p>
                            <p class="cart-item-price">$${(artwork.price * item.quantity).toFixed(2)}</p>
                            <div class="cart-item-controls">
                                <div class="quantity-control">
                                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                    <input type="number" class="quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                </div>
                                <button class="remove-item" data-id="${item.id}">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Calculate totals
            const subtotal = cart.reduce((sum, item) => {
                const artwork = artWorks.find(art => art.id === item.id);
                return sum + (artwork.price * item.quantity);
            }, 0);

            const shipping = 15.00;
            const total = subtotal + shipping;

            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            shippingElement.textContent = `$${shipping.toFixed(2)}`;
            totalElement.textContent = `$${total.toFixed(2)}`;
            cartSummary.style.display = 'block';

            // Add event listeners
            document.querySelectorAll('.minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    updateQuantity(id, -1);
                });
            });

            document.querySelectorAll('.plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    updateQuantity(id, 1);
                });
            });

            document.querySelectorAll('.quantity').forEach(input => {
                input.addEventListener('change', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    const newQuantity = parseInt(e.target.value);
                    if (newQuantity > 0) {
                        setQuantity(id, newQuantity);
                    }
                });
            });

            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    removeFromCart(id);
                });
            });
        }

        // Update item quantity
        function updateQuantity(id, change) {
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                cart[itemIndex].quantity += change;
                
                if (cart[itemIndex].quantity < 1) {
                    cart.splice(itemIndex, 1);
                }
                
                saveCart();
                renderCart();
            }
        }

        // Set specific quantity
        function setQuantity(id, quantity) {
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                cart[itemIndex].quantity = quantity;
                saveCart();
                renderCart();
            }
        }

        // Remove item from cart
        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            saveCart();
            renderCart();
        }

        // Save cart to localStorage
        function saveCart() {
            localStorage.setItem('art-cart', JSON.stringify(cart));
        }

        // Initialize cart
        renderCart();

        // Continue shopping button
        document.querySelector('.continue-shopping').addEventListener('click', () => {
            window.location.href = 'gallery.html'; // Change to your gallery page
        });

        // Empty cart button
        document.querySelector('.empty-cart-btn')?.addEventListener('click', () => {
            window.location.href = 'gallery.html'; // Change to your gallery page
        });

        // Checkout button
        document.querySelector('.checkout-btn')?.addEventListener('click', () => {
            alert('Proceeding to checkout! In a real app, this would redirect to payment.');
        });