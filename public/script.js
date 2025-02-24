// Get the elements we need
const itemList = document.getElementById('item-list');
const addItemForm = document.getElementById('add-item-form');
const itemTitleInput = document.getElementById('item-title');
const itemPriceInput = document.getElementById('item-price');

// Show items on the page
function displayItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    
    itemDiv.innerHTML = `
        <span class="title">${item.title}</span>
        <span class="price">$${item.price}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    // Delete button
    itemDiv.querySelector('.delete').onclick = async () => {
        await fetch(`/api/items/${item.id}`, { method: 'DELETE' });
        itemDiv.remove();
    };

    // Edit button
    itemDiv.querySelector('.edit').onclick = () => {
        const newTitle = prompt('New title:', item.title);
        const newPrice = prompt('New price:', item.price);
        if (newTitle && newPrice) {
            updateItem(item.id, newTitle, newPrice, itemDiv);
        }
    };

    itemList.appendChild(itemDiv);
}

// Add new items
addItemForm.onsubmit = async (event) => {
    event.preventDefault();
    
    const newItem = {
        title: itemTitleInput.value,
        price: itemPriceInput.value
    };

    const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    });

    if (response.ok) {
        const item = await response.json();
        displayItem(item);
        addItemForm.reset();
    }
};

// Load all items when page starts
async function loadItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    items.forEach(displayItem);
}

loadItems();
