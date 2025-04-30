<?php
// Connect to the database
include 'db.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get product ID from the URL
$Id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Fetch product from database
$sql = "SELECT * FROM items WHERE id = $Id";
$result = mysqli_query($conn, $sql);

if (!$result) {
    die("SQL Error: " . mysqli_error($conn));
}

$items = mysqli_fetch_assoc($result);

if (!$items) {
    echo "Product not found!";
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($items['name']); ?> - Product Page</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <header>
        <nav>
            <h1>Student Marketplace</h1>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="#">Sell</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    </header>

    <div class="product-container">
        <div class="product-image">
            <img src="<?php echo htmlspecialchars($items['image']); ?>" alt="Product Image">
            <div class="image-gallery">
                <img src="<?php echo htmlspecialchars($items['image']); ?>" alt="Product Image 2">
                <!-- Additional images if needed -->
            </div>
        </div>

        <div class="product-details">
            <h1><?php echo htmlspecialchars($items['name']); ?></h1>
            <p class="product-description"><?php echo htmlspecialchars($items['description']); ?></p>
            <p class="product-price">Price: £<?php echo htmlspecialchars($items['price']); ?></p>

            <label>Category:</label>
            <p><?php echo htmlspecialchars($items['category']); ?></p>

            <label>Condition:</label>
            <p><?php echo htmlspecialchars($items['item_condition']); ?></p>

            <label>Description:</label>
            <p><?php echo htmlspecialchars($items['description']); ?></p>

            <label>Seller Name:</label>
            <p><?php echo htmlspecialchars($items['contact_name']); ?></p>

            <label>Contact Email:</label>
            <p><?php echo htmlspecialchars($items['contact_email']); ?></p>

            <label>Contact Phone:</label>
            <p><?php echo htmlspecialchars($items['contact_phone']); ?></p>

            <label>Preferred Contact Method:</label>
            <p><?php echo htmlspecialchars($items['contact_method']); ?></p>

            <label>Quantity:</label>
            <input type="number" id="quantity" name="quantity" value="1" min="1">

            <div class="product-buttons">
                <button class="browse-btn" onclick="addToCart()">Add to Cart</button>
                <button class="buy-btn" onclick="buyNow()">Buy Now</button>
                <button onclick="addToWishlist()">Add to Wishlist</button>
            </div>
        </div>
    </div>

    <script src="product.js"></script>
</body>
</html>
