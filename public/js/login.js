// login form handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  // collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // send a POST request to the API endpoint
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // if successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// signup form handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  // collect values from the signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    // send a POST request to the API endpoint
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // if successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// add event listeners to the login & signup forms
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);