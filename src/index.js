import {todoFactory} from "./todoFactory.js"

const displayCurrentTime = () =>{
   let currentTime = new Date();
   let currentTimeFormatted = ((currentTime.getHours() >= 10) ? currentTime.getHours() : '0' + currentTime.getHours()) + ':' + 
                              ((currentTime.getMinutes() >= 10) ? currentTime.getMinutes() : '0' + currentTime.getMinutes()) + ':' + 
                              ((currentTime.getSeconds() >= 10) ? currentTime.getSeconds() : '0' + currentTime.getSeconds()) 
   document.getElementsByClassName('real')[0].textContent = currentTimeFormatted;
}
const displayCurrentDay = () => {
   let currentTime = new Date();
   document.getElementsByClassName('header-timer')[0].textContent += ' of day ' + currentTime.getDay() + ' in month ' + currentTime.getMonth();
}

displayCurrentDay();

const toggleForm = () => {
   const addTaskForm = document.getElementsByClassName('entry')[0];
   addTaskForm.classList.toggle('hidden');
}

const openFormButton = document.getElementsByClassName('todo-list')[0];
openFormButton.addEventListener('click', toggleForm);

const addTaskButton = document.getElementsByClassName("small-button")[0];
addTaskButton.addEventListener("click", function () {
   const titleTask = document.getElementsByClassName("small-entry")[0].value;
   const descriptionTask = document.getElementsByClassName("large-entry")[0].value;
   const newTask = todoFactory(titleTask, descriptionTask);
   console.log(newTask);
   toggleForm();
})

const currentTime = setInterval(displayCurrentTime, 1000);

//Create a list of projects, none being a project
//For each projects, display its list of todos
