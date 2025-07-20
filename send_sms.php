<?php
session_start();
header('Content-Type: application/json');
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit;
}

$recipients = trim($_POST['recipients'] ?? '');
$message = trim($_POST['sms-message'] ?? '');

if (!$recipients || !$message) {
    echo json_encode(['success' => false, 'message' => 'Recipients and message are required']);
    exit;
}

$phones = array_map('trim', explode(',', $recipients));
$phoneRegex = '/^\+\d{10,15}$/';

$validPhones = array_filter($phones, fn($phone) => preg_match($phoneRegex, $phone));

if (count($phones) !== count($validPhones)) {
    echo json_encode(['success' => false, 'message' => 'Invalid phone numbers']);
    exit;
}

if (strlen($message) > 160) {
    echo json_encode(['success' => false, 'message' => 'Message exceeds 160 characters']);
    exit;
}

// Save messages
$stmt = $pdo->prepare("INSERT INTO messages (user_id, recipient, message) VALUES (?, ?, ?)");
foreach ($validPhones as $phone) {
    $stmt->execute([$_SESSION['user_id'], $phone, $message]);
}

echo json_encode(['success' => true, 'message' => 'Bulk SMS saved successfully']);
?>
