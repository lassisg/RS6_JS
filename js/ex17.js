contentHeaders = document.querySelectorAll(".content-header");
contentSections = document.querySelectorAll(".content-section > p");


function activateTab(selection){
    let headerIndex;

    contentHeaders.forEach((header, pos) => {
        if(header === selection){
            header.classList.add("active-header");
            headerIndex = pos;
        } else {
            header.classList.remove("active-header");
        }
    });

    return headerIndex;
}

function renderContent(selectionIndex){
    contentSections.forEach((section, pos) => {
        if(pos === selectionIndex){
            section.classList.add("active-content");
        } else {
            section.classList.remove("active-content");
        }
    });
}

contentHeaders.forEach((section) => {
    section.addEventListener("click", function(){
        let selectedTabIndex = activateTab(this);
        renderContent(selectedTabIndex);
    });
});
