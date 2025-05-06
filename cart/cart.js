document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    loadCart();
    
    // Add event listener to checkout button
    document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);
    
    // Add event listeners to quantity buttons and remove buttons
    setupEventListeners();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const filledCart = document.getElementById('filled-cart');
    const emptyCart = document.getElementById('empty-cart');
    
    // Update cart count
    updateCartCount();
    
    // Show empty cart if no items
    if (cart.length === 0) {
        filledCart.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    // Show filled cart
    filledCart.style.display = 'block';
    emptyCart.style.display = 'none';
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Add each item to the cart
    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        
        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <div class="cart-item-total">
                    $${itemTotal}
                </div>
                <button class="remove-item-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    
    // Update cart totals
    updateCartTotals();
}

function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Set shipping cost (free if subtotal > $50)
    const shipping = subtotal > 50 ? 0 : 5;
    
    // Calculate total
    const total = subtotal + shipping;
    
    // Update display
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count display
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

function setupEventListeners() {
    // Event delegation for quantity changes and item removal
    document.getElementById('cart-items').addEventListener('click', function(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;
        
        const itemId = cartItem.dataset.id;
        
        // Handle quantity decrease
        if (e.target.classList.contains('decrease')) {
            updateItemQuantity(itemId, -1);
        }
        
        // Handle quantity increase
        if (e.target.classList.contains('increase')) {
            updateItemQuantity(itemId, 1);
        }
        
        // Handle item removal
        if (e.target.classList.contains('fa-trash') || e.target.classList.contains('remove-item-btn')) {
            removeItem(itemId);
        }
    });
}

function updateItemQuantity(itemId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the item
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    // Update quantity
    cart[itemIndex].quantity += change;
    
    // Remove item if quantity is 0 or less
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart display
    loadCart();
}

function removeItem(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the item to remove
    const updatedCart = cart.filter(item => item.id !== itemId);
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Reload cart display
    loadCart();
}

function proceedToCheckout() {
    // This function would connect to your backend/database
    // For now, just show an alert
    alert('Proceeding to checkout! This would connect to your payment processing system.');
    
    // In a real implementation, you would:
    // 1. Send the cart data to your server
    // 2. Connect with the database person's API
    // 3. Redirect to a checkout page
}