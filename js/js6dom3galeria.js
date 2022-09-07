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
    
let leftArrow = document.querySelector(".fa-angle-left");
let rightArrow = document.querySelector(".fa-angle-right");
let currentPosition = 0;

for(let imagem of imagens){
    imagem.addEventListener("click", function(){

        posCorrente = this.getAttribute("data-id") - 1;

        let valorSrc = this.getAttribute("src");
        imagemGrande.setAttribute("src", valorSrc);
        
        let valorTitle = this.getAttribute("title");
        document.querySelector("#tela_imagem_legenda").textContent = valorTitle;
        
        document.querySelector("#tela").style.display="flex";
    });
}

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

leftArrow.addEventListener("click", function(event){
    event.stopPropagation();
    
    // Solução 3
    if(posCorrente > 0){
        posCorrente--;
        let valorSrc = imagens[posCorrente].getAttribute("src");
        imagemGrande.setAttribute("src",valorSrc);
    
        let valorTitle = imagens[posCorrente].getAttribute("title");
        document.querySelector("#tela_imagem_legenda").textContent = valorTitle;
    }
});
    

rightArrow.addEventListener("click", function(event){
    event.stopPropagation();

    // Solução 1
    // let currentImage = imagemGrande.getAttribute("src");
    
    // pos = 0;
    // for(let imagem of imagens){
    //     if(imagem.getAttribute("src") === currentImage){
    //         break;
    //     }
    //     pos++;
    // }

    // if (pos < imagens.length - 1) {
    //     pos++;
    //     let valorSrc = imagens[pos].getAttribute("src");
    //     imagemGrande.setAttribute("src",valorSrc);
    
    //     let valorTitle = imagens[pos].getAttribute("title");
    //     document.querySelector("#tela_imagem_legenda").textContent = valorTitle;
    // }

    // Solução 2 (não funciona para o título)
    // let currentImage = imagemGrande.getAttribute("src");
    // let parts = currentImage.split('.');
    // let algarismo = parts[0].charAt(parts[0].length-1);
    // if(algarismo < imagens.length){
    //     algarismo++;
    //     imagemGrande.setAttribute("src",`/images/galeria${algarismo}.jpg`);
    // }

    // Solução 3
    if(posCorrente < imagens.length - 1){
        posCorrente++;
        let valorSrc = imagens[posCorrente].getAttribute("src");
        imagemGrande.setAttribute("src",valorSrc);
    
        let valorTitle = imagens[posCorrente].getAttribute("title");
        document.querySelector("#tela_imagem_legenda").textContent = valorTitle;
    }

});