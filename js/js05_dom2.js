// Método antigo
// HTMLCollection(3)
// let titulos = document.getElementsByClassName("acordeao")[0].getElementsByTagName("h2");

// Método atual
// HTMLCollection(3)
let titulos = document.querySelectorAll(".acordeao > h2");

console.log(titulos);

let sections = document.querySelectorAll(".acordeao > section");

// Não é possível adiciona event listenner para array
// titulos.onclick = function(){
//     console.log("Clicou");
// };

for(let titulo of titulos){
    titulo.addEventListener("click", function(){
        let currentSection = this.nextElementSibling;
        
        // let estado = window.getComputedStyle(currentSection).getPropertyValue("display");
        // if(estado === "none"){
        //     currentSection.style.display = "block";
        // }else{
        //     currentSection.style.display = "none";
        // }
        // currentSection.style.display = estado === "none" ? "block" : "none";

        currentSection.classList.toggle("esconde");
        sections.forEach(section => {
            if(section !== currentSection){
                section.classList.add("esconde");
            }
        });

        for(let titulo of titulos){
            let estado = window.getComputedStyle(titulo.nextElementSibling).getPropertyValue("display");
            console.log(estado);
            console.log(titulo);

            if(estado === "none"){
                titulo.querySelector("span").classList.add("seta_fechada");
                titulo.querySelector("span").classList.remove("seta_aberta");
            } else {
                titulo.querySelector("span").classList.add("seta_aberta");
                titulo.querySelector("span").classList.remove("seta_fechada");
            }
        }

    });
}

