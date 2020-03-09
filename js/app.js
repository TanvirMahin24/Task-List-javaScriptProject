//Selecting all the tags
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clrBtn = document.querySelector('.clearTasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load event listeners
loadEventLis();
//event Listener function
function loadEventLis() {
    //Load data from Local Storage
    document.addEventListener('DOMContentLoaded',getTasks);
    //form event listener
    form.addEventListener('submit',addTask);
    //task remove function
    taskList.addEventListener('click',removeTask);
    //Clear Task button
    clrBtn.addEventListener('click',clearTask);
    //Filter Tasks
    filter.addEventListener('keyup',filterTasks);
    
}
//Local storage data fetching function body
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //create new list element
        const li = document.createElement('li');

        //add classes
        li.className = 'list-group-item';

        //create text and append to parent node
        li.appendChild(document.createTextNode(task));

        //create the delete link and add classes
        const link = document.createElement('a');
        link.className ='btn btn-danger float-right delete-item';

        //add icon and btn
        link.innerHTML = '<i class="fas fa-fire text-light"></i>';

        //append the link
        li.appendChild(link);

        //append the li in the taskList
        taskList.appendChild(li);
    })
}
//addTask function body
function addTask(e) {
    //empty input check
    if (taskInput.value === ''){
        alert("Task field is empty...");
    }
    //create new list element
    const li = document.createElement('li');

    //add classes
    li.className = 'list-group-item';

    //create text and append to parent node
    li.appendChild(document.createTextNode(taskInput.value));

    //create the delete link and add classes
    const link = document.createElement('a');
    link.className ='btn btn-danger float-right delete-item';

    //add icon and btn
    link.innerHTML = '<i class="fas fa-fire text-light"></i>';

    //append the link
    li.appendChild(link);

    //append the li in the taskList
    taskList.appendChild(li);

    //Store the task in Local Storage
    storeTask(taskInput.value);

    //clear the input field
    taskInput.value = '';

    e.preventDefault();
}
function storeTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Remove a Single task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            //Remove task from Local storage
            taskRemoveFromStorage(e.target.parentElement.parentElement);
        }
    }
}
//Remove task from Local Storage
function taskRemoveFromStorage(delTask) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task , index)=>{
        if (delTask.textContent === task){
            tasks.splice(index , 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear Tasks button event handler
function clearTask(e) {
    //taskList.innerHTML = '';
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //Clear all tasks from local storage
    clearTasksFromLocalStorage();
}
//clearTasksFromLocalStorage body
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//Filter function body
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.list-group-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
}