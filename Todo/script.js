var apiKey = "ddfba1a724393d7ba0b8e923f680c9222a4a1a940045b59d5bbfab94b8778c94";

var listRequest = new XMLHttpRequest();
listRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        for(let i = 0; i < todos.length; i++) {
            writeTodo(todos[i]);
        }
    } else if (this.readyState == 4) {
        console.log(this.responseText);
    }
}
listRequest.open("GET", "https://api.kraigh.net/todos", true);
listRequest.setRequestHeader("x-api-key", apiKey);
listRequest.send();

function writeTodo(todoData) {
    var todo = document.createElement("article"); // create an element for each todo
    todo.setAttribute("class", "todo"); // set the attributes id to id, class to todo
    todo.setAttribute("id", todoData.id);
    if(todoData.completed) { // if todoData.completed is true --> set the attribute class to completed
        //todo.classList =+ " completed";
        todo.classList.add("completed");
    }

    var completedButton = document.createElement("button"); // create completed button
    completedButton.setAttribute("id", todoData.id);
    //completedButton.setAttribute("class", "check"); // set the attribute class to check
    completedButton.classList.add("check");
    todo.appendChild(completedButton);
    if(todoData.completed) { // if todoData.completed is true --> set the attribute class to completed
        //todo.classList =+ " completed";
        completedButton.classList.add("bcompleted");
    }

    var todoText = document.createElement("p"); // create element ("p") called todoText
    todoText.setAttribute("id", todoData.id);
    // todoText.innerHTML = todoData.text;
    todoText.innerText = todoData.text;
    todo.appendChild(todoText) // append to todo element

    var deleteButton = document.createElement("button"); // create delete button
    deleteButton.setAttribute("class", "delete"); // set the attribute class to delete
    deleteButton.setAttribute("id", todoData.id); // set button id = todo id
    deleteButton.innerHTML = "-";
    todo.appendChild(deleteButton);

    document.getElementById("todoshere").appendChild(todo); // append the todo child to the todos element from the html page
   //console.log(todo);

    completedButton.addEventListener("click", completeTodo);
    deleteButton.addEventListener("click", deleteTodo);

    document.getElementById("newTitle").value = "";

}

function completeTodo(event) {
    var todoId = event.target.parentNode.id;
    var data = {
        completed: true
    };

    var completeRequest = new XMLHttpRequest();
    completeRequest.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            event.target.parentNode.classList.add("completed");
            event.target.classList.add("bcompleted");
            console.log(event.target.classList);
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    }
    completeRequest.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
    completeRequest.setRequestHeader("Content-type", "application/json");
    completeRequest.setRequestHeader("x-api-key", apiKey);
    completeRequest.send(JSON.stringify(data));
}

function deleteTodo(event) {
    var todoId = event.target.parentNode.id;
    var delRequest = new XMLHttpRequest();
    delRequest.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            document.getElementById("todoshere").removeChild(event.target.parentNode);
        } else if (this.readyState == 4) {
            console.log(this.responseText);
        }
    }
    delRequest.open("DELETE", "https://api.kraigh.net/todos/" + todoId, true);
    delRequest.setRequestHeader("Content-type", "application/json");
    delRequest.setRequestHeader("x-api-key", apiKey);
    delRequest.send();
}

function renderTodos(todos) {
    console.log(todos.length);
    for(let i = 0; i < todos.length; i++) {
        writeTodo(todos[index]);
        
        console.log(todos[index].text);
    }
}

/*
    var completeTodo = function (event) {
        var todoId = event.srcElement.parentNode.id;
        var data = json.Stringify ({
            "complete": true
        });
        put request
        request.oprn("PUT", "link" + todoId)
        ...
        add a completed class attribute to the srcElement.parentNode
    }
    function completeTodo(event) {
        todoid = event.target.parentNode.id;
        data = JSON.stringify({

        });
    }

   
document.getElementbyId("new-todo-form").addlistener("submit", function () {
    event.preventDefault();

    var text = newTitle.value;
    var data = JSON.stringify({
        "text": text
    });    
    var createRequest = new XMLHttpRequest();
    request.addEventListener("readystatechange", function() {
    });
    request.open("POST", api)
    .setReqheader("Content-Type", "application/json")
    .setReHeader("x-api-key", apiKey);
    .send(data)
});
 */


document.getElementById("new-todo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    // Setting variable for form input (get from HTML form)
    // var text = document.getElementById("newTitle").value;
    // console.log(text);
    
    var data = {
        text: newTitle.value
    }
    
    // Initalize AJAX Request
    var newTodo = new XMLHttpRequest();
    // Response handler
    newTodo.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            writeTodo(JSON.parse(this.responseText));
            
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };
    newTodo.open("POST", "https://api.kraigh.net/todos", true);
    newTodo.setRequestHeader("Content-type", "application/json");
    newTodo.setRequestHeader("x-api-key", apiKey);
    newTodo.send(JSON.stringify(data));
    // makeTodos();
    // console.log(todos);
    // renderTodos(todos);
});