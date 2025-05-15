// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample product data (in a real app, this would come from a database)
    const products = [
        {
            id: 1,
            name: "Introduction to Computer Science Textbook",
            seller: "John Doe",
            price: 45.99,
            image: "images/textbook.jpg",
            description: "A comprehensive introduction to computer science principles."
        },
        {
            id: 2,
            name: "Scientific Calculator",
            seller: "Jane Smith",
            price: 29.99,
            image: "images/calculator.jpg",
            description: "Advanced scientific calculator with graphing capabilities."
        },
        {
            id: 3,
            name: "Premium Notebook Set",
            seller: "Alex Johnson",
            price: 12.50,
            image: "images/notebook.jpg",
            description: "Set of 3 high-quality notebooks with durable covers."
        },
        {
            id: 4,
            name: "Ergonomic Desk Lamp",
            seller: "Sarah Williams",
            price: 34.95,
            image: "images/lamp.jpg",
            description: "LED desk lamp with adjustable brightness and color temperature."
        },
        {
            id: 5,
            name: "Wireless Headphones",
            seller: "Mike Brown",
            price: 79.99,
            image: "images/headphones.jpg",
            description: "Noise-cancelling wireless headphones with 30-hour battery life."
        }
    ];

    // Cart management
    let cart = [];
    
    // Load cart from localStorage if available
    function loadCart() {
        const savedCart = localStorage.getItem('studentMarketplaceCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        renderCart();
        updateCartCount();
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('studentMarketplaceCart', JSON.stringify(cart));
        updateCartCount();
    }
    
    // Add item to cart
    function addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                seller: product.seller,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        saveCart();
        renderCart();
    }
    
    // Remove item from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
    }
    
    // Update item quantity
    function updateQuantity(productId, quantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                renderCart();
            }
        }
    }
    
    // Render cart items
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartContainer = document.getElementById('empty-cart');
        const filledCartContainer = document.getElementById('filled-cart');
        
        if (cart.length === 0) {
            emptyCartContainer.style.display = 'block';
            filledCartContainer.style.display = 'none';
            return;
        }
        
        emptyCartContainer.style.display = 'none';
        filledCartContainer.style.display = 'block';
        
        // Clear current items
        cartItemsContainer.innerHTML = '';
        
        // Add each item to the cart
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id) || item;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.dataset.id = item.id;
            
            // Use a placeholder image if the actual image doesn't exist
            const imageSrc = product.image || 'https://via.placeholder.com/80';
            
            cartItemElement.innerHTML = `
                <img src="${imageSrc}" alt="${product.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80'">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${product.name}</h3>
                    <p class="cart-item-seller">Seller: ${product.seller}</p>
                </div>
                <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-btn">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                    <button class="quantity-btn increase-btn">+</button>
                </div>
                <button class="cart-item-remove">Remove</button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            
            // Add event listeners for this item
            const decreaseBtn = cartItemElement.querySelector('.decrease-btn');
            const increaseBtn = cartItemElement.querySelector('.increase-btn');
            const quantityInput = cartItemElement.querySelector('.quantity-input');
            const removeBtn = cartItemElement.querySelector('.cart-item-remove');
            
            decreaseBtn.addEventListener('click', () => {
                const currentQuantity = parseInt(quantityInput.value);
                if (currentQuantity > 1) {
                    updateQuantity(item.id, currentQuantity - 1);
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                const currentQuantity = parseInt(quantityInput.value);
                updateQuantity(item.id, currentQuantity + 1);
            });
            
            quantityInput.addEventListener('change', () => {
                const newQuantity = parseInt(quantityInput.value);
                if (newQuantity >= 1) {
                    updateQuantity(item.id, newQuantity);
                } else {
                    quantityInput.value = 1;
                    updateQuantity(item.id, 1);
                }
            });
            
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });
        
        updateCartTotals();
    }
    
    // Update cart totals
    function updateCartTotals() {
        const subtotalElement = document.getElementById('cart-subtotal');
        const totalElement = document.getElementById('cart-total');
        
        let subtotal = 0;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id) || item;
            subtotal += product.price * item.quantity;
        });
        
        const shipping = cart.length > 0 ? 5.00 : 0;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Update cart count in the header
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            let itemCount = 0;
            cart.forEach(item => {
                itemCount += item.quantity;
            });
            cartCountElement.textContent = itemCount;
        }
    }
    
    // Initialize cart
    loadCart();
    
    // For testing: Add some items to the cart if it's empty
    if (cart.length === 0) {
        // Add sample items to the cart
        addToCart(1); // Add textbook
        addToCart(3); // Add notebook
        addToCart(5); // Add headphones
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert(`Proceeding to checkout with ${cart.length} items totaling ${document.getElementById('cart-total').textContent}`);
            // Here you would redirect to a checkout page
            // window.location.href = 'checkout.html';
        });
    }
    
    // Add to cart functionality for product pages
    // This would be used on the product detail pages
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            addToCart(productId);
            alert('Product added to cart!');
        });
    });
});