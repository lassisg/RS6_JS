console.log("Início");

function carregaDados() {
    const url = "https://jsonplaceholder.typicode.com/posts";

    const xhr = new XMLHttpRequest();
    console.log("=", xhr.status); // 0

    xhr.open("GET", url);

    // xhr.addEventListener("load")
    // xhr.onload= () => {}
    xhr.onload = function () {
        // callback / assíncrono
        console.log(xhr.status); // 200
        console.log(xhr.statusText); //
        // console.log(xhr.responseText);
        let dados = JSON.parse(xhr.responseText);
        console.log(dados);
        // console.log(dados[0].title);
        let conteudo = "";
        for (let objecto of dados) {
            // console.log(objecto.title);
            conteudo += `<p>${objecto.title}</p>`;
        }
        document.getElementById("postsTitulos").innerHTML = conteudo;
    };

    xhr.send();
}

document
    .getElementById("btCarregaPosts")
    .addEventListener("click", carregaDados); // carregaDados => callback​

console.log("Fim");
