<?php
require_once 'config.php'; // Ensure the DB connection is included

if (isset($_GET['id'])) {
    $file_id = $_GET['id'];

    // Get the file path before deleting it
    $sql = "SELECT file_path FROM uploaded_files WHERE id = $file_id";
    $result = mysqli_query($conn, $sql);
    $file = mysqli_fetch_assoc($result);
    $file_path = $file['file_path'];

    // Delete file from the database
    $delete_query = "DELETE FROM uploaded_files WHERE id = $file_id";
    if (mysqli_query($conn, $delete_query)) {
        // Delete the file from the server
        if (file_exists($file_path)) {
            unlink($file_path); // Remove the file from the server
        }
        echo json_encode(['status' => 'success', 'message' => 'File deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete file']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'File ID not provided']);
}
?>
