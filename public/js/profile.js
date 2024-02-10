 // function to handle submission of new task form
const newFormHandler = async (event) => {
    event.preventDefault();
  
    // get values from the new task form
    const name = document.querySelector('#task-name').value.trim();
    const priority = document.querySelector('#task-priority').value.trim();
    const description = document.querySelector('#task-desc').value.trim();
  
    // check if all required fields are filled
    if (name && priority && description) {
      // send a POST request to create a new task
      const response = await fetch(`/api/tasks`, {
        method: 'POST',
        body: JSON.stringify({ name, priority, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // if the response is successful (status code 200)
      if (response.ok) {
        // redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        // if the response is not successful, display an alert
        alert('Failed to create task');
      }
    }
  };
  
  // function to handle deletion of a task
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      // send a DELETE request to delete the task
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
  
      // if the response is successful (status code 200)
      if (response.ok) {
        // redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        // if the response is not successful, display an alert
        alert('Failed to delete task');
      }
    }
  };
  
  // add event listener to the new task form
  document.querySelector('.new-task-form').addEventListener('submit', newFormHandler);
  
  // add event listener to the task list for delete button clicks
  document.querySelector('.task-list').addEventListener('click', delButtonHandler);
  