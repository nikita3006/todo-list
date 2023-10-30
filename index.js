function submitHandler(event) {
    event.preventDefault();
    const name = event.target.todoName.value;
    const description = event.target.description.value;
    // const url = https://crudcrud.com/api/33336a7f72ce4fcab638b55fce99a890 
    const obj = {
        name,
        description,
    }
  
    async function postDetails() {
      try {
        const response = await axios.post("https://crudcrud.com/api/33336a7f72ce4fcab638b55fce99a890/OnlineShopping",obj)
        console.log(response.data,"Added");
  
        showItemsOnScreen(response.data);
      }
      catch(err) {
          console.log(err)
      }
    }
    postDetails();
  
  };
  
  window.addEventListener("DOMContentLoaded", () => {
    async function getDetails() {
  
      try {
          const response = await axios.get("https://crudcrud.com/api/33336a7f72ce4fcab638b55fce99a890/OnlineShopping")
  
          for (let i=0; i<response.data.length; i++) {
            showItemsOnScreen(response.data[i])
          }
  
          const doneTodos = await axios.get("https://crudcrud.com/api/33336a7f72ce4fcab638b55fce99a890/doneTodos")
  
          for (let i=0; i<doneTodos.data.length; i++) {
            todosDone(doneTodos.data[i])
          }
      }
  
      catch(err) {
          console.log(err)
      }
    }
  
    getDetails()
  });
  
  function showItemsOnScreen (item) {
  
    document.getElementById('todoName').value='';
    document.getElementById('description').value='';
  
    const parentNode = document.getElementById('TodoList');
    const childHTML = 
        `<li id=${item._id}> ${item.name} - ${item.description}
         <button onclick=doneTodo('${item._id}')>Done</button>
          <button onclick=deleteTodo('${item._id}')>Delete</button>
                    </li>`
  
        parentNode.innerHTML = parentNode.innerHTML+childHTML;
  
  };
  
  function deleteTodo (id) {
    const todo = document.getElementById(id);
    const parent = document.getElementById("TodoList");
    parent.removeChild(todo);
  
    async function deleteDetails() {
      try {
        const response = await axios.delete(`https://crudcrud.com/api/33336a7f72ce4fcab638b55fce99a890/OnlineShopping/${id}`)
        console.log("deleted")
      }
      catch(error) {
          console.log(error)
      }
    }
    deleteDetails()
  
  }
  
  
  function doneTodo(todoId) {
  
    async function done() {
      try {
        const response = await axios.get(`https://crudcrud.com/api/33336a7f72ce4fcab638b55fce99a890/OnlineShopping/${todoId}`);
  
        const name = response.data.name;
        const description = response.data.description;
  
        const data = {name,description};
  
        console.log(data,"after getting")
        const post = await axios.post('https://crudcrud.com/api/33336a7f72ce4fcab638b55fce99a890/doneTodos',data);
        todosDone(post.data);
  
      }
      catch(error) {
        console.log(error)
      }
    }
    done();
  
    deleteTodo(todoId);
  
  }
  
  function todosDone(todo) {
    const todoName = todo.name;
    const description = todo.description;
    let parent = document.getElementById("TodoDone");
  
    parent.innerHTML += `<li> ${todoName} - ${description}</li>`;
  
  }