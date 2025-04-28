const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItem');
const wishlistList = document.getElementById('wishlist');

// Load wishlist from local storage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
displayWishlist();

addItemButton.addEventListener('click', () => {
  const newItem = itemInput.value.trim();
  if (newItem !== "") {
    wishlist.push(newItem);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlist();
    itemInput.value = ""; //Clear input field
  }
});


function displayWishlist() {
  wishlistList.innerHTML = ''; // Clear the list
  wishlist.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${item} <button class="removeItem" data-item="${item}">Remove</button>`;
    wishlistList.appendChild(listItem);
  });

  // Add event listeners for remove buttons (must be done after adding items)
  const removeButtons = document.querySelectorAll('.removeItem');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemToRemove = button.dataset.item;
      wishlist = wishlist.filter(item => item !== itemToRemove);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      displayWishlist();
    });
  });
}