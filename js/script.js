const inputField = document.querySelector(".inputField");
const button = document.querySelector(".addToButton");
const tasksLeft = document.querySelector(".tasksLeft");
const divResult = document.querySelector(".result");
const taskElementList = document.createElement("ul");
const deleteAllButton = document.querySelector(".deleteAllToButton");
const taskLeftText = document.querySelector(".taskLeftText");
var counter = 0;
var tasks;
var localStorageId = 0;
divResult.appendChild(taskElementList);

class Task {
  constructor(row,localStorageId) {
    this.row = row;
    this.localStorageId = localStorageId;
  }
  create() {
    if (this.row) {
      var removeBtn = document.createElement("button");
      var editBtn = document.createElement("button");
      var taskElement = document.createElement("li");
      var textWrap = document.createElement("span");
      var removeImg = document.createElement("img");
      var editImg = document.createElement("img");
      var saveEdit = document.createElement("input");
      setLocalStorage(this.row);  
      removeImg.src="https://img.icons8.com/carbon-copy/512/filled-trash.png"
      removeBtn.className = "removeBtn";
      removeBtn.appendChild(removeImg);
      editImg.src="https://img.icons8.com/carbon-copy/512/pencil.png";
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
      removeImg.onmouseover = function(){
         removeImg.src="https://img.icons8.com/plasticine/512/filled-trash.png";
          }
      removeImg.onmouseout = function(){
         removeImg.src="https://img.icons8.com/carbon-copy/512/filled-trash.png";
          }    
      editImg.onmouseover = function(){
         editImg.src="https://img.icons8.com/plasticine/512/pencil.png";
          }
      editImg.onmouseout = function(){
          editImg.src="https://img.icons8.com/carbon-copy/512/pencil.png";
          }        
      saveEdit.addEventListener("click",function(){         
        for (var i = 0; i < tasks.length; i++){
              if(tasks[i].classList.contains("editing")){
               tasks[i].childNodes[1].textContent = inputField.value; 
               }}           
               inputField.value = "";
               saveEdit.replaceWith(button);
               taskElement.classList.remove("editing");
               updateLocalStorage();
      })
      taskElement.addEventListener("click", function(e){  
        if (e.target.parentNode.classList == "removeBtn") {
            if(textWrap.classList.contains("completed")){
            counter++;
            };
          taskElement.remove();
          showClearAllButton();
          updateLocalStorage();
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

inputField.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && document.querySelector(".addToButton")) {
   e.preventDefault();
    button.click();
  }else if(e.key === "Enter" && document.querySelector(".saveEdit")){
  e.preventDefault();
  document.querySelector(".saveEdit").click();
  }
 });

button.addEventListener('click', function() {
  new Task(inputField.value,localStorageId).create();
  setCounter();
  showClearAllButton();
  tasks = document.querySelectorAll(".item");
  inputField.value = "";
})

deleteAllButton.addEventListener("click", function() {
  localStorage.clear();
  let allItems = document.querySelectorAll(".item");
  for (let i = 0; i < allItems.length; i++) {
    allItems[i].remove();
  }
  showClearAllButton();
  localStorageId = 0;
  counter = 0;
  setCounter();
})

function setLocalStorage(row){ 
  localStorage.setItem(localStorageId, row);
  localStorageId++;
}

function getLocalStorage(localStorageId){
 return localStorage.getItem(localStorageId);  
}

function updateLocalStorage(){
  let allItems = document.querySelectorAll(".item");
  localStorage.clear();
Array.from(allItems).map((el,i) => localStorage.setItem(i,el.childNodes[1].textContent));
}

 function showClearAllButton() {
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

 function onStart(){
   for (i = 0; i < localStorage.length ; i++) {
 new Task(getLocalStorage(i),localStorageId).create();
  tasks = document.querySelectorAll(".item");
}
setCounter();
showClearAllButton();
}  
onStart();


