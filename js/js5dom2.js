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

        // currentSection.classList.toggle("esconde");
        // for(let section of sections) {
        //     if(section !== currentSection){
        //         section.classList.add("esconde");
        //     }
        // };

        sections.forEach(item => {
            item.classList.add("esconde");
        });
        currentSection.classList.toggle("esconde");
    });
}

