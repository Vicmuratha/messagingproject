<?php
session_start();
// Redirect to dashboard if already logged in
if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Messaging System - Sign Up & Log In</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body>
  <div class="container">
    <!-- Signup Form -->
    <div class="form-box" id="signup-box">
      <h2>Get Started</h2>
      <p class="subtitle">Create an account to start messaging!</p>
      <form id="signup-form" action="signup.php" method="POST" aria-label="Sign Up Form">
        <div class="input-group">
          <label for="signup-username"><i class="fas fa-user"></i> Username</label>
          <input type="text" id="signup-username" name="username" placeholder="Choose a username" required aria-required="true">
          <span class="error" id="signup-username-error"></span>
        </div>
        <div class="input-group">
          <label for="signup-email"><i class="fas fa-envelope"></i> Email</label>
          <input type="email" id="signup-email" name="email" placeholder="Your email address" required aria-required="true">
          <span class="error" id="signup-email-error"></span>
        </div>
        <div class="input-group">
          <label for="signup-password"><i class="fas fa-lock"></i> Password</label>
          <div class="password-wrapper">
            <input type="password" id="signup-password" name="password" placeholder="Create a strong password" required aria-required="true">
            <i class="fas fa-eye toggle-password" onclick="togglePassword('signup-password')"></i>
          </div>
          <span class="error" id="signup-password-error"></span>
        </div>
        <button type="submit" class="btn">Sign Up</button>
        <p class="switch-text">Already a member? <a href="#" onclick="showLogin()">Log In</a></p>
      </form>
    </div>
    <!-- Login Form -->
    <div class="form-box" id="login-box" style="display: none;">
      <h2>Welcome Back!</h2>
      <p class="subtitle">Log in to access your messages.</p>
      <form id="login-form" action="login.php" method="POST" aria-label="Login Form">
        <div class="input-group">
          <label for="login-email"><i class="fas fa-envelope"></i> Email</label>
          <input type="email" id="login-email" name="email" placeholder="Your email address" required aria-required="true">
          <span class="error" id="login-email-error"></span>
        </div>
        <div class="input-group">
          <label for="login-password"><i class="fas fa-lock"></i> Password</label>
          <div class="password-wrapper">
            <input type="password" id="login-password" name="password" placeholder="Enter your password" required aria-required="true">
            <i class="fas fa-eye toggle-password" onclick="togglePassword('login-password')"></i>
          </div>
          <span class="error" id="login-password-error"></span>
        </div>
        <button type="submit" class="btn">Log In</button>
        <p class="switch-text">New here? <a href="#" onclick="showSignup()">Sign Up</a></p>
      </form>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>