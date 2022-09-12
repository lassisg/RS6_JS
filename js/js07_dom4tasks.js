let listaTarefas = document.querySelector("#lista_tarefas");
let tableRows = document.querySelector("#lista_tarefas > tbody");
let formTarefa = document.querySelector("#form_tarefa");
let campoTarefa = document.querySelector('#tarefa');
let campoDataTarefa = document.querySelector('#data-tarefa');
let formButton = document.querySelector("#btSubmit");
let now = new Date();
let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

if(!tableRows.childElementCount){
    listaTarefas.parentElement.parentElement.style.display = "none";
}


// document.querySelector("#btSubmit").addEventListener("click", function(){
formTarefa.addEventListener("submit", function(event){
    event.preventDefault();
    
    let valor = campoTarefa.value.trim();
    let data = campoDataTarefa.value;
    let valorData = new Date(data);
    let dataValida = !data || valorData >= today;

    // Validar o valor introduzido (não pode vazio / tem de ter, nomínimo, 3 caracteres )
    let taskValidationMessage = document.querySelector(".invalid-feedback.invalid-task");
    let taskDateValidationMessage = document.querySelector(".invalid-feedback.invalid-date");
    let isEdit = formButton.classList.contains("update");
    if (valor.length > 2 && dataValida) {
        
        // Poder eliminar umva tarefa (add 'X')
        let removeIcon = `<i class="bi bi-x-lg remove-bt"></i>`;
        let editIcon = `<i class="bi bi-pencil edit-bt"></i>`;
        
        // Para lista
        // let listClasses = "tarefa-todo list-group-item d-flex align-items-center gap-2";
        // listaTarefas.innerHTML += `
        //     <li class="${listClasses}">
        //         <span class="tarefa-texto flex-grow-1">${valor}</span>
        //         <span class="tarefa-data">${data}</span>
        //         <span class="btn btn-outline-primary edit-bt">${editIcon}</span>
        //         <span class="btn btn-outline-danger remove-bt">${removeIcon}</span>
        //     </li>`;
        // ${valor}<button class="${spanClasses}">X</button>
        
        
        // Para tabela
        if(isEdit){
            let tarefaAtual = document.querySelector(".edit");
            tarefaAtual.classList.remove("edit");
            tarefaAtual.querySelector(".tarefa-texto > span").textContent = campoTarefa.value;
            tarefaAtual.querySelector(".tarefa-data > span").textContent = campoDataTarefa.value;
            formButton.classList.remove("update");
            formButton.value = "Inserir tarefa";
        }else{
            let bodyTabela = listaTarefas.querySelector("tbody");
            bodyTabela.innerHTML += `
                <tr class="tarefa-todo">
                    <td class="tarefa-texto w-50" scope="row">
                        <span>${valor}</span>
                    </td>
                    <td class="tarefa-data">
                        <span>${data}</span>
                    </td>
                    <td class="w-25">
                        <span class="btn btn-outline-primary edit-bt">${editIcon}</span>
                        <span class="btn btn-outline-danger remove-bt">${removeIcon}</span>
                    </td>
                </tr>`;

            // listaTarefas.style.display = "table";
            listaTarefas.parentElement.parentElement.style.display = "flex";
        }
        campoTarefa.value = '';
        campoDataTarefa.value = '';
        taskValidationMessage.style.display = "none";
        taskDateValidationMessage.style.display = "none";
        campoTarefa.focus();
    } else {
        taskDateValidationMessage.style.display = "none";
        if(!dataValida){
            taskDateValidationMessage.style.display = "block";
            campoDataTarefa.focus();
        }
        taskValidationMessage.style.display = "none";
        if(valor.length <= 2){
            taskValidationMessage.style.display = "block";
            campoTarefa.focus();
        }
    }
    

});


// event delegation

// Para lista

