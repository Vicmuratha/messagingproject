<?php
$host = 'localhost';
$db   = 'messaging_system';
$user = 'root';     // change if needed
$pass = 'victory';         // change if needed

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}
?>
