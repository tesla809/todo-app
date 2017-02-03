// Problem: User interaction does not provide desired results
// Solution: Add interactivity so the user can manage daily tasks

// variables
const taskInput = document.getElementById("new-task"); //new-task
const addButton = document.getElementsByTagName("button")[0]; //first-button
const incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
const completedTasksHolder = document.getElementById("completed-tasks"); 

// New Task List Item
const createNewTaskElement = function(taskString){ 
  // Create List Item
  const listItem = document.createElement("li");
  
  // create all children, then append from to list item
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  
  // Each element needs modifying
  checkBox.type = "checkbox";   //.type modifies input to checkbox
  editInput.type = "text";
  
  // edit button is Edit
  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
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

// creating and appending code is in two seperate functions
// seperating concerns to make the code more maintainable and re-able
const addTask = function(){
  // When we click button we create new listItem.
  // Create a new list item for the text #new-task:
  // We send through taskInput's value thru to
  // createNewTaskElement and result is listItem.
  const listItem = createNewTaskElement(taskInput.value);
  
  // Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  // after task is added, we are setting it to value of empty string
  taskInput.value = "";
};


//Edit an exisiting task
var editTask = function(){
  const listItem = this.parentNode;
  
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  
  // .classlist returns list of all classes
  // .contains returns if classes in included
  // seperated like this to make code more readable.
  const containsClass = listItem.classList.contains("editMode");
   
  //If the class of the parent is .editMode
  if(containsClass){
    // Switch from .editMode
    // label text become input's value
    label.innerText = editInput.value;
  } else{
    // Switch to .editMode
    // input value becomes the label's text  
    editInput.value = label.innerText;
  }
    
  //Toggle .editMode on the listItem
  listItem.classList.toggle("editMode");
};

// Delete an exisiting task
const deleteTask = function(){
  // Remove the parent list item from ul
  // traversed from button to listItem
  const listItem = this.parentNode;
  // and traversed from listItem to button to remove listItem from ul
  // grandparent of the delete button
  const ul = listItem.parentNode;
  
  // Remove the parent list item from ul (grandparent of button, parent of listItem)
  ul.removeChild(listItem);
};


// Mark a task as complete
const taskCompleted = function(){
  // Append the task list item to the #completed-tasks
  // Append *this* checkbox's parentNode to the completedTaskHolder
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  // when checked, bind listItem to taskIncomplete
  bindTaskEvents(listItem,taskIncomplete);
};

// Mark a task as incomplete
const taskIncomplete = function(){
  // Append the task list item to the #incompleted-tasks
  // Append *this* checkbox's parentNode to the incompleteTasksHolder
  const listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  // when checked, bind listItem to taskcomplete
  bindTaskEvents(listItem,taskCompleted);
};


// Event Listeners
//binds functions to buttons
const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  //select taskListItem's children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  //when checkbox state is changed, the checkBoxEventHandler is ran
  //which runs either the taskComplete or taskIncomplete function
  checkBox.onchange = checkBoxEventHandler;
};


addButton.addEventListener("click", addTask);

//cycle over incompleteTasksHolder ul list items
//to bind this to all children of incompleteTasksHolder
for(let i = 0; i < incompleteTasksHolder.children.length; i++){
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);  
}

//cycle over completedTasksHolder ul list items
//to bind this to all children of completedTasksHolder
for(let i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);  
}