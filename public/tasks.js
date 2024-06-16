let token = localStorage.getItem('token');
let decoded = JSON.parse(atob(token?.split(".")[1]));
const userId = decoded.id;
console.log(decoded);
const tasks = document.querySelector('#tasks');


//create task
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    try{
        let todo = document.getElementById('taskInput').value;
        const res = await axios.post('/api/v1/tasks/create',{userId,todo,});
        if(res.status==201){
            document.getElementById('tasks').innerHTML = "";
            showTasks();
            document.getElementById('taskInput').value="";
        }
        else{
            console.log(error);
        }
    }
    catch(error){
        console.log(error);
    }
})

 

//Show Tasks
const showTasks = async ()=>{
    try {
        const {data} = await axios.post('/api/v1/tasks/',{userId});
        data.map((task)=>{
            let taskBox = document.createElement('div');
            taskBox.classList.add('task-box');
            taskBox.setAttribute('task-id',task._id);
            taskBox.innerHTML =
                                `<div class="task-msg">
                                ${task.todo}
                                </div>
                                <button id="${task._id}" class="deleteBtn">❌</button>`;

            tasks.insertBefore(taskBox,tasks.firstChild);
        })
    } catch (error) {
        console.log(error);
    }
}
showTasks();



//deleteBtn for delete Task
tasks.addEventListener('click',async(e)=>{
    const el = e.target;
    console.log(el.classList);
    if(el.classList.contains('deleteBtn')){
        const taskId = el.id;
        console.log(taskId);
        try {
            await axios.post('/api/v1/tasks/delete',{taskId});
            document.getElementById('tasks').innerHTML = "";
            showTasks(); 
        } catch (error) {
            console.log(error);
        }
    }
})