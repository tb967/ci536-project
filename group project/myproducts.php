<?php
session_start();
include 'db.php';

if (!isset($_SESSION['username'])) {
    echo "Please log in to view your products.";
    exit;
}

$username = $_SESSION['username'];
$sql = "SELECT * FROM products WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html>
<head>
    <title>My Products</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <h2>My Products</h2>
    <div class="product-list">
        <?php
        while ($row = $result->fetch_assoc()) {
            echo '<div class="product">';
            echo '<img src="Images/' . htmlspecialchars($row["image"]) . '" alt="' . htmlspecialchars($row["name"]) . '">';
            echo '<h3>' . htmlspecialchars($row["name"]) . '</h3>';
            echo '<p>£' . htmlspecialchars($row["price"]) . '</p>';
            echo '</div>';
        }
        ?>
    </div>
</body>
</html>
