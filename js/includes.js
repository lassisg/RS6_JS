let header;
let classes;
let exercises;

fetch("/header.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        header = document.querySelector("header");
        header.innerHTML = data;
        
        classes = header.querySelector("#dropdown-sessions");
        exercises = header.querySelector("#dropdown-exercises");
    })
    .then(() => {
        fetch("/assets/sessions.json")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let classesData = JSON.parse(data);
                classes.innerHTML += `
                    <li>
                        <a class="dropdown-item" href="/classes/">Aulas Home</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>`;
                    for (const item of classesData) {
                        classes.innerHTML += `
                            <li class="nav-item">
                                <a class="dropdown-item" href="${item.htmlUrl}"
                                    >${item.title}</a
                                >
                            </li>`;
                    }
                    return classesData;
            })
            .then((data)=>{
                console.log(data)
                let currentUrl = window.location.pathname;
                if(currentUrl === '/classes/'){
                    let sessionList = document.querySelector("ul.list-group");
                    // sessionList.innerHTML = "";
                    console.log(sessionList);
                    for (const item of data) {
                        sessionList.innerHTML += `
                            <li class="list-group-item">
                                <a href="${item.htmlUrl}">${item.title}</a>
                                <p>${item.description || ""}</p>
                            </li>`;
                    }
                    console.log(sessionList);
                }
            });
    })
    .then(() => {
        fetch("/assets/exercises.json")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let exercisesData = JSON.parse(data);
                exercises.innerHTML += `
                    <li>
                        <a class="dropdown-item" href="/exercises/">Exercícios Home</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>`;
                for (const item of exercisesData) {
                    exercises.innerHTML += `
                        <li class="nav-item">
                            <a class="dropdown-item" href="${item.htmlUrl}"
                                >${item.title}</a
                            >
                        </li>`;
                }
                return exercisesData;
            })
            .then((data)=>{
                console.log(data)
                let currentUrl = window.location.pathname;
                if(currentUrl === '/exercises/'){
                    let exerciseList = document.querySelector("ul.list-group");
                    console.log(exerciseList);
                    for (const item of data) {
                        exerciseList.innerHTML += `
                            <li class="list-group-item">
                                <a href="${item.htmlUrl}">${item.title}</a>
                                <p>${item.description || ""}</p>
                            </li>`;
                    }
                    console.log(exerciseList);
                }
            });
    })
    .then(()=>{
        let currentUrl = window.location.pathname;
        let currentLink = document.querySelector(
            `li > a[href="${currentUrl}"]`
        );
        if(currentLink){
            currentLink.classList.add("active");
        }
        return currentUrl;
    })
    .then((currentUrl)=>{
        let isSectionHome = currentUrl === '/classes/';
        let isExercisesnHome = currentUrl === '/exercises/';
        let groupData;

        if(isSectionHome){
            groupData = 
            console.log(isSectionHome);
        } else if(isExercisesnHome){
            console.log(isExercisesnHome);
        }
    });

fetch("/footer.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("footer").innerHTML = data;
    });
