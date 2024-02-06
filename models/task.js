let tasks = []; 

// get all tasks
function getAllTasks() {
  return tasks;
}

// get a task by ID
function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

// create a new task
function createTask(task) {
  const newTask = { id: generateId(), ...task };
  tasks.push(newTask);
  return newTask;
}

// update a task
function updateTask(id, updatedTask) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    return tasks[index];
  }
  return null;
}

// delete a task
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    return deletedTask;
  }
  return null;
}

// generate a unique ID for tasks
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// export the functions
module.exports = {
  getAllTasks,   // export the function to get all tasks
  getTaskById,   // export the function to get a task by ID
  createTask,    // export the function to create a new task
  updateTask,    // export the function to update a task
  deleteTask     // export the function to delete a task
};