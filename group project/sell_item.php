<?php
session_start();
require 'db.php'; // Database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize inputs
    $name = trim($_POST['name']);
    $price = floatval($_POST['price']);
    $category = trim($_POST['category']);
    $condition = trim($_POST['condition']);
    $description = trim($_POST['description']);
    $contact_name = trim($_POST['contact_name']);
    $contact_email = trim($_POST['contact_email']);
    $contact_phone = trim($_POST['contact_phone']);
    $contact_method = trim($_POST['contact_method']);

    // Image upload handling
    $imagePath = '';
    if (!empty($_FILES['image']['name'][0])) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileTmpPath = $_FILES['image']['tmp_name'][0];
        $fileName = basename($_FILES['image']['name'][0]);
        $fileSize = $_FILES['image']['size'][0];
        $fileType = mime_content_type($fileTmpPath);

        $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        $maxFileSize = 2 * 1024 * 1024; // 2MB

        if (!in_array($fileType, $allowedTypes)) {
            echo "<script>alert('Only JPG and PNG files are allowed.'); window.location.href='sell.html';</script>";
            exit;
        }

        if ($fileSize > $maxFileSize) {
            echo "<script>alert('File size too large. Max 2MB allowed.'); window.location.href='sell.html';</script>";
            exit;
        }

        // Create a unique filename
        $newFileName = time() . '-' . preg_replace("/[^A-Za-z0-9.\-]/", '', $fileName);
        $imagePath = $uploadDir . $newFileName;

        if (!move_uploaded_file($fileTmpPath, $imagePath)) {
            echo "<script>alert('Error uploading image.'); window.location.href='sell.html';</script>";
            exit;
        }
    }

    // Insert into database using prepared statements
    $stmt = $conn->prepare("INSERT INTO items (name, price, category, item_condition, description, contact_name, contact_email, contact_phone, contact_method, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        echo "<script>alert('Database prepare failed.'); window.location.href='sell.html';</script>";
        exit;
    }

    $stmt->bind_param("sdssssssss", $name, $price, $category, $condition, $description, $contact_name, $contact_email, $contact_phone, $contact_method, $imagePath);

    if ($stmt->execute()) {
        echo "<script>alert('Item added successfully!'); window.location.href='sell.html';</script>";
    } else {
        echo "<script>alert('Database error: " . $stmt->error . "'); window.location.href='sell.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
