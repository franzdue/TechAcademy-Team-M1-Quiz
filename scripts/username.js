const myButton = document.querySelector("#userName");
const myButton2 = document.querySelector("#showUName");
const myHeading = document.querySelector("h1");

function setUserName() {
    let myName = document.querySelector("#inputTag").value;
    if (!myName) {
        //setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent =
            myName + " schaffst du es alle Fragen zu beantworten?";
    }
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    let storedName = localStorage.getItem("name");
    myHeading.textContent =
        storedName + " schaffst du es alle Fragen zu beantworten?";
}

myButton.onclick = function () {
    setUserName();
    hideUNameRow();
};

//Damit sich der Text auch ändert, wenn man nur den Enter-Button drückt

document.querySelector("#inputTag").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.querySelector("#userName").click();
    }
});

//Damit das #userNameRow nicht mehr angezeigt wird + wieder angezeigt wird

function hideUNameRow() {
    let hide = document.querySelector("#hideShow");
    hide.classList.add("hide");
}

function showUNameRow() {
    let show = document.querySelector("#hideShow");

    if (show.classList.contains("hide")) {
        show.classList.remove("hide");
    } else {
    }
}

myButton2.onclick = function () {
    showUNameRow();
};
