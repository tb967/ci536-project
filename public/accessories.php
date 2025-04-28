<?php
include 'db.php';

$sql = "SELECT * FROM items WHERE category = 'accessories'";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessories - Marketplace</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <header>
        <nav>
            <h1>Student Marketplace</h1>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="sell.html">Sell</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>Accessories</h1>
        <section class="products">
            <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo '<div class="product-card">';
                    echo '<img src="' . htmlspecialchars($row["image"]) . '" alt="' . htmlspecialchars($row["name"]) . '">';
                    echo '<h2>' . htmlspecialchars($row["name"]) . '</h2>';
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
