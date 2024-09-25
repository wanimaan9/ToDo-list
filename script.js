const todoForm=document.querySelector('form')
const todoInput=document.getElementById('to-do-input');
const todoList=document.getElementById('todo-list');

let alltodos=gettodos();
updateTodoList();


todoForm.addEventListener('submit', function(e){
    e.preventDefault() 
    addTodo();
})

function addTodo(){
    const todoText=todoInput.value;
    if(todoText.length > 0)
    {  const todoobject={
        text: todoText,
        completed:false
    
    }
        alltodos.push(todoobject);
        updateTodoList();
        todoInput.value="";
    }
    
    
}
function updateTodoList(){
    todoList.innerHTML ="";
    alltodos.forEach((todo, todoIndex)=> {
        todoItem=createtodoItem(todo,todoIndex);
        todoList.append(todoItem);
    })
}

function createtodoItem(todo,todoIndex){
    const todoID="todo-"+todoIndex;
    const todoLI=document.createElement("li");
    const todoText=todo.text;
    todoLI.className="todo";
    todoLI.innerHTML= `
    <input id="${todoID}" type="checkbox" >
    <label class="custom-checkbox" for="${todoID}">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>
    <label for="${todoID}" class="todo-text">
        ${todoText}
    </label>
    <button class="del-btn">
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>
    `
    const deletebutton=todoLI.querySelector(".del-btn");
    deletebutton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox=todoLI.querySelector("input");
    checkbox.addEventListener("change",()=>{
        alltodos[todoIndex].completed=checkbox.checked;
        saveTodos();
    })
    checkbox.checked=todo.completed;
    return todoLI
}
function deleteTodoItem(todoIndex){
    alltodos=alltodos.filter((_,i)=> i !==todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos(){
    const todoJson=JSON.stringify(alltodos);
    localStorage.setItem("todos",todoJson);
}
function gettodos(){
    const todos=localStorage.getItem("todos") ||"[]";
    return JSON.parse(todos);
}
