document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');
  
    function showMessage(message, type) {
      messageDiv.textContent = message;
      messageDiv.className = type;
    }
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch(`http://localhost:3000/users?username=${username}`);
        const users = await response.json();
  
        if (users.length === 0) {
          showMessage('Invalid username or password.', 'error');
        } else {
          const user = users[0];
          if (user.password === password) {
            showMessage('Login successful!', 'success');
            // Perform additional actions after successful login
           
          } else {
            showMessage('Invalid username or password.', 'error');
          }
        }
      } catch (error) {
        showMessage('An error occurred. Please try again later.', 'error');
      }
    });
  });
  