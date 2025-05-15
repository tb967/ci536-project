<?php
include 'db.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart - BrightMart</title>
    <link rel="stylesheet" href="Css/index.css">
    <link rel="stylesheet" href="Css/mkartw.css">
    <link rel="icon" type="image/ico" href="uploads/images/favicon.png">
    <script src="Js/product.js"></script>
   
</head>
<body>
    <header>
        <nav>
            <h1>BrightMart</h1>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="sell.html">Sell</a></li>
                <li><a href="login.html">Login</a></li>
                  <li><a href="cart.php">Cart <span id="cart-count">(0)</span></a></li>
            </ul>
        </nav>
    </header>

    <div class="cart-container">
        <h1>Your Shopping Cart</h1>
        
        <div id="cart-items">
            <!-- Cart items will be loaded here via JavaScript -->
        </div>
        
        <div class="cart-summary">
            <h2>Order Summary</h2>
            <p>Total Items: <span id="total-items">0</span></p>
            <p>Subtotal: £<span id="subtotal">0.00</span></p>
            <button class="checkout-btn" id="checkout-btn">Proceed to Checkout</button>
        </div>
    </div>

    
</body>
</html>