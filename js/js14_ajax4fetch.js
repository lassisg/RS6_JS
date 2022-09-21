const url = "https://jsonplaceholder.typicode.com/posts";

document
    .getElementById("btCarregaPosts")
    .addEventListener("click", function () {
        // Fetch API
        // fetch("https://jsonplaceholder.typicodea.com/posts") // Força erro
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    // status code = 200
                    return response.json();
                } else {
                    console.log("Erro");
                }
            })
            .then((dados) => {
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
                document.getElementById("totalPposts").textContent =
                    dados.length;
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
            })
            .catch((erro) => console.log("Ocorreu um error: " + erro));
    });

function lePost(id) {
    console.log(id);
    fetch(`${url}/${id}`)
        .then((response) => response.json())
        .then((objecto) => {
            let showModal = document.getElementById("useModal");
            let conteudo = "";

            if (showModal.checked) {
                document.querySelector("#infoPost").innerHTML = conteudo;
                document.querySelector(
                    ".modal-title"
                ).innerHTML = `${objecto.title}`;
                document.querySelector(".modal-body").innerHTML = `
                    <p>${objecto.body}</p>
                    <small>Written by: ${objecto.userId}</small>`;

                let myModal = new bootstrap.Modal(
                    document.getElementById("postModal"),
                    {}
                );
                myModal.show();
            } else {
                conteudo += `<div class="card mb-3 p-2">`;
                conteudo += `<h5 class="card-title">${objecto.title}</h5>`;
                conteudo += `<p>${objecto.body}</p>`;
                conteudo += `<small>Written by: ${objecto.userId}</small></div>`;
                document.querySelector("#infoPost").innerHTML = conteudo;
            }
        });
}
