let listaTarefas = document.querySelector("#lista_tarefas");
let tableRows = document.querySelector("#lista_tarefas > tbody");
let formTarefa = document.querySelector("#form_tarefa");
let campoTarefa = document.querySelector('#tarefa');
let campoDataLimite = document.querySelector('#data-limite');
let formButton = document.querySelector("#btSubmit");
let now = new Date();
let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const tasks = [];
let campoTotal = document.querySelector("#totalTasks");

if(!tableRows.childElementCount){
    listaTarefas.parentElement.parentElement.style.display = "none";
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

            tasks.push({ tarefa: valor, data: data });
            campoTotal.textContent = tasks.length;
            
            listaTarefas.parentElement.parentElement.style.display = "flex";
        }
        campoTarefa.value = '';
        campoDataLimite.value = '';
        taskValidationMessage.style.display = "none";
        taskDateValidationMessage.style.display = "none";
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
            }
        });
        tarefa.remove();
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
