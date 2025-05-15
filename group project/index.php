<?php
include 'db.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Fetch all products grouped by category
$sql = "SELECT * FROM items ORDER BY category, created_at DESC";
$result = mysqli_query($conn, $sql);

$categories = [];
while ($item = mysqli_fetch_assoc($result)) {
    $categories[$item['category']][] = $item;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace</title>
    <link rel="stylesheet" href="Css/index.css">
</head>
<body>
    <header>
        <nav>
            <h1>Student Marketplace</h1>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="sell.html">Sell</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Product Categories</h1>

        <?php foreach ($categories as $categoryName => $items) { ?>
            <section class="products">
                <h2><?php echo htmlspecialchars($categoryName); ?></h2>
                <div class="product-grid">
                    <?php foreach ($items as $item) { ?>
                        <div class="product-card">
                            <a href="product.php?id=<?php echo $item['id']; ?>">
                                <img src="uploads/<?php echo htmlspecialchars($item['image']); ?>" alt="Product Image">
                                <h3><?php echo htmlspecialchars($item['name']); ?></h3>
                                <p>£<?php echo htmlspecialchars($item['price']); ?></p>
                            </a>
                        </div>
                    <?php } ?>
                </div>
            </section>
        <?php } ?>
    </main>
</body>
</html>
