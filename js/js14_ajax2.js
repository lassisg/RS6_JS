console.log("Início");
const url = "https://jsonplaceholder.typicode.com/posts";

function carregaDados() {
    const xhr = new XMLHttpRequest();
    console.log(xhr.readyState);

    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        /*
            'xhr.ReadyState' values:
            0: Unsent
            1: Open
            2: Headers received
            3: Loading
            4: Done
        */
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 200:
                    console.log("Dados recebidos");
                    break;
                case 404:
                    console.log("Ocorreu um erro");
                    break;
                default:
                    console.log("Ocorreu um erro desconhecido");
                    break;
            }
        }
    };

    xhr.onerror = function () {
        console.log("Ocorreu um erro na ligação à API");
    };

    xhr.open("GET", url);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let dados = JSON.parse(xhr.responseText);

            let conteudo = "";
            for (let objecto of dados) {
                // <td>${objecto.id}</td>
                conteudo += `
                <tr data-id="${objecto.id}">
                    <td>${objecto.userId}</td>
                    <td>${objecto.title}</td>
                    <td>${objecto.body}</td>
                </tr>`;
            }
            document.querySelector("#posts tbody").innerHTML = conteudo;
            document.getElementById("totalPposts").textContent = dados.length;
            document.getElementById("posts").style.display = "table";

            // DONE: click em um linha, mostra a informação entr o botão e a tabela
            let linhas = document.querySelectorAll("#posts tbody tr");
            for (let linha of linhas) {
                linha.addEventListener("click", function () {
                    // let id = this.firstChild.textContent;
                    let id = this.getAttribute("data-id");
                    lePost(id);
                });
            }
        }
    };

    xhr.send();
}

function lePost(id) {
    const xhr = new XMLHttpRequest();

    // xhr.open("GET", `${url}?id=${id}`);
    xhr.open("GET", `${url}/${id}`);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let objecto = JSON.parse(xhr.responseText);
            let conteudo = "";
            conteudo += `<div class="card mb-3 p-2">`;
            conteudo += `<h5 class="card-title">${objecto.title}</h5>`;
            conteudo += `<p>${objecto.body}</p>`;
            conteudo += `<small>Written by: ${objecto.userId}</small></div>`;
            document.querySelector("#infoPost").innerHTML = conteudo;
        }
    };

    xhr.send();
}

document
    .getElementById("btCarregaPosts")
    .addEventListener("click", carregaDados); // carregaDados => callback​
console.log("Fim");
