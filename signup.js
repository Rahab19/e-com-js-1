document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const messageDiv = document.getElementById('message');
function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
      }

    // Function to validate username
function isUsernameValid(username) {
    
    return username.length >= 3;
  }
  
  // Function to validate email
  function isEmailValid(email) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate username and email
    if (isUsernameValid(username) && isEmailValid(email)) {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          showMessage('Registration successful!', 'success');
          signupForm.reset();
        } else {
          showMessage('An error occurred. Please try again later.', 'error');
        }
      } catch (error) {
        showMessage('An error occurred. Please try again later.', 'error');
      }
    } else {
      showMessage('Please enter a valid username and email.', 'error');
    }
  });
});