// function toggleTaskStatus(currentElement){
//     currentElement.classList.toggle("task-complete");
//     let removeButton = currentElement.getElementsByClassName("remove-bt")[0];
//     let editButton = currentElement.getElementsByClassName("edit-bt")[0];

//     if (currentElement.classList.contains("task-complete")) {
//         removeButton.style.display = "none";
//         editButton.style.display = "none";
//     } else {
//         removeButton.style.display = "flex";
//         editButton.style.display = "flex";
//         // botao.style.display = "inline"; // se usar button
//     }
// }

// listaTarefas.addEventListener("click", function(event){
//     let elemento = event.target.nodeName;
        
//     // // if(elemento === "BUTTON"){
//     // if(elemento === "SPAN"){
//     //     event.target.parentElement.remove();
//     // }
//     // if(elemento === "I"){
//     //     event.target.parentElement.parentElement.remove();
//     // }

//     let isRemoveButton = event.target.classList.contains("remove-bt");
//     if(isRemoveButton && elemento === "SPAN"){
//         event.target.parentElement.remove();
//     }else if(isRemoveButton && elemento === "I"){
//         event.target.parentElement.parentElement.remove();
//     }

//     let isEditButton = event.target.classList.contains("edit-bt");
//     if(isEditButton){
//         console.log("Editar tarefa...");
//     }
// });

// // Dar uma tarefa como terminada (add class 'task-complete')
// listaTarefas.addEventListener("dblclick", function(event){
//     let elemento = event.target;
    
//     if(elemento.nodeName === "LI"){
//         // // elemento.classList.add("task-complete");
//         // elemento.classList.toggle("task-complete");
//         // let removeButton = elemento.getElementsByClassName("remove-bt")[0];
//         // let editButton = elemento.getElementsByClassName("edit-bt")[0];

//         // if (elemento.classList.contains("task-complete")) {
//         //     removeButton.style.display = "none";
//         //     editButton.style.display = "none";
//         // } else {
//         //     removeButton.style.display = "flex";
//         //     editButton.style.display = "flex";
//         //     // botao.style.display = "inline"; // se usar button
//         // }
//         toggleTaskStatus(elemento);
//     }

//     let isTaskContent = elemento.classList.contains("tarefa-texto");
//     isTaskContent = isTaskContent || elemento.classList.contains("tarefa-data");
    
//     if(isTaskContent){
//         toggleTaskStatus(elemento.parentElement);
//     }

// });

// Para tabela

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
    // if(isRemoveButton && elemento.nodeName === "SPAN"){
    //     elemento.parentElement.parentElement.remove();
    // }else if(isRemoveButton && elemento.nodeName === "I"){
    //     elemento.parentElement.parentElement.parentElement.remove();
    // }

    if(isRemoveButton){
        elemento.closest("tr").remove();
    }
    
    if(!tableRows.childElementCount){
        listaTarefas.parentElement.parentElement.style.display = "none";
        campoTarefa.focus();
    }

    // let tableRows = document.querySelector("#lista-tarefas > tbody");

    let isEditButton = elemento.classList.contains("edit-bt");
    if(isEditButton){
        let tarefa = elemento.closest("tr");
        tarefa.classList.add("edit");
        campoTarefa.value = tarefa.querySelector(".tarefa-texto > span").textContent;
        campoDataTarefa.value = tarefa.querySelector(".tarefa-data > span").textContent;
        formButton.classList.add("update");
        formButton.value = "Atualizar tarefa";
    }
});

// Dar uma tarefa como terminada (add class 'task-complete')
listaTarefas.addEventListener("dblclick", function(event){
    let elemento = event.target;

    if(elemento.nodeName === "TD"){
        toggleTaskStatus(elemento.parentElement);
    }else if(elemento.nodeName === "SPAN"){
        toggleTaskStatus(elemento.parentElement.parentElement);
    }
});

// DONE: Acrescentar campo de data limite 
// DONE: Visualizar as tarefas numa tabela
// DONE: Permitir a alteração de uma tarefa