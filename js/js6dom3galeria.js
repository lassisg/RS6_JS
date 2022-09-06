document.querySelector("#tela .btFechaTela")
    .addEventListener("click", function(){
        document.querySelector("#tela").style.display="none";
    });

document.querySelector("#tela")
    .addEventListener("click", function(){
        document.querySelector("#tela").style.display="none";
    });

let imagens = document.querySelectorAll(".galeria > img");
let imagemGrande = document.querySelector("#tela_imagem");

for(let imagem of imagens){
    imagem.addEventListener("click", function(){
        let valorSrc = imagem.getAttribute("src");
        imagemGrande.setAttribute("src", valorSrc);
        
        let valorTitle = imagem.getAttribute("title");
        document.querySelector("#tela_imagem_legenda").textContent = valorTitle;
        
        document.querySelector("#tela").style.display="flex";
    });
}

document.querySelector("#tela_imagem")
    .addEventListener("click", function(event){ // e, evt, event
        event.stopPropagation();
    });
    
document.querySelector("#tela_imagem")
    .addEventListener("click", function(event){ // e, evt, event
        event.stopPropagation();
    });

document.querySelector("body")
    .addEventListener("keydown", function(evt) {
        // evt = evt || window.event;
        if (evt.key == "Escape") {
            document.querySelector("#tela").style.display="none";
        }
    });