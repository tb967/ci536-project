<?php
include 'db.php';

$sql = "SELECT * FROM items WHERE category = 'travel'";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travel Essentials - BrightMart</title>
    <link rel="stylesheet" href="Css/index.css">
    <link rel="icon" type="image/ico" href="uploads/images/favicon.png">
    <script src="Js/product.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <h1>BrightMart</h1>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="sell.html">Sell</a></li>
                <li><a href="login.html">Login</a></li>
                  <li><a href="cart.php">Cart (<span class="cart-count">0</span>)</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>Travel Essentials</h1>
        <section class="products">
            <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo '<div class="product-card">';
                    echo '<img loading="lazy" src="' . htmlspecialchars($row["image"]) . '" alt="' . htmlspecialchars($row["name"]) . '">';
                    $nameWords = explode(' ', $row["name"]);
$shortName = implode(' ', array_slice($nameWords, 0, 2)) . (count($nameWords) > 2 ? '...' : '');
echo '<h2>' . htmlspecialchars($shortName) . '</h2>';
                    echo '<p>Price: £' . htmlspecialchars($row["price"]) . '</p>';
                    echo '<a href="product.php?id=' . $row["id"] . '" class="buy-btn">View</a>';
                    echo '</div>';
                }
            } else {
                echo "<p>No products found in this category.</p>";
            }
            $conn->close();
            ?>
        </section>
    </main>
</body>
</html>
