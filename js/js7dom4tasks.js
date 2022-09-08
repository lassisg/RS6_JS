let listaTarefas = document.querySelector("#lista_tarefas");
let campoTarefa = document.querySelector('#tarefa');
let formTarefa = document.querySelector("#form_tarefa");

// document.querySelector("#btSubmit").addEventListener("click", function(){
formTarefa.addEventListener("submit", function(event){
    event.preventDefault();
    
    let valor = campoTarefa.value.trim();


    // Validar o valor introduzido (não pode vazio / tem de ter, nomínimo, 3 caracteres )
    let taskValidationMessage = document.querySelector(".invalid-feedback.invalid-task");
    if (valor.length > 2) {
        
        let listClasses = "tarefa-todo list-group-item d-flex justify-content-between align-items-center";
        // Poder eliminar umva tarefa (add 'X')
        let spanClasses = "badge bg-primary remove-bt";
        let removeIcon = `<i class="fa-solid fa-xmark"></i>`;
        
        listaTarefas.innerHTML += `
            <li class="${listClasses}">
            ${valor}<span class="${spanClasses}">${removeIcon}</span>
            </li>`;
            // ${valor}<button class="${spanClasses}">X</button>
        campoTarefa.value = '';
        taskValidationMessage.style.display = "none";
    }else{
        taskValidationMessage.style.display = "block";
    }
    
    campoTarefa.focus();

});

// Poder eliminar umva tarefa (add 'X')
let taskRemovalButtons = document.querySelectorAll(".remove-bt");
for(let removeButton of taskRemovalButtons){
    removeButton.addEventListener("click", function(){
        console.log("clicou");
    });
}

// event delegation
listaTarefas.addEventListener("click", function(event){
    let elemento = event.target.nodeName;
    // if(elemento === "BUTTON"){
    if(elemento === "SPAN"){
        event.target.parentElement.remove();
    }
    if(elemento === "I"){
        event.target.parentElement.parentElement.remove();
    }
});

// Dar uma tarefa como terminada (add class 'task-complete')
listaTarefas.addEventListener("dblclick", function(event){
    let elemento = event.target;
    
    if(elemento.nodeName === "LI"){
        // elemento.classList.add("task-complete");
        elemento.classList.toggle("task-complete");
        let botao = elemento.getElementsByClassName("remove-bt")[0];
        
        if (elemento.classList.contains("task-complete")) {
            botao.style.display = "none";
        } else {
            botao.style.display = "flex";
            // botao.style.display = "inline"; // se usar button
        }
    }
});



// TODO: Acrescentar campo de data limite 
// TODO: Visualizar as tarefas numa tabela
// TODO: Permitir a alteração de uma tarefa