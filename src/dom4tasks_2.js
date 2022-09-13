let lista=document.querySelector("#listaTarefas"); // HTMLElement
let campoTarefa=document.querySelector("#tarefa");
let campoData=document.querySelector("#data_limite");
let ctotal=document.querySelector("#totalTarefas");
// Criar uma estrutura de dados para armazenar em memória as tarefas e as respectivas datas
const tarefas=[];

// document.querySelector("#btSubmit").addEventListener("click", function() {
document.querySelector("#formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();
    // obter o valor introduzido no campo "tarefa"
    let valor=campoTarefa.value.trim();
    // acrescentar a tarefa à lista
    // lista.innerHTML=lista.innerHTML+`<li>${valor}</li>`;
    // validar o valor introduzido no campo tarefa (não pode estar vazio / tem de ter no mínimo 3 caracteres)
    if (valor.length>2) {
        let data=campoData.value;
        console.log(data); // 2022-02-12
        if (data!=="") {
            // lista.innerHTML+=`<li>${valor} (${data}) <button type="button" class="btElimina">X</button></li>`;

            let cel1=document.createElement("td");
            let cel1conteudo=document.createTextNode(valor);
            cel1.appendChild(cel1conteudo);

            let cel2=document.createElement("td");
            let cel2conteudo=document.createTextNode(data);
            cel2.appendChild(cel2conteudo);

            let cel3=document.createElement("td");
            let cel3button=document.createElement("button");
            let cel3conteudo=document.createTextNode("X");
            cel3button.appendChild(cel3conteudo);
            cel3button.setAttribute("type","button");
            cel3button.setAttribute("class","btElimina");
            cel3.appendChild(cel3button);

            let linha=document.createElement("tr");
            linha.appendChild(cel1);
            linha.appendChild(cel2);
            linha.appendChild(cel3);

            // document.querySelector("#listaTarefas tbody").appendChild(linha);
            document.getElementById("listaTarefas").getElementsByTagName("tbody")[0].appendChild(linha);

            // lista.innerHTML+=`
            //     <tr>
            //         <td>${valor}</td>
            //         <td>${data}</td>
            //         <td><button type="button" class="btElimina">X</button></td>
            //     </tr>
            // `;

// [
// { tarefa: "dormir", data:"2022-09-12" },
// { tarefa: "saltar", data:"2022-09-12" }
// ]

            tarefas.push({ tarefa : valor, data: data });
            ctotal.textContent=tarefas.length;

            campoTarefa.value='';
            campoData.value='';
        } else {
            alert("O campo 'Data limite' tem de ser preenchido!");
        }
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
        event.target.parentElement.parentElement.remove();
        // código para remover o objecto do array tarefas
        
        ctotal.textContent=tarefas.length;
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

// Validar a data - tem de ser superior à data corrente
// Mostrar a data no formato dd/mm/aaaa

// criar um botão, que, quando clicado, cria uma estrutura de dados do tipo array de objectos, e cujo conteúdo corresponde às linhas/colunas da tabela
// possibilitar a alteração de uma tarefa
// acrescentar uma seta a cada título de coluna que, quando clicada (toggle - asc e desc), permite ordenar os registos/linhas
// implementar um filtro de tarefas e uma pesquisa tarefas
