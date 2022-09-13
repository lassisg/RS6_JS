document.querySelector("#tela .btFechaTela").addEventListener("click", function() {
    document.querySelector("#tela").style.display="none";
});
document.querySelector("#tela").addEventListener("click", function() {
    document.querySelector("#tela").style.display="none";
});
let imagemGrande=document.querySelector("#tela_imagem");
let imagens=document.querySelectorAll(".galeria > img");
for (let imagem of imagens) {
    imagem.addEventListener("click", function() {
        // console.log(imagem.src);
        let valorSrc=imagem.getAttribute("src");
        imagemGrande.setAttribute("src",valorSrc);

        let titulo=imagem.getAttribute("title");
        document.querySelector("#tela_imagem_legenda").textContent=titulo;

        document.querySelector("#tela").style.display="flex";
    });
}
document.querySelector("#tela_imagem").addEventListener("click", function(event) { // e, evt, event
    // para parar o event bubbling
    event.stopPropagation();
});
