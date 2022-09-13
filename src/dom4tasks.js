let lista=document.querySelector("#listaTarefas"); // HTMLElement
let campoTarefa=document.querySelector("#tarefa");

// document.querySelector("#btSubmit").addEventListener("click", function() {
document.querySelector("#formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();
    // obter o valor introduzido no campo "tarefa"
    let valor=campoTarefa.value.trim();
    // acrescentar a tarefa à lista
    // lista.innerHTML=lista.innerHTML+`<li>${valor}</li>`;
    // validar o valor introduzido no campo tarefa (não pode estar vazio / tem de ter no mínimo 3 caracteres)
    if (valor.length>2) {
        lista.innerHTML+=`<li>${valor} <button type="button" class="btElimina">X</button></li>`;
        // lista.innerHTML='<li>'+valor+'</li>';
        campoTarefa.value='';
    } else {
        alert("O campo Tarefa tem de ter no mínimo 3 caracteres!");
    }
    campoTarefa.focus();
});

// let botoesElimina=document.getElementsByClassName("btElimina");
// let botoesElimina=document.querySelectorAll(".btElimina");
// for (let botao of botoesElimina) {
//     botao.addEventListener("click",function() {
//         alert("Clicou");
//     });
// }

// poder eliminar uma tarefa (acrescentar um botão com um X a seguir ao nome da tarefa na lista)
// event delegation
lista.addEventListener("click",function(event) {
    // console.log(event);
    // console.log(event.target.className);
    let elemento=event.target.nodeName;
    if (elemento==="BUTTON") {
        event.target.parentElement.remove();
    }
});

// dar uma tarefa como terminada (riscar a tarefa e esconder o botão de eliminação)
// hipóteses : checkbox, outro botão
lista.addEventListener("dblclick",function(event) {
    let elemento=event.target;
    if (elemento.nodeName==="LI") {
        elemento.classList.toggle("riscado");
        // let botao=elemento.firstChild.nextElementSibling;
        // let botao=elemento.getElementsByClassName("btElimina")[0];
        let botao=elemento.querySelector(".btElimina");
        if (elemento.classList.contains("riscado")) {
            botao.style.display="none";
        } else {
            botao.style.display="inline";
        }
    }
});

// acrescentar campo de data limite
// visualizar as tarefas numa tabela
// possibilitar a alteração de uma tarefa
