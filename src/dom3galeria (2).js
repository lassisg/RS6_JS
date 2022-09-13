let posCorrente;

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

        posCorrente=Number(this.getAttribute("data-id"))-1;

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

let setaEsquerda=document.querySelector("#seta_esquerda");
let setaDireita=document.querySelector("#seta_direita");

setaEsquerda.addEventListener("click", function(event) {
    event.stopPropagation();
    if (posCorrente>0) {
        posCorrente--;
        let valorSrc=imagens[posCorrente].getAttribute("src");
        imagemGrande.setAttribute("src",valorSrc);
        let titulo=imagens[posCorrente].getAttribute("title");
        document.querySelector("#tela_imagem_legenda").textContent=titulo;
    }
});
setaDireita.addEventListener("click", function(event) {
    event.stopPropagation();
    // versão 1
    // let imagemCorrente=imagemGrande.getAttribute("src");
    // let pos=0;
    // for (let imagem of imagens) {
    //     if (imagem.getAttribute("src")===imagemCorrente) {
    //         break;
    //     }
    //     pos++;
    // }
    // if (pos<imagens.length-1) {
    //     pos++;
    //     let valorSrc=imagens[pos].getAttribute("src");
    //     imagemGrande.setAttribute("src",valorSrc);
    //     let titulo=imagens[pos].getAttribute("title");
    //     document.querySelector("#tela_imagem_legenda").textContent=titulo;
    // }

    // versão 2
    // let imagemCorrente=imagemGrande.getAttribute("src");
    // let partes=imagemCorrente.split(".");
    // let algarismo=partes[0].charAt(partes[0].length-1);
    // if (algarismo<imagens.length) {
    //     algarismo++;
    //     imagemGrande.setAttribute("src","imagens/galeria"+algarismo+".jpg");    
    // }

    // versão 3
    if (posCorrente<imagens.length-1) {
        posCorrente++;
        let valorSrc=imagens[posCorrente].getAttribute("src");
        imagemGrande.setAttribute("src",valorSrc);
        let titulo=imagens[posCorrente].getAttribute("title");
        document.querySelector("#tela_imagem_legenda").textContent=titulo;
    }

});
