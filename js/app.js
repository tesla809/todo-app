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
  
  //input (checkbox)
  var checkBox = document.createElement("input");//type checkbox
  //label
  var label = document.createElement("label"); //text
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button"); //button
  //button.delete
  var deleteButton = document.createElement("button"); //button
  
  //Each element needs modifying 
  //Each element needs appending
  return listItem;
};

//functions

//Add a new task
var addTask = function(){
  console.log("Add task... ");
  //When we click button we create new listItem.
  //ie Create a new list item for the text #new-task:
  var listItem = createNewTaskElement("Some New Task");
  
  //Append listItem to incompleteTasksHolder

};


//Edit an exisiting task
var editTask = function(){
    console.log("Edit task... ");
  //When the Edit button is pressed
    //If the class of the parent is .editMode
      //Switch from .editMode
      //label text become input's value
    //else
      //Switch to .editMode
      //input value becomes the label's text
    
    //Toggle .editMode on the parent
};

//Delete an exisiting task
var deleteTask = function(){
    console.log("Delete task... ");
  //When the Delete button is pressed
  //Remove the parent list item from ul
};


//Mark a task as complete
var taskCompleted = function(){
    console.log("Task complete ...");
  //When the checkbox is checked
    //Append the task list item to the #completed-tasks
};

//Mark a task as incomplete
var taskIncomplete = function(){
    console.log("Task incomplete... ");
  //When the checkbox is unchecked
    //Append the task list item to the #incompleted-tasks
};


//wiring
//Set the click handler to the addTask function
addButton.onclick = addTask;

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
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);  
}

//cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);  
}




