<?php
session_start();
// Redirect to login if not authenticated
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Messaging System - Dashboard</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body>
  <div class="dashboard-container">
    <nav class="navbar">
      <div class="nav-links">
        <button class="btn logout-btn" onclick="logout()" aria-label="Log out">
          <i class="fas fa-sign-out-alt"></i> Log Out
        </button>
      </div>
    </nav>
    <div class="dashboard-content">
      <h2>Send Bulk SMS</h2>
      <p class="subtitle">Compose and send messages to multiple recipients.</p>
      <form id="sms-form" action="send_sms.php" method="POST" aria-label="Bulk SMS Form">
        <div class="input-group">
          <label for="recipients"><i class="fas fa-users"></i> Recipients (comma-separated numbers)</label>
          <input type="text" id="recipients" name="recipients" placeholder="e.g., +2544567890, +2547654321" required aria-required="true">
          <span class="error" id="recipients-error"></span>
        </div>
        <div class="input-group">
          <label for="sms-message"><i class="fas fa-comment"></i> Message</label>
          <textarea id="sms-message" name="sms-message" placeholder="Type your message (max 160 characters)" maxlength="160" required aria-required="true"></textarea>
          <span class="error" id="sms-message-error"></span>
        </div>
        <button type="submit" class="btn">Send SMS</button>
      </form>
    </div>
  </div>
  <script src="dashboard.js"></script>
</body>
</html>