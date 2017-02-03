// add use strict
// refactor into es6

//Problem: User interaction does not provide desired results
//Solution: Add interactivity so the user can manage daily tasks
//variables
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder = document.getElementById("completed-tasks"); 

//New Task List Item
var createNewTaskElement = function(taskString){ 
  //Create List Item
  var listItem = document.createElement("li");
  
  //create all children, then append from to list item
  //input (checkbox)
  var checkBox = document.createElement("input");//type checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); //type text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
  //Each element needs modifying
  checkBox.type = "checkbox";   //.type modifies input to checkbox
  editInput.type = "text";
  
  //edit button is Edit
  editButton.innerHTML = "Edit";
  //edit button class name set to edit
  editButton.className = "edit";
  //delete button is Delete
  deleteButton.innerText = "Delete";
  //delete button class name set to delete
  deleteButton.className = "delete";
  
  //taskString is label's string
  label.innerText = taskString;
  
  //Each element needs appending in exact as appearing in html
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
};

//functions
//Add a new task
var addTask = function(){
  console.log("Add task... ");
  
  //When we click button we create new listItem.
  //Create a new list item for the text #new-task:
  //We send through taskInput's value thru to
  //createNewTaskElement and result is listItem.
  var listItem = createNewTaskElement(taskInput.value);
  
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  // after task is added, we are setting it to value of empty string
  taskInput.value = "";
  

  //creating and appending code is in two seperate functions
  //seperating concerns to make the code more maintainable and re-able
};


//Edit an exisiting task
var editTask = function(){
  console.log("Edit task... ");
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  // .classlist returns list of all classes
  // .contains returns if classes in included
  // seperated like this to make code more readable.
  var containsClass = listItem.classList.contains("editMode");
   
  //If the class of the parent is .editMode
  if(containsClass){
    //Switch from .editMode
    //label text become input's value
    label.innerText = editInput.value;
  } else{
    //Switch to .editMode
    //input value becomes the label's text  
    editInput.value = label.innerText;
  }
    
  //Toggle .editMode on the listItem
  listItem.classList.toggle("editMode");
};

//Delete an exisiting task
var deleteTask = function(){
  console.log("Delete task... ");
  //Remove the parent list item from ul
  //traversed from button to listItem
  var listItem = this.parentNode;
  //and traversed from listItem to button to remove listItem from ul
  //grandparent of the delete button
  var ul = listItem.parentNode;
  
  //Remove the parent list item from ul (grandparent of button, parent of listItem)
  ul.removeChild(listItem);
};


//Mark a task as complete
var taskCompleted = function(){
  console.log("Task complete ...");
  //Append the task list item to the #completed-tasks
  //Append *this* checkbox's parentNode to the completedTaskHolder
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  //when checked, bind listItem to taskIncomplete
  bindTaskEvents(listItem,taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function(){
  console.log("Task incomplete... ");
  //Append the task list item to the #incompleted-tasks
  //Append *this* checkbox's parentNode to the incompleteTasksHolder
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  //when checked, bind listItem to taskcomplete
  bindTaskEvents(listItem,taskCompleted);
};


//wiring
//Set the click handler to the addTask function
//binds functions to buttons
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  //when checkbox state is changed, the checkBoxEventHandler is ran
  //which runs either the taskComplete or taskIncomplete function
  checkBox.onchange = checkBoxEventHandler;
};

//ajax request
var ajaxRequest = function() {
  console.log("AJAX Request");
};
// addButton.addEventListener("click", addTask) replaces
// addButton.onclick = ajaxRequest;
// addEventListener is a better way trigger events
// allows for more than one event to happen at the same time w/o overriding
//So, here two events will be triggered when click event on add button happens
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


//cycle over incompleteTasksHolder ul list items
//to bind this to all children of incompleteTasksHolder
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);  
}

//cycle over completedTasksHolder ul list items
//to bind this to all children of completedTasksHolder
for(var i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);  
}