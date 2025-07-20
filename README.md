
# 📬 Messaging System Project

This is a simple client-server messaging system built with **PHP**, **MySQL**, **HTML/CSS/JS**, and **PHP Sessions**. It includes:

- ✅ User sign-up and login
- ✅ Session-based authentication
- ✅ Sending bulk messages
- ✅ Logout functionality
- ✅ MySQL database integration

---

## 📁 Project Structure

```
messaging_system/
├── config.php
├── signup.php
├── login.php
├── logout.php
├── send_message.php
├── index.html
├── dashboard.html
├── styles.css
├── scripts.js
└── README.md
```

---

## ⚙️ Requirements

- PHP 7+
- MySQL Server (or phpMyAdmin)
- Apache server (XAMPP, WAMP, MAMP, or native LAMP)
- Modern web browser

---

## 🛠 Setup Instructions

### Option 1: Using **phpMyAdmin**

1. Start Apache and MySQL from XAMPP/WAMP/MAMP.
2. Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
3. Create a new database named: `messaging_system`
4. Run the following SQL to create tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Option 2: Using **MySQL CLI**

```bash
mysql -u root -p
```

Then:

```sql
CREATE DATABASE messaging_system;
USE messaging_system;

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Create messages table
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 📄 config.php

Create a file named `config.php` in the root directory:

```php
<?php
$host = 'localhost';
$db = 'messaging_system';
$user = 'root';
$pass = 'your_password';  // Replace with your actual MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
```

---

## 🚀 Running the Project

1. Place the project folder in your server's root (`htdocs` for XAMPP).
2. Start Apache and MySQL.
3. Visit `http://localhost/messaging_system/`
4. Sign up → Log in → Send messages → Log out

---

## 👥 Project Features

- Sign up with unique email and secure password
- Passwords are hashed before storage
- Authenticated sessions using PHP
- Messages linked to users
- Clean UI (customizable)

---

## 📌 Notes

- You can switch between phpMyAdmin and CLI for database management.
- Ensure `config.php` credentials match your server setup.
- Prepared statements recommended for security in production.
