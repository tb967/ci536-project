
document.addEventListener("DOMContentLoaded", () => {
    const browseButtons = document.querySelectorAll(".browse-btn");
    const buyButtons = document.querySelectorAll(".buy-btn");

    browseButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const category = event.target.closest(".product-card")?.querySelector("h2")?.innerText || 'this product';
            alert(`Browsing products in category: ${category}`);
        });
    });

    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Item added to cart!");
        });
    });
});

function addToCart() {
    const quantity = document.getElementById('quantity').value;
    alert(`Added ${quantity} item(s) to cart!`);
}

function buyNow() {
    const quantity = document.getElementById('quantity').value;
    alert(`Proceeding to checkout with ${quantity} item(s)!`);
}

function addToWishlist() {
    alert('Added to your wishlist!');
}
