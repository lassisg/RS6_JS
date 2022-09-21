document
    .getElementById("btCarregaPosts")
    .addEventListener("click", function () {
        // Fetch API
        // fetch("https://jsonplaceholder.typicodea.com/posts") // Força erro
        fetch("https://jsonplaceholder.typicode.com/posts")
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
            })
            .catch((erro) => console.log("Ocorreu um error: " + erro));
    });
