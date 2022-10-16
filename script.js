const dom ={
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    list: document.getElementById('list'),
    datetime: document.getElementById('datetime')
   
}

//Массив задач
const tasks = [];

//Клик по кнопке добавить
dom.add.onclick = () => {
    if (dom.new.value && dom.datetime.value){
        addTask(dom.new.value, tasks, dom.datetime.value)
        dom.new.value = ''
        dom.datetime.value = ''
        tasksRender(tasks)
        console.log(dom.datetime.value);
    }
}

//Добавление задачи
function addTask(text, list, date){
    const timestamp = Date.now()
    const task ={
        id:timestamp,
        text,
        isComplete: false,
        date
    }
    list.push(task)
}

//Вывод задач
function tasksRender(list){
    let htmlList = ''
    list.forEach((task) => {
        const cls = task.isComplete ? 'todo_task todo_task_complete': 'todo_task'
        const checked = task.isComplete ? 'checked' : ''
        const taskHtml = ` 
        <div id="${task.id}" class="${cls}">
        
        <div class="todo_task-text"> 
                        <div class="todo_task-text-text" style="float: left; width: 100px;">${task.text}</div>
                        <div class="todo_task-datetime">${task.date}</div>
                    </div>
        <div class="todo_task-change">✎</div>
        <label class="checkbox">
            <input type="checkbox" ${checked}>
            <div class="todo_checkbox"></div>
        </label> 
        <div class="todo_task-del">🗑️</div>  
                          
    </div>
    `
    htmlList = htmlList + taskHtml
    })

    dom.list.innerHTML = htmlList;
}

//Клик по галке задачи
dom.list.onclick=(event) =>{
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo_checkbox')
    const isDeleteEl = target.classList.contains('todo_task-del')

    if (isCheckboxEl){
        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        TaskStatus(taskId, tasks)
        tasksRender(tasks)
    }
    if(isDeleteEl){
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        deleteTask(taskId, tasks)
        tasksRender(tasks)
    }
}

//Изменение статуса задачи
function TaskStatus(id, list){
    list.forEach((task) => {
        if(task.id == id){
            task.isComplete = !task.isComplete
        }
    })
}

//Удаление задачи
function deleteTask(id, list){
    list.forEach((task, idx)=>{
        if (task.id == id){
        list.splice(idx, 1)
        }
    })
}