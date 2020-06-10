import {todoFactory} from "./todoFactory.js"
let taskList = [];

let loadie = () => {
   if (localStorage.getItem('taskList') === null) {
      console.log('I dunoo it')
      localStorage.setItem('taskList', JSON.stringify(taskList))
   } else {
      console.log('I remember it')
      taskList = JSON.parse(localStorage.getItem('taskList'));
   }
}

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
   document.getElementsByClassName('header-timer')[0].textContent += ' day ' + currentTime.getDate() + ' in month ' + (currentTime.getMonth() + 1);
})();

//Do form interactivity
const toggleForm = () => {
      const addTaskForm = document.getElementsByClassName('entry')[0];
      addTaskForm.classList.toggle('hidden');
      document.getElementsByClassName('small-entry')[0].value = '';
      document.getElementsByClassName('large-entry')[0].value = '';
}

const openFormButton = document.getElementsByClassName('sort')[0];
openFormButton.addEventListener('click', function (e) {
   e.stopPropagation();
});
openFormButton.addEventListener('click', toggleForm);

// Load and Save tasks

const saveTask = (taskList) => {
      localStorage.setItem('taskList', JSON.stringify(taskList))
}

const displayTasks = (taskList, bool) => {
   let taskTextDescription = document.getElementsByClassName('tododescription')[0];
   taskTextDescription.textContent = '';
   let taskListInHtml = document.getElementsByClassName('todo');
   let numberOfDeletes = taskListInHtml.length;
   let taskParent = document.getElementsByClassName('todo-list')[0];
   if (numberOfDeletes > 1) {
      for (let i = 1; i < numberOfDeletes; i++) {
         taskParent.removeChild(taskParent.lastElementChild);
      }
   }

   for (let task of taskList) {
      if (task.isDone === bool) {
         console.log("onea dded")
      let taskInHtml = document.createElement('div');
      let taskTitle = document.createElement('div');
      let taskDescription = document.createElement('div');
      taskInHtml.classList.add('todo');     
      taskTitle.classList.add('kanji-four', 'jap');
      taskTitle.textContent = 'ロレムイプサム';    
      taskDescription.classList.add('todo-text');
      taskDescription.textContent = task.title;
      taskInHtml.appendChild(taskTitle);
      taskInHtml.appendChild(taskDescription);
      taskInHtml.addEventListener('click',function(){
         taskTextDescription.setAttribute("order", taskList.indexOf(task))
         taskTextDescription.textContent = task.description;
      })
      taskParent.appendChild(taskInHtml);
      }
   }
}

let deleteButton = document.getElementsByClassName("checkbox")[0]
deleteButton.addEventListener("click", function (e) {
   let index = document.getElementsByClassName('tododescription')[0]
   index = index.getAttribute("order")
   taskList[index].isDone = !taskList[index].isDone;
   (completedButton.classList.contains('off') === true) ? displayTasks(taskList, false): displayTasks(taskList, true);
   e.stopPropagation();
   saveTask(taskList);
})

const addTaskButton = document.getElementsByClassName("small-button")[0];
addTaskButton.addEventListener("click", function () {
   let titleTask = document.getElementsByClassName("small-entry")[0].value;
   let descriptionTask = document.getElementsByClassName("large-entry")[0].value;
   const newTask = todoFactory(titleTask, descriptionTask);
   taskList.push(newTask);
   toggleForm();
   displayTasks(taskList,false);
   saveTask(taskList);
})

loadie();
displayTasks(taskList,false);


const completedButton = document.getElementsByClassName("light")[2];
const pendingButton = document.getElementsByClassName("light")[1];
completedButton.addEventListener("click", function () {
   if (completedButton.classList.contains('off')){
      completedButton.classList.toggle('off')
      pendingButton.classList.toggle('off')
      displayTasks(taskList, true);
   }
})

pendingButton.addEventListener("click", function () {
   if (pendingButton.classList.contains('off')){
      completedButton.classList.toggle('off')
      pendingButton.classList.toggle('off')
      displayTasks(taskList, false);
   }
})

const dangerButton = document.getElementsByClassName("light")[0];
dangerButton.addEventListener("click", function () {
   var audio = document.getElementById("audio");
   if (audio.paused || audio.currentTime === 0){
      audio.load();
      audio.play();
   }
   else
      audio.pause();
})