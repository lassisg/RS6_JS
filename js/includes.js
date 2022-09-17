let header;
let classes;
let exercises;
let currentUrl = window.location.pathname;

const exerciseItem = (title, url) => {
    let exerciseHTML = `
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tooltip" data-bs-title="Código sem framework" href="${url}">${title}</a>
        </li>`;

    return exerciseHTML;
};
const sessionItem = (title, url) => {
    let sessionHTML = `
        <li class="nav-item">
            <span class="d-flex align-items-center justify-content-between dropdown-item">
                <span class="flex-fill">${title}</span>
                <span class="d-flex">
                    <span class="vr ms-3"></span>
                    <span>
                        <a class="nav-link"
                        data-bs-toggle="tooltip"
                        data-bs-title="Código sem framework"
                        href="/src${url}">
                            <i class="bi bi-code-slash"></i>
                        </a>
                    </span>
                    <span>
                        <a class="nav-link"
                        data-bs-toggle="tooltip"
                        data-bs-title="Código com Bootstrap"
                        href="${url}">
                            <i class="bi bi-bootstrap"></i>
                        </a>
                    </span>
                </span>
            </span>
        </li>`;

    return sessionHTML;
};

function addSessionContentToHeader(headerElement, headerData) {
    let previousItem;
    let currentItem;

    headerData.forEach((item, pos) => {
        currentItem = item.title.split("|")[0].trim();
        if (pos && currentItem !== previousItem) {
            headerElement.innerHTML += `
            <li><hr class="dropdown-divider" /></li>`;
        }
        headerElement.innerHTML += sessionItem(item.title, item.htmlUrl);
        previousItem = currentItem;
    });
}

function addExercisesContentToHeader(headerElement, headerData) {
    for (const item of headerData) {
        headerElement.innerHTML += exerciseItem(item.title, item.htmlUrl);
    }
}

function addContentToSectionHome(sectionElement, sectionData) {
    for (const item of sectionData) {
        sectionElement.innerHTML += `
            <li class="list-group-item">
                <a href="${item.htmlUrl}">${item.title}</a>
                <p>${item.description || ""}</p>
            </li>`;
    }
}

function setActiveMenuItem() {
    let currentLink = document.querySelector(`a[href="${currentUrl}"]`);
    if (currentLink) {
        currentLink.classList.add("active");
    }
}

function loadSessionsContent() {
    fetch("/assets/sessions.json")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let classesData = JSON.parse(data);
            addSessionContentToHeader(classes, classesData);
            return classesData;
        })
        .then((data) => {
            if (currentUrl === "/classes/") {
                let sessionList = document.querySelector("ul.list-group");
                addContentToSectionHome(sessionList, data);
            }
        })
        .then(() => {
            setActiveMenuItem();
        });
}

function loadExercisesContent() {
    fetch("/assets/exercises.json")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let exercisesData = JSON.parse(data);
            addExercisesContentToHeader(exercises, exercisesData);
            return exercisesData;
        })
        .then((data) => {
            if (currentUrl === "/exercises/") {
                let exerciseList = document.querySelector("ul.list-group");
                addContentToSectionHome(exerciseList, data);
            }
        })
        .then(() => {
            setActiveMenuItem();
        });
}

fetch("/footer.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        let footer = document.querySelector("footer");
        footer.classList.add("container-lg", "py-3", "my-4", "border-top");
        footer.innerHTML = data;
    });

fetch("/header.html")
    .then((response) => {
        header = document.querySelector("header");
        return response.text();
    })
    .then((data) => {
        header.classList.add(
            "container-lg",
            "d-flex",
            "flex-wrap",
            "justify-content-center",
            "py-3",
            "mb-4",
            "border-bottom"
        );
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
