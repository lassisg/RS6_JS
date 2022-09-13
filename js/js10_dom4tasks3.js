let listaTarefas = document.querySelector("#lista_tarefas");
let tableRows = document.querySelector("#lista_tarefas > tbody");
let formTarefa = document.querySelector("#form_tarefa");
let campoTarefa = document.querySelector('#tarefa');
let campoDataLimite = document.querySelector('#data-limite');
let campoTotal = document.querySelector("#totalTasks");
let formButton = document.querySelector("#btSubmit");
// Variáveis para validação da data
let now = new Date();
let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

// Criar uma estrutura de dados para armazenar em memória as tarefas e as respectivas datas
let dados = [];
if(JSON.parse(localStorage.getItem("tasks")) !== null){
    dados = JSON.parse(localStorage.getItem("tasks"));
}
const tasks = dados;

// TODO: Adicionar função para criar os itens de localStorage na página
if(!tableRows.childElementCount){
    listaTarefas.closest(".card").style.display = "none";
}

// document.querySelector("#btSubmit").addEventListener("click", function(){
formTarefa.addEventListener("submit", function(event){
    event.preventDefault();
    
    let valor = campoTarefa.value.trim();
    let data = campoDataLimite.value;
    let valorData = new Date(data);
    let dataValida = !data || valorData >= today;

    // Validar o valor introduzido (não pode vazio / tem de ter, nomínimo, 3 caracteres )
    let taskValidationMessage = document.querySelector(".invalid-feedback.invalid-task");
    let taskDateValidationMessage = document.querySelector(".invalid-feedback.invalid-date");
    let isEdit = formButton.classList.contains("update");
    if (valor.length > 2 && dataValida) {
        let removeIcon = `<i class="bi bi-x-lg remove-bt"></i>`;
        let editIcon = `<i class="bi bi-pencil edit-bt"></i>`;
        
        
        // devolve o índice do objeto encontrado ou -1
        // let taskPosition = tasks.findIndex(tarefa => tarefa.tarefa === valor && tarefa.data == data);
        // if(isRepeatedTask === -1){

        // devolve o objeto encontrado ou undefined
        let isRepeatedTask = tasks.find(tarefa => tarefa.tarefa.toUpperCase() === valor.toUpperCase() && tarefa.data == data);
        if(!isRepeatedTask){
            console.log("Não é repetido");
            if(isEdit){
                let tarefaAtual = document.querySelector(".edit");
                tarefaAtual.classList.remove("edit");
                tarefaAtual.querySelector(".tarefa-texto > span").textContent = campoTarefa.value;
                tarefaAtual.querySelector(".tarefa-data > span").textContent = campoDataLimite.value;
                formButton.classList.remove("update");
                formButton.value = "Inserir tarefa";
            }else{
                tableRows.innerHTML += `
                    <tr class="tarefa-todo">
                        <td class="tarefa-texto w-50" scope="row">
                            <span>${valor}</span>
                        </td>
                        <td class="tarefa-data"><span>${data}</span></td>
                        <td class="w-25">
                            <span class="btn btn-outline-primary edit-bt">${editIcon}</span>
                            <span class="btn btn-outline-danger remove-bt">${removeIcon}</span>
                        </td>
                    </tr>`;

                let currentTask = { tarefa: valor, data: data };
                tasks.push(currentTask);
                // Serialização
                let tasksData = JSON.stringify(tasks);
                localStorage.setItem("tasks", tasksData);
                
                campoTotal.textContent = tasks.length;
                listaTarefas.parentElement.parentElement.style.display = "flex";
            }
            campoTarefa.value = '';
            campoDataLimite.value = '';
            taskValidationMessage.style.display = "none";
            taskDateValidationMessage.style.display = "none";
        }
        campoTarefa.focus();
    } else {
        taskDateValidationMessage.style.display = "none";
        if(!dataValida){
            taskDateValidationMessage.style.display = "block";
            campoDataLimite.focus();
        }
        taskValidationMessage.style.display = "none";
        if(valor.length <= 2){
            taskValidationMessage.style.display = "block";
            campoTarefa.focus();
        }
    }

});


function toggleTaskStatus(currentElement){
    
    let removeButton = currentElement.getElementsByClassName("remove-bt")[0];
    let editButton = currentElement.getElementsByClassName("edit-bt")[0];
    
    currentElement.classList.toggle("task-complete");
    if (currentElement.classList.contains("task-complete")) {
        removeButton.style.display = "none";
        editButton.style.display = "none";
    } else {
        removeButton.style.display = "inline-flex";
        editButton.style.display = "inline-flex";
    }
}

listaTarefas.addEventListener("click", function(event){
    let elemento = event.target;
    let isRemoveButton = elemento.classList.contains("remove-bt");

    if(isRemoveButton){
        let tarefa = elemento.closest("tr");
        let tarefaProps = tarefa.querySelectorAll("td span");
        
        // DONE: Remove item from array
        tasks.forEach((item, pos) => {
            if(item.tarefa === tarefaProps[0].textContent && item.data === tarefaProps[1].textContent){
                tasks.splice(pos, 1);

                // Serialização
                let tasksData = JSON.stringify(tasks);
                localStorage.setItem("tasks", tasksData);
            }
        });
        tarefa.remove();
        // se tivessemos definido let tasks=[]
        // tasks=tasks.filter(item => item.tarefa!==tarefaProps[0].textContent && item.data === tarefaProps[1].textContent)
        campoTotal.textContent = tasks.length;
    }
    
    if(!tableRows.childElementCount){
        listaTarefas.parentElement.parentElement.style.display = "none";
        campoTarefa.focus();
    }

    let isEditButton = elemento.classList.contains("edit-bt");
    if(isEditButton){
        let tarefa = elemento.closest("tr");
        tarefa.classList.add("edit");
        campoTarefa.value = tarefa.querySelector(".tarefa-texto > span").textContent;
        campoDataLimite.value = tarefa.querySelector(".tarefa-data > span").textContent;
        formButton.classList.add("update");
        formButton.value = "Atualizar tarefa";
    }
});

listaTarefas.addEventListener("dblclick", function(event){
    let elemento = event.target;

    if(elemento.nodeName === "TD"){
        toggleTaskStatus(elemento.parentElement);
    }else if(elemento.nodeName === "SPAN"){
        toggleTaskStatus(elemento.parentElement.parentElement);
    }
});

// Mostrar a data no formato dd/mm/aaaa
// acrescentar uma nova propriedade ao objecto tarefa, chamada "terminada" que tem um valor booleano
// acrescentar uma seta a cada título de coluna que, quando clicada (toggle - asc e desc), permite ordenar os registos/linhas
// implementar um filtro de tarefas e uma pesquisa tarefas