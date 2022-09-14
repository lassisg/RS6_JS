let header;
let classes;
let exercises;
let currentUrl = window.location.pathname;

function addContentToHeader(headerElement, headerData, headerItemText){
    let homeUrl = headerElement === classes ? "classes" : "exercises";
    headerElement.innerHTML += `
        <li class="nav-item">
            <a class="dropdown-item" href="/${homeUrl}/">${headerItemText}</a>
        </li>
        <li><hr class="dropdown-divider" /></li>`;
    for (const item of headerData) {
        headerElement.innerHTML += `
            <li class="nav-item">
                <a class="dropdown-item" href="${item.htmlUrl}"
                    >${item.title}</a
                >
            </li>`;
    }
    let currentLink = document.querySelector(`li > a[href="${currentUrl}"]`);
    if(currentLink){
        currentLink.classList.add("active");
    }
}

function addContentToSectionHome(sectionElement, sectionData){
    for (const item of sectionData) {
        sectionElement.innerHTML += `
            <li class="list-group-item">
                <a href="${item.htmlUrl}">${item.title}</a>
                <p>${item.description || ""}</p>
            </li>`;
    }
}

function loadSessionsContent(){
    fetch("/assets/sessions.json")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let classesData = JSON.parse(data);
            addContentToHeader(classes, classesData, "Aulas Home");
            return classesData;
        })
        .then((data)=>{
            if(currentUrl === '/classes/'){
                let sessionList = document.querySelector("ul.list-group");
                addContentToSectionHome(sessionList, data);
            }
        });
}

function loadExercisesContent(){
    fetch("/assets/exercises.json")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let exercisesData = JSON.parse(data);
            addContentToHeader(exercises, exercisesData, "Exercícios Home");
            return exercisesData;
        })
        .then((data)=>{
            if(currentUrl === '/exercises/'){
                let exerciseList = document.querySelector("ul.list-group");
                addContentToSectionHome(exerciseList, data);
            }
        });
}

fetch("/header.html")
    .then((response) => {
        header = document.querySelector("header");
        return response.text();
    })
    .then((data) => {
        header.innerHTML = data;
        
        classes = header.querySelector("#dropdown-sessions");
        exercises = header.querySelector("#dropdown-exercises");
    })
    .then(() => {
        loadSessionsContent();
    })
    .then(() => {
        loadExercisesContent();
    });

fetch("/footer.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("footer").innerHTML = data;
    });
