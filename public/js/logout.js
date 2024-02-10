 // function to handle logout
const logout = async () => {
    // send a POST request to the logout API endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // if the response is successful (status code 200)
    if (response.ok) {
      // redirect the browser to the homepage
      document.location.replace('/');
    } else {
      // if the response is not successful, display an alert with the status text
      alert(response.statusText);
    }
  };
  
  // add event listener to the logout button
  document.querySelector('#logout').addEventListener('click', logout);
  
  