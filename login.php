<?php
session_start();
header('Content-Type: application/json');
require 'db.php';

$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

$stmt = $pdo->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    exit;
}

// Store user ID in session
$_SESSION['user_id'] = $user['id'];
echo json_encode(['success' => true, 'message' => 'Login successful']);
?>
