let formTarefa = document.querySelector("#form_tarefa");
let campoTarefa = document.querySelector('#tarefa');
let campoDataLimite = document.querySelector('#data-limite');
let formButton = document.querySelector("#btSubmit");
let taskTable = document.querySelector("#lista_tarefas");
let taskTableRows = document.querySelector("#lista_tarefas > tbody");
let campoTotal = document.querySelector("#totalTasks");
// Validar o valor introduzido (não pode vazio / tem de ter, nomínimo, 3 caracteres )
let taskValidationMessage = document.querySelector(".invalid-feedback.invalid-task");
let taskRepeatedMessage = document.querySelector(".invalid-feedback.repeated-task");
// Validar data (não pode ser no passado)
let taskDateValidationMessage = document.querySelector(".invalid-feedback.invalid-date");

// Variáveis para validação da data
let now = new Date();
let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

// Criar uma estrutura de dados para armazenar em memória as tarefas e as respectivas datas
let taskLocalData = [];
if(JSON.parse(localStorage.getItem("tasks")) !== null){
    taskLocalData = JSON.parse(localStorage.getItem("tasks"));
}
const tasks = taskLocalData;

// DONE: Adicionar função para criar os itens de localStorage na página
function addTask(task){
    const removeIcon = `<i class="bi bi-x-lg remove-bt"></i>`;
    const editIcon = `<i class="bi bi-pencil edit-bt"></i>`;
    const completeClass = task.terminada ? "task-complete" : "";
    // let taskDate = task.data ? Intl.DateTimeFormat().format(task.data) : "";
    // console.log(`data: '${task.data}'`);
    taskTableRows.innerHTML += `
        <tr class="tarefa-todo ${completeClass}">
            <td class="tarefa-texto w-50" scope="row">
                <span>${task.tarefa}</span>
            </td>
            <td class="tarefa-data"><span>${task.data}</span></td>
            <td class="w-25">
                <span class="btn btn-outline-primary edit-bt">${editIcon}</span>
                <span class="btn btn-outline-danger remove-bt">${removeIcon}</span>
            </td>
        </tr>`;
}

function saveTasks(){
    let tasksData = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksData);
}

function clearErrorMessages(){
    taskDateValidationMessage.style.display = "none";
    taskRepeatedMessage.style.display = "none";
    taskValidationMessage.style.display = "none";
}

if(tasks.length){
    tasks.forEach(task => addTask(task));
} else {
    taskTable.closest(".card").style.display = "none";
}

formTarefa.addEventListener("submit", function(event){
    event.preventDefault();
    
    let taskText = campoTarefa.value.trim();
    let taskDate = campoDataLimite.value;
    let taskDateValue = new Date(taskDate);
    console.log(Intl.DateTimeFormat().format(taskDateValue));
    let isValidDate = !taskDate || taskDateValue >= today;
    let isRepeatedTask = tasks.find(tarefa => tarefa.tarefa.toUpperCase() === taskText.toUpperCase());
    let isEdit = formButton.classList.contains("update");

    clearErrorMessages();
    if(isRepeatedTask && !isEdit){
        taskRepeatedMessage.style.display = "block";
        campoTarefa.focus();
    } else if (taskText.length > 2 && isValidDate) {
        
        if(!isRepeatedTask || isEdit){
            
            if(isEdit){
                let currentTask = { tarefa: campoTarefa.value.trim(), data: campoDataLimite.value };
                let tarefaAtual = document.querySelector(".edit");
                tarefaAtual.querySelector(".tarefa-texto > span").textContent = currentTask.tarefa;
                tarefaAtual.querySelector(".tarefa-data > span").textContent = currentTask.data;

                let taskIndex = tasks.findIndex(tarefa => tarefa.tarefa.toUpperCase() === taskText.toUpperCase());
                tasks.splice(taskIndex, 1, currentTask);
                saveTasks();
                
                tarefaAtual.classList.remove("edit");
                formButton.classList.remove("update");
                formButton.value = "Inserir tarefa";
            }else{
                let currentTask = { tarefa: taskText, data: taskDate, terminada: false };
                addTask(currentTask);
                tasks.push(currentTask);
                saveTasks();
                
                campoTotal.textContent = tasks.length;
                taskTable.parentElement.parentElement.style.display = "flex";
            }
            campoTarefa.value = '';
            campoDataLimite.value = '';
            
        }
        campoTarefa.focus();
    } else {
        if(!isValidDate){
            taskDateValidationMessage.style.display = "block";
            campoDataLimite.focus();
        }
        if(taskText.length <= 2){
            taskValidationMessage.style.display = "block";
            campoTarefa.focus();
        }
    }

});


function toggleTaskStatus(currentElement){
    let removeButton = currentElement.getElementsByClassName("remove-bt")[0];
    let editButton = currentElement.getElementsByClassName("edit-bt")[0];
    let currentTaskText = currentElement.querySelector(".tarefa-texto > span").textContent;
    
    let currentTask = tasks.find(tarefa => tarefa.tarefa.toUpperCase() === currentTaskText.toUpperCase());
    
    currentTask.terminada = !currentTask.terminada;
    currentElement.classList.toggle("task-complete");
    if (currentElement.classList.contains("task-complete")) {
        removeButton.style.display = "none";
        editButton.style.display = "none";
    } else {
        removeButton.style.display = "inline-flex";
        editButton.style.display = "inline-flex";
    }
}

taskTable.addEventListener("click", function(event){
    let elemento = event.target;
    let isRemoveButton = elemento.classList.contains("remove-bt");
    let tarefa = elemento.closest("tr");

    if(isRemoveButton){
        let tarefaProps = tarefa.querySelectorAll("td span");
        
        // DONE: Remove item from array
        tasks.forEach((item, pos) => {
            if(item.tarefa === tarefaProps[0].textContent && item.data === tarefaProps[1].textContent){
                tasks.splice(pos, 1);
            }
        });
        saveTasks();
        tarefa.remove();
        campoTotal.textContent = tasks.length;
    }
    
    if(!taskTableRows.childElementCount){
        taskTable.parentElement.parentElement.style.display = "none";
        campoTarefa.focus();
    }

    let isEditButton = elemento.classList.contains("edit-bt");
    if(isEditButton){
        clearErrorMessages();
        
        tarefa.classList.add("edit");
        campoTarefa.value = tarefa.querySelector(".tarefa-texto > span").textContent;
        campoDataLimite.value = tarefa.querySelector(".tarefa-data > span").textContent;
        formButton.classList.add("update");
        formButton.value = "Atualizar tarefa";
    }
});

taskTable.addEventListener("dblclick", function(event){
    let elemento = event.target;

    if(elemento.nodeName === "TD"){
        toggleTaskStatus(elemento.parentElement);
    }else if(elemento.nodeName === "SPAN"){
        toggleTaskStatus(elemento.parentElement.parentElement);
    }
    saveTasks();
});

// TODO: Mostrar a data no formato dd/mm/aaaa
// DONE: Acrescentar uma nova propriedade ao objecto tarefa, chamada "terminada" que tem um valor booleano
// TODO: Acrescentar uma seta a cada título de coluna que, quando clicada (toggle - asc e desc), permite ordenar os registos/linhas
// TODO: Implementar um filtro de tarefas e uma pesquisa tarefas