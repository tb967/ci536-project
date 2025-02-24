document.addEventListener("DOMContentLoaded", () => {
    const browseButtons = document.querySelectorAll(".browse-btn");
    const buyButtons = document.querySelectorAll(".buy-btn");

    /* browseButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const category = event.target.closest(".product-card").querySelector("h2").innerText;
            alert(`Browsing products in category: ${category}`);
        });
    }); */

    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Item added to cart!");
        });
    });
});