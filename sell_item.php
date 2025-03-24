<?php
session_start();
require 'db.php'; // Database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    $condition = $_POST['condition'];
    $description = $_POST['description'];
    $contact_name = $_POST['contact_name'];
    $contact_email = $_POST['contact_email'];
    $contact_phone = $_POST['contact_phone'];
    $contact_method = $_POST['contact_method'];

    // Image upload handling
    $imagePath = '';
    if (!empty($_FILES['image']['name'][0])) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
        
        $imageName = time() . '-' . basename($_FILES['image']['name'][0]);
        $imagePath = $uploadDir . $imageName;
        
        if (!move_uploaded_file($_FILES['image']['tmp_name'][0], $imagePath)) {
            $response['message'] = 'Error uploading image.';
            echo json_encode($response);
            exit;
        }
    }

    // Insert into database
    $sql = "INSERT INTO items (name, price, category, item_condition, description, contact_name, contact_email, contact_phone, contact_method, image) 
            VALUES ('$name', '$price', '$category', '$condition', '$description', '$contact_name', '$contact_email', '$contact_phone', '$contact_method', '$imagePath')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Item added successfully!'); window.location.href='sell.html';</script>";
    } else {
        echo "<script>alert('Database error!'); window.location.href='sell.html';</script>";
    
    }
}
?>
