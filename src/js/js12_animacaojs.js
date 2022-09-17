// requestAnimationFrame
let posicao=0;
function anima() {
    posicao+=10;
    if (posicao>1000) {
        clearInterval(temporizador);
    }
    document.getElementById("objecto").style.transform=`translateX(${posicao}px)`;
}
// setTimeout
let temporizador=setInterval(anima,100);