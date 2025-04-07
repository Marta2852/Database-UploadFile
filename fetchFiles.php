<?php
require_once 'config.php'; // Make sure you have the correct DB connection setup

$sql = "SELECT * FROM uploaded_files"; // Adjust this if needed
$result = mysqli_query($conn, $sql);

$files = [];

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $files[] = $row;
    }
}

echo json_encode($files); // Return the files as JSON
?>
