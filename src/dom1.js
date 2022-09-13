// DOM API - Document Object Model Application Programming Interface
// HTMLCollection - array-like
let paragrafo=document.getElementsByTagName("p")[1];
console.log(paragrafo);
console.log(typeof paragrafo); // object
console.log(Array.isArray(paragrafo)); // false
// textContent - propriedade que permite aceder ao conteúdo de um elemento HTML
console.log(paragrafo.textContent);

let botao=document.getElementById("btAltera");
console.log(botao);
// event handler
// document.getElementById("btAltera").onclick=
botao.onclick=function() { // anonymous function / callback
    // paragrafo.textContent="Pedro Remoaldo";
    paragrafo.innerHTML="<strong>Pedro Remoaldo</strong>";
    // paragrafo.style.color="yellow";
    // paragrafo.style.backgroundColor="red";
    // <p style="color: yellow; background-color: red;">
    // paragrafo.className="destaque";
    // paragrafo.classList.toggle("destaque");
    if (paragrafo.classList.contains("destaque")) {
        paragrafo.classList.remove("destaque");
    } else {
        paragrafo.classList.add("destaque");
    }
    // <p class="destaque"></p>
}

function mudaBotao() {
    // document.getElementById("btOutro").style.backgroundColor="blue";
    this.style.backgroundColor="blue";
}
document.getElementById("btOutro").onclick=mudaBotao;

let conteudo=document.getElementById("conteudoCollapse");
let botaoMostra=document.getElementById("btMostra");
// event listener
botaoMostra.addEventListener("click", function() {
    console.log(window.getComputedStyle(conteudo).getPropertyValue("display"));
    console.log(conteudo.style.display);
    if (conteudo.style.display==="block") {
        conteudo.style.display="none";
        this.textContent="Mostra";
    } else {
        conteudo.style.display="block";
        this.textContent="Esconde";
    }
});

// o JavaScript converte todos os ids de HTML para variáveis de JavaScript
console.log(btMostra); // <button type="button" id="btMostra">Mostra</button>