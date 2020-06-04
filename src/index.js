import {todoFactory} from "./todoFactory.js"
//Do time and day
const displayCurrentTime = () =>{
   let currentTime = new Date();
   let currentTimeFormatted = ((currentTime.getHours() >= 10) ? currentTime.getHours() : '0' + currentTime.getHours()) + ':' + 
                              ((currentTime.getMinutes() >= 10) ? currentTime.getMinutes() : '0' + currentTime.getMinutes()) + ':' + 
                              ((currentTime.getSeconds() >= 10) ? currentTime.getSeconds() : '0' + currentTime.getSeconds()) 
   document.getElementsByClassName('real')[0].textContent = currentTimeFormatted;
}
setInterval(displayCurrentTime, 1000);

const displayCurrentDay = (() => {
   let currentTime = new Date();
   document.getElementsByClassName('header-timer')[0].textContent += ' of day ' + currentTime.getDay() + ' in month ' + (currentTime.getMonth() + 1);
})();


const toggleForm = () => {
      const addTaskForm = document.getElementsByClassName('entry')[0];
      addTaskForm.classList.toggle('hidden');
}

//Do form interactivity
const openFormButton = document.getElementsByClassName('sort')[0];
openFormButton.addEventListener('click', function (e) {
   e.stopPropagation();
});
openFormButton.addEventListener('click', toggleForm);


// Save tasks
let taskList = [];

const displayTasks = () => {
   let taskListInHtml = document.getElementsByClassName('todo');
   let numberOfDeletes = taskListInHtml.length;
   let taskParent = document.getElementsByClassName('todo-list')[0];
   if (numberOfDeletes > 1) {
      console.log('max is ' + numberOfDeletes)
      for (let i = 1; i < numberOfDeletes; i++) {
         console.log(i);
         taskParent.removeChild(taskParent.lastElementChild);
         console.log("1 element removed");
      }
   }
   let pendingTaskList = taskList.filter(x => x.isDone == false)
   for (const task of pendingTaskList) {
      let taskInHtml = document.createElement('div');
      taskInHtml.classList.add('todo');
      let taskTitle = document.createElement('div');
      taskTitle.classList.add('kanji-four', 'jap');
      taskTitle.textContent = 'ロレムイプサム';
      let taskDescription = document.createElement('div');
      taskDescription.classList.add('todo-text');
      taskDescription.textContent = task.title;
      taskInHtml.appendChild(taskTitle);
      taskInHtml.appendChild(taskDescription);
      taskInHtml.addEventListener('click',function(){
         let taskDescription = document.getElementsByClassName('tododescription')[0]
         taskDescription.textContent = task.description
      })
      taskParent.appendChild(taskInHtml);
   }
}

const addTaskButton = document.getElementsByClassName("small-button")[0];
addTaskButton.addEventListener("click", function () {
   const titleTask = document.getElementsByClassName("small-entry")[0].value;
   const descriptionTask = document.getElementsByClassName("large-entry")[0].value;
   const newTask = todoFactory(titleTask, descriptionTask);
   taskList.push(newTask);
   toggleForm();
   displayTasks();
})


//Create a list of projects, none being a project
//For each projects, display its list of todos
