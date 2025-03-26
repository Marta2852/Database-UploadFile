<?php

$host = "localhost";
$dbname = "upload";
$username = "root";
$password = "root";

try{
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Datebase connected successfully!<br>";
} catch (PDOException $e) {

    die("Database connection failed: " . $e->getMessage());
    
}