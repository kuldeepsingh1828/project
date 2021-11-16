//element
var todoText = document.getElementById('todoText');
var todo = document.getElementById('addTodo');
var todoList = document.getElementById('todoList');
var todoListComplete = document.getElementById('todoListComplete');

//event
todo.addEventListener('click', addTodo);
todoText.addEventListener('keyup', addTodo);

//function
function addTodo(event) {
    //check for element
    if (event.target.tagName.toLowerCase() == 'input' && event.keyCode != 13) {
        return;
    }
    //getting the value from the text box
    var text = todoText.value;
    if (text.length == 0) {
        return;
    }
    //setting the empty value for the text box
    todoText.value = '';
    var div = document.createElement('div');
    var li = document.createElement('li');
    var checked = document.createElement('button');
    var trash = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('checked');
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.classList.add('delete');
    trash.addEventListener('click', deleteTodo);
    checked.addEventListener('click', checkTodo);
    li.innerHTML = text;
    div.appendChild(li);
    div.appendChild(checked);
    div.appendChild(trash);
    todoList.appendChild(div);
}
function deleteTodo(event) {
    var node = event.target.parentNode.parentNode;
    todoList.removeChild(node);
}
function checkTodo(event) {
    var node = event.target.parentNode.parentNode;
    todoList.removeChild(node);
    todoListComplete.appendChild(node);
}