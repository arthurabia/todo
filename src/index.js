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

// Save tasks
let taskList = [];

const displayTasks = () => {
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

   let pendingTaskList = taskList.filter(x => x.isDone === false)
   console.log(pendingTaskList)
   for (let task of pendingTaskList) {
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
         taskTextDescription.setAttribute("order", pendingTaskList.indexOf(task))
         taskTextDescription.textContent = task.description;
      })
      taskParent.appendChild(taskInHtml);
   }
}
let deleteButton = document.getElementsByClassName("checkbox")[0]
deleteButton.addEventListener("click", function (e) {
   let pendingTaskList = taskList.filter(x => x.isDone === false)
   let index = document.getElementsByClassName('tododescription')[0]
   index = index.getAttribute("order")
   pendingTaskList[index].isDone = true;
   displayTasks();
   e.stopPropagation();
})

const addTaskButton = document.getElementsByClassName("small-button")[0];
addTaskButton.addEventListener("click", function () {
   let titleTask = document.getElementsByClassName("small-entry")[0].value;
   let descriptionTask = document.getElementsByClassName("large-entry")[0].value;
   const newTask = todoFactory(titleTask, descriptionTask);
   taskList.push(newTask);
   //console.log(taskList)
   toggleForm();
   displayTasks();
})




//Replace bien le bouton Rouge
//Ajoute la possibilité de changer le isdone to true
//Changer le see completed et le see pending
//Préparer le mode danger