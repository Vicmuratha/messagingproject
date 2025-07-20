// Logout
function logout() {
    fetch('logout.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        window.location.href = 'index.php';
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Logout failed');
      });
  }
  
  // Validate recipients
  function validateRecipients(recipients) {
    const phones = recipients.split(',').map(p => p.trim());
    const phoneRegex = /^\+\d{10,15}$/;
    return phones.every(p => phoneRegex.test(p));
  }
  
  // Real-time validation
  function setupRealTimeValidation() {
    const recipientsInput = document.getElementById('recipients');
    const messageInput = document.getElementById('sms-message');
    const recipientsError = document.getElementById('recipients-error');
    const messageError = document.getElementById('sms-message-error');
  
    recipientsInput.addEventListener('input', () => {
      const value = recipientsInput.value.trim();
      recipientsError.textContent = validateRecipients(value) ? '' : 'Enter valid phone numbers (e.g., +1234567890)';
    });
  
    messageInput.addEventListener('input', () => {
      const value = messageInput.value.trim();
      messageError.textContent = value ? '' : 'Message is required';
    });
  }
  
  // SMS form submission
  document.getElementById('sms-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const recipients = document.getElementById('recipients').value.trim();
    const message = document.getElementById('sms-message').value.trim();
    const recipientsError = document.getElementById('recipients-error');
    const messageError = document.getElementById('sms-message-error');
    let isValid = true;
  
    recipientsError.textContent = validateRecipients(recipients) ? '' : 'Enter valid phone numbers (e.g., +1234567890)';
    messageError.textContent = message ? '' : 'Message is required';
    isValid = validateRecipients(recipients) && message;
  
    if (!isValid) return;
  
    const button = e.target.querySelector('.btn');
    button.disabled = true;
    button.textContent = 'Sending...';
  
    const formData = new FormData();
    formData.append('recipients', recipients);
    formData.append('sms-message', message);
  
    fetch('send_sms.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.success) {
          e.target.reset();
          document.getElementById('recipients-error').textContent = '';
          document.getElementById('sms-message-error').textContent = '';
        }
        button.disabled = false;
        button.textContent = 'Send SMS';
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to send SMS');
        button.disabled = false;
        button.textContent = 'Send SMS';
      });
  });
  
  // Initialize dashboard
  setupRealTimeValidation();