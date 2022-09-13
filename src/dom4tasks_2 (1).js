let lista=document.querySelector("#listaTarefas"); // HTMLElement
let campoTarefa=document.querySelector("#tarefa");
let campoData=document.querySelector("#data_limite");
let ctotal=document.querySelector("#totalTarefas");

let tarefas=[];
// Criar uma estrutura de dados para armazenar em memória as tarefas e as respectivas datas
if (localStorage.getItem("tarefas")!==null) {
    if (localStorage.getItem("tarefas").length!==0) {
        tarefas=JSON.parse(localStorage.getItem("tarefas"));
        // percorrer o array tarefas e criar as linhas na tabela
        for (let registo of tarefas) {
            insereTarefa(registo.tarefa,registo.data);
        }
    }
}

function insereTarefa(valor,data) {
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
}

// inserção de uma tarefa
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
        // console.log(data); // 2022-02-12
        if (data!=="") {
            // o utilizador introduziu uma tarefa válida e uma data

            // Não se podem introduzir tarefas repetidas
            let posicao=tarefas.findIndex(tarefa=>tarefa.tarefa.toUpperCase()===valor.toUpperCase());
            // o método find devolve o objecto encontrado ou undefined
            // let existe=tarefas.find(tarefa=>tarefa.tarefa===valor);
            // if (existe) {
            // if (existe!==undefined) {

            if (posicao===-1) {
                // lista.innerHTML+=`<li>${valor} (${data}) <button type="button" class="btElimina">X</button></li>`;

                insereTarefa(valor,data);

    // [
    // { tarefa: "dormir", data:"2022-09-12" },
    // { tarefa: "saltar", data:"2022-09-12" }
    // ]
                let registo={ tarefa : valor, data: data };
                tarefas.push(registo);
                // serialization
                let dados=JSON.stringify(tarefas);
                localStorage.setItem("tarefas",dados);
                ctotal.textContent=tarefas.length;

                campoTarefa.value='';
                campoData.value='';
            } else {
                alert("A tarefa submetida já existe na lista!");
            }
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
        // encontra o elemento <tr> e apaga-o
        // event.target.parentElement.parentElement.remove();
        event.target.closest("tr").remove();
 // [
// { tarefa: "dormir", data:"2022-09-12", terminada: true },
// { tarefa: "saltar", data:"2022-09-12" }
// ]
        // descobrir o nome da tarefa a eliminar
        let tarefaAEliminar=event.target.closest("tr").querySelectorAll("td")[0].textContent;
        // descobrir índice do elemento a remover
        let posicao=tarefas.findIndex(tarefa=>tarefa.tarefa===tarefaAEliminar);
        
        // for (let i=0;i<tarefas.length;i++) {
        //     if (tarefas[i].tarefa===tarefaAEliminar) {
        //         tarefas.splice(i,1);
        //         break;
        //     }
        // }

        // let pos=0;
        // for (let tarefa of tarefas) {
        //     if (tarefa.tarefa===tarefaAEliminar) {
        //         tarefas.splice(pos,1);
        //         break;
        //     }
        //     pos++;
        // }
        
        // remover elemento do array
        tarefas.splice(posicao,1);

        // se tivessemos definido let tarefas=[]
        // tarefas=tarefas.filter(tarefa => tarefa.tarefa!==tarefaAEliminar);

        let dados=JSON.stringify(tarefas);
        localStorage.setItem("tarefas",dados);

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

// acrescentar uma nova propriedade ao objecto tarefa, chamada "terminada" que tem um valor booleano
// implementar código para quando se efectua um duplo-clique em cima de uma linha da tabela, a tarefa é dada como terminada

// criar um botão, que, quando clicado, cria uma estrutura de dados do tipo array de objectos, e cujo conteúdo corresponde às linhas/colunas da tabela
// possibilitar a alteração de uma tarefa
// acrescentar uma seta a cada título de coluna que, quando clicada (toggle - asc e desc), permite ordenar os registos/linhas
// implementar um filtro de tarefas e uma pesquisa tarefas

// apenas mostrar o cabeçalho eo rodapé da tabela se existirem tarefas definidas