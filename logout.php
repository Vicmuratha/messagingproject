<?php
session_start();
header('Content-Type: application/json');

// Invalidate session
session_destroy();

echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
?>