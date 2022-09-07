fetch("/header.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("header").innerHTML = data;
    })
    .then((data) => {
        let classLink = window.location.pathname.split("/")[1];
        let myLink = document.querySelector(
            `[href='/${classLink}/']`
        );
        myLink.classList.add("active");
    });

fetch("/footer.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("footer").innerHTML = data;
    });

fetch("/asideClasses.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("#classes-nav").innerHTML = data;
    })
    .then((data) => {
        let classLink = window.location.pathname;
        let myLink = document.querySelector(
            `[href='${classLink}']`
        );
        myLink.classList.add("active");
    });

fetch("/asideExercises.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("#exercises-nav").innerHTML = data;
    })
    .then((data) => {
        let classLink = window.location.pathname;
        let myLink = document.querySelector(
            `[href='${classLink}']`
        );
        myLink.classList.add("active");
    });