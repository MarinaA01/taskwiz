// main page functions

// function that is called to submit task to the database
// takes the event, the url for the ajax call & an optional id
function createTask(e, url) {
  e.preventDefault();

  // get the task input field & trim the value
  let taskInputField = $('#task');
  let taskName = taskInputField.val().trim();

  if (taskName !== '') {
    // create a task object with the task name
    let task = {
      task: taskName,
    };

    // clear the input field
    taskInputField.val('');

    // send an AJAX request to create the task
    $.ajax({
      url: '/create',
      type: 'POST',
      data: task,
      success: (response) => {
        // reload the page to reflect changes
        window.location.href = '/';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

// function to remove uncompleted tasks - requires users to confirm deletion
function remove(id) {
  // show a confirmation dialog
  let remove = confirm(
    `Are you sure you want to delete it? You haven't even completed it yet! No one likes a quitter...`
  );

  if (remove) {
    // send an AJAX request to delete the task
    $.ajax({
      url: `/remove/${id}`,
      type: 'DELETE',
      success: (response) => {
        console.log(response);
        // reload the page to reflect changes
        location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

// function to change task from incomplete to complete
function complete(id) {
  // send an AJAX request to mark the task as complete
  $.ajax({
    url: `/update/${id}`,
    method: 'PATCH',
    success: (result) => {
      // reload the page to reflect changes
      location.reload();
    },
    error: (err) => {
      console.log(err);
    },
  });
}

// function to remove completed tasks. No confirmation for deletion
function removeCompleted(id) {
  // send an AJAX request to delete the completed task
  $.ajax({
    url: `/task/${id}`,
    type: 'DELETE',
    success: (response) => {
      // reload the page to reflect changes
      location.reload();
    },
    error: (err) => {
      console.log(err);
    },
  });
}

// edit Page Functions

// function that is called to edit the name of a task
function editTask(e, id) {
  e.preventDefault();

  // get the task input field & trim the value
  let taskInputField = $('#editTask');
  let taskName = taskInputField.val().trim();

  if (taskName !== '') {
    // create a task object with the new task name & id
    let task = {
      task: taskName,
      id: id,
    };

    // clear the input field
    taskInputField.val('');

    // send an AJAX request to update the task
    $.ajax({
      url: '/update',
      type: 'PATCH',
      data: task,
      success: (response) => {
        // redirect back to the main page
        window.location.href = '/';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
