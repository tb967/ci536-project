const cartItemsDiv = document.getElementById('cartItems');
const cartTotalDiv = document.getElementById('cartTotal');

// Sample cart data (replace with data from your application)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

function updateCartDisplay() {
  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cartItem');
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
    `;
    cartItemsDiv.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
}

//This is placeholder data.  You need to integrate your actual product data here.
//For example, you might fetch product data from an API
const sampleCart = [
    { name: "Product A", price: 19.99, quantity: 2, image: "productA.jpg" },
    { name: "Product B", price: 9.99, quantity: 1, image: "productB.jpg" }
];

//Example of adding items to the cart (in a real app, this would be triggered by a button click)
sampleCart.forEach(item => {
  cart.push(item);
});

localStorage.setItem('cart', JSON.stringify(cart));
updateCartDisplay();