// Form toggling
function showLogin() {
    const signupBox = document.getElementById('signup-box');
    const loginBox = document.getElementById('login-box');
    signupBox.classList.remove('active');
    loginBox.classList.add('active');
    setTimeout(() => {
      signupBox.style.display = 'none';
      loginBox.style.display = 'block';
    }, 400);
  }
  
  function showSignup() {
    const signupBox = document.getElementById('signup-box');
    const loginBox = document.getElementById('login-box');
    loginBox.classList.remove('active');
    signupBox.classList.add('active');
    setTimeout(() => {
      loginBox.style.display = 'none';
      signupBox.style.display = 'block';
    }, 400);
  }
  
  // Password visibility toggle
  function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
  
  // Validation functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }
  
  // Real-time validation
  function setupRealTimeValidation(formId, fields) {
    fields.forEach(({ inputId, errorId, validate }) => {
      const input = document.getElementById(inputId);
      const error = document.getElementById(errorId);
      input.addEventListener('input', () => {
        const value = input.value.trim();
        error.textContent = validate(value) ? '' : error.dataset.message;
      });
    });
  }
  
  setupRealTimeValidation('signup-form', [
    { inputId: 'signup-username', errorId: 'signup-username-error', validate: (v) => v, error: { dataset: { message: 'Username is required' } } },
    { inputId: 'signup-email', errorId: 'signup-email-error', validate: validateEmail, error: { dataset: { message: 'Please enter a valid email' } } },
    { inputId: 'signup-password', errorId: 'signup-password-error', validate: validatePassword, error: { dataset: { message: 'Password must be at least 6 characters' } } },
  ]);
  
  setupRealTimeValidation('login-form', [
    { inputId: 'login-email', errorId: 'login-email-error', validate: validateEmail, error: { dataset: { message: 'Please enter a valid email' } } },
    { inputId: 'login-password', errorId: 'login-password-error', validate: (v) => v, error: { dataset: { message: 'Password is required' } } },
  ]);
  
  // Form submissions via AJAX
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const usernameError = document.getElementById('signup-username-error');
    const emailError = document.getElementById('signup-email-error');
    const passwordError = document.getElementById('signup-password-error');
    let isValid = true;
  
    usernameError.textContent = username ? '' : 'Username is required';
    emailError.textContent = validateEmail(email) ? '' : 'Please enter a valid email';
    passwordError.textContent = validatePassword(password) ? '' : 'Password must be at least 6 characters';
    isValid = username && validateEmail(email) && validatePassword(password);
  
    if (!isValid) return;
  
    const button = e.target.querySelector('.btn');
    button.disabled = true;
    button.textContent = 'Signing Up...';
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
  
    fetch('signup.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.success) {
          showLogin();
        }
        button.disabled = false;
        button.textContent = 'Sign Up';
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Signup failed');
        button.disabled = false;
        button.textContent = 'Sign Up';
      });
  });
  
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const emailError = document.getElementById('login-email-error');
    const passwordError = document.getElementById('login-password-error');
    let isValid = true;
  
    emailError.textContent = validateEmail(email) ? '' : 'Please enter a valid email';
    passwordError.textContent = password ? '' : 'Password is required';
    isValid = validateEmail(email) && password;
  
    if (!isValid) return;
  
    const button = e.target.querySelector('.btn');
    button.disabled = true;
    button.textContent = 'Logging In...';
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    fetch('login.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.success) {
          window.location.href = 'dashboard.php';
        }
        button.disabled = false;
        button.textContent = 'Log In';
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Login failed');
        button.disabled = false;
        button.textContent = 'Log In';
      });
  });
  
  // Initialize signup form
  document.getElementById('signup-box').classList.add('active');