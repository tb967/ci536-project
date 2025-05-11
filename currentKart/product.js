document.addEventListener("DOMContentLoaded", () => {
    loadItems(); // Load products from database

    function loadItems() {
        fetch("product.php")
            .then(response => response.json())
            .then(items => {
                const itemList = document.getElementById("itemList");
                itemList.innerHTML = ""; // Clear before reloading

                items.forEach(item => {
                    const itemElement = document.createElement("div");
                    itemElement.classList.add("product-card");

                    // Create Image Container
                    const imageContainer = document.createElement("div");
                    imageContainer.classList.add("product-image");

                    if (item.image) {
                        const img = document.createElement("img");
                        img.src = "uploads/" + item.image; // Ensure the correct path
                        img.alt = item.name;
                        imageContainer.appendChild(img);
                    }

                    // Create Product Details
                    const detailsContainer = document.createElement("div");
                    detailsContainer.classList.add("product-details");

                    const titleElement = document.createElement("h2");
                    titleElement.textContent = item.name;

                    const descriptionElement = document.createElement("p");
                    descriptionElement.textContent = item.description;

                    const priceElement = document.createElement("p");
                    priceElement.classList.add("product-price");
                    priceElement.textContent = `$${parseFloat(item.price).toFixed(2)}`;

                    // Create Buttons
                    const browseButton = document.createElement("button");
                    browseButton.classList.add("browse-btn");
                    browseButton.textContent = "Browse";
                    browseButton.addEventListener("click", () => {
                        alert(`Browsing products in category: ${item.name}`);
                    });

                    const buyButton = document.createElement("button");
                    buyButton.classList.add("buy-btn");
                    buyButton.textContent = "Buy Now";
                    buyButton.addEventListener("click", () => {
                        alert(`Item added to cart: ${item.name}`);
                    });

                    // Append Elements
                    detailsContainer.appendChild(titleElement);
                    detailsContainer.appendChild(descriptionElement);
                    detailsContainer.appendChild(priceElement);
                    detailsContainer.appendChild(browseButton);
                    detailsContainer.appendChild(buyButton);

                    itemElement.appendChild(imageContainer);
                    itemElement.appendChild(detailsContainer);
                    itemList.appendChild(itemElement);
                });
            })
            .catch(error => console.error("Error fetching items:", error));
    }

    // Keeping existing standalone functions
    window.addToCart = function () {
        const productId = new URLSearchParams(window.location.search).get('id');
        const quantity = document.getElementById('quantity').value;
        
        if (!productId || quantity < 1) {
            alert('Invalid product or quantity');
            return;
        }
        
        // Get product details from the page
        const productName = document.querySelector('.product-details h1').textContent;
        const productPrice = document.querySelector('.product-price').textContent.replace('Price: £', '');
        const productImage = document.querySelector('.product-image img').src;
        
        // Create cart item object
        const cartItem = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            image: productImage,
            quantity: parseInt(quantity)
        };
        
        // Get existing cart or initialize empty cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex > -1) {
            // Update quantity if product already in cart
            cart[existingItemIndex].quantity += parseInt(quantity);
        } else {
            // Add new item to cart
            cart.push(cartItem);
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show confirmation and update cart count
        alert(`Added ${quantity} item(s) to your cart`);
        updateCartCount();
    };

    window.buyNow = function () {
        const quantity = document.getElementById("quantity").value;
        alert(`Proceeding to checkout with ${quantity} item(s)!`);
    };

    window.addToWishlist = function () {
        alert("Added to your wishlist!");
    };

    // Update cart count in the header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        // If you have a cart count element, update it
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }
    
    // Initialize cart count on page load
    updateCartCount();
    
    // Add this function to load and display cart contents on the cart page
    if (window.location.pathname.includes('cart.php')) {
        loadCartContents();
    }
    
    function loadCartContents() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const totalItemsElement = document.getElementById('total-items');
        const subtotalElement = document.getElementById('subtotal');
        
        if (!cartItemsContainer) return; // Not on cart page
        
        // Update total items count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (totalItemsElement) totalItemsElement.textContent = totalItems;
        
        // Calculate subtotal
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2);
        
        // Clear cart items container
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart"><h3>Your cart is empty</h3><p>Browse our products and add items to your cart.</p></div>';
            return;
        }
        
        // Add each item to the cart display
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: £${item.price.toFixed(2)}</p>
                    <p>Total: £${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-qty">
                        <button class="increase-qty" data-index="${index}">+</button>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Add event listeners for quantity controls and remove buttons
        setupCartEventListeners();
    }
    
    function setupCartEventListeners() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        document.querySelectorAll('.decrease-qty').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    loadCartContents();
                    updateCartCount();
                }
            });
        });
        
        document.querySelectorAll('.increase-qty').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCartContents();
                updateCartCount();
            });
        });
        
        document.querySelectorAll('.item-qty').forEach(input => {
            input.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                const newQty = parseInt(this.value);
                if (newQty >= 1) {
                    cart[index].quantity = newQty;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    loadCartContents();
                    updateCartCount();
                }
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCartContents();
                updateCartCount();
            });
        });
        
        // Checkout button functionality
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Your cart is empty. Add some items before checking out.');
                    return;
                }
                
                alert('Proceeding to checkout...');
                // window.location.href = 'checkout.php';
            });
        }
    }
});
