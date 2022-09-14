// HTMLCollection(3)
// let titulos=document.getElementsByClassName("acordeao")[0].getElementsByTagName("h2");
let titulos=document.querySelectorAll(".acordeao > h2");
// console.log(titulos);
let sections=document.querySelectorAll(".acordeao > section");

for (let titulo of titulos) {
    titulo.addEventListener("click", function() {
        // mostrar/esconder a section que vem a seguir
        // let estado=window.getComputedStyle(this.nextElementSibling).getPropertyValue("display");
        // if (estado==="none") {
        //     this.nextElementSibling.style.display="block";
        // } else {
        //     this.nextElementSibling.style.display="none";
        // }
        this.nextElementSibling.classList.toggle("esconde");
        // Fecha todas as sections excepto a que está associada ao título clicado
        for (let section of sections) {
            if (section!==this.nextElementSibling) {
                section.classList.add("esconde");
            }
        }
    });
}