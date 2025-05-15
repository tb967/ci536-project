<?php
$servername = "localhost";
$username = "ja1186_Jennet";
$password = "Brighton_market120*";
$dbname = "ja1186_brighton_marketplace";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>