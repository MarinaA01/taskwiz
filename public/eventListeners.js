$(document).ready(function() {
    // main page events
  
    // click event for creating a task
    $('#create').on('click', function(e) {
      createTask(e);
    });
  
    // keypress event that allows task to be created on 'enter'
    $('#task').keypress(function(e) {
      if (e.key === 'Enter') {
        createTask(e);
      }
    });
  
    // click event to change state of task to completed
    $(document).on('click', '.complete', function(e) {
      e.preventDefault();
      let id = $(this).data('id');
      complete(id);
    });
  
    // click event for deleting uncompleted events
    $(document).on('click', '.delete', function(e) {
      let id = $(this).data('id');
      remove(id);
    });
  
    // click event for completed events that bypasses the confirm
    $(document).on('click', '.delcomplete', function(e) {
      let id = $(this).data('id');
      removeCompleted(id);
    });
  
    // edit page events
  
    // click event to load the edit task page
    $(document).on('click', '.edit', function(e) {
      let id = $(this).data('id');
      window.location.href = '/api/task/' + id;
    });
  
    // click event to submit the edit to the back end
    $(document).on('click', '#edit', function(e) {
      let id = $(this).data('id');
      editTask(e, id);
    });
  
    // keypress event that allows task to be edited on 'enter'
    $(document).on('keypress', '#editTask', function(e) {
      let id = $('#editTask').data('id');
      if (e.key === 'Enter') {
        editTask(e, id);
      }
    });
  });
  