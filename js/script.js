const inputField = document.querySelector(".inputField");
const button = document.querySelector(".addToButton");
const tasksLeft = document.querySelector(".tasksLeft");
const divResult = document.querySelector(".result");
const taskElementList = document.createElement("ul");
const deleteAllButton = document.querySelector(".deleteAllToButton");
const todoList = document.querySelector(".todoList");
const taskLeftText = document.querySelector(".taskLeftText");
divResult.appendChild(taskElementList);
console.log(divResult);
var counter = 0;
var tasks;
button.addEventListener('click', function() {
  new Task(inputField.value).create();
  setCounter();
  showDeleteAll();
  tasks = document.querySelectorAll(".item");
  inputField.value = "";
})
 inputField.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && document.querySelector(".addToButton")) {
   e.preventDefault();
    button.click();
  }else if(e.key === "Enter" && document.querySelector(".saveEdit")){
  e.preventDefault();
  document.querySelector(".saveEdit").click();
  }
 }); 
function showDeleteAll() {
button.disabled=false;
  let allItems = document.querySelectorAll(".item");
  if (allItems.length > 1) {
    deleteAllButton.style.opacity = "100%";
    deleteAllButton.disabled = false;
  } else {
    deleteAllButton.style.opacity = "0";
    deleteAllButton.disabled = true;
  }
}
deleteAllButton.addEventListener("click", function() {
  let allItems = document.querySelectorAll(".item");
  for (let i = 0; i < allItems.length; i++) {
    allItems[i].remove();
  }
  showDeleteAll();
  counter = 0;
  setCounter();
})
function setCounter() {
var text;
if (counter == 1){
text = " task for today"
} else{
text = " tasks for today";
}

  tasksLeft.innerHTML = counter;
  taskLeftText.innerHTML = text;
  if (tasksLeft.textContent == "0") {
    tasksLeft.style.color = "green";
  } else tasksLeft.style.color = "red";
}
class Task {
  constructor(row) {
    this.row = row;
  }
  create() {
    if (this.row) {
      var checkBox = document.createElement("input");
      var removeBtn = document.createElement("button");
      var editBtn = document.createElement("button");
      var saveBtn = document.createElement("button");
      var taskElement = document.createElement("li");
      var textWrap = document.createElement("span");
      var removeImg = document.createElement("img");
      var editImg = document.createElement("img");
      var saveEdit = document.createElement("input");
      removeImg.src="https://img.icons8.com/carbon-copy/512/filled-trash.png"
      removeBtn.className = "removeBtn";
      removeBtn.disabled = "true";
      removeImg.onmouseover = function(){
      removeImg.src="https://img.icons8.com/plasticine/512/filled-trash.png";
      }
      removeImg.onmouseout = function(){
      removeImg.src="https://img.icons8.com/carbon-copy/512/filled-trash.png";
      }
     removeBtn.appendChild(removeImg);
      editImg.src="https://img.icons8.com/carbon-copy/512/pencil.png"    
       editImg.onmouseover = function(){
      editImg.src="https://img.icons8.com/plasticine/512/pencil.png";
      }
      editImg.onmouseout = function(){
      editImg.src="https://img.icons8.com/carbon-copy/512/pencil.png";
      }
      editBtn.appendChild(editImg);
      editBtn.classList = "editBtn";
      textWrap.className = "textWrap";
      textWrap.textContent = this.row;
      taskElement.appendChild(editBtn);
      taskElement.appendChild(textWrap);
      taskElement.className = "item";      
      taskElement.appendChild(removeBtn);
      saveEdit.type="button";
      saveEdit.classList = "saveEdit";
      saveEdit.value="Save";
      taskElementList.appendChild(taskElement);      
          saveEdit.addEventListener("click",function(){         
               for (var i = 0; i < tasks.length; i++){
              if(tasks[i].classList.contains("editing")){
               tasks[i].childNodes[1].textContent = inputField.value; 
               }}           
               inputField.value = "";
               saveEdit.replaceWith(button);
               taskElement.classList.remove("editing");
      })
      taskElement.addEventListener("click", function(e) {
      console.log(e.target);
         if (e.target.parentNode.classList == "removeBtn") {
        if(textWrap.classList.contains("completed")){
        counter++;
        };
          taskElement.remove();
          showDeleteAll();
          counter--;
          setCounter(); 
     }else 
     if(e.target.parentNode.classList == "editBtn"){
       inputField.value = textWrap.textContent;
       inputField.focus();
       for (var key of tasks){
       key.classList.remove("editing");
       }
       taskElement.classList.add("editing");
       button.replaceWith(saveEdit);
      }else{
            textWrap.classList.toggle("completed");
          if (textWrap.classList.contains("completed")) {
            taskElement.style.background = "gray";           
            counter--;
            setCounter();
          } else {
            taskElement.style.background = "";
            counter++;
            setCounter();
          }
        }
      })
      counter++;      
    }
  }
}
 for (i = 1; i < 3; i++) {
  const task = new Task("Task " + i);
  task.create();
  tasks = document.querySelectorAll(".item");
  setCounter();
} 
