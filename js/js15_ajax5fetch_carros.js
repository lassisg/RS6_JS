// function mostraCarros() {
fetch("http://localhost:3000/carros")
    .then((response) => response.json())
    .then((carros) => {
        let conteudo = "";
        for (let carro of carros) {
            conteudo += `
                    <tr data-id="${carro.id}" data-toggle="modal" data-target="#postModal">
                        <td>${carro.marca}</td>
                        <td>${carro.modelo}</td>
                        <td>${carro.ano}</td>
                    </tr>`;
        }
        $("#carros tbody").html(conteudo);
        $("#totalCarros").text(carros.length);

        $("#carros").show();
    })
    .catch((erro) => console.log("Ocorreu um erro: " + erro));
// }

$("#btInserir").on("click", function () {
    let cmarca = $("#marca").val();
    let cmodelo = $("#modelo").val();
    let cano = $("#ano").val();

    // Validar preenchimento dos campos

    let registo = {
        marca: cmarca,
        modelo: cmodelo,
        ano: cano,
    };
    fetch("http://localhost:3000/carros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registo),
    })
        .then((response) => response.json())
        .then((resposta) => {
            // {marca: "Fiat", modelo: "Punto", ano: 1990, id: 3}
            console.log(resposta);

            // // Limpa formulário
            // $("#marca").val("");
            // $("#modelo").val("");
            // $("#ano").val("");

            // // Refazer tabelas
            // mostraCarros();

            alert("Foi inserido um carro com o id: " + resposta.id);
        })
        .catch((erro) => console.log("Ocorreu um erro: " + erro));
});

// mostraCarros();
