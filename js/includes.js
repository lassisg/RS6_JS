fetch("/header.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("header").innerHTML = data;
    })
    .then((data) => {
        let classLink = window.location.pathname;
        let myLink = document.querySelector(
            `li > a[href="${classLink}"]`
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
