$("#btCarregaPosts").on("click", function () {
    $.getJSON("https://jsonplaceholder.typicode.com/posts", function (dados) {
        console.log(dados);
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
        $("#posts").show();
        $("#posts tbody").html(conteudo);
    });
});
