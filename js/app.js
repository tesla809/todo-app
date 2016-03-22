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
  var listItem = createNewTaskElement("Some New Task");
  
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);

  //creating and appending code is in two seperate functions
  //seperating concerns to make the code more maintainable and re-able
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
addButton.onclick = addTask;

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
  checkBox.onchange = checkBoxEventHandler;
};

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