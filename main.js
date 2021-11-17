//element
var id = 1;
var todoText = document.getElementById('todoText');
var deleteCount = document.getElementById('delete-count');
var todo = document.getElementById('addTodo');
var todoList = document.getElementById('todoList');
var bin = document.getElementById('bin').querySelector('i');
var todoListComplete = document.getElementById('todoListComplete');
var todoTask = [];
var deletedTask = [];

//event
todo.addEventListener('click', addTodo);
todoText.addEventListener('keyup', addTodo);
document.addEventListener('dragstart', function () {
    bin.style.width = '200px';
    bin.style.height = '200px';
    bin.style.padding = '5px';
    bin.style.margin = '5px';
});
document.addEventListener('drop', function () {
    bin.style.width = '';
    bin.style.height = '';
});
renderTodo();
//function
function renderTodo() {
    //checks if the first time page open
    if (localStorage.getItem('todoTask') != null) {
        arrayTodo = JSON.parse(localStorage.getItem('todoTask'));
        arrayDeletedTodo = JSON.parse(localStorage.getItem('deletedTask'));
        arrayTodo.forEach(function (e) {
            addTodo(e);
        });
        count = arrayDeletedTodo.length;
        deleteCount.innerHTML = count;
    }
}
function addTodo(event) {
    //check for element
    var text = event;
    if (typeof event != 'string') {

        if (event.target.tagName.toLowerCase() == 'input' && event.keyCode != 13) {
            return;
        }
        var text = todoText.value;
    }
    //getting the value from the text box
    if (text.length == 0) {
        return;
    }
    //setting the empty value for the text box
    todoText.value = '';
    var div = document.createElement('div');
    var li = document.createElement('li');
    var checked = document.createElement('button');
    var trash = document.createElement('button');
    //id="drag1" draggable="true" ondragstart="drag(event)"
    var divAttr = document.createAttribute('draggable');
    var divid = document.createAttribute('id');
    divAttr.value = true;
    divid.value = 'drag' + id++;

    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('checked');
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.classList.add('delete');
    div.setAttributeNode(divAttr);
    div.setAttributeNode(divid);

    div.addEventListener('dragstart', drag);
    trash.addEventListener('click', deleteTodo);
    checked.addEventListener('click', checkTodo);

    li.innerHTML = text;
    div.appendChild(li);
    div.appendChild(checked);
    div.appendChild(trash);
    todoList.appendChild(div);
    todoTask.push(text);
    updateTask();
}
function deleteTodo(event) {
    var node = event.target.parentNode.parentNode;
    let text = node.querySelector('li').innerHTML;
    deletedTask.push(text);
    deleteCount.innerHTML = parseInt(deleteCount.innerHTML) + 1;
    todoList.removeChild(node);
    todoTask = todoTask.filter((e) => {
        if (e == text) {
            return false;
        } return true;
    });
    updateTask();
}
function checkTodo(event) {
    var node = event.target.parentNode.parentNode;
    todoList.removeChild(node);
    todoListComplete.appendChild(node);
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log('Hi');
    console.log(ev.dataTransfer);
    ev.dataTransfer.setData("element", ev.target.id);
    console.log(ev.dataTransfer);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("element");
    var text = document.getElementById(data).querySelector('li').innerHTML;
    deletedTask.push(text);
    todoTask = todoTask.filter((e) => {
        if (e == text) {
            return false;
        } return true;
    });
    deleteCount.innerHTML = deletedTask.length;
    todoList.removeChild(document.getElementById(data));
    updateTask();
}
function updateTask() {
    localStorage.setItem('todoTask', JSON.stringify(todoTask));
    localStorage.setItem('deletedTask', JSON.stringify(deletedTask));
}