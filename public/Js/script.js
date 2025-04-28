

document.addEventListener('DOMContentLoaded', function() {
    // Get form and item list elements
    const addItemForm = document.getElementById('add-item-form');
    const itemList = document.getElementById('item-list');
    const imageInput = document.getElementById('item-images');
    const imagePreview = document.getElementById('image-preview');
    
    // Array to store items (would be replaced with database in production)
    let items = [];
    
    // Handle image preview
    imageInput.addEventListener('change', function() {
        // Clear previous previews
        while (imagePreview.firstChild) {
            imagePreview.removeChild(imagePreview.firstChild);
        }
        
        // Check if files were selected
        if (this.files) {
            // Limit to 3 images
            const filesToShow = Array.from(this.files).slice(0, 3);
            
            filesToShow.forEach(file => {
                // Create a preview for each image
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.classList.add('preview-img');
                    imagePreview.appendChild(img);
                }
                
                reader.readAsDataURL(file);
            });
            
            // Show warning if more than 3 files were selected
            if (this.files.length > 3) {
                const warning = document.createElement('p');
                warning.textContent = 'Note: Only the first 3 images will be used.';
                warning.classList.add('warning');
                imagePreview.appendChild(warning);
            }
        }
    });
    
    // Handle form submission
    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('item-title').value;
        const price = document.getElementById('item-price').value;
        const category = document.getElementById('item-category').value;
        const condition = document.getElementById('item-condition').value;
        const description = document.getElementById('item-description').value;
        const contactName = document.getElementById('contact-name').value;
        const contactEmail = document.getElementById('contact-email').value;
        const contactPhone = document.getElementById('contact-phone').value;
        const contactMethod = document.getElementById('contact-method').value;
        
        // Create image URLs array (in a real app, you'd upload these to a server)
        const imageFiles = imageInput.files;
        const imageUrls = [];
        
        // In a real application, you would upload the images to a server
        // and get back URLs. For this demo, we'll use local object URLs
        for (let i = 0; i < Math.min(imageFiles.length, 3); i++) {
            imageUrls.push(URL.createObjectURL(imageFiles[i]));
        }
        
        // Create new item object
        const newItem = {
            id: Date.now(), // Simple unique ID
            title,
            price,
            category,
            condition,
            description,
            imageUrls,
            contact: {
                name: contactName,
                email: contactEmail,
                phone: contactPhone,
                preferredMethod: contactMethod
            },
            datePosted: new Date()
        };
        
        // Add to items array
        items.push(newItem);
        
        // Display the items
        displayItems();
        
        // Reset the form
        addItemForm.reset();
        while (imagePreview.firstChild) {
            imagePreview.removeChild(imagePreview.firstChild);
        }
        
        // Show confirmation
        alert('Your item has been listed successfully!');
    });
    
    // Function to display items
    function displayItems() {
        // Clear current items
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        
        // Display each item
        items.forEach(item => {
            // Create item card container
            const itemElement = document.createElement('div');
            itemElement.classList.add('item-card');
            
            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('item-image');
            
            if (item.imageUrls.length > 0) {
                const img = document.createElement('img');
                img.src = item.imageUrls[0];
                img.alt = item.title;
                imageContainer.appendChild(img);
            } else {
                const noImage = document.createElement('div');
                noImage.classList.add('no-image');
                noImage.textContent = 'No Image';
                imageContainer.appendChild(noImage);
            }
            
            // Create details container
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('item-details');
            
            // Create title
            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;
            
            // Create price
            const priceElement = document.createElement('p');
            priceElement.classList.add('item-price');
            priceElement.textContent = '$' + parseFloat(item.price).toFixed(2);
            
            // Create category and condition
            const categoryElement = document.createElement('p');
            categoryElement.classList.add('item-category');
            categoryElement.textContent = item.category + ' - ' + item.condition;
            
            // Create view details button
            const viewButton = document.createElement('button');
            viewButton.classList.add('view-details-btn');
            viewButton.textContent = 'View Details';
            viewButton.setAttribute('data-id', item.id);
            
            // Add event listener to button
            viewButton.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const selectedItem = items.find(i => i.id === itemId);
                
                if (selectedItem) {
                    // In a real app, you might navigate to a details page
                    // For this demo, we'll just show an alert
                    alert(`
                        ${selectedItem.title}
                        Price: $${parseFloat(selectedItem.price).toFixed(2)}
                        Category: ${selectedItem.category}
                        Condition: ${selectedItem.condition}
                        Description: ${selectedItem.description}
                        
                        Contact: ${selectedItem.contact.name}
                        Email: ${selectedItem.contact.email}
                        Phone: ${selectedItem.contact.phone || 'Not provided'}
                    `);
                }
            });
            
            // Assemble the item card
            detailsContainer.appendChild(titleElement);
            detailsContainer.appendChild(priceElement);
            detailsContainer.appendChild(categoryElement);
            detailsContainer.appendChild(viewButton);
            
            itemElement.appendChild(imageContainer);
            itemElement.appendChild(detailsContainer);
            
            // Add to the item list
            itemList.appendChild(itemElement);
        });
    }
});