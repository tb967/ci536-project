<?php
session_start();
require 'db.php'; // Include database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['password'])) {
            // Login successful
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            $stmt->close();
            $conn->close();
            echo "<script>alert('Login successful!'); window.location.href='myproducts.php';</script>";
            exit;
        } else {
            $stmt->close();
            $conn->close();
            echo "<script>alert('Invalid password!'); window.location.href='login.html';</script>";
            exit;
        }
    } else {
        $stmt->close();
        $conn->close();
        echo "<script>alert('No user found with that email!'); window.location.href='login.html';</script>";
        exit;
    }
}
?>
