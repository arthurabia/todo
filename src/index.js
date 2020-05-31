import {todoFactory} from "./todoFactory.js"


var button = document.getElementById("button1")
var title = document.getElementById("input1").value
button.addEventListener("click",function(){
   const newTodo = todoFactory(title)
   console.log(newTodo)
}
)

//Create a list of projects, none being a project
//For each projects, display its list of todos
