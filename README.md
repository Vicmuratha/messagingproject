# Messaging System (COMP 440 Project)

A simple web-based messaging system built using **PHP, MySQL, HTML, CSS, and JavaScript**. It allows users to sign up, log in, send messages, and log out. This project demonstrates basic client-server architecture and session handling in PHP.

## 🔧 Features

- User Sign-up with email validation
- User Login with password verification
- Session management using PHP sessions
- Bulk messaging interface
- Message sending (stored in MySQL database)
- Logout functionality
- Simple JSON API responses for frontend communication

## 🗂️ Project Structure

```
/messaging-system
│
├── index.html              # Landing or login page
├── signup.html             # Signup form
├── dashboard.html          # Message form (after login)
├── style.css               # Stylesheet
├── script.js               # JS for frontend logic
├── login.php               # Login backend
├── signup.php              # Signup backend
├── send_message.php        # Message-sending backend
├── logout.php              # Logout logic
├── db.php                  # Database connection script
├── init.sql                # MySQL database structure (optional)
└── README.md               # This file
```

## ⚙️ Setup Instructions (Local)

### Requirements:
- PHP (use XAMPP)
- MySQL (phpMyAdmin)
- Web browser

### Steps:

1. **Clone or download** this repo and extract it into your `htdocs` (if using XAMPP).
2. Start **Apache** and **MySQL** from XAMPP Control Panel.
3. Open [phpMyAdmin](http://localhost/phpmyadmin) and create a new database:

   ```sql
   CREATE DATABASE messaging_system;
   ```

4. Import the provided `init.sql` file (or create a `users` and `messages` table as shown below).
5. Edit `db.php` and update with your MySQL credentials:

   ```php
   $host = 'localhost';
   $dbname = 'messaging_system';
   $user = 'root';
   $pass = 'your_password';
   ```

6. Access the project in your browser:

   ```
   http://localhost/messaging-system/
   ```

## 💾 SQL Structure (Example)

You can create the tables using this SQL:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_email VARCHAR(100),
  recipient VARCHAR(100),
  message TEXT,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

