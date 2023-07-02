// DOM ELEMENTS
const openModalBtn = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const closeBtn = document.getElementsByClassName("close")[0];
const taskTitle = document.getElementById('task-title');
const taskDate = document.getElementById('task-date');
const taskDescription = document.getElementById('task-description');
const taskContainer = document.querySelector('.tasks-container');

let data = {};

// Event Listeners
openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

modal.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
  modal.style.display = "none";
})

modal.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    formValidation();
    modal.style.display = "none";
  }
})

// Form Validation
function formValidation() {
  if (taskTitle.value !== '' && taskDate.value !== '' && taskDescription.value !== '') {
    console.log('success');
    storeData();
  }
}

// Store Data
function storeData() {
  data['taskTitle'] = taskTitle.value;
  data['taskDate'] = taskDate.value;
  data['taskDescription'] = taskDescription.value;
  console.log(data);
  createTasks(data);
}

// Create Tasks
function createTasks(data) {
  const taskTemplate =
    `
  <div>
    <span class="task-title">${data.taskTitle}</span>
    <span class="task-date">${data.taskDate}</span>
    <p>${data.taskDescription}</p>
    <span class="options">
      <i class="fas fa-edit"></i>
      <i class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;

  taskContainer.insertAdjacentHTML('beforeend', taskTemplate);
  resetForm();
}

// Reset Form
function resetForm() {
  taskTitle.value = '';
  taskDate.value = '';
  taskDescription.value = '';
}

// Edit & Delete Tasks
taskContainer.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('fa-edit')) {
    editTasks(target);
  } else if (target.classList.contains('fa-trash-alt')) {
    deleteTasks(target);
  }
})

// Edit Tasks
function editTasks(element) {
  const listElement = element.closest('div');
  taskTitle.value = listElement.querySelector('.task-title').textContent;
  taskDate.value = listElement.querySelector('.task-date').textContent;
  taskDescription.value = listElement.querySelector('p').textContent;
  modal.style.display = "block";
  listElement.remove();
}

// Delete Tasks
function deleteTasks(element) {
  const listElement = element.closest('div');
  listElement.remove();
